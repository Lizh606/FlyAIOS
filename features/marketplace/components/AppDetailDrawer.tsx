
import React, { useState } from 'react';
import { Button, Tooltip, Divider, Tag, Empty } from 'antd';
import { 
  ShieldCheck, Cpu, Settings, Zap, CheckCircle2, Lock, Globe, Info, Activity,
  Layers, Boxes, Terminal, History, ChevronDown, ChevronRight, HardDrive, 
  Dna, Fingerprint, Clock, ExternalLink, GitBranch
} from 'lucide-react';
import { AppPack, ProcessingMode, VersionLog } from '../../../shared/mocks/apps';
import { useI18n } from '../../../i18n';
import { links } from '../../../shared/linkBuilders';
import FADrawer from '../../../ui/FADrawer';
import InstallWizardModal from './InstallWizardModal';
import { useNavigate } from 'react-router-dom';

interface AppDetailDrawerProps {
  app: AppPack | null;
  open: boolean;
  onClose: () => void;
}

const AppDetailDrawer: React.FC<AppDetailDrawerProps> = ({ app, open, onClose }) => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [wizardOpen, setWizardOpen] = useState(false);

  if (!app) return null;

  const isInstalled = !!app.installedVersion;
  const hasUpdate = isInstalled && app.installedVersion !== app.version;

  const getModeTranslation = (mode: ProcessingMode) => {
    switch (mode) {
      case 'edge_realtime': return t('marketplace.mode.edge');
      case 'near_real_time_cloud': return t('marketplace.mode.cloud');
      case 'offline_batch': return t('marketplace.mode.batch');
      default: return mode;
    }
  };

  return (
    <FADrawer
      open={open}
      onClose={onClose}
      width={640}
      title={null}
      styles={{ body: { padding: 0 } }}
    >
      <div className="h-full flex flex-col bg-bg-card">
        {/* 1. Header: Supply Chain & Identity */}
        <div className="p-8 bg-bg-page border-b border-border shrink-0">
          <div className="flex items-start gap-6">
            <div className={`w-20 h-20 rounded-2xl shadow-card border p-3 flex items-center justify-center shrink-0 ${isInstalled ? 'bg-success/5 border-success/10' : 'bg-bg-card border-border'}`}>
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
                <div className="flex items-center gap-1.5">
                  <Fingerprint size={12} className="opacity-60" />
                  <span className="text-fa-t5 font-fa-medium">{app.publisher}</span>
                </div>
                <div className="w-1.5 h-1.5 bg-divider rounded-full" />
                <span className={`text-fa-t7 font-fa-semibold font-mono uppercase tracking-widest px-1.5 py-0.5 rounded ${app.channel === 'Stable' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                  {app.channel}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                {hasUpdate ? (
                  <Button type="primary" size="large" className="px-10 h-11 font-fa-semibold uppercase bg-warning border-none shadow-lg hover:bg-warning-hover">
                    {t('marketplace.drawer.updateTo', { version: app.version })}
                  </Button>
                ) : isInstalled ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/20 text-success rounded-xl shadow-sm">
                    <CheckCircle2 size={16} />
                    <span className="text-fa-t6 font-fa-semibold uppercase tracking-widest pt-0.5">{t('marketplace.drawer.installed', { version: app.installedVersion })}</span>
                  </div>
                ) : (
                  <Button type="primary" size="large" className="px-10 h-11 font-fa-semibold uppercase tracking-widest shadow-lg" onClick={() => setWizardOpen(true)}>
                    {t('marketplace.drawer.install')}
                  </Button>
                )}
                <Button icon={<Settings size={18}/>} className="h-11 w-11 flex items-center justify-center border-border text-text-secondary hover:text-brand" />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Scrollable Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-12">
          
          {/* NEW: Context Trace Section (实现用例闭环) */}
          {isInstalled && (
            <section>
              <h3 className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary mb-5 flex items-center gap-2">
                <Activity size={14} /> 使用情况与证据链
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div 
                   onClick={() => navigate('/workflows')} 
                   className="p-4 bg-bg-page/40 border border-border rounded-xl hover:border-brand/40 hover:bg-bg-card transition-all cursor-pointer group shadow-sm"
                 >
                    <div className="flex items-center justify-between mb-2">
                       <div className="flex items-center gap-2 text-text-secondary">
                          <GitBranch size={16} className="group-hover:text-brand" />
                          <span className="text-fa-t5 font-fa-semibold">{t('marketplace.drawer.usedByWorkflows')}</span>
                       </div>
                       <ExternalLink size={14} className="text-text-disabled group-hover:text-brand" />
                    </div>
                    <p className="text-fa-t6 text-text-tertiary m-0 leading-relaxed">
                      {t('marketplace.drawer.usedByCount', { count: app.usedWorkflowCount })}
                    </p>
                 </div>

                 <div 
                   onClick={() => navigate(links.runs({ appId: app.id }))} 
                   className="p-4 bg-bg-page/40 border border-border rounded-xl hover:border-brand/40 hover:bg-bg-card transition-all cursor-pointer group shadow-sm"
                 >
                    <div className="flex items-center justify-between mb-2">
                       <div className="flex items-center gap-2 text-text-secondary">
                          <Activity size={16} className="group-hover:text-brand" />
                          <span className="text-fa-t5 font-fa-semibold">{t('marketplace.drawer.recentRuns')}</span>
                       </div>
                       <ExternalLink size={14} className="text-text-disabled group-hover:text-brand" />
                    </div>
                    <p className="text-fa-t6 text-text-tertiary m-0 leading-relaxed">
                      查看由此应用包产生的所有执行记录与证据链。
                    </p>
                 </div>
              </div>
            </section>
          )}

          {/* Capability Grid */}
          <section>
            <h3 className="text-fa-t4 font-fa-semibold text-text-primary mb-5 flex items-center gap-2.5 uppercase tracking-wide">
              <Zap size={18} className="text-brand" /> {t('marketplace.drawer.capabilities')}
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {app.capabilities.map(cap => (
                <div key={cap.id} className="p-4 border border-border rounded-xl bg-bg-page/40 hover:border-brand/20 transition-all shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-fa-t5 font-fa-semibold text-text-primary m-0">{cap.name}</h4>
                    <span className={`text-fa-t7 font-fa-semibold font-mono px-1.5 py-0.5 rounded border uppercase tracking-tighter ${
                      cap.mode === 'edge_realtime' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      {getModeTranslation(cap.mode)}
                    </span>
                  </div>
                  <p className="text-fa-t6 text-text-secondary leading-relaxed m-0">{cap.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Compatibility Matrix */}
          <section>
            <h3 className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary mb-5 flex items-center gap-2">
              <Cpu size={14} /> {t('marketplace.drawer.compatibility')}
            </h3>
            <div className="p-6 bg-bg-page/60 rounded-2xl border border-border shadow-inner grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                <CompatibilityItem 
                  label={t('marketplace.drawer.models')} 
                  value={app.compatibility.supportedModels.join(', ')} 
                  icon={<Layers size={14} />} 
                />
                <CompatibilityItem 
                  label={t('marketplace.drawer.nodes')} 
                  value={app.compatibility.edgeNodes.join(', ')} 
                  icon={<Boxes size={14} />} 
                />
                <CompatibilityItem 
                  label={t('marketplace.drawer.gpuRequired')} 
                  value={app.compatibility.gpuRequired ? t('marketplace.drawer.gpuTrue') : t('marketplace.drawer.gpuFalse')} 
                  icon={<HardDrive size={14} />}
                  status={app.compatibility.gpuRequired ? 'warning' : 'neutral'}
                />
                <CompatibilityItem 
                  label={t('marketplace.drawer.minOS')} 
                  value={app.compatibility.minOS} 
                  icon={<Terminal size={14} />} 
                  mono
                />
            </div>
          </section>

          {/* Change Log */}
          <section>
            <h3 className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary mb-6 flex items-center gap-2">
              <History size={14} /> {t('marketplace.drawer.historyTitle')}
            </h3>
            <div className="space-y-8 pl-1">
              {app.versionHistory.map((log, idx) => (
                <div key={log.version} className="relative flex gap-6 group">
                   {idx < app.versionHistory.length - 1 && (
                     <div className="absolute left-[7.5px] top-[20px] bottom-[-32px] w-[1px] bg-divider" />
                   )}
                   <div className={`w-4 h-4 rounded-full border-2 border-bg-card shadow-sm shrink-0 z-10 mt-1.5 ${idx === 0 ? 'bg-brand ring-4 ring-brand-bg' : 'bg-text-disabled'}`} />
                   <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                         <div className="flex items-center gap-2">
                            <span className={`text-fa-t5 font-fa-semibold ${idx === 0 ? 'text-text-primary' : 'text-text-secondary'}`}>{log.version}</span>
                            <span className="text-[10px] font-fa-semibold px-1.5 py-0 bg-bg-page border border-border rounded text-text-tertiary uppercase tabular-nums tracking-tighter">{log.channel}</span>
                         </div>
                         <span className="text-fa-t7 font-fa-medium text-text-tertiary tabular-nums font-mono">{log.date}</span>
                      </div>
                      <ul className="m-0 pl-4 space-y-1.5">
                         {log.changes.map((change, cIdx) => (
                           <li key={cIdx} className="text-fa-t6 text-text-secondary leading-relaxed list-disc marker:text-text-disabled">{change}</li>
                         ))}
                      </ul>
                   </div>
                </div>
              ))}
            </div>
          </section>

          {/* Permissions/Scopes */}
          <section>
            <h3 className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary mb-5 flex items-center gap-2">
              <Lock size={14} /> {t('marketplace.drawer.scopes')}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {app.scopes.read.map(s => (
                <div key={s} className="inline-flex items-center gap-2 px-3 py-1 bg-bg-page border border-border rounded-lg shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                  <span className="text-fa-t7 font-fa-semibold font-mono text-text-secondary uppercase tracking-tight">READ:{s}</span>
                </div>
              ))}
              {app.scopes.write.map(s => (
                <div key={s} className="inline-flex items-center gap-2 px-3 py-1 bg-bg-page border border-border rounded-lg shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="text-fa-t7 font-fa-semibold font-mono text-text-secondary uppercase tracking-tight">WRITE:{s}</span>
                </div>
              ))}
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

const CompatibilityItem = ({ label, value, icon, mono, status }: any) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2 text-text-tertiary">
       <span className="opacity-50">{icon}</span>
       <span className="text-fa-t7 font-fa-semibold uppercase tracking-[0.1em]">{label}</span>
    </div>
    <div className="flex items-center gap-2">
       {status === 'warning' && <div className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse" />}
       <span className={`text-fa-t5 font-fa-semibold ${mono ? 'font-mono text-[13px] tabular-nums' : ''} ${status === 'warning' ? 'text-warning' : 'text-text-primary'}`}>
         {value}
       </span>
    </div>
  </div>
);

export default AppDetailDrawer;
