
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
    <div className="h-screen w-screen flex flex-col bg-[var(--fa-bg-page)] overflow-hidden text-[var(--fa-text-primary)]">
      {/* 1. Studio Header: Full Width, Deep Shell (rgb 31,31,31) */}
      <header className="h-[56px] bg-[rgb(31,31,31)] border-b border-white/10 px-6 flex items-center justify-between shrink-0 z-[60] shadow-xl">
        <div className="flex items-center gap-6 min-w-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/workflows')} 
              className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="fa-t4 text-white truncate">{workflow.name}</span>
                <span className="fa-t7-mono text-[10px] bg-brand text-white px-1.5 py-0.5 rounded font-black uppercase leading-none">{workflow.version}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                 <span className="fa-t7-mono text-[9px] text-white/40 font-bold uppercase tracking-widest">{t('workflows.studio.policyActive')}</span>
              </div>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-white/10" />

          {/* Nav Links in Header */}
          <div className="hidden md:flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/5">
             <HeaderAction icon={<Settings2 size={15}/>} label={t('workflows.studio.whereUsed')} onClick={() => setShowWhereUsed(true)} />
             <HeaderAction icon={<Monitor size={15}/>} label={t('workflows.studio.observe')} onClick={() => setShowObserve(true)} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            icon={<Settings2 size={16}/>} 
            className="bg-white/5 border-white/10 text-white/80 hover:bg-white/10 h-9 px-4 fa-t6 font-bold uppercase tracking-widest"
          >
            {t('workflows.studio.deploy')}
          </Button>
          <Button 
            type="primary" 
            icon={<Save size={16}/>} 
            loading={isPublishing}
            onClick={handlePublish}
            className="h-9 px-6 font-bold uppercase tracking-widest shadow-lg shadow-brand/20"
          >
            {t('workflows.studio.publish')}
          </Button>
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center ml-2 border border-white/5 cursor-pointer">
             <Activity size={16} className="text-white/40" />
          </div>
        </div>
      </header>

      {/* 2. Main Studio Viewport: No Left Sidebar/Rail */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Center Canvas: Now fills from left edge */}
        <main className="flex-1 relative bg-[var(--fa-bg-page)] overflow-auto custom-scrollbar">
           {/* Dot Matrix Grid */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--fa-text-primary) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
           
           <div className="min-h-full p-24 flex justify-center">
              <div className="w-full max-w-2xl">
                 <WorkflowCanvas 
                    nodes={workflow.nodes} 
                    selectedNodeId={selectedNodeId} 
                    onSelectNode={setSelectedNodeId} 
                 />
              </div>
           </div>

           {/* Floating Bottom Info */}
           <div className="absolute bottom-6 left-6 px-3 py-1.5 bg-white/80 backdrop-blur rounded-lg border border-gray-100 fa-t7-mono text-[10px] text-gray-400 font-bold uppercase shadow-sm">
             Draft Autosaved: 14:22:10
           </div>
        </main>

        {/* Right Inspector: Fixed Panel */}
        <aside className="w-[400px] bg-white border-l border-gray-100 flex flex-col shrink-0 z-20 shadow-[-12px_0_32px_rgba(0,0,0,0.02)]">
           <div className="h-12 border-b border-gray-50 flex items-center justify-between px-6 shrink-0 bg-gray-50/20">
              <span className="fa-t6 font-black uppercase tracking-[0.2em] text-gray-400">
                {t('workflows.studio.inspector')}
              </span>
              <Tooltip title="Meta Info">
                <Info size={14} className="text-gray-300 cursor-help" />
              </Tooltip>
           </div>
           
           <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
              {selectedNode ? (
                <NodeInspector node={selectedNode} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 grayscale opacity-10">
                   <Settings2 size={64} className="mb-6" />
                   <p className="fa-t5 font-bold uppercase tracking-widest">{t('workflows.inspector.empty')}</p>
                </div>
              )}
           </div>

           {/* Sticky Inspector Footer */}
           {selectedNode && (
             <div className="p-6 border-t border-gray-50 bg-white shrink-0">
                <Button block type="primary" className="h-11 fa-t5-strong uppercase tracking-widest font-black shadow-lg">
                  {t('common.save')}
                </Button>
             </div>
           )}
        </aside>
      </div>

      {/* Overlays */}
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

      <style>{`
        .fa-canvas-node-active {
           border-color: var(--fa-brand-primary) !important;
           ring: 4px rgba(38, 100, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

const HeaderAction = ({ icon, label, onClick }: any) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-1.5 text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition-all"
  >
    {icon}
    <span className="fa-t7-mono font-bold uppercase tracking-wider leading-none">{label}</span>
  </button>
);

export default WorkflowStudioPage;
