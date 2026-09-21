export interface CashFlowMonthProjection {
  monthIndex: number;
  monthLabel: string;
  startingCash: number;
  projectedInflow: number;
  projectedOutflow: number;
  netCashFlow: number;
  endingCash: number;
  p10EndingCash: number; // 10th percentile conservative
  p90EndingCash: number; // 90th percentile optimistic
  isShortfall: boolean;
}

export interface DailyCashEvent {
  date: string;
  type: 'INVOICE_RECEIVABLE' | 'EXPENSE_PAYABLE' | 'RECURRING_PAYROLL' | 'RECURRING_OPEX';
  referenceId: string;
  counterparty: string;
  amount: number; // positive for inflow, negative for outflow
  status: 'PENDING' | 'SCHEDULED' | 'SETTLED';
  runningBalance: number;
}

export interface MonteCarloSimulationResult {
  simulationsRun: number;
  medianRunwayMonths: number;
  p10WorstCaseRunwayMonths: number;
  p90BestCaseRunwayMonths: number;
  probabilityOfSurvival12Months: number; // 0 to 100
  probabilityOfSurvival24Months: number; // 0 to 100
  zeroCashDateMedian: string;
  distributionBuckets: Array<{
    rangeLabel: string;
    count: number;
    percentage: number;
  }>;
}

export interface CashFlowForecastResponse {
  currentLiquidCash: number;
  projected30DayNet: number;
  monthlyBaselineBurn: number;
  baselineRunwayMonths: number;
  monthlyProjections: CashFlowMonthProjection[];
  upcomingDailyEvents: DailyCashEvent[];
  monteCarlo: MonteCarloSimulationResult;
  liquidityWarnings: string[];
  strategicActions: Array<{
    id: string;
    title: string;
    impactUsd: number;
    urgency: 'HIGH' | 'MEDIUM' | 'LOW';
    actionText: string;
  }>;
}

export type CashFlowScenarioMode = 
  | 'BASE_CASE'
  | 'CONSERVATIVE_STRESS'
  | 'AGGRESSIVE_GROWTH'
  | 'DELAYED_RECEIVABLES'
  | 'CUSTOM';

export interface CashFlowSimulationParams {
  collectionDelayDays: number; // default 0, up to 60 days
  expenseInflationPct: number; // -20% to +50%
  revenueGrowthMoM: number; // -10% to +30%
  capexOutflowNextQuarter: number;
  emergencyReserveFloor: number;
}
