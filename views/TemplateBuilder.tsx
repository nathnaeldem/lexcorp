import React from 'react';
import { 
  FilePlus, MoreVertical, Plus, Trash2, 
  ChevronUp, ChevronDown, Settings, Copy 
} from '../components/ui/Icons';

const TemplateBuilder: React.FC = () => {
  // Mock state for the builder
  const [blocks, setBlocks] = React.useState([
    { id: 1, name: 'Header & Parties', required: true },
    { id: 2, name: 'Term & Termination', required: true },
    { id: 3, name: 'Confidentiality', required: false },
    { id: 4, name: 'Payment Terms', required: true },
    { id: 5, name: 'Indemnification', required: false },
    { id: 6, name: 'Signatures', required: true },
  ]);

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;
    
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };

  return (
    <div className="p-10 h-full overflow-y-auto text-slate-900 dark:text-slate-200">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-['Outfit']">Template Builder</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Architect standardized legal structures.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Template List */}
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/5 rounded-xl shadow-sm dark:shadow-lg p-6 h-fit">
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-slate-900 dark:text-white">Library</h2>
                <button className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white p-2 rounded-lg hover:bg-brand hover:text-white transition-colors"><Plus size={18}/></button>
            </div>
            <div className="space-y-3">
                {['Standard NDA', 'SaaS Agreement', 'Vendor Contract', 'Offer Letter'].map((t, i) => (
                    <div key={t} className={`p-4 rounded-lg border cursor-pointer transition-all flex justify-between items-center group ${i === 0 ? 'border-brand/50 bg-brand/10' : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/5 hover:border-slate-300 dark:hover:border-white/10'}`}>
                        <div className="flex items-center gap-3">
                            <FilePlus size={18} className={i === 0 ? 'text-brand' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'} />
                            <span className={`text-sm font-medium ${i === 0 ? 'text-brand' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`}>{t}</span>
                        </div>
                        {i === 0 && <span className="text-[10px] bg-brand text-white px-2 py-0.5 rounded font-bold uppercase">Active</span>}
                    </div>
                ))}
            </div>
        </div>

        {/* Visual Builder */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/5 rounded-xl p-8 relative overflow-hidden shadow-sm dark:shadow-2xl">
             {/* Background Grid Pattern */}
             <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             
             <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden border border-slate-200 dark:border-0 min-h-[600px] flex flex-col relative z-10">
                <div className="bg-slate-900 text-white p-5 flex justify-between items-center border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="font-semibold ml-2 text-sm text-slate-300">Standard NDA Template</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-1.5 hover:bg-slate-700 rounded transition-colors"><Settings size={16} className="text-slate-400"/></button>
                    </div>
                </div>
                
                <div className="p-8 flex-1 space-y-4 bg-slate-50">
                    {blocks.map((block, index) => (
                        <div key={block.id} className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm flex items-center justify-between group hover:border-brand hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5">
                            <div className="flex items-center gap-4">
                                <div className="text-slate-300 cursor-grab hover:text-slate-500">
                                    <MoreVertical size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{block.name}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${block.required ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                            {block.required ? 'Required' : 'Optional'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => moveBlock(index, 'up')} className="p-2 text-slate-400 hover:text-brand bg-slate-50 hover:bg-brand/10 rounded-md transition-colors"><ChevronUp size={16}/></button>
                                <button onClick={() => moveBlock(index, 'down')} className="p-2 text-slate-400 hover:text-brand bg-slate-50 hover:bg-brand/10 rounded-md transition-colors"><ChevronDown size={16}/></button>
                                <div className="w-px h-5 bg-slate-200 mx-1"></div>
                                <button className="p-2 text-slate-400 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-md transition-colors"><Copy size={16}/></button>
                                <button className="p-2 text-slate-400 hover:text-red-600 bg-slate-50 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16}/></button>
                            </div>
                        </div>
                    ))}

                    <button className="w-full py-4 border-2 border-dashed border-slate-300 text-slate-400 rounded-lg hover:border-brand hover:text-brand hover:bg-brand/5 transition-all flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wide group">
                        <Plus size={16} className="group-hover:scale-110 transition-transform" /> Add Content Block
                    </button>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateBuilder;