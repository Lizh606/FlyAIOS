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
  if (status === 'success') return <CheckCircle2 size={14} className="text-green-500" />;
  if (status === 'failure') return <AlertCircle size={14} className="text-red-500" />;
  return <Clock size={14} className="text-blue-500" />;
};

const ObservePanel: React.FC<ObservePanelProps> = ({ workflowId, open, onClose }) => {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <Drawer
      title={
        <div className="flex items-center gap-2">
          <Monitor size={18} className="text-brand" />
          <span className="fa-t4 text-gray-900">{t('workflows.studio.observe')}</span>
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
          className="fa-t6 font-bold p-0"
        >
          {t('workflows.observe.viewAll')}
        </Button>
      }
    >
      <div className="h-full flex flex-col">
        <h3 className="fa-t6 font-bold uppercase tracking-widest text-gray-400 mb-6">
          {t('workflows.observe.recentRuns')}
        </h3>

        {MOCK_RUNS.length > 0 ? (
          <div className="flex-1 space-y-4">
            {MOCK_RUNS.map(run => (
              <div 
                key={run.id} 
                onClick={() => navigate(`/run/${run.id}`)}
                className="group p-4 bg-white border border-gray-100 rounded-xl hover:border-brand hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <StatusIcon status={run.status} />
                    <span className="fa-t7-mono text-gray-900 font-bold uppercase tracking-tighter">#{run.id}</span>
                  </div>
                  <span className="fa-t6 text-gray-400">{run.started}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <Tag className="m-0 fa-t7-mono text-[9px] uppercase border-none bg-gray-100">{run.trigger}</Tag>
                  </div>
                  <span className="fa-t7-mono text-[10px] text-gray-400 uppercase font-medium">{run.duration}</span>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    {run.outputs.includes('img') && <ImageIcon size={12} className="text-teal-500" />}
                    {run.outputs.includes('report') && <FileText size={12} className="text-brand" />}
                    {run.outputs.includes('webhook') && <Webhook size={12} className="text-blue-400" />}
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
             <Empty description={t('workflows.observe.noRuns')} />
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
           <p className="fa-t6 text-gray-500 text-center">
             {t('workflows.observe.activeDesc')}
           </p>
        </div>
      </div>
    </Drawer>
  );
};

export default ObservePanel;
