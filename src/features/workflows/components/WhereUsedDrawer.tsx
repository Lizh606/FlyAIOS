import React from 'react';
import { Button, Divider, Tag } from 'antd';
import { MapPin, Boxes, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import { useI18n } from '../../../i18n';
import { WorkflowInstance } from '../../../shared/mocks/workflows';
import FADrawer from '../../../ui/FADrawer';
import FAVersionDistribution from '../../../ui/FAVersionDistribution';
import { useNavigate } from 'react-router-dom';

interface WhereUsedDrawerProps {
  workflow: WorkflowInstance;
  open: boolean;
  onClose: () => void;
}

const WhereUsedDrawer: React.FC<WhereUsedDrawerProps> = ({ workflow, open, onClose }) => {
  const { t } = useI18n();
  const navigate = useNavigate();

  const versionData = [
    { version: 'v2.5.x', count: 720 },
    { version: 'v2.4.x', count: 110 },
    { version: 'Legacy', count: 24 }
  ];

  return (
    <FADrawer
      title={t('workflows.whereUsed.title')}
      open={open}
      onClose={onClose}
      width={480}
      footerActions={
        <Button 
          type="primary" 
          icon={<ExternalLink size={16}/>}
          onClick={() => navigate('/deployments')}
          className="h-10 px-6 font-fa-semibold uppercase tracking-widest shadow-lg"
        >
          {t('workflows.whereUsed.viewDeployments')}
        </Button>
      }
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-brand-bg rounded-xl border border-brand/10">
             <div className="flex items-center gap-3">
                <ShieldCheck size={24} className="text-brand" />
                <div>
                   <span className="text-fa-t6 font-fa-semibold text-text-tertiary uppercase tracking-widest">{t('workflows.whereUsed.policyApplied')}</span>
                   <p className="text-fa-t4 font-fa-semibold text-text-primary m-0">v{workflow.version} {t('workflows.whereUsed.active')}</p>
                </div>
             </div>
             <div className="text-right">
                <span className="text-fa-t7 font-fa-semibold text-brand font-mono">{t('workflows.whereUsed.latest')}</span>
             </div>
          </div>
        </section>

        <section>
          <FAVersionDistribution 
            label={t('workflows.distribution.title')}
            items={versionData}
            limit={2}
          />
        </section>

        <section className="space-y-4">
           <h4 className="text-fa-t6 font-fa-semibold text-text-tertiary uppercase tracking-widest flex items-center gap-2 m-0">
             <MapPin size={14} /> {t('workflows.whereUsed.projects')}
           </h4>
           <div className="space-y-2">
              {workflow.appliedTo.projects.map(p => (
                <div 
                  key={p} 
                  className="p-3 bg-bg-card border border-border rounded-lg flex items-center justify-between hover:border-brand/40 transition-colors cursor-pointer group shadow-sm"
                >
                   <span className="text-fa-t5 font-fa-semibold text-text-primary group-hover:text-brand transition-colors">{p}</span>
                   <ExternalLink size={14} className="text-text-disabled group-hover:text-brand transition-colors" />
                </div>
              ))}
           </div>
        </section>

        <section className="space-y-4">
           <h4 className="text-fa-t6 font-fa-semibold text-text-tertiary uppercase tracking-widest flex items-center gap-2 m-0">
             <Boxes size={14} /> {t('workflows.whereUsed.nodes')}
           </h4>
           <div className="p-5 bg-bg-page rounded-xl border border-border shadow-inner">
              <div className="flex items-baseline gap-2 mb-2">
                 <span className="text-fa-t1 font-fa-semibold text-text-primary tabular-nums leading-none">{workflow.appliedTo.nodesCount}</span>
                 <span className="text-fa-t5 text-text-tertiary font-fa-medium">Edge Nodes (Online)</span>
              </div>
              <div className="w-full bg-divider h-1 rounded-full overflow-hidden">
                 <div className="bg-brand h-full w-[85%]" />
              </div>
              <p className="text-fa-t6 text-text-tertiary mt-2 italic m-0">{t('workflows.whereUsed.syncStatus', { percent: 85 })}</p>
           </div>
        </section>

        <section className="space-y-4">
           <h4 className="text-fa-t6 font-fa-semibold text-text-tertiary uppercase tracking-widest flex items-center gap-2 m-0">
             <Zap size={14} /> {t('workflows.whereUsed.triggersEnabled')}
           </h4>
           <div className="flex flex-wrap gap-2">
              <span className="text-fa-t7 font-fa-semibold bg-bg-page border border-border text-text-secondary px-2.5 py-1 rounded-tag uppercase tracking-tight">ExecutionStarted</span>
              <span className="text-fa-t7 font-fa-semibold bg-bg-page border border-border text-text-secondary px-2.5 py-1 rounded-tag uppercase tracking-tight">EdgeAlertRaised</span>
              <span className="text-fa-t7 font-fa-semibold bg-bg-page border border-border text-text-disabled px-2.5 py-1 rounded-tag uppercase tracking-tight opacity-50">ExecutionCompleted</span>
           </div>
        </section>
      </div>
    </FADrawer>
  );
};

export default WhereUsedDrawer;