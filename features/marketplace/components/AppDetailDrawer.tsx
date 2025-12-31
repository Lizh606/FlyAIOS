
import React, { useState } from 'react';
import { Button, Tooltip, Tag } from 'antd';
import { 
  ShieldCheck, Cpu, Settings, History, 
  ArrowRight, Zap, CheckCircle2, Lock, Activity, GitBranch,
  ArrowRightCircle, Info
} from 'lucide-react';
import { AppPack, ProcessingMode } from '../../../shared/mocks/apps';
import { links } from '../../../shared/linkBuilders';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../../i18n';
import FADrawer from '../../../ui/FADrawer';
import InstallWizardModal from './InstallWizardModal';

interface AppDetailDrawerProps {
  app: AppPack | null;
  open: boolean;
  onClose: () => void;
}

const ProcessingModeLabel: React.FC<{ mode: ProcessingMode }> = ({ mode }) => {
  const { t } = useI18n();
  const styles = {
    edge_realtime: "bg-blue-50 text-blue-600 border-blue-100",
    near_real_time_cloud: "bg-teal-50 text-teal-600 border-teal-100",
    offline_batch: "bg-gray-100 text-gray-500 border-gray-200"
  };
  
  const labels = {
    edge_realtime: t('marketplace.mode.edge'),
    near_real_time_cloud: t('marketplace.mode.cloud'),
    offline_batch: t('marketplace.mode.batch')
  };

  return (
    <span className={`fa-t7-mono px-1.5 py-0.5 rounded border uppercase text-[10px] font-bold ${styles[mode]}`}>
      {labels[mode]}
    </span>
  );
};

const AppDetailDrawer: React.FC<AppDetailDrawerProps> = ({ app, open, onClose }) => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [wizardOpen, setWizardOpen] = useState(false);

  if (!app) return null;

  return (
    <FADrawer
      open={open}
      onClose={onClose}
      width={560}
    >
      <div className="h-full flex flex-col bg-white">
        {/* Header Section */}
        <div className="p-8 bg-gray-50 border-b border-gray-100 relative shrink-0">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white shadow-sm border border-gray-100 p-3 flex items-center justify-center shrink-0">
              <img src={app.icon} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="fa-t2 text-gray-900 truncate">{app.name}</h2>
                {app.signature === 'Verified' && (
                  <Tooltip title={t('marketplace.drawer.certifiedTooltip')}>
                    <ShieldCheck size={20} className="text-green-500 shrink-0" />
                  </Tooltip>
                )}
              </div>
              <div className="flex items-center gap-3 text-gray-400 mb-6">
                <span className="fa-t5">{app.publisher}</span>
                <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                <span className="fa-t5 font-mono uppercase tracking-widest text-xs font-bold">{app.channel}</span>
              </div>
              
              <div className="flex items-center gap-3">
                {app.installedVersion ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 text-green-700 rounded-lg">
                    <CheckCircle2 size={16} />
                    <span className="fa-t5-strong uppercase tracking-widest text-[11px] font-black">已安装 {app.installedVersion}</span>
                  </div>
                ) : (
                  <Button type="primary" size="large" className="px-8 h-12 font-bold uppercase tracking-widest" onClick={() => setWizardOpen(true)}>
                    获取并安装
                  </Button>
                )}
                <Button icon={<Settings size={18}/>} className="h-12 w-12 flex items-center justify-center border-gray-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10">
          <section>
            <h3 className="fa-t4 text-gray-900 mb-4 flex items-center gap-2">
              <Zap size={18} className="text-brand" /> {t('marketplace.drawer.capabilities')}
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {app.capabilities.map(cap => (
                <div key={cap.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50/20 group hover:border-brand/30 transition-all">
                  <div className="flex justify-between items-center mb-1.5">
                    <h4 className="fa-t5-strong text-gray-800">{cap.name}</h4>
                    <ProcessingModeLabel mode={cap.mode} />
                  </div>
                  <p className="fa-t6 text-gray-400 leading-relaxed">{cap.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <div>
              <h3 className="fa-t4 text-gray-900 mb-4 flex items-center gap-2">
                <Lock size={18} className="text-gray-400" /> {t('marketplace.drawer.scopes')}
              </h3>
              <div className="space-y-4">
                 <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-2">
                      {app.scopes.read.map(s => (
                        <div key={s} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 border border-gray-200 rounded-md">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_4px_rgba(59,130,246,0.4)]" />
                          <span className="fa-t7-mono text-[10px] font-bold text-gray-600 uppercase">READ:{s}</span>
                        </div>
                      ))}
                      {app.scopes.write.map(s => (
                        <div key={s} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 border border-gray-200 rounded-md">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_4px_rgba(16,185,129,0.4)]" />
                          <span className="fa-t7-mono text-[10px] font-bold text-gray-600 uppercase">WRITE:{s}</span>
                        </div>
                      ))}
                      {app.scopes.outbound && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 border border-orange-100 rounded-md">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_4px_rgba(245,158,11,0.4)] animate-pulse" />
                          <span className="fa-t7-mono text-[10px] font-bold text-orange-600 uppercase">OUTBOUND:Webhook</span>
                        </div>
                      )}
                    </div>
                 </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
              <h3 className="fa-t6 font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                <Cpu size={14} /> {t('marketplace.drawer.compatibility')}
              </h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                <div className="flex flex-col gap-1">
                  <span className="fa-t7-mono text-[10px] uppercase text-gray-400 font-bold tracking-widest">{t('marketplace.drawer.adapterNodes')}</span>
                  <span className="fa-t5-strong text-gray-900">{app.compatibility.edgeNodes.join(', ')}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="fa-t7-mono text-[10px] uppercase text-gray-400 font-bold tracking-widest">{t('marketplace.drawer.gpuRequired')}</span>
                  <div className={`inline-flex items-center gap-1.5 fa-t5-strong ${app.compatibility.gpuRequired ? 'text-orange-600' : 'text-gray-900'}`}>
                    {app.compatibility.gpuRequired ? (
                      <span className="bg-orange-50 px-2 py-0.5 rounded text-[11px] border border-orange-100">{t('marketplace.drawer.gpuTrue')}</span>
                    ) : t('marketplace.drawer.gpuFalse')}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="fa-t7-mono text-[10px] uppercase text-gray-400 font-bold tracking-widest">{t('marketplace.drawer.minOS')}</span>
                  <span className="fa-t5-strong text-gray-900 font-mono tracking-tighter">{app.compatibility.minOS}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <InstallWizardModal 
        app={app} 
        open={wizardOpen} 
        onClose={() => setWizardOpen(false)} 
      />
    </FADrawer>
  );
};

export default AppDetailDrawer;
