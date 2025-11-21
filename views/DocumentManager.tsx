import React, { useState } from 'react';
import { Agreement, AgreementStatus, RiskLevel } from '../types';
import { 
  Search, Filter, MoreVertical, FileText, 
  Calendar, AlertTriangle, CheckCircle2, ArrowLeft, ArrowRight, Folder
} from '../components/ui/Icons';

interface ManagerProps {
  agreements: Agreement[];
  onOpenAgreement: (agreement: Agreement) => void;
}

const DocumentManager: React.FC<ManagerProps> = ({ agreements, onOpenAgreement }) => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredAgreements = agreements.filter(a => {
      const matchesStatus = filter === 'All' || a.status === filter;
      const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.counterparty.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
  });

  const getStatusStyles = (status: AgreementStatus) => {
    switch (status) {
      case AgreementStatus.APPROVED: return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.15)]';
      case AgreementStatus.ACTIVE: return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.15)]';
      case AgreementStatus.REVIEW: return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.15)]';
      case AgreementStatus.DRAFT: return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
      default: return 'bg-slate-500/10 text-slate-400';
    }
  };

  return (
    <div className="p-10 h-full flex flex-col">
      <div className="flex justify-between items-end mb-10">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-['Outfit']">Document Manager</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Centralized repository for organizational agreements.</p>
        </div>
        <div className="flex gap-4">
            <button className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-white/5 transition-all flex items-center gap-2">
                <Folder size={16} className="text-brand" /> Collections
            </button>
            <button className="bg-brand hover:bg-brand/90 text-white px-6 py-2.5 rounded-lg shadow-lg shadow-brand/20 text-sm font-bold transition-all transform hover:-translate-y-0.5">
                Export Report
            </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel p-1.5 rounded-xl mb-8 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2 flex-1 p-1">
            <div className="relative flex-1 max-w-md group">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" size={18} />
                <input 
                    type="text" 
                    placeholder="Search by title, counterparty, or owner..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-[#0f172a]/50 border border-transparent rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-500 focus:bg-white dark:focus:bg-[#0f172a] focus:border-brand/50 focus:ring-0 outline-none transition-all"
                />
            </div>
            <div className="h-6 w-px bg-slate-300 dark:bg-white/10 mx-4"></div>
            <div className="flex gap-1">
                {['All', AgreementStatus.ACTIVE, AgreementStatus.REVIEW, AgreementStatus.DRAFT].map(status => (
                    <button 
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                            filter === status 
                            ? 'bg-brand text-white shadow-lg shadow-brand/20' 
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>
        </div>
        <button className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
            <Filter size={20} />
        </button>
      </div>

      {/* Table */}
      <div className="border border-slate-200 dark:border-white/5 bg-white/60 dark:bg-[#0f172a]/40 rounded-2xl shadow-sm dark:shadow-2xl flex-1 overflow-hidden flex flex-col backdrop-blur-sm">
        <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
                        <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Agreement Details</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Risk Profile</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Effective Date</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Department</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                    {filteredAgreements.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center py-20">
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                                        <Search size={24} className="text-slate-400" />
                                    </div>
                                    <p className="text-slate-500 font-medium">No agreements found matching your filters.</p>
                                </div>
                            </td>
                        </tr>
                    ) : filteredAgreements.map((agreement) => (
                        <tr 
                            key={agreement.id} 
                            onClick={() => onOpenAgreement(agreement)}
                            className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer group"
                        >
                            <td className="px-8 py-5">
                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 bg-slate-100 dark:bg-[#1e293b] text-brand rounded-lg border border-slate-200 dark:border-white/5 group-hover:border-brand/30 transition-colors">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-slate-200 text-sm mb-1 group-hover:text-brand transition-colors">{agreement.title}</p>
                                        <p className="text-xs text-slate-500">{agreement.counterparty}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-5">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getStatusStyles(agreement.status)}`}>
                                    {agreement.status}
                                </span>
                            </td>
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-2.5">
                                    {agreement.riskLevel === RiskLevel.HIGH && <AlertTriangle size={16} className="text-red-500 drop-shadow-[0_0_3px_rgba(239,68,68,0.5)]" />}
                                    {agreement.riskLevel === RiskLevel.MEDIUM && <AlertTriangle size={16} className="text-amber-500 drop-shadow-[0_0_3px_rgba(245,158,11,0.5)]" />}
                                    {agreement.riskLevel === RiskLevel.LOW && <CheckCircle2 size={16} className="text-emerald-500 drop-shadow-[0_0_3px_rgba(16,185,129,0.5)]" />}
                                    <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">{agreement.riskLevel}</span>
                                </div>
                            </td>
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                    <Calendar size={14} className="text-slate-400 dark:text-slate-600" />
                                    {new Date(agreement.effectiveDate).toLocaleDateString()}
                                </div>
                            </td>
                             <td className="px-6 py-5">
                                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded border border-slate-200 dark:border-white/5">{agreement.department}</span>
                            </td>
                            <td className="px-6 py-5 text-right">
                                <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                                    <MoreVertical size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        {/* Pagination Mock */}
        <div className="px-8 py-5 border-t border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-[#0f172a]">
            <p className="text-xs text-slate-500">Showing <span className="text-slate-900 dark:text-white font-bold">{filteredAgreements.length}</span> entries</p>
            <div className="flex gap-2">
                <button className="p-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-30"><ArrowLeft size={14} /></button>
                <button className="p-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"><ArrowRight size={14} /></button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentManager;