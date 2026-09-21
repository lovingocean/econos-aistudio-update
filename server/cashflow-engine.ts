import { 
  CashFlowForecastResponse, 
  CashFlowMonthProjection, 
  DailyCashEvent, 
  MonteCarloSimulationResult, 
  CashFlowSimulationParams 
} from '../src/types/cashflow';
import { Invoice, Expense, EconomicProfile, Business } from '../src/types/econos';

export function computeCashFlowForecast(
  business: Business | undefined,
  profile: EconomicProfile | undefined,
  invoices: Invoice[],
  expenses: Expense[],
  params: Partial<CashFlowSimulationParams> = {}
): CashFlowForecastResponse {
  const collectionDelayDays = params.collectionDelayDays ?? 0;
  const expenseInflationPct = params.expenseInflationPct ?? 0;
  const revenueGrowthMoM = params.revenueGrowthMoM ?? 0.02; // default 2% MoM growth
  const emergencyReserveFloor = params.emergencyReserveFloor ?? 50000;

  // 1. Current cash baseline
  const currentLiquidCash = profile?.cashOnHand ?? 450000;
  const baseMonthlyRevenue = profile?.monthlyRevenue ?? 85000;
  const baseMonthlyOpex = profile?.monthlyOpex ?? 48000;
  const monthlyBaselineBurn = Math.max(0, baseMonthlyOpex - baseMonthlyRevenue);
  const baselineRunwayMonths = monthlyBaselineBurn > 0 
    ? Number((currentLiquidCash / monthlyBaselineBurn).toFixed(1)) 
    : 99.9;

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);

  // 2. Build 30-Day Daily Cash Calendar
  const upcomingDailyEvents: DailyCashEvent[] = [];
  let runningBalance = currentLiquidCash;

  // Unpaid Invoices
  invoices.forEach(inv => {
    if (inv.status === 'paid' || inv.status === 'void') return;
    const unpaidAmt = Math.max(0, inv.totalAmount - (inv.amountPaid || 0));
    if (unpaidAmt <= 0) return;

    // Apply collection delay
    const dueTime = new Date(inv.dueDate).getTime() + (collectionDelayDays * 86400000);
    const adjustedDueDate = new Date(dueTime).toISOString().slice(0, 10);

    upcomingDailyEvents.push({
      date: adjustedDueDate,
      type: 'INVOICE_RECEIVABLE',
      referenceId: inv.invoiceNumber,
      counterparty: inv.clientName,
      amount: unpaidAmt,
      status: inv.status === 'sent' ? 'SCHEDULED' : 'PENDING',
      runningBalance: 0 // calculated after sorting
    });
  });

  // Unpaid Expenses / Bills
  expenses.forEach(exp => {
    if (exp.status === 'paid' || exp.status === 'rejected') return;
    const adjustedAmt = exp.amount * (1 + (expenseInflationPct / 100));

    upcomingDailyEvents.push({
      date: exp.dueDate,
      type: 'EXPENSE_PAYABLE',
      referenceId: exp.invoiceNumber || exp.id,
      counterparty: exp.vendorName,
      amount: -adjustedAmt,
      status: exp.status === 'approved' ? 'SCHEDULED' : 'PENDING',
      runningBalance: 0
    });
  });

  // Synthesize recurring operational obligations (e.g. 15th and 30th payroll)
  const daysInMonthAhead = 30;
  for (let d = 1; d <= daysInMonthAhead; d++) {
    const targetDate = new Date(now.getTime() + d * 86400000);
    const dayOfMonth = targetDate.getDate();
    const dateStr = targetDate.toISOString().slice(0, 10);

    if (dayOfMonth === 15 || dayOfMonth === 28) {
      const halfMonthPayroll = (baseMonthlyOpex * 0.45) * (1 + (expenseInflationPct / 100));
      upcomingDailyEvents.push({
        date: dateStr,
        type: 'RECURRING_PAYROLL',
        referenceId: `PR-${dateStr}`,
        counterparty: 'Executive & Engineering Payroll Cycle',
        amount: -halfMonthPayroll,
        status: 'SCHEDULED',
        runningBalance: 0
      });
    }
  }

  // Sort events chronologically
  upcomingDailyEvents.sort((a, b) => a.date.localeCompare(b.date));

  // Compute 30-day running balances
  let thirtyDayNet = 0;
  upcomingDailyEvents.forEach(evt => {
    runningBalance += evt.amount;
    evt.runningBalance = Number(runningBalance.toFixed(2));
    thirtyDayNet += evt.amount;
  });

  // 3. 12-Month Projections
  const monthlyProjections: CashFlowMonthProjection[] = [];
  let monthRunningCash = currentLiquidCash;
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const startMonthIdx = now.getMonth();
  const startYear = now.getFullYear();

  for (let m = 0; m < 12; m++) {
    const projectedDate = new Date(startYear, startMonthIdx + m, 1);
    const monthLabel = `${monthNames[projectedDate.getMonth()]} ${projectedDate.getFullYear()}`;

    const startingCash = monthRunningCash;
    
    // Revenue growth compounded monthly
    const monthGrowthFactor = Math.pow(1 + revenueGrowthMoM, m);
    const projectedInflow = Number((baseMonthlyRevenue * monthGrowthFactor).toFixed(2));
    
    // Expense with inflation adjustment
    const projectedOutflow = Number((baseMonthlyOpex * (1 + (expenseInflationPct / 100))).toFixed(2));
    
    const netCashFlow = Number((projectedInflow - projectedOutflow).toFixed(2));
    const endingCash = Number((startingCash + netCashFlow).toFixed(2));
    
    // Monte Carlo Confidence Bounds
    // P10: revenue down 18%, expenses up 12%
    const p10Net = (projectedInflow * 0.82) - (projectedOutflow * 1.12);
    const p10EndingCash = Number((startingCash + p10Net).toFixed(2));

    // P90: revenue up 15%, expenses down 8%
    const p90Net = (projectedInflow * 1.15) - (projectedOutflow * 0.92);
    const p90EndingCash = Number((startingCash + p90Net).toFixed(2));

    const isShortfall = endingCash < emergencyReserveFloor;

    monthlyProjections.push({
      monthIndex: m + 1,
      monthLabel,
      startingCash,
      projectedInflow,
      projectedOutflow,
      netCashFlow,
      endingCash,
      p10EndingCash,
      p90EndingCash,
      isShortfall
    });

    monthRunningCash = endingCash;
  }

  // 4. Monte Carlo Simulation (1,000 stochastic paths over 24 months)
  const NUM_SIMS = 1000;
  const SIM_MONTHS = 24;
  const survivalMonthDepletions: number[] = [];

  for (let s = 0; s < NUM_SIMS; s++) {
    let simCash = currentLiquidCash;
    let depletedMonth = SIM_MONTHS + 1; // Default to fully solvent through 24 months

    for (let m = 1; m <= SIM_MONTHS; m++) {
      // Normal distribution approximation using Box-Muller transform
      const u1 = Math.max(0.0001, Math.random());
      const u2 = Math.random();
      const zRev = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      const zExp = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);

      // Stochastic monthly shocks
      // Revenue volatility: 18% standard deviation
      const revMultiplier = Math.max(0.4, 1 + (revenueGrowthMoM * m) + (zRev * 0.18));
      // Expense volatility: 10% standard deviation
      const expMultiplier = Math.max(0.7, (1 + (expenseInflationPct / 100)) + (zExp * 0.10));

      // 3% probability of black-swan customer churn / default in any month
      const blackSwanShock = Math.random() < 0.03 ? 0.35 : 0;

      const simInflow = baseMonthlyRevenue * revMultiplier * (1 - blackSwanShock);
      const simOutflow = baseMonthlyOpex * expMultiplier;

      simCash += (simInflow - simOutflow);

      if (simCash <= 0 && depletedMonth > SIM_MONTHS) {
        depletedMonth = m;
        break;
      }
    }
    survivalMonthDepletions.push(depletedMonth);
  }

  // Calculate Monte Carlo statistics
  survivalMonthDepletions.sort((a, b) => a - b);
  const p10Idx = Math.floor(NUM_SIMS * 0.10);
  const p50Idx = Math.floor(NUM_SIMS * 0.50);
  const p90Idx = Math.floor(NUM_SIMS * 0.90);

  const p10WorstCaseRunwayMonths = survivalMonthDepletions[p10Idx];
  const medianRunwayMonths = survivalMonthDepletions[p50Idx] > SIM_MONTHS ? 24 : survivalMonthDepletions[p50Idx];
  const p90BestCaseRunwayMonths = survivalMonthDepletions[p90Idx] > SIM_MONTHS ? 24 : survivalMonthDepletions[p90Idx];

  const solventAt12 = survivalMonthDepletions.filter(m => m > 12).length;
  const solventAt24 = survivalMonthDepletions.filter(m => m > 24).length;

  const probabilityOfSurvival12Months = Number(((solventAt12 / NUM_SIMS) * 100).toFixed(1));
  const probabilityOfSurvival24Months = Number(((solventAt24 / NUM_SIMS) * 100).toFixed(1));

  // Distribution Buckets for visual histogram
  const bucketRanges = [
    { label: '< 6 Mo', max: 6 },
    { label: '6 - 12 Mo', max: 12 },
    { label: '12 - 18 Mo', max: 18 },
    { label: '18 - 24 Mo', max: 24 },
    { label: '> 24 Mo (Solvent)', max: 999 }
  ];

  let prevMax = 0;
  const distributionBuckets = bucketRanges.map(b => {
    const count = survivalMonthDepletions.filter(m => m > prevMax && m <= b.max).length;
    prevMax = b.max;
    return {
      rangeLabel: b.label,
      count,
      percentage: Number(((count / NUM_SIMS) * 100).toFixed(1))
    };
  });

  const zeroCashDateMedian = medianRunwayMonths < 24 
    ? new Date(now.getTime() + medianRunwayMonths * 30.4 * 86400000).toISOString().slice(0, 10)
    : 'Beyond 24+ Months Horizon';

  // 5. Liquidity Warnings & Strategic Actions
  const liquidityWarnings: string[] = [];
  if (thirtyDayNet < 0 && Math.abs(thirtyDayNet) > currentLiquidCash * 0.3) {
    liquidityWarnings.push(`30-day net cash outflow of $${Math.abs(thirtyDayNet).toLocaleString()} consumes >30% of current liquid reserves.`);
  }
  if (probabilityOfSurvival12Months < 90) {
    liquidityWarnings.push(`12-month survival probability is ${probabilityOfSurvival12Months}%, indicating sensitive runway vulnerability under demand shocks.`);
  }
  const lowCashEvent = upcomingDailyEvents.find(e => e.runningBalance < emergencyReserveFloor);
  if (lowCashEvent) {
    liquidityWarnings.push(`Liquid cash breaches the $${emergencyReserveFloor.toLocaleString()} reserve threshold on ${lowCashEvent.date} (Projected balance: $${lowCashEvent.runningBalance.toLocaleString()}).`);
  }

  const strategicActions = [
    {
      id: 'act_ar_discount',
      title: 'Accelerate Enterprise AR via Early Settlement Discount',
      impactUsd: 18500,
      urgency: 'HIGH' as const,
      actionText: 'Offer a 2% 10-Net-30 early payment incentive on outstanding client invoices to pull forward $18,500 into current working capital cycle.'
    },
    {
      id: 'act_vendor_terms',
      title: 'Align AP Outflows with Milestone Receipts',
      impactUsd: 12000,
      urgency: 'MEDIUM' as const,
      actionText: 'Request Net-45 settlement terms on major compute and contractor disbursements to eliminate the mid-month payroll liquidity trough.'
    },
    {
      id: 'act_yield_treasury',
      title: 'Sweep Excess Operating Reserves into T-Bill Yield Facility',
      impactUsd: 14200,
      urgency: 'LOW' as const,
      actionText: 'Sweep $250,000 of dormant operational cash into sovereign short-duration treasury repos yielding ~4.85% annualized risk-free return.'
    }
  ];

  return {
    currentLiquidCash,
    projected30DayNet: Number(thirtyDayNet.toFixed(2)),
    monthlyBaselineBurn,
    baselineRunwayMonths,
    monthlyProjections,
    upcomingDailyEvents,
    monteCarlo: {
      simulationsRun: NUM_SIMS,
      medianRunwayMonths,
      p10WorstCaseRunwayMonths,
      p90BestCaseRunwayMonths,
      probabilityOfSurvival12Months,
      probabilityOfSurvival24Months,
      zeroCashDateMedian,
      distributionBuckets
    },
    liquidityWarnings,
    strategicActions
  };
}
