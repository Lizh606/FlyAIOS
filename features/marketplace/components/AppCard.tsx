import React from 'react';
import { ShieldCheck, Download, ArrowUpCircle, ChevronRight, Box } from 'lucide-react';
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
  
  const isUpdateable = app.installedVersion && app.installedVersion !== app.version;
  const isInstalled = !!app.installedVersion && !isUpdateable;
  const isNotInstalled = !app.installedVersion;

  const displayLimit = 3;

  const uniqueModes: ProcessingMode[] = Array.from(new Set(app.capabilities.map(c => c.mode)));
  const remainingModes = uniqueModes.length - displayLimit;
  const remainingOutputs = app.expectedOutputs.length - displayLimit;

  const cleanVersion = app.version.startsWith('v') ? app.version : `v${app.version}`;

  const getModeLabel = (mode: ProcessingMode) => {
    switch(mode) {
      case 'edge_realtime': return 'EDGE';
      case 'near_real_time_cloud': return 'CLOUD';
      case 'offline_batch': return 'BATCH';
      default: return (mode as string).toUpperCase();
    }
  };

  const renderOverflowPopover = (items: string[], title: string) => (
    <div className="w-[200px] p-2" onClick={(e) => e.stopPropagation()}>
      <div className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase tracking-[0.15em] mb-3">
        {title.toUpperCase()}
      </div>
      <div className="space-y-1.5">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
             <div className="w-1 h-1 rounded-full bg-brand/40 shrink-0" />
             <span className="text-fa-t6 font-fa-medium text-text-secondary truncate">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <FACard 
      hoverable 
      onClick={onClick}
      className="relative flex flex-col h-[280px] overflow-hidden group border-border shadow-card bg-bg-card"
      density="compact"
    >
      {/* 1. Header: Icon + Title + Publisher */}
      <div className="flex items-start gap-3 mb-3 shrink-0">
        <div className="w-11 h-11 rounded-xl bg-bg-page border border-border p-2 flex items-center justify-center shrink-0 group-hover:bg-bg-card group-hover:border-brand/20 transition-colors">
          <img src={app.icon} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex items-center gap-1.5 min-w-0 overflow-hidden mb-0.5">
            <h3 className="text-fa-t5 font-fa-semibold text-text-primary truncate group-hover:text-brand transition-colors leading-tight m-0">
              {app.name}
            </h3>
            {app.signature === 'Verified' && (
              <ShieldCheck size={14} className="text-success shrink-0" />
            )}
          </div>
          <p className="text-fa-t6 font-fa-medium text-text-tertiary truncate tracking-tight m-0">
            {app.publisher}
          </p>
        </div>
      </div>

      {/* 2. Body: Description + Metadata Blocks */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* 修正点：限制单行，添加 Tooltip，保持纵向间距 */}
        <Tooltip title={app.description} mouseEnterDelay={0.5}>
          <p className="text-fa-t6 text-text-secondary truncate mb-5 h-[22px] leading-relaxed cursor-help">
            {app.description}
          </p>
        </Tooltip>

        <div className="space-y-5">
          <div className="flex flex-col gap-1.5">
             <span className="text-fa-t7 font-fa-semibold font-mono text-text-tertiary uppercase tracking-widest text-[9px]">运行模式</span>
             <div className="flex items-center gap-1.5 h-6">
                <div className="flex items-center gap-1.5 truncate">
                  {uniqueModes.slice(0, displayLimit).map((mode, idx) => (
                    <FATag key={idx}>{getModeLabel(mode)}</FATag>
                  ))}
                </div>
                {remainingModes > 0 && (
                  <Popover content={renderOverflowPopover(uniqueModes.map(getModeLabel), 'Modes')} trigger="hover" placement="top" overlayClassName="fa-popover-v2">
                    <div 
                      className="w-6 h-6 flex items-center justify-center bg-brand-bg border border-brand/20 text-brand text-fa-t7 font-fa-semibold rounded-full cursor-help shadow-sm shrink-0" 
                      onClick={(e) => e.stopPropagation()}
                    >
                      +{remainingModes}
                    </div>
                  </Popover>
                )}
             </div>
          </div>

          <div className="flex flex-col gap-1.5">
             <span className="text-fa-t7 font-fa-semibold font-mono text-text-tertiary uppercase tracking-widest text-[9px]">输出产物</span>
             <div className="flex items-center gap-1.5 h-6">
                <div className="flex items-center gap-1.5 truncate">
                  {app.expectedOutputs.slice(0, displayLimit).map((out, idx) => (
                    <FATag key={idx}>{out}</FATag>
                  ))}
                </div>
                {remainingOutputs > 0 && (
                  <Popover content={renderOverflowPopover(app.expectedOutputs, 'Outputs')} trigger="hover" placement="top" overlayClassName="fa-popover-v2">
                    <div 
                      className="w-6 h-6 flex items-center justify-center bg-bg-page border border-border text-text-tertiary text-fa-t7 font-fa-semibold rounded-full cursor-help shadow-sm shrink-0" 
                      onClick={(e) => e.stopPropagation()}
                    >
                      +{remainingOutputs}
                    </div>
                  </Popover>
                )}
             </div>
          </div>
        </div>
      </div>

      {/* 3. Footer: Version + Primary Actions */}
      <div className="mt-auto py-3 border-t border-divider flex items-center justify-between shrink-0">
        <span className="text-fa-t7 font-fa-semibold font-mono text-text-tertiary uppercase tabular-nums">
          {cleanVersion}
        </span>
        
        <div className="flex items-center gap-2">
          {isNotInstalled && (
            <Button 
              type="primary" 
              size="small" 
              icon={<Download size={12} />}
              className="text-fa-t7 font-fa-semibold uppercase tracking-widest h-7 px-3 shadow-sm flex items-center"
              onClick={(e) => { e.stopPropagation(); onClick(); }}
            >
              安装
            </Button>
          )}

          {isUpdateable && (
            <Button 
              type="primary" 
              size="small" 
              icon={<ArrowUpCircle size={12} />}
              className="text-fa-t7 font-fa-semibold uppercase tracking-widest h-7 px-3 shadow-sm flex items-center bg-warning border-none hover:opacity-90"
              onClick={(e) => { e.stopPropagation(); onClick(); }}
            >
              更新
            </Button>
          )}

          {isInstalled && (
            <Button 
              size="small"
              className="text-fa-t7 font-fa-semibold uppercase tracking-widest h-7 px-2.5 text-text-tertiary border-border hover:text-brand hover:border-brand/30 flex items-center gap-1 group/btn"
              onClick={(e) => { e.stopPropagation(); onClick(); }}
            >
              {t('common.viewDetail')}
              <ChevronRight size={12} className="transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          )}
        </div>
      </div>

      <style>{`
        .fa-popover-v2 .ant-popover-inner {
          padding: 12px;
          border-radius: 12px;
          box-shadow: var(--fa-shadow-overlay);
          border: 1px solid rgba(var(--fa-divider), var(--fa-divider-alpha));
          background: rgba(var(--fa-bg-card), 1);
        }
      `}</style>
    </FACard>
  );
};

export default AppCard;