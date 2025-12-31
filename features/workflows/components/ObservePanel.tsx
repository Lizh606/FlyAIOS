import React from 'react';
import { Drawer, Button, Tag, Empty } from 'antd';
import { 
  Monitor, ExternalLink, Play, 
  CheckCircle2, AlertCircle, Clock, 
  Image as ImageIcon, FileText, Webhook 
} from 'lucide-react';
import { useI18n } from '../../../i18n';
import { useNavigate } from 'react-router-dom';

interface ObservePanelProps {
  workflowId: string;
  open: boolean;
  onClose: () => void;
}

const MOCK_RUNS = [
  { id: 'run-101', trigger: 'EdgeAlertRaised', status: 'success', duration: '4m 2s', outputs: ['img', 'report', 'webhook'], started: '2 min ago' },
  { id: 'run-102', trigger: 'Manual', status: 'success', duration: '5m 12s', outputs: ['img', 'report'], started: '15 min ago' },
  { id: 'run-103', trigger: 'EdgeAlertRaised', status: 'failure', duration: '24s', outputs: [], started: '1 hour ago' },
];

const StatusIcon = ({ status }: { status: string }) => {
  if (status === 'success') return <CheckCircle2 size={14} className="text-success" />;
  if (status === 'failure') return <AlertCircle size={14} className="text-error" />;
  return <Clock size={14} className="text-info" />;
};

const ObservePanel: React.FC<ObservePanelProps> = ({ workflowId, open, onClose }) => {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <Drawer
      title={
        <div className="flex items-center gap-2">
          <Monitor size={18} className="text-brand" />
          <span className="text-fa-t4 font-fa-semibold text-text-primary">{t('workflows.studio.observe')}</span>
        </div>
      }
      open={open}
      onClose={onClose}
      width={400}
      extra={
        <Button 
          type="link" 
          icon={<ExternalLink size={14}/>} 
          onClick={() => navigate('/runs')}
          className="text-fa-t6 font-fa-semibold p-0 hover:text-brand"
        >
          {t('workflows.observe.viewAll')}
        </Button>
      }
      styles={{
        header: { borderBottom: '1px solid rgba(var(--fa-divider), var(--fa-divider-alpha))', padding: '16px 24px' },
        body: { padding: '24px', backgroundColor: 'rgba(var(--fa-bg-page), 1)' }
      }}
    >
      <div className="h-full flex flex-col">
        <h3 className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary mb-6 m-0">
          {t('workflows.observe.recentRuns')}
        </h3>

        {MOCK_RUNS.length > 0 ? (
          <div className="flex-1 space-y-4">
            {MOCK_RUNS.map(run => (
              <div 
                key={run.id} 
                onClick={() => navigate(`/run/${run.id}`)}
                className="group p-4 bg-bg-card border border-border rounded-xl hover:border-brand/40 hover:shadow-card transition-all cursor-pointer shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <StatusIcon status={run.status} />
                    <span className="text-fa-t7 font-fa-semibold text-text-primary uppercase tracking-tighter tabular-nums font-mono">#{run.id.toUpperCase().slice(-6)}</span>
                  </div>
                  <span className="text-fa-t6 text-text-tertiary font-fa-medium">{run.started}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-fa-t7 font-fa-semibold uppercase px-1.5 py-0.5 bg-bg-page border border-border text-text-secondary rounded text-[9px]">{run.trigger}</span>
                  </div>
                  <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase tabular-nums">{run.duration}</span>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-divider">
                  <div className="flex items-center gap-2">
                    {run.outputs.includes('img') && <ImageIcon size={12} className="text-live" />}
                    {run.outputs.includes('report') && <FileText size={12} className="text-brand" />}
                    {run.outputs.includes('webhook') && <Webhook size={12} className="text-info" />}
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={14} className="text-brand" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center opacity-40">
             <Empty description={<span className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary">{t('workflows.observe.noRuns')}</span>} />
          </div>
        )}

        <div className="mt-8 p-4 bg-bg-card rounded-xl border border-border border-dashed shadow-inner">
           <p className="text-fa-t6 text-text-secondary text-center m-0 leading-relaxed italic">
             {t('workflows.observe.activeDesc')}
           </p>
        </div>
      </div>
    </Drawer>
  );
};

export default ObservePanel;