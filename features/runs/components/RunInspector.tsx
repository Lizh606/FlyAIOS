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
    <FACard title={t('runs.detail.inspector')} density="comfort" className="bg-bg-card border-border shadow-card sticky top-8">
      <div className="space-y-10">
        
        {/* Group 1: Policy & Versioning */}
        <section className="space-y-5">
           <div className="flex items-center gap-2 mb-1">
             <ShieldCheck size={14} className="text-text-tertiary" />
             <span className="text-fa-t6 font-fa-semibold text-text-tertiary uppercase tracking-[0.15em]">策略与部署</span>
           </div>
           <MetaField label={t('runs.label.policy')} value={run.policyVersion} highlight mono onCopy={handleCopy} />
           <MetaField label={t('runs.label.appPack')} value={run.appPackVersion} onCopy={handleCopy} />
           <MetaField label={t('runs.label.model')} value={run.modelRelease} mono onCopy={handleCopy} />
        </section>

        <Divider className="my-0 border-border-divider opacity-40" />

        {/* Group 2: Trigger Metadata */}
        <section className="space-y-5">
           <div className="flex items-center gap-2 mb-1">
             <Target size={14} className="text-text-tertiary" />
             <span className="text-fa-t6 font-fa-semibold text-text-tertiary uppercase tracking-[0.15em]">触发与幂等</span>
           </div>
           <MetaField label={t('runs.label.event')} value={run.trigger.eventId} tabular onCopy={handleCopy} />
           <MetaField label={t('runs.label.idempotency')} value={run.trigger.idempotencyKey} tabular mono onCopy={handleCopy} />
        </section>

        <Divider className="my-0 border-border-divider opacity-40" />

        {/* Group 3: External Receipt Link */}
        <section className="space-y-5">
           <div className="flex items-center gap-2 mb-1">
             <Link2 size={14} className="text-text-tertiary" />
             <span className="text-fa-t6 font-fa-semibold text-text-tertiary uppercase tracking-[0.15em]">{t('runs.label.external')}</span>
           </div>
           {run.receipt ? (
             <div className="p-4 bg-bg-page rounded-xl border border-border group hover:border-brand/30 transition-all">
                <div className="flex items-center justify-between mb-3">
                   <span className="text-fa-t7 font-fa-semibold font-mono text-[9px] text-brand uppercase tracking-widest">{run.receipt.system}</span>
                   <ExternalLink size={12} className="text-text-tertiary" />
                </div>
                <div className="text-fa-t5 font-fa-semibold text-text-primary font-mono tracking-tighter mb-4">{run.receipt.id}</div>
                
                <Button 
                  block 
                  size="small"
                  className="text-fa-t6 font-fa-semibold uppercase tracking-widest h-8 bg-bg-card border-border"
                  onClick={() => navigate(`/integrations?id=conn-sg-001`)}
                >
                  {t('integrations.state.viewConnection')}
                </Button>
             </div>
           ) : (
             <div className="p-4 bg-bg-page border border-border border-dashed rounded-xl text-center py-6">
                <span className="text-fa-t6 text-text-tertiary italic">暂无外部系统回执</span>
             </div>
           )}
        </section>

        {/* Group 4: Audit Verification Status */}
        <section className="pt-4 border-t border-border flex items-center justify-between">
           <div className="flex items-center gap-2 text-text-tertiary">
              <History size={14} />
              <span className="text-fa-t7 font-fa-semibold font-mono text-[10px] uppercase tracking-widest">
                {t('runs.audit.statusLabel')}
              </span>
           </div>
           <div className="flex items-center gap-1.5 px-2 py-0.5 bg-success/10 text-success rounded-md border border-success/20">
             <CheckCircle2 size={12} strokeWidth={3} />
             <span className="text-fa-t7 font-fa-semibold font-mono text-[9px] uppercase tracking-tighter">
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
    <span className="text-fa-t7 font-fa-semibold font-mono text-[9px] text-text-tertiary uppercase tracking-widest leading-none">{label}</span>
    <div className="flex items-center justify-between gap-4 min-w-0">
       <span className={`text-fa-t5 font-fa-medium truncate ${highlight ? 'text-brand' : 'text-text-primary'} ${mono ? 'font-mono tracking-tighter' : ''} ${tabular ? 'font-mono tabular-nums' : ''}`}>
         {value}
       </span>
       <button 
         onClick={() => onCopy(value)}
         className="p-1 hover:bg-bg-page rounded-md text-text-tertiary hover:text-brand opacity-0 group-hover/field:opacity-100 transition-all shrink-0 border-none bg-transparent cursor-pointer"
       >
         <Copy size={12} />
       </button>
    </div>
  </div>
);

export default RunInspector;