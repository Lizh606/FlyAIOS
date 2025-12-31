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

  // Processing Modes Logic
  const uniqueModes: ProcessingMode[] = Array.from(new Set(app.capabilities.map(c => c.mode)));
  const remainingModes = uniqueModes.length - displayLimit;

  // Outputs Logic
  const remainingOutputs = app.expectedOutputs.length - displayLimit;

  // Standardize version display
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
      <div className="fa-t7-mono text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] mb-3">
        {title.toUpperCase()}
      </div>
      <div className="space-y-1.5">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
             <div className="w-1 h-1 rounded-full bg-brand/40 shrink-0" />
             <span className="fa-t6 text-gray-700 font-medium truncate">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <FACard 
      hoverable 
      onClick={onClick}
      className="relative flex flex-col h-[260px] overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 border-gray-100"
      density="compact"
    >
      {/* 1. Header: Icon + Title + Publisher */}
      <div className="flex items-start gap-3 mb-3 shrink-0">
        <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 p-2 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:border-brand/10 transition-colors">
          <img src={app.icon} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex items-center gap-1.5 min-w-0 overflow-hidden mb-0.5">
            <Tooltip title={app.name}>
              <h3 className="fa-t5-strong text-gray-900 truncate group-hover:text-brand transition-colors">
                {app.name}
              </h3>
            </Tooltip>
            {app.signature === 'Verified' && (
              <ShieldCheck size={14} className="text-green-500 shrink-0" />
            )}
          </div>
          <p className="fa-t6 text-gray-400 truncate tracking-tight font-medium">
            {app.publisher}
          </p>
        </div>
      </div>

      {/* 2. Body Content */}
      <div className="flex-1 flex flex-col min-h-0 pb-4">
        {/* Description - Single line with tooltip */}
        <Tooltip title={app.description} mouseEnterDelay={0.5}>
          <p className="fa-t6 text-gray-500 truncate leading-relaxed mb-1 cursor-help h-[22px]">
            {app.description}
          </p>
        </Tooltip>

        {/* Info Blocks: Vertical Layout (Label on top of Value) */}
        <div className="space-y-4">
          {/* Block: Processing Modes */}
          <div className="flex flex-col gap-1.5">
             <span className="fa-t7-mono text-gray-400 font-bold text-[9px] uppercase tracking-widest">运行模式</span>
             <div className="flex items-center gap-1.5 h-6">
                <div className="flex items-center gap-1.5 truncate">
                  {uniqueModes.slice(0, displayLimit).map((mode, idx) => (
                    <FATag key={idx}>{getModeLabel(mode)}</FATag>
                  ))}
                </div>
                {remainingModes > 0 && (
                  <Popover content={renderOverflowPopover(uniqueModes.map(getModeLabel), 'Modes')} trigger="hover" placement="top" overlayClassName="fa-popover-v2">
                    <div 
                      className="w-6 h-6 flex items-center justify-center bg-gray-50 border border-gray-200 text-gray-400 fa-t7-mono text-[10px] font-bold rounded-full cursor-help hover:text-brand hover:bg-brand/5 hover:border-brand/10 transition-colors shrink-0 shadow-sm" 
                      onClick={(e) => e.stopPropagation()}
                    >
                      +{remainingModes}
                    </div>
                  </Popover>
                )}
             </div>
          </div>

          {/* Block: Expected Outputs */}
          <div className="flex flex-col gap-1.5">
             <span className="fa-t7-mono text-gray-400 font-bold text-[9px] uppercase tracking-widest">输出产物</span>
             <div className="flex items-center gap-1.5 h-6">
                <div className="flex items-center gap-1.5 truncate">
                  {app.expectedOutputs.slice(0, displayLimit).map((out, idx) => (
                    <FATag key={idx}>{out}</FATag>
                  ))}
                </div>
                {remainingOutputs > 0 && (
                  <Popover content={renderOverflowPopover(app.expectedOutputs, 'Outputs')} trigger="hover" placement="top" overlayClassName="fa-popover-v2">
                    <div 
                      className="w-6 h-6 flex items-center justify-center bg-blue-50 border border-blue-100 text-brand fa-t7-mono text-[10px] font-bold rounded-full cursor-help hover:bg-blue-100 transition-colors shrink-0 shadow-sm" 
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

      {/* 3. Footer: Adaptive height, vertically centered */}
      <div className="mt-auto py-3 border-t border-gray-100/60 flex items-center justify-between shrink-0">
        <div className="flex flex-col justify-center">
          <span className="fa-t7-mono text-[10px] text-gray-400 font-bold tracking-tight uppercase tabular-nums">
            {cleanVersion}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {isNotInstalled && (
            <Button 
              type="primary" 
              size="small" 
              icon={<Download size={12} />}
              className="fa-t7-mono h-7 px-3 font-bold uppercase tracking-widest shadow-sm rounded-lg text-[10px] flex items-center"
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
              className="fa-t7-mono h-7 px-3 font-bold uppercase tracking-widest shadow-sm rounded-lg text-[10px] flex items-center"
              onClick={(e) => { e.stopPropagation(); onClick(); }}
            >
              更新
            </Button>
          )}

          {isInstalled && (
            <Button 
              size="small"
              className="fa-t7-mono h-7 px-2.5 font-bold uppercase tracking-widest text-gray-400 border-gray-100 hover:text-brand hover:border-brand/20 bg-gray-50/30 rounded-lg flex items-center gap-1 group/btn text-[9px]"
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
          box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(0,0,0,0.05);
        }
      `}</style>
    </FACard>
  );
};

export default AppCard;