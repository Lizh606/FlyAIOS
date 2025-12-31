
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

  // Mock data for version distribution based on the image
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
          className="font-bold"
        >
          {t('workflows.whereUsed.viewDeployments')}
        </Button>
      }
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50/30 rounded-xl border border-blue-100">
             <div className="flex items-center gap-3">
                <ShieldCheck size={24} className="text-brand" />
                <div>
                   <span className="fa-t6 text-gray-400 uppercase tracking-widest font-bold">{t('workflows.whereUsed.policyApplied')}</span>
                   <p className="fa-t4 text-gray-900">v{workflow.version} {t('workflows.whereUsed.active')}</p>
                </div>
             </div>
             <div className="text-right">
                <span className="fa-t7-mono text-brand font-bold">{t('workflows.whereUsed.latest')}</span>
             </div>
          </div>
        </section>

        {/* New Version Distribution Section */}
        <section>
          <FAVersionDistribution 
            label={t('workflows.distribution.title')}
            items={versionData}
            limit={2}
          />
        </section>

        <section className="space-y-4">
           <h4 className="fa-t6 font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
             <MapPin size={14} /> {t('workflows.whereUsed.projects')}
           </h4>
           <div className="space-y-2">
              {workflow.appliedTo.projects.map(p => (
                <div key={p} className="p-3 bg-white border border-gray-100 rounded-lg flex items-center justify-between hover:border-brand/50 transition-colors cursor-pointer">
                   <span className="fa-t5-strong text-gray-800">{p}</span>
                   <ExternalLink size={14} className="text-gray-300" />
                </div>
              ))}
           </div>
        </section>

        <section className="space-y-4">
           <h4 className="fa-t6 font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
             <Boxes size={14} /> {t('workflows.whereUsed.nodes')}
           </h4>
           <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-baseline gap-2 mb-2">
                 <span className="fa-t1 text-gray-900">{workflow.appliedTo.nodesCount}</span>
                 <span className="fa-t5 text-gray-500">Edge Nodes (Online)</span>
              </div>
              <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                 <div className="bg-brand h-full w-[85%]" />
              </div>
              <p className="fa-t6 text-gray-400 mt-2 italic">{t('workflows.whereUsed.syncStatus', { percent: 85 })}</p>
           </div>
        </section>

        <section className="space-y-4">
           <h4 className="fa-t6 font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
             <Zap size={14} /> {t('workflows.whereUsed.triggersEnabled')}
           </h4>
           <div className="flex flex-wrap gap-2">
              <Tag className="m-0 fa-t6 uppercase px-2 font-bold">ExecutionStarted</Tag>
              <Tag className="m-0 fa-t6 uppercase px-2 font-bold">EdgeAlertRaised</Tag>
              <Tag className="m-0 fa-t6 uppercase px-2 font-bold border-gray-300 text-gray-300">ExecutionCompleted</Tag>
           </div>
        </section>
      </div>
    </FADrawer>
  );
};

export default WhereUsedDrawer;
