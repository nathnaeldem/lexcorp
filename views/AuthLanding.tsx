import React, { useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BillingPlan } from '../types';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Globe,
  MapPin,
} from '../components/ui/Icons';

const planOptions: {
  value: BillingPlan;
  title: string;
  cadence: string;
  description: string;
}[] = [
  {
    value: 'monthly',
    title: 'Monthly',
    cadence: 'Cancel anytime',
    description: 'Best for piloting the drafting studio with flexible billing.',
  },
  {
    value: '1_year',
    title: 'Annual',
    cadence: '12 months',
    description: 'Lock predictable pricing and priority support.',
  },
  {
    value: '2_year',
    title: '2 Years',
    cadence: '24 months',
    description: 'Scale programs with roadmap access and custom SLAs.',
  },
  {
    value: '5_year',
    title: '5 Years',
    cadence: '60 months',
    description: 'Enterprise alliance with co-innovation credits.',
  },
];

const featureHighlights = [
  'AI-native clause drafting with live risk radar',
  'Template orchestration across business units',
  'Executive-grade analytics and renewal heatmaps',
];

const AuthLanding: React.FC = () => {
  const { signIn, signUp, actionLoading } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    organizationName: '',
    hqLocation: '',
    plan: 'monthly' as BillingPlan,
  });
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const heroStats = useMemo(
    () => [
      { label: 'Agreements automated', value: '12,485' },
      { label: 'Avg. cycle time', value: '9.2 days' },
      { label: 'Renewal accuracy', value: '99.2%' },
    ],
    []
  );

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setFeedback(null);
    setError(null);
    try {
      await signIn(signInForm);
      setFeedback('Welcome back! Redirecting to your workspace.');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to sign in right now.';
      setError(message);
    }
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setFeedback(null);
    setError(null);

    if (!signUpForm.organizationName || !signUpForm.hqLocation) {
      setError('Please complete your organization profile details.');
      return;
    }

    try {
      const result = await signUp({
        email: signUpForm.email,
        password: signUpForm.password,
        organization: {
          name: signUpForm.organizationName,
          hqLocation: signUpForm.hqLocation,
          plan: signUpForm.plan,
        },
      });

      if (result.requiresConfirmation) {
        setFeedback(
          'Check your inbox to confirm your email. Once verified we will finish preparing your workspace.'
        );
      } else {
        setFeedback('Organization created! Launching your workspace...');
      }
      setMode('signin');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to sign up right now.';
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute w-[55vw] h-[55vw] bg-brand/20 blur-[150px] -top-32 -left-24 rounded-full mix-blend-screen opacity-60"></div>
        <div className="absolute w-[50vw] h-[50vw] bg-indigo-500/20 blur-[160px] bottom-0 right-[-10%] rounded-full mix-blend-screen opacity-60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0),_rgba(2,6,23,1))]"></div>
      </div>
      <div className="relative z-10 grid lg:grid-cols-5 min-h-screen">
        <section className="lg:col-span-3 p-10 lg:p-16 flex flex-col">
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.4em] text-white/60 mb-10">
            <div className="w-8 h-px bg-white/30"></div>
            LexCorp Agreement Intelligence
          </div>
          <div className="max-w-2xl space-y-8 flex-1">
            <h1 className="text-4xl lg:text-6xl font-black leading-tight font-['Outfit']">
              Accelerate agreements with AI-native legal operations.
            </h1>
            <p className="text-lg text-white/70">
              Draft, negotiate, and analyze every contract in a single command
              center. Purpose-built for modern legal and revenue teams, powered
              by live AI guardrails.
            </p>
            <div className="space-y-4">
              {featureHighlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-white/80 text-sm"
                >
                  <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-emerald-300" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-16">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <p className="text-sm text-white/50 uppercase tracking-[0.4em]">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold mt-3">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-2 bg-white/95 text-slate-900 px-8 py-12 lg:px-12 flex items-center">
          <div className="w-full max-w-lg mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                  Access Portal
                </p>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">
                  Enter your workspace
                </h2>
              </div>
              <span className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center">
                <Sparkles size={20} />
              </span>
            </div>

            <div className="p-1 rounded-2xl bg-slate-100 flex gap-2 text-sm font-semibold">
              {['signin', 'signup'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setMode(tab as 'signin' | 'signup');
                    setFeedback(null);
                    setError(null);
                  }}
                  className={`flex-1 py-2 rounded-xl transition-all ${
                    mode === tab
                      ? 'bg-white shadow text-slate-900'
                      : 'text-slate-500'
                  }`}
                >
                  {tab === 'signin' ? 'Sign In' : 'Create Organization'}
                </button>
              ))}
            </div>

            {feedback && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm p-4 rounded-xl">
                {feedback}
              </div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-xl">
                {error}
              </div>
            )}

            {mode === 'signin' ? (
              <form className="space-y-5" onSubmit={handleSignIn}>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Work Email
                  </label>
                  <input
                    type="email"
                    value={signInForm.email}
                    onChange={(e) =>
                      setSignInForm({ ...signInForm, email: e.target.value })
                    }
                    required
                    className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                    placeholder="you@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Password
                  </label>
                  <input
                    type="password"
                    value={signInForm.password}
                    onChange={(e) =>
                      setSignInForm({ ...signInForm, password: e.target.value })
                    }
                    required
                    className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-black transition disabled:opacity-50"
                >
                  {actionLoading ? 'Signing In...' : 'Launch Dashboard'}
                  <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <form className="space-y-5" onSubmit={handleSignUp}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Work Email
                    </label>
                    <input
                      type="email"
                      value={signUpForm.email}
                      onChange={(e) =>
                        setSignUpForm({ ...signUpForm, email: e.target.value })
                      }
                      required
                      className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                      placeholder="legal.ops@lexcorp.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Password
                    </label>
                    <input
                      type="password"
                      value={signUpForm.password}
                      onChange={(e) =>
                        setSignUpForm({
                          ...signUpForm,
                          password: e.target.value,
                        })
                      }
                      required
                      className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                      placeholder="Minimum 6 characters"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Globe size={14} className="text-brand" /> Organization
                    Name
                  </label>
                  <input
                    type="text"
                    value={signUpForm.organizationName}
                    onChange={(e) =>
                      setSignUpForm({
                        ...signUpForm,
                        organizationName: e.target.value,
                      })
                    }
                    required
                    className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                    placeholder="LexCorp Holdings"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={14} className="text-brand" /> HQ Location
                  </label>
                  <input
                    type="text"
                    value={signUpForm.hqLocation}
                    onChange={(e) =>
                      setSignUpForm({
                        ...signUpForm,
                        hqLocation: e.target.value,
                      })
                    }
                    required
                    className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                    placeholder="New York, USA"
                  />
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Preferred Plan
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {planOptions.map((option) => {
                      const active = signUpForm.plan === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            setSignUpForm({
                              ...signUpForm,
                              plan: option.value,
                            })
                          }
                          className={`rounded-2xl border p-4 text-left transition-all ${
                            active
                              ? 'border-brand bg-brand/5 shadow'
                              : 'border-slate-200 hover:border-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-base font-semibold">
                                {option.title}
                              </p>
                              <p className="text-xs text-slate-500">
                                {option.cadence}
                              </p>
                            </div>
                            {active && (
                              <CheckCircle2
                                size={20}
                                className="text-brand"
                              />
                            )}
                          </div>
                          <p className="text-sm text-slate-500 mt-2">
                            {option.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full bg-brand text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-brand/90 transition disabled:opacity-50"
                >
                  {actionLoading ? 'Preparing Workspace...' : 'Activate Workspace'}
                  <ArrowRight size={16} />
                </button>
              </form>
            )}

            <p className="text-xs text-slate-400 text-center">
              By continuing you agree to LexCorp&apos;s master services agreement
              and AI safety policies.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthLanding;


