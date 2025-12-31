import React from 'react';
import { GitBranch, Zap, ArrowDown, ShieldAlert, Cpu, FileText, Webhook, Box, CheckCircle2 } from 'lucide-react';
import { WorkflowNode } from '../../../shared/mocks/workflows';
import FACard from '../../../ui/FACard';
import { useI18n } from '../../../i18n';

interface WorkflowCanvasProps {
  nodes: WorkflowNode[];
  selectedNodeId: string | null;
  onSelectNode: (id: string) => void;
}

const NodeIcon = ({ type }: { type: string }) => {
  const props = { size: 18, strokeWidth: 2.5 };
  if (type === 'edge_detection') return <ShieldAlert {...props} className="text-orange-500" />;
  if (type === 'cloud_review') return <Cpu {...props} className="text-teal-500" />;
  if (type === 'llm_report') return <FileText {...props} className="text-brand" />;
  if (type === 'webhook') return <Webhook {...props} className="text-blue-400" />;
  return <Box {...props} />;
};

const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({ nodes, selectedNodeId, onSelectNode }) => {
  const { t } = useI18n();

  return (
    <div className="space-y-0 relative">
      {/* Starting Trigger Point */}
      <div className="flex flex-col items-center mb-8">
         <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center shadow-lg relative z-10">
            <Zap size={20} fill="white" />
         </div>
         <div className="mt-3 text-center">
            <span className="fa-t6 font-bold uppercase tracking-widest text-gray-400">{t('workflows.studio.canvas.trigger')}</span>
            <p className="fa-t5-strong text-gray-900 mt-1">{t('workflows.studio.canvas.triggerDesc')}</p>
         </div>
         <div className="w-px h-12 bg-gray-200 mt-4" />
      </div>

      {/* Nodes */}
      <div className="space-y-12">
        {nodes.map((node, index) => (
          <div key={node.id} className="flex flex-col items-center relative">
            <FACard 
              density="compact"
              onClick={() => onSelectNode(node.id)}
              className={`w-full max-w-md border-2 transition-all cursor-pointer ${
                selectedNodeId === node.id 
                  ? 'border-brand ring-4 ring-brand/10 shadow-lg translate-x-1' 
                  : 'hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  selectedNodeId === node.id ? 'bg-brand/10' : 'bg-gray-50'
                }`}>
                   <NodeIcon type={node.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="fa-t5-strong text-gray-900 truncate">{node.name}</span>
                    <span className="fa-t7-mono text-[9px] uppercase tracking-tighter text-gray-400 px-1.5 bg-gray-50 rounded">
                      {node.mode.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(node.params).map(([key, value]) => (
                      <span key={key} className="fa-t7-mono text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                        {key}={String(value)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FACard>

            {index < nodes.length - 1 && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 h-12 flex flex-col items-center">
                <div className="w-px h-full bg-gray-200" />
                <ArrowDown size={14} className="text-gray-300 absolute -bottom-1" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* End Point */}
      <div className="flex flex-col items-center mt-12">
         <div className="w-px h-12 bg-gray-200" />
         <div className="mt-3 flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 rounded-full">
            <CheckCircle2 size={16} className="text-green-500" />
            <span className="fa-t6 font-bold uppercase tracking-[0.15em] text-green-700">{t('workflows.studio.canvas.complete')}</span>
         </div>
      </div>
    </div>
  );
};

export default WorkflowCanvas;
