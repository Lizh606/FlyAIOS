import React from 'react';
import { Zap, ArrowDown, ShieldAlert, Cpu, FileText, Webhook, Box, CheckCircle2 } from 'lucide-react';
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
  if (type === 'edge_detection') return <ShieldAlert {...props} className="text-warning" />;
  if (type === 'cloud_review') return <Cpu {...props} className="text-live" />;
  if (type === 'llm_report') return <FileText {...props} className="text-brand" />;
  if (type === 'webhook') return <Webhook {...props} className="text-info" />;
  return <Box {...props} />;
};

const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({ nodes, selectedNodeId, onSelectNode }) => {
  const { t } = useI18n();

  return (
    <div className="space-y-0 relative">
      {/* Trigger Point */}
      <div className="flex flex-col items-center mb-8">
         <div className="w-10 h-10 rounded-full bg-brand text-text-inverse flex items-center justify-center shadow-lg relative z-10">
            <Zap size={20} fill="currentColor" />
         </div>
         <div className="mt-3 text-center">
            <span className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary">{t('workflows.studio.canvas.trigger')}</span>
            <p className="text-fa-t5 font-fa-semibold text-text-primary mt-1">{t('workflows.studio.canvas.triggerDesc')}</p>
         </div>
         <div className="w-px h-12 bg-border mt-4" />
      </div>

      <div className="space-y-12">
        {nodes.map((node, index) => (
          <div key={node.id} className="flex flex-col items-center relative">
            <FACard 
              density="compact"
              onClick={() => onSelectNode(node.id)}
              className={`w-full max-w-md border-2 transition-all cursor-pointer ${
                selectedNodeId === node.id 
                  ? 'border-brand ring-4 ring-brand-bg shadow-lg' 
                  : 'hover:border-border-strong border-border shadow-sm'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  selectedNodeId === node.id ? 'bg-brand/10' : 'bg-bg-card'
                }`}>
                   <NodeIcon type={node.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-fa-t5 font-fa-semibold text-text-primary truncate">{node.name}</span>
                    <span className="text-fa-t7 font-fa-medium uppercase tracking-tighter text-text-tertiary px-1.5 bg-bg-card rounded-md border border-border">
                      {node.mode.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(node.params).map(([key, value]) => (
                      <span key={key} className="text-fa-t7 font-fa-medium font-mono bg-bg-card text-text-secondary px-1.5 py-0.5 rounded-md border border-border shadow-sm">
                        {key}={String(value)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FACard>

            {index < nodes.length - 1 && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 h-12 flex flex-col items-center">
                <div className="w-px h-full bg-border" />
                <ArrowDown size={14} className="text-text-disabled absolute -bottom-1" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* End Point */}
      <div className="flex flex-col items-center mt-12">
         <div className="w-px h-12 bg-border" />
         <div className="mt-3 flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full">
            <CheckCircle2 size={16} className="text-success" />
            <span className="text-fa-t6 font-fa-semibold uppercase tracking-[0.15em] text-success">{t('workflows.studio.canvas.complete')}</span>
         </div>
      </div>
    </div>
  );
};

export default WorkflowCanvas;