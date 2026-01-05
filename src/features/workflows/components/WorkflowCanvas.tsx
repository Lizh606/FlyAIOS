
import React from 'react';
import { Zap, ArrowDown, ShieldAlert, Cpu, FileText, Webhook, Box, CheckCircle2, Globe, Clock } from 'lucide-react';
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

  // 分类节点以匹配 Processing Modes
  const edgeNodes = nodes.filter(n => n.mode === 'edge_realtime');
  const cloudNodes = nodes.filter(n => n.mode === 'near_real_time_cloud');
  const batchNodes = nodes.filter(n => n.mode === 'offline_batch');

  return (
    <div className="space-y-12 relative">
      {/* 触发源 */}
      <div className="flex flex-col items-center">
         <div className="w-10 h-10 rounded-full bg-brand text-text-inverse flex items-center justify-center shadow-lg relative z-10">
            <Zap size={20} fill="currentColor" />
         </div>
         <div className="mt-3 text-center">
            <span className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary">{t('workflows.studio.canvas.trigger')}</span>
            <p className="text-fa-t5 font-fa-semibold text-text-primary mt-1">EdgeAlertRaised / ExecutionStarted</p>
         </div>
         <div className="w-px h-10 bg-border mt-4" />
      </div>

      {/* Processing Modes Sections */}
      <div className="space-y-16">
        <CanvasSection 
          title="Edge Realtime" 
          icon={<Zap size={14}/>} 
          nodes={edgeNodes} 
          selectedId={selectedNodeId} 
          onSelect={onSelectNode} 
          accent="text-warning"
        />
        <CanvasSection 
          title="Near Real-time Cloud" 
          icon={<Globe size={14}/>} 
          nodes={cloudNodes} 
          selectedId={selectedNodeId} 
          onSelect={onSelectNode} 
          accent="text-live"
        />
        <CanvasSection 
          title="Offline Batch" 
          icon={<Clock size={14}/>} 
          nodes={batchNodes} 
          selectedId={selectedNodeId} 
          onSelect={onSelectNode} 
          accent="text-text-tertiary"
        />
      </div>

      {/* 终点 */}
      <div className="flex flex-col items-center mt-12">
         <div className="w-px h-10 bg-border" />
         <div className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-success/10 border border-success/20 rounded-full shadow-sm animate-in fade-in zoom-in duration-500">
            <CheckCircle2 size={16} className="text-success" />
            <span className="text-fa-t6 font-fa-semibold uppercase tracking-[0.2em] text-success leading-none">Workflow Complete</span>
         </div>
      </div>
    </div>
  );
};

const CanvasSection = ({ title, icon, nodes, selectedId, onSelect, accent }: any) => (
  <div className="relative">
    <div className="absolute -left-32 top-0 bottom-0 w-24 flex flex-col items-end pt-4 opacity-40">
       <div className={`flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest mb-2 ${accent}`}>
         {icon} {title}
       </div>
       <div className="flex-1 w-px bg-border-divider mr-4" />
    </div>

    <div className="space-y-8">
      {nodes.length > 0 ? nodes.map((node: any) => (
        <div key={node.id} className="flex flex-col items-center relative">
          <FACard 
            density="compact"
            onClick={() => onSelect(node.id)}
            className={`w-full max-w-md border-2 transition-all cursor-pointer ${
              selectedId === node.id 
                ? 'border-brand ring-4 ring-brand-bg shadow-lg' 
                : 'hover:border-border-strong border-border shadow-sm bg-bg-card'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                selectedId === node.id ? 'bg-brand/10' : 'bg-bg-page'
              }`}>
                 <NodeIcon type={node.type} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-fa-t5 font-fa-semibold text-text-primary truncate">{node.name}</span>
                  <span className="text-fa-t7 font-fa-medium uppercase tracking-tighter text-text-tertiary px-1.5 bg-bg-page rounded-md border border-border">
                    {node.mode.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(node.params).map(([key, value]) => (
                    <span key={key} className="text-fa-t7 font-fa-medium font-mono bg-bg-page text-text-secondary px-1.5 py-0.5 rounded-md border border-border shadow-sm">
                      {key}={String(value)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FACard>
          <div className="h-8 w-px bg-border mt-4 last:hidden" />
          <ArrowDown size={14} className="text-text-disabled absolute -bottom-4 last:hidden" />
        </div>
      )) : (
        <div className="max-w-md mx-auto p-4 border border-dashed border-border rounded-xl text-center opacity-30">
          <span className="text-fa-t7 font-fa-medium uppercase tracking-widest">No nodes in this mode</span>
        </div>
      )}
    </div>
  </div>
);

export default WorkflowCanvas;
