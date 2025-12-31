import React, { useState } from 'react';
import { Button, Tooltip, Divider } from 'antd';
import { 
  ShieldCheck, Cpu, Settings, Zap, CheckCircle2, Lock, Activity, Info
} from 'lucide-react';
import { AppPack, ProcessingMode } from '../../../shared/mocks/apps';
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
    edge_realtime: "bg-brand-bg text-brand border-brand/10",
    near_real_time_cloud: "bg-live/10 text-live border-live/10",
    offline_batch: "bg-bg-page text-text-tertiary border-border"
  };
  
  const labels = {
    edge_realtime: t('marketplace.mode.edge'),
    near_real_time_cloud: t('marketplace.mode.cloud'),
    offline_batch: t('marketplace.mode.batch')
  };

  return (
    <span className={`text-fa-t7 font-fa-semibold font-mono px-1.5 py-0.5 rounded border uppercase tracking-tighter ${styles[mode]}`}>
      {labels[mode]}
    </span>
  );
};

const AppDetailDrawer: React.FC<AppDetailDrawerProps> = ({ app, open, onClose }) => {
  const { t } = useI18n();
  const [wizardOpen, setWizardOpen] = useState(false);

  if (!app) return null;

  return (
    <FADrawer
      open={open}
      onClose={onClose}
      width={600}
      title={null}
      styles={{ body: { padding: 0 } }}
    >
      <div className="h-full flex flex-col bg-bg-card">
        {/* 1. Header Section */}
        <div className="p-8 bg-bg-page border-b border-border relative shrink-0">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-bg-card shadow-card border border-border p-3 flex items-center justify-center shrink-0">
              <img src={app.icon} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <h2 className="text-fa-t2 font-fa-semibold text-text-primary truncate m-0 leading-tight">{app.name}</h2>
                {app.signature === 'Verified' && (
                  <Tooltip title={t('marketplace.drawer.certifiedTooltip')}>
                    <ShieldCheck size={20} className="text-success shrink-0" />
                  </Tooltip>
                )}
              </div>
              <div className="flex items-center gap-3 text-text-tertiary mb-6">
                <span className="text-fa-t5 font-fa-medium">{app.publisher}</span>
                <div className="w-1 h-1 bg-divider rounded-full" />
                <span className="text-fa-t6 font-fa-semibold font-mono uppercase tracking-widest">{app.channel}</span>
              </div>
              
              <div className="flex items-center gap-3">
                {app.installedVersion ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/10 text-success rounded-xl shadow-sm">
                    <CheckCircle2 size={16} />
                    <span className="text-fa-t6 font-fa-semibold uppercase tracking-widest pt-0.5">已安装 {app.installedVersion}</span>
                  </div>
                ) : (
                  <Button type="primary" size="large" className="px-8 h-11 font-fa-semibold uppercase tracking-widest shadow-lg" onClick={() => setWizardOpen(true)}>
                    获取并安装
                  </Button>
                )}
                <Button icon={<Settings size={18}/>} className="h-11 w-11 flex items-center justify-center border-border text-text-secondary" />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Content Section (Scrollable) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-12">
          <section>
            <h3 className="text-fa-t4 font-fa-semibold text-text-primary mb-5 flex items-center gap-2.5">
              <Zap size={18} className="text-brand" /> {t('marketplace.drawer.capabilities')}
            </h3>
            <div className="grid grid-cols-1 gap-3.5">
              {app.capabilities.map(cap => (
                <div key={cap.id} className="p-4 border border-border rounded-xl bg-bg-page/40 group hover:border-brand/20 transition-all shadow-sm">
                  <div className="flex justify-between items-center mb-1.5">
                    <h4 className="text-fa-t5 font-fa-semibold text-text-primary m-0">{cap.name}</h4>
                    <ProcessingModeLabel mode={cap.mode} />
                  </div>
                  <p className="text-fa-t6 text-text-secondary leading-relaxed m-0">{cap.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-10">
            <div>
              <h3 className="text-fa-t4 font-fa-semibold text-text-primary mb-5 flex items-center gap-2.5">
                <Lock size={18} className="text-text-tertiary" /> {t('marketplace.drawer.scopes')}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {app.scopes.read.map(s => (
                  <div key={s} className="inline-flex items-center gap-2 px-2.5 py-1 bg-bg-page border border-border rounded-lg shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand shadow-[0_0_8px_rgba(var(--fa-brand),0.4)]" />
                    <span className="text-fa-t7 font-fa-semibold font-mono text-text-secondary uppercase tracking-tight">READ:{s}</span>
                  </div>
                ))}
                {app.scopes.write.map(s => (
                  <div key={s} className="inline-flex items-center gap-2 px-2.5 py-1 bg-bg-page border border-border rounded-lg shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(var(--fa-success),0.4)]" />
                    <span className="text-fa-t7 font-fa-semibold font-mono text-text-secondary uppercase tracking-tight">WRITE:{s}</span>
                  </div>
                ))}
                {app.scopes.outbound && (
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-warning/5 border border-warning/20 rounded-lg shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse shadow-[0_0_8px_rgba(var(--fa-warning),0.4)]" />
                    <span className="text-fa-t7 font-fa-semibold font-mono text-warning uppercase tracking-tight">OUTBOUND:Webhook</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 bg-bg-page/60 rounded-2xl border border-border shadow-inner">
              <h3 className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary mb-5 flex items-center gap-2">
                <Cpu size={14} /> {t('marketplace.drawer.compatibility')}
              </h3>
              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                <div className="flex flex-col gap-1.5">
                  <span className="text-fa-t7 font-fa-semibold font-mono text-[9px] uppercase text-text-tertiary tracking-widest">{t('marketplace.drawer.adapterNodes')}</span>
                  <span className="text-fa-t5 font-fa-semibold text-text-primary">{app.compatibility.edgeNodes.join(', ')}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-fa-t7 font-fa-semibold font-mono text-[9px] uppercase text-text-tertiary tracking-widest">{t('marketplace.drawer.gpuRequired')}</span>
                  <div className={`inline-flex items-center gap-2 text-fa-t5 font-fa-semibold ${app.compatibility.gpuRequired ? 'text-warning' : 'text-text-primary'}`}>
                    {app.compatibility.gpuRequired ? (
                      <span className="bg-warning/10 px-2 py-0.5 rounded text-[11px] border border-warning/10 uppercase">REQUIRED</span>
                    ) : t('marketplace.drawer.gpuFalse')}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-fa-t7 font-fa-semibold font-mono text-[9px] uppercase text-text-tertiary tracking-widest">{t('marketplace.drawer.minOS')}</span>
                  <span className="text-fa-t5 font-fa-semibold text-text-primary font-mono tabular-nums">{app.compatibility.minOS}</span>
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