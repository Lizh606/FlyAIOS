
import React from 'react';
import { Slider, Switch, Select, Divider, Button } from 'antd';
import { WorkflowNode } from '../../../shared/mocks/workflows';
import { useI18n } from '../../../i18n/index';
import { ExternalLink, Link2 } from 'lucide-react';
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
        <h4 className="fa-t5-strong text-gray-900">{node.name}</h4>
        <span className="fa-t7-mono text-gray-400 uppercase tracking-widest text-[10px]">{node.type}</span>
      </div>

      <Divider className="my-0" />

      <div className="space-y-6">
        {node.type === 'edge_detection' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="fa-t6 font-bold uppercase tracking-widest text-gray-400">{t('workflows.node.threshold')}</label>
              <Slider 
                min={0} max={1} step={0.01} 
                defaultValue={node.params.threshold} 
                tooltip={{ open: true }}
              />
              <p className="fa-t6 text-gray-400">{t('workflows.node.thresholdDesc')}</p>
            </div>
          </div>
        )}

        {node.type === 'cloud_review' && (
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <label className="fa-t6 font-bold uppercase tracking-widest text-gray-400">{t('workflows.node.lowConfidenceOnly')}</label>
                <Switch defaultChecked={node.params.lowConfidenceOnly} />
             </div>
             <p className="fa-t6 text-gray-400 italic border-l-2 border-teal-100 pl-3">
               {t('workflows.node.lowConfidenceDesc')}
             </p>
          </div>
        )}

        {node.type === 'llm_report' && (
          <div className="space-y-4">
             <div className="space-y-2">
                <label className="fa-t6 font-bold uppercase tracking-widest text-gray-400">{t('workflows.node.reportTemplate')}</label>
                <Select 
                  defaultValue={node.params.template}
                  className="w-full"
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
                <label className="fa-t6 font-bold uppercase tracking-widest text-gray-400">{t('workflows.node.verifiedOnly')}</label>
                <Switch defaultChecked={node.params.verifiedOnly} />
             </div>
             <p className="fa-t6 text-gray-400">
               {t('workflows.node.webhookDesc')}
             </p>
             <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="fa-t7-mono text-[10px] text-gray-400 font-bold uppercase block mb-3">Target Connection</span>
                <Button 
                  block 
                  className="fa-t6 font-bold uppercase tracking-widest h-10 flex items-center justify-center gap-2"
                  icon={<ExternalLink size={14}/>}
                  onClick={() => navigate(`/integrations?type=${node.type}`)}
                >
                  {t('integrations.state.manage')}
                </Button>
             </div>
          </div>
        )}

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
           <span className="fa-t6 text-gray-400 uppercase font-bold block mb-2">{t('workflows.node.inputDeps')}</span>
           <div className="space-y-1.5">
              <div className="fa-t7-mono text-[10px] text-gray-500">appVersion: v1.3.0</div>
              <div className="fa-t7-mono text-[10px] text-gray-500">inputModality: image/jpeg</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NodeInspector;
