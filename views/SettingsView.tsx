import React from 'react';
import { BrandSettings } from '../types';
import { Palette, Type, Image, Sparkles, CheckCircle2 } from '../components/ui/Icons';

interface SettingsViewProps {
  settings: BrandSettings;
  onSave: (settings: BrandSettings) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ settings, onSave }) => {
  const fonts = ['DM Sans', 'Inter', 'Outfit', 'Playfair Display', 'Roboto Mono'];
  const colors = [
    { name: 'Executive Orange', hex: '#f97316' },
    { name: 'Royal Blue', hex: '#3b82f6' },
    { name: 'Legal Crimson', hex: '#ef4444' },
    { name: 'Emerald Trust', hex: '#10b981' },
    { name: 'Violet Vision', hex: '#8b5cf6' },
  ];

  const handleChange = (field: keyof BrandSettings, value: any) => {
    onSave({ ...settings, [field]: value });
  };

  return (
    <div className="p-10 max-w-5xl mx-auto h-full overflow-y-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-['Outfit']">Brand Identity</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Configure how agreements look and feel across the organization.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visual Identity Section */}
        <div className="space-y-6">
            <div className="bg-white dark:bg-[#0f172a] p-8 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-lg">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
                    <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-500"><Palette size={20} /></div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Brand Colors</h2>
                </div>
                
                <div className="space-y-4">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Accent</label>
                    <div className="flex gap-3 flex-wrap">
                        {colors.map((c) => (
                            <button
                                key={c.hex}
                                onClick={() => handleChange('primaryColor', c.hex)}
                                className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${settings.primaryColor === c.hex ? 'border-slate-900 dark:border-white scale-110' : 'border-transparent hover:scale-105'}`}
                                style={{ backgroundColor: c.hex }}
                                title={c.name}
                            >
                                {settings.primaryColor === c.hex && <CheckCircle2 size={16} className="text-white drop-shadow-md" />}
                            </button>
                        ))}
                        <div className="relative group">
                             <input 
                                type="color" 
                                value={settings.primaryColor}
                                onChange={(e) => handleChange('primaryColor', e.target.value)}
                                className="w-10 h-10 rounded-full overflow-hidden opacity-0 absolute inset-0 cursor-pointer"
                             />
                             <div className="w-10 h-10 rounded-full border border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-400 pointer-events-none group-hover:border-brand group-hover:text-brand transition-colors">
                                 <Plus size={16} />
                             </div>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500">Selected: <span className="font-mono">{settings.primaryColor}</span></p>
                </div>
            </div>

            <div className="bg-white dark:bg-[#0f172a] p-8 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-lg">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
                    <div className="p-2 bg-purple-50 dark:bg-purple-500/10 rounded-lg text-purple-500"><Type size={20} /></div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Typography</h2>
                </div>

                <div className="space-y-4">
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Agreement Body Font</label>
                     <div className="grid grid-cols-1 gap-2">
                         {fonts.map(font => (
                             <div 
                                key={font}
                                onClick={() => handleChange('fontFamily', font)}
                                className={`p-3 border rounded-lg cursor-pointer flex justify-between items-center transition-all ${settings.fontFamily === font ? 'border-brand bg-brand/5' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}
                             >
                                 <span style={{ fontFamily: font }} className="text-lg text-slate-800 dark:text-slate-200">The quick brown fox jumps over...</span>
                                 {settings.fontFamily === font && <span className="text-xs font-bold text-brand bg-brand/10 px-2 py-1 rounded">Active</span>}
                             </div>
                         ))}
                     </div>
                </div>
            </div>
        </div>

        {/* Content & Logo Section */}
        <div className="space-y-6">
             <div className="bg-white dark:bg-[#0f172a] p-8 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-lg">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
                    <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-lg text-amber-500"><Image size={20} /></div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Company Assets</h2>
                </div>

                <div className="space-y-4">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Company Name (For Contracts)</label>
                    <input 
                        type="text" 
                        value={settings.companyName} 
                        onChange={(e) => handleChange('companyName', e.target.value)}
                        className="w-full p-3 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand/50 outline-none"
                    />

                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mt-4">Logo</label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-brand transition-colors cursor-pointer bg-slate-50 dark:bg-transparent">
                        <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-2">
                            <Image size={20} className="text-slate-500" />
                        </div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Click to upload logo</p>
                        <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG (Max 2MB)</p>
                    </div>
                </div>
             </div>

             <div className="bg-white dark:bg-[#0f172a] p-8 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-lg">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg text-emerald-500"><Sparkles size={20} /></div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">AI Writing Style</h2>
                </div>
                
                <div className="space-y-4">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Tone Instructions</label>
                    <p className="text-xs text-slate-500 mb-2">These instructions will guide the AI when drafting or rewriting clauses.</p>
                    <textarea 
                        value={settings.tone}
                        onChange={(e) => handleChange('tone', e.target.value)}
                        rows={4}
                        className="w-full p-3 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand/50 outline-none"
                        placeholder="e.g. Professional, strict, protective of the company..."
                    />
                    <div className="flex gap-2">
                        {['Strict', 'Friendly', 'Neutral', 'Aggressive'].map(t => (
                            <button 
                                key={t}
                                onClick={() => handleChange('tone', t)}
                                className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded hover:bg-brand hover:text-white transition-colors"
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

// Helper icon for the color picker
const Plus = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

export default SettingsView;