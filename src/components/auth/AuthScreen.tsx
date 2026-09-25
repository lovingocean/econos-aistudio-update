import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Building2, 
  ShieldCheck, 
  Lock, 
  Mail, 
  User as UserIcon, 
  ArrowRight, 
  Sparkles, 
  Crown, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  Briefcase,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Organization } from '../../types/econos';

interface AuthScreenProps {
  initialTab?: 'login' | 'signup';
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ initialTab = 'login' }) => {
  const { login, signup, loginAsMeek, loginAsDemo, loginWithGoogle, isLoading } = useAuth();
  const [tab, setTab] = useState<'login' | 'signup'>(initialTab);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [organizationName, setOrganizationName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [tier, setTier] = useState<Organization['tier']>('PRO');

  // UI state
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!loginEmail.trim()) {
      setError('Please enter your account email.');
      return;
    }
    setSubmitting(true);
    try {
      await login(loginEmail.trim(), loginPassword);
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim()) {
      setError('Full name and work email are required.');
      return;
    }
    if (password && password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setSubmitting(true);
    try {
      await signup({
        name: name.trim(),
        email: email.trim(),
        password,
        organizationName: organizationName.trim() || `${name.trim()}'s Holdings`,
        businessName: businessName.trim() || `${organizationName.trim() || name.trim()} Operations`,
        tier
      });
    } catch (err: any) {
      setError(err.message || 'Failed to register account. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleMeekOneClick = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await loginAsMeek();
    } catch (err: any) {
      setError(err.message || 'Could not initialize sovereign owner session.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoOneClick = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await loginAsDemo();
    } catch (err: any) {
      setError(err.message || 'Could not launch demo sandbox.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google authentication failed or was cancelled.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9f6] text-slate-900 bg-architect-grid flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-amber-500/20 selection:text-amber-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Icon & Heading */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#132338] flex items-center justify-center text-white font-black shadow-md tracking-tight text-xl">
            E
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 uppercase">ECONOS</h1>
            <p className="text-[10px] tracking-widest text-slate-500 font-mono uppercase font-bold">Sovereign Operating Core</p>
          </div>
        </div>

        <h2 className="text-center text-xl font-bold tracking-tight text-slate-800">
          {tab === 'login' ? 'Authenticate Sovereign Session' : 'Provision Sovereign Organization'}
        </h2>
        <p className="mt-1 text-center text-xs text-slate-500 font-mono">
          Multi-tenant isolation • Server-verified cryptographic access
        </p>

        {/* Tab Switcher */}
        <div className="mt-6 p-1 bg-slate-200/80 rounded-xl flex items-center gap-1 shadow-inner max-w-xs mx-auto text-xs font-mono">
          <button
            id="auth-tab-login"
            onClick={() => {
              setTab('login');
              setError(null);
            }}
            className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition-all ${
              tab === 'login'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            id="auth-tab-signup"
            onClick={() => {
              setTab('signup');
              setError(null);
            }}
            className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition-all ${
              tab === 'signup'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-2xl border border-slate-200/90 space-y-6">
          
          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div className="font-medium leading-relaxed">{error}</div>
            </div>
          )}

          {/* TAB: LOGIN */}
          {tab === 'login' && (
            <div className="space-y-6">
              {/* Sovereign Verified Fast-Track Card */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50/90 to-amber-100/40 border border-amber-300/80 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-amber-950 uppercase tracking-wide">Sovereign Owner Access</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-200/80 text-amber-900 font-bold border border-amber-300">
                    OWNER Role
                  </span>
                </div>
                <p className="text-xs text-amber-900/80 mb-3">
                  Direct production server-side verification for Meek Ifti with full admin and commercial governance privileges.
                </p>
                <button
                  id="login-meek-direct-btn"
                  onClick={handleMeekOneClick}
                  disabled={submitting || isLoading}
                  className="w-full py-2 px-4 rounded-xl bg-[#132338] hover:bg-[#1b2f48] text-white text-xs font-semibold flex items-center justify-center gap-2 transition shadow-sm disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Sign In as Meek Ifti (meekifti@gmail.com)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                </button>
              </div>

              {/* Firebase Cloud Google Sign In */}
              <div>
                <button
                  type="button"
                  id="google-signin-btn"
                  onClick={handleGoogleSignIn}
                  disabled={submitting || isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2.5 transition border border-slate-300 shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google (Firebase Cloud Auth)</span>
                </button>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                  <div className="relative flex justify-center text-[10px] uppercase font-mono"><span className="bg-white px-2 text-slate-400">or email & password</span></div>
                </div>
              </div>

              {/* Standard Email/Password Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      id="login-email-input"
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      id="login-password-input"
                      type={showLoginPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter master password"
                      className="w-full pl-9 pr-9 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showLoginPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <button
                  id="login-submit-btn"
                  type="submit"
                  disabled={submitting || isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Verifying...' : 'Sign In to Sovereign Session'}
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </form>

              {/* Demo Sandbox Isolation Launcher */}
              <div className="pt-4 border-t border-slate-100">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                      <span>Demo Sandbox (Alex Sterling)</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      Isolated tenant • Apex Dynamics Holdings
                    </div>
                  </div>
                  <button
                    id="login-demo-sandbox-btn"
                    onClick={handleDemoOneClick}
                    disabled={submitting || isLoading}
                    className="py-1.5 px-3 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold transition shrink-0 shadow-2xs"
                  >
                    Explore Demo Tenant
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SIGNUP */}
          {tab === 'signup' && (
            <div className="space-y-4">
              <div>
                <button
                  type="button"
                  id="google-signup-btn"
                  onClick={handleGoogleSignIn}
                  disabled={submitting || isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2.5 transition border border-slate-300 shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Quick Sign Up with Google (Firebase Cloud Auth)</span>
                </button>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                  <div className="relative flex justify-center text-[10px] uppercase font-mono"><span className="bg-white px-2 text-slate-400">or manual registration</span></div>
                </div>
              </div>

              <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      id="signup-name-input"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Meek Ifti"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      id="signup-email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="meekifti@gmail.com"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Master Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    id="signup-password-input"
                    type={showSignupPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a secure master password (min 6 chars)"
                    className="w-full pl-9 pr-9 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showSignupPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Organization / Holding Co.
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      id="signup-org-input"
                      type="text"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      placeholder="e.g. Econos Holdings"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Operating Business Entity
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      id="signup-business-input"
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Apex Core Systems"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Tier Selection */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Initial Plan & Entitlements
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setTier('PRO')}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      tier === 'PRO'
                        ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-500/20'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-slate-900">PRO Founder</span>
                      <span className="text-[10px] font-mono font-bold text-amber-700">$39/mo</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Full Wealth Engines, Sovereign AI Advisor, autonomous firewall & 5 agents.
                    </p>
                  </div>

                  <div
                    onClick={() => setTier('ENTERPRISE')}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      tier === 'ENTERPRISE'
                        ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-500/20'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-slate-900">ENTERPRISE</span>
                      <span className="text-[10px] font-mono font-bold text-emerald-700">Custom</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Infinite agents, dedicated infrastructure, SAML SSO, and custom governance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>You will be automatically granted the <strong>OWNER</strong> role for this organization.</span>
              </div>

              <button
                id="signup-submit-btn"
                type="submit"
                disabled={submitting || isLoading}
                className="w-full py-3 px-4 rounded-xl bg-[#132338] hover:bg-[#1b2f48] text-white text-xs font-semibold flex items-center justify-center gap-2 transition shadow-md disabled:opacity-50"
              >
                {submitting ? 'Provisioning Sovereign Environment...' : 'Initialize Organization as OWNER'}
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>
            </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
