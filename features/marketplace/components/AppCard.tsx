
import React from 'react';
import { ShieldCheck, Download, ArrowUpCircle, ChevronRight } from 'lucide-react';
import { AppPack, ProcessingMode } from '../../../shared/mocks/apps';
import { useI18n } from '../../../i18n';
import FACard from '../../../ui/FACard';
import FATag from '../../../ui/FATag';
import { Popover, Tooltip, Button } from 'antd';

interface AppCardProps {
  app: AppPack;
  onClick: () => void;
}

const AppCard: React.FC<AppCardProps> = ({ app, onClick }) => {
  const { t } = useI18n();
  
  // 状态判定逻辑
  const hasUpdate = app.installedVersion && app.installedVersion !== app.version;
  const isInstalled = !!app.installedVersion && !hasUpdate;
  const isNotInstalled = !app.installedVersion;

  const displayLimit = 3;
  const uniqueModes: ProcessingMode[] = Array.from(new Set(app.capabilities.map(c => c.mode)));

  const getModeLabel = (mode: ProcessingMode) => {
    switch(mode) {
      case 'edge_realtime': return 'EDGE';
      case 'near_real_time_cloud': return 'CLOUD';
      case 'offline_batch': return 'BATCH';
      default: return (mode as string).toUpperCase();
    }
  };

  return (
    <FACard 
      hoverable 
      onClick={onClick}
      className={`relative flex flex-col h-[280px] overflow-hidden group border-border shadow-card bg-bg-card transition-all ${isInstalled ? 'ring-1 ring-success/5' : ''}`}
      density="compact"
    >
      {/* 1. Header: Icon + Title */}
      <div className="flex items-start gap-3 mb-3 shrink-0">
        <div className={`w-11 h-11 rounded-xl border p-2 flex items-center justify-center shrink-0 transition-colors ${isInstalled ? 'bg-success/5 border-success/10' : 'bg-bg-page border-border'}`}>
          <img src={app.icon} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex items-center gap-1.5 min-w-0 overflow-hidden mb-0.5">
            <h3 className="text-fa-t5 font-fa-semibold text-text-primary truncate group-hover:text-brand transition-colors leading-tight m-0">
              {app.name}
            </h3>
            {app.signature === 'Verified' && <ShieldCheck size={14} className="text-success shrink-0" />}
          </div>
          <p className="text-fa-t6 font-fa-medium text-text-tertiary truncate tracking-tight m-0">{app.publisher}</p>
        </div>
      </div>

      {/* 2. Body: Metadata */}
      <div className="flex-1 flex flex-col min-h-0 space-y-3">
        <Tooltip title={app.description}>
          <p className="text-fa-t6 text-text-secondary truncate leading-relaxed m-0">
            {app.description}
          </p>
        </Tooltip>

        <div className="space-y-3">
          <div className="flex flex-col gap-1.5">
             <span className="text-fa-t7 font-fa-semibold font-mono text-text-tertiary uppercase tracking-widest text-[9px]">处理模式</span>
             <div className="flex flex-wrap gap-1.5">
                {uniqueModes.slice(0, displayLimit).map((mode, idx) => (
                  <FATag key={idx}>{getModeLabel(mode)}</FATag>
                ))}
             </div>
          </div>
          <div className="flex flex-col gap-1.5">
             <span className="text-fa-t7 font-fa-semibold font-mono text-text-tertiary uppercase tracking-widest text-[9px]">核心产物</span>
             <div className="flex flex-wrap gap-1.5">
                {app.expectedOutputs.slice(0, displayLimit).map((out, idx) => (
                  <FATag key={idx}>{out}</FATag>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* 3. Footer: Version + Context Actions */}
      <div className="mt-auto py-3 border-t border-divider flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          {isInstalled && <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />}
          <span className="text-fa-t7 font-fa-semibold font-mono text-text-tertiary uppercase tabular-nums">
            {isInstalled ? app.installedVersion : app.version}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {isNotInstalled && (
            <Button type="primary" size="small" icon={<Download size={12} />} className="text-fa-t7 font-fa-semibold uppercase h-7 px-3">
              安装
            </Button>
          )}

          {hasUpdate && (
            <Button type="primary" size="small" icon={<ArrowUpCircle size={12} />} className="text-fa-t7 font-fa-semibold uppercase h-7 px-3 bg-warning border-none hover:bg-warning-hover">
              更新
            </Button>
          )}

          {isInstalled && (
            <Button size="small" className="text-fa-t7 font-fa-semibold uppercase h-7 px-2.5 text-text-tertiary border-border hover:text-brand flex items-center gap-1 group/btn">
              详情 <ChevronRight size={12} className="transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          )}
        </div>
      </div>
    </FACard>
  );
};

export default AppCard;
