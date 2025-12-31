import React from 'react';
import { Slider, Switch, Select, Divider, Button } from 'antd';
import { WorkflowNode } from '../../../shared/mocks/workflows';
import { useI18n } from '../../../i18n/index';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NodeInspectorProps {
  node: WorkflowNode;
}

const NodeInspector: React.FC<NodeInspectorProps> = ({ node }) => {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-2">
      <div className="space-y-1">
        <h4 className="text-fa-t5 font-fa-semibold text-text-primary">{node.name}</h4>
        <span className="text-fa-t7 font-fa-medium font-mono text-text-tertiary uppercase tracking-widest">{node.type}</span>
      </div>

      <Divider className="my-0 opacity-10" />

      <div className="space-y-6">
        {node.type === 'edge_detection' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary block">{t('workflows.node.threshold')}</label>
              <Slider 
                min={0} max={1} step={0.01} 
                defaultValue={node.params.threshold} 
                tooltip={{ open: true }}
              />
              <p className="text-fa-t6 text-text-secondary leading-relaxed">{t('workflows.node.thresholdDesc')}</p>
            </div>
          </div>
        )}

        {node.type === 'cloud_review' && (
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <label className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary">{t('workflows.node.lowConfidenceOnly')}</label>
                <Switch defaultChecked={node.params.lowConfidenceOnly} />
             </div>
             <p className="text-fa-t6 text-text-secondary italic border-l-2 border-live/20 pl-3">
               {t('workflows.node.lowConfidenceDesc')}
             </p>
          </div>
        )}

        {node.type === 'llm_report' && (
          <div className="space-y-4">
             <div className="space-y-2">
                <label className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary block">{t('workflows.node.reportTemplate')}</label>
                <Select 
                  defaultValue={node.params.template}
                  className="w-full h-10"
                  options={[
                    { value: 'StateGrid-v2', label: 'StateGrid Inspection v2' },
                    { value: 'Solar-Standard', label: 'Standard Solar Report' },
                    { value: 'Generic-v1', label: 'Generic Task Summary' }
                  ]}
                />
             </div>
          </div>
        )}

        {(node.type === 'webhook' || node.type === 'workorder') && (
          <div className="space-y-5">
             <div className="flex items-center justify-between">
                <label className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary">{t('workflows.node.verifiedOnly')}</label>
                <Switch defaultChecked={node.params.verifiedOnly} />
             </div>
             <p className="text-fa-t6 text-text-secondary leading-relaxed">
               {t('workflows.node.webhookDesc')}
             </p>
             <div className="p-4 bg-bg-page rounded-xl border border-border shadow-inner">
                <span className="text-fa-t7 font-fa-semibold font-mono text-text-tertiary uppercase block mb-3">Target Connection</span>
                <Button 
                  block 
                  className="text-fa-t6 font-fa-semibold uppercase tracking-widest h-10 flex items-center justify-center gap-2"
                  icon={<ExternalLink size={14}/>}
                  onClick={() => navigate(`/integrations?type=${node.type}`)}
                >
                  {t('integrations.state.manage')}
                </Button>
             </div>
          </div>
        )}

        <div className="p-4 bg-bg-page rounded-lg border border-border border-dashed">
           <span className="text-fa-t6 text-text-tertiary uppercase font-fa-semibold block mb-2">{t('workflows.node.inputDeps')}</span>
           <div className="space-y-1.5">
              <div className="text-fa-t7 font-fa-medium font-mono text-text-secondary">appVersion: v1.3.0</div>
              <div className="text-fa-t7 font-fa-medium font-mono text-text-secondary">inputModality: image/jpeg</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NodeInspector;