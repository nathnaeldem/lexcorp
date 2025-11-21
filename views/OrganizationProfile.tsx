import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BillingPlan } from '../types';
import {
  Sparkles,
  Globe,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from '../components/ui/Icons';

const planOptions: {
  value: BillingPlan;
  title: string;
  subtitle: string;
  badge: string;
}[] = [
  {
    value: 'monthly',
    title: 'Monthly Pulse',
    subtitle: 'Agile billing for fast-moving teams.',
    badge: 'Most Flexible',
  },
  {
    value: '1_year',
    title: 'Annual Focus',
    subtitle: 'Predictable budgeting and roadmap input.',
    badge: 'Popular',
  },
  {
    value: '2_year',
    title: '2-Year Momentum',
    subtitle: 'Longer runway with executive workshops.',
    badge: 'Scaling',
  },
  {
    value: '5_year',
    title: 'Five-Year Alliance',
    subtitle: 'Strategic co-innovation tier.',
    badge: 'Enterprise',
  },
];

const OrganizationProfile: React.FC = () => {
  const { completeOrganizationProfile, actionLoading, user, signOut } =
    useAuth();
  const [form, setForm] = useState({
    name: '',
    hqLocation: '',
    plan: 'monthly' as BillingPlan,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    if (!form.name || !form.hqLocation) {
      setError('Please provide your organization name and headquarters.');
      return;
    }
    try {
      await completeOrganizationProfile({
        name: form.name,
        hqLocation: form.hqLocation,
        plan: form.plan,
      });
      setSuccess('Profile saved! Loading your workspace...');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to save profile yet.';
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white flex flex-col">
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-brand/20 text-brand flex items-center justify-center">
            <Sparkles size={24} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              LexCorp Control Center
            </p>
            <h1 className="text-xl font-bold">Complete your organization</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user?.email && (
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.4em] text-white/40">
                Signed in as
              </p>
              <p className="font-semibold">{user.email}</p>
            </div>
          )}
          <button
            onClick={signOut}
            className="px-4 py-2 rounded-full border border-white/20 text-sm hover:bg-white/10 transition"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-10 px-6 lg:px-16 pb-16">
        <div className="lg:w-2/5 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <p className="text-xs uppercase tracking-[0.5em] text-white/50 mb-4">
              Mission Control
            </p>
            <h2 className="text-4xl font-bold font-['Outfit'] leading-tight">
              Design your organization&apos;s agreement identity.
            </h2>
            <p className="text-white/70 mt-4 text-sm leading-relaxed">
              These details anchor every document you generate, align billing,
              and ensure risk models follow your governance profile.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                title: 'Unified AI Guardrails',
                text: 'Clause intelligence adapts to your tone and risk posture.',
              },
              {
                title: 'Enterprise Observability',
                text: 'Every signature ties back to your HQ metrics.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-white/70 mt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:flex-1">
          <form
            onSubmit={handleSubmit}
            className="bg-white text-slate-900 rounded-3xl shadow-2xl p-8 space-y-6"
          >
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-xl">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm p-4 rounded-xl">
                {success}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.4em] text-slate-500 flex items-center gap-2">
                <Globe size={14} className="text-brand" />
                Organization Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full p-4 rounded-2xl border border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                placeholder="LexCorp Holdings"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.4em] text-slate-500 flex items-center gap-2">
                <MapPin size={14} className="text-brand" />
                Headquarters Location
              </label>
              <input
                type="text"
                value={form.hqLocation}
                onChange={(e) =>
                  setForm({ ...form, hqLocation: e.target.value })
                }
                required
                className="w-full p-4 rounded-2xl border border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                placeholder="New York, USA"
              />
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-slate-500">
                Preferred Plan
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {planOptions.map((plan) => {
                  const active = form.plan === plan.value;
                  return (
                    <button
                      key={plan.value}
                      type="button"
                      onClick={() => setForm({ ...form, plan: plan.value })}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        active
                          ? 'border-brand bg-brand/5 shadow-lg'
                          : 'border-slate-200 hover:border-brand/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-base">
                            {plan.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {plan.subtitle}
                          </p>
                        </div>
                        <div className="text-xs uppercase tracking-widest text-brand font-bold">
                          {plan.badge}
                        </div>
                      </div>
                      {active && (
                        <div className="mt-3 flex items-center gap-2 text-xs text-brand font-semibold">
                          <CheckCircle2 size={14} /> Selected
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={actionLoading}
              className="w-full bg-slate-900 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-black transition disabled:opacity-50"
            >
              {actionLoading ? 'Saving Profile...' : 'Enter Dashboard'}
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfile;


