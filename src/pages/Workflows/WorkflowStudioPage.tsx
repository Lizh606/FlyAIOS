import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CloudUpload, Settings2, Save, Monitor, 
  Activity, Info
} from 'lucide-react';
import { Button, Tag, Tooltip, message, Divider } from 'antd';
import { useI18n } from '../../i18n';
import { MOCK_WORKFLOWS } from '../../shared/mocks/workflows';
import WorkflowCanvas from '../../features/workflows/components/WorkflowCanvas';
import NodeInspector from '../../features/workflows/components/NodeInspector';
import WhereUsedDrawer from '../../features/workflows/components/WhereUsedDrawer';
import ObservePanel from '../../features/workflows/components/ObservePanel';

const WorkflowStudioPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useI18n();

  const workflow = useMemo(() => 
    MOCK_WORKFLOWS.find(w => w.id === id) || MOCK_WORKFLOWS[0]
  , [id]);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(workflow.nodes[0].id);
  const [showWhereUsed, setShowWhereUsed] = useState(false);
  const [showObserve, setShowObserve] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      message.success('Workflow version published successfully');
    }, 1500);
  };

  const selectedNode = workflow.nodes.find(n => n.id === selectedNodeId) || null;

  return (
    <div className="h-screen w-screen flex flex-col bg-bg-page overflow-hidden text-text-primary">
      {/* 1. Studio Header: v0.8 3.1 Topbar (Shell Dark rgb 31,31,31) */}
      <header className="h-header bg-bg-topbar flex items-center justify-between px-6 shrink-0 z-[60] shadow-lg border-b border-white/5">
        <div className="flex items-center gap-6 min-w-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/workflows')} 
              className="p-2 text-text-inverse/40 hover:text-text-inverse rounded-lg hover:bg-white/5 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-fa-t4 font-fa-semibold text-text-inverse truncate">{workflow.name}</span>
                <span className="text-fa-t7 font-fa-medium bg-brand text-text-inverse px-1.5 py-0.5 rounded-md uppercase leading-none">{workflow.version}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(var(--fa-success),0.5)]" />
                 <span className="text-fa-t7 font-fa-semibold text-text-inverse/40 uppercase tracking-widest">{t('workflows.studio.policyActive')}</span>
              </div>
            </div>
          </div>

          <div className="h-6 w-px bg-white/10" />

          {/* Nav Links: Shell Interaction */}
          <div className="hidden md:flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/5">
             <HeaderAction icon={<Settings2 size={15}/>} label={t('workflows.studio.whereUsed')} onClick={() => setShowWhereUsed(true)} />
             <HeaderAction icon={<Monitor size={15}/>} label={t('workflows.studio.observe')} onClick={() => setShowObserve(true)} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            icon={<Settings2 size={16}/>} 
            className="bg-white/5 border-white/10 text-text-inverse/80 hover:bg-white/10 h-9 px-4 text-fa-t6 font-fa-semibold uppercase tracking-widest"
          >
            {t('workflows.studio.deploy')}
          </Button>
          <Button 
            type="primary" 
            icon={<Save size={16}/>} 
            loading={isPublishing}
            onClick={handlePublish}
            className="h-9 px-6 font-fa-semibold uppercase tracking-widest shadow-lg"
          >
            {t('workflows.studio.publish')}
          </Button>
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center ml-2 border border-white/5 cursor-pointer">
             <Activity size={16} className="text-text-inverse/40" />
          </div>
        </div>
      </header>

      {/* 2. Canvas Area: Canvas Priority (v0.8 1.5) */}
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 relative bg-bg-page overflow-auto custom-scrollbar">
           {/* Dot Grid Layer */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(var(--fa-text-primary),1) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
           
           <div className="min-h-full p-24 flex justify-center">
              <div className="w-full max-w-2xl">
                 <WorkflowCanvas 
                    nodes={workflow.nodes} 
                    selectedNodeId={selectedNodeId} 
                    onSelectNode={setSelectedNodeId} 
                 />
              </div>
           </div>

           <div className="absolute bottom-6 left-6 px-3 py-1.5 bg-bg-card/80 backdrop-blur rounded-lg border border-border text-fa-t7 font-fa-medium text-text-tertiary uppercase shadow-sm">
             Draft Autosaved: 14:22:10
           </div>
        </main>

        {/* 3. Right Inspector (v0.8 2.3.3 Right Drawer Baseline) */}
        <aside className="w-[400px] bg-bg-card border-l border-border flex flex-col shrink-0 z-20 shadow-overlay">
           <div className="h-12 border-b border-border flex items-center justify-between px-6 shrink-0 bg-bg-page/50">
              <span className="text-fa-t6 font-fa-semibold uppercase tracking-[0.2em] text-text-tertiary">
                {t('workflows.studio.inspector')}
              </span>
              <Tooltip title="Node Configuration">
                <Info size={14} className="text-text-disabled cursor-help" />
              </Tooltip>
           </div>
           
           <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
              {selectedNode ? (
                <NodeInspector node={selectedNode} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-30 grayscale">
                   <Settings2 size={64} className="mb-6" />
                   <p className="text-fa-t5 font-fa-semibold uppercase tracking-widest">{t('workflows.inspector.empty')}</p>
                </div>
              )}
           </div>

           {selectedNode && (
             <div className="p-6 border-t border-border bg-bg-card shrink-0">
                <Button block type="primary" className="h-11 text-fa-t5 font-fa-semibold uppercase tracking-widest shadow-lg">
                  {t('common.save')}
                </Button>
             </div>
           )}
        </aside>
      </div>

      <WhereUsedDrawer 
        workflow={workflow} 
        open={showWhereUsed} 
        onClose={() => setShowWhereUsed(false)} 
      />
      <ObservePanel 
        workflowId={workflow.id} 
        open={showObserve} 
        onClose={() => setShowObserve(false)} 
      />
    </div>
  );
};

const HeaderAction = ({ icon, label, onClick }: any) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-1.5 text-text-inverse/50 hover:text-text-inverse rounded-lg hover:bg-white/5 transition-all"
  >
    {icon}
    <span className="text-fa-t7 font-fa-semibold uppercase tracking-wider leading-none">{label}</span>
  </button>
);

export default WorkflowStudioPage;