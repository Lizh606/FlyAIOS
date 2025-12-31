
import React from 'react';
import { useI18n } from '../../../i18n/index';
import { RunInstance } from '../../../shared/mocks/runs';
import FACard from '../../../ui/FACard';
import { Divider, message, Button } from 'antd';
import { ShieldCheck, Target, History, CheckCircle2, Copy, ExternalLink, Link2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RunInspector: React.FC<{ run: RunInstance }> = ({ run }) => {
  const { t } = useI18n();
  const navigate = useNavigate();

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val);
    message.success({ content: '已复制到剪贴板', key: 'copy-msg' });
  };

  return (
    <FACard title={t('runs.detail.inspector')} density="comfort" className="bg-white border-gray-100 shadow-sm sticky top-8">
      <div className="space-y-10">
        
        {/* Group 1: Policy & Versioning */}
        <section className="space-y-5">
           <div className="flex items-center gap-2 mb-1">
             <ShieldCheck size={14} className="text-gray-400" />
             <span className="fa-t6 font-bold text-gray-400 uppercase tracking-[0.15em]">策略与部署</span>
           </div>
           <MetaField label={t('runs.label.policy')} value={run.policyVersion} highlight mono onCopy={handleCopy} />
           <MetaField label={t('runs.label.appPack')} value={run.appPackVersion} onCopy={handleCopy} />
           <MetaField label={t('runs.label.model')} value={run.modelRelease} mono onCopy={handleCopy} />
        </section>

        <Divider className="my-0 opacity-10" />

        {/* Group 2: Trigger Metadata */}
        <section className="space-y-5">
           <div className="flex items-center gap-2 mb-1">
             <Target size={14} className="text-gray-300" />
             <span className="fa-t6 font-bold text-gray-400 uppercase tracking-[0.15em]">触发与幂等</span>
           </div>
           <MetaField label={t('runs.label.event')} value={run.trigger.eventId} tabular onCopy={handleCopy} />
           <MetaField label={t('runs.label.idempotency')} value={run.trigger.idempotencyKey} tabular mono onCopy={handleCopy} />
        </section>

        <Divider className="my-0 opacity-10" />

        {/* Group 3: External Receipt Link */}
        <section className="space-y-5">
           <div className="flex items-center gap-2 mb-1">
             <Link2 size={14} className="text-gray-300" />
             <span className="fa-t6 font-bold text-gray-400 uppercase tracking-[0.15em]">{t('runs.label.external')}</span>
           </div>
           {run.receipt ? (
             <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 group hover:border-brand/30 transition-all">
                <div className="flex items-center justify-between mb-3">
                   <span className="fa-t7-mono text-[9px] text-brand font-black uppercase tracking-widest">{run.receipt.system}</span>
                   <ExternalLink size={12} className="text-gray-300" />
                </div>
                <div className="fa-t5-strong text-gray-900 font-mono tracking-tighter mb-4">{run.receipt.id}</div>
                
                <Button 
                  block 
                  size="small"
                  className="fa-t6 font-bold uppercase tracking-widest h-8"
                  onClick={() => navigate(`/integrations?id=conn-sg-001`)} // In real app, map via run.receipt.connectionId
                >
                  {t('integrations.state.viewConnection')}
                </Button>
             </div>
           ) : (
             <div className="p-4 bg-gray-50/50 border border-gray-100 border-dashed rounded-xl text-center py-6">
                <span className="fa-t6 text-gray-400 italic">暂无外部系统回执</span>
             </div>
           )}
        </section>

        {/* Group 4: Audit Verification Status */}
        <section className="pt-4 border-t border-gray-50 flex items-center justify-between">
           <div className="flex items-center gap-2 text-gray-400">
              <History size={14} />
              <span className="fa-t7-mono text-[10px] font-bold uppercase tracking-widest">
                {t('runs.audit.statusLabel')}
              </span>
           </div>
           <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 text-green-600 rounded-md border border-green-100">
             <CheckCircle2 size={12} strokeWidth={3} />
             <span className="fa-t7-mono text-[9px] font-black uppercase tracking-tighter">
               {t('runs.audit.verified')}
             </span>
           </div>
        </section>
      </div>
    </FACard>
  );
};

const MetaField = ({ label, value, mono, tabular, highlight, onCopy }: any) => (
  <div className="flex flex-col gap-1.5 group/field relative">
    <span className="fa-t7-mono text-[9px] text-gray-400 font-bold uppercase tracking-widest">{label}</span>
    <div className="flex items-center justify-between gap-4 min-w-0">
       <span className={`fa-t5-strong truncate ${highlight ? 'text-brand' : 'text-gray-800'} ${mono ? 'font-mono tracking-tighter' : ''} ${tabular ? 'font-mono tabular-nums' : ''}`}>
         {value}
       </span>
       <button 
         onClick={() => onCopy(value)}
         className="p-1 hover:bg-gray-100 rounded-md text-gray-300 hover:text-brand opacity-0 group-hover/field:opacity-100 transition-all shrink-0"
       >
         <Copy size={12} />
       </button>
    </div>
  </div>
);

export default RunInspector;
