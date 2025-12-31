import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { useI18n } from '../../../i18n/index';
import { Tooltip } from 'antd';

const AuditChainStatusBar: React.FC = () => {
  const { t } = useI18n();
  
  return (
    <div className="flex items-center justify-between px-4 h-9 bg-bg-card border border-border rounded-control mb-8 shadow-sm group transition-all hover:border-border-strong">
      <div className="flex items-center gap-3">
        {/* Status indicator: pulse green dot using success semantic */}
        <div className="relative flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(var(--fa-success),0.4)] animate-pulse" />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-fa-t6 font-fa-semibold text-text-primary leading-none">
            {t('runs.audit.valid')}
          </span>
          <div className="w-1 h-1 rounded-full bg-border-divider" />
          <span className="text-fa-t7 font-fa-semibold font-mono text-[10px] text-text-tertiary uppercase tracking-widest pt-0.5">
            {t('runs.audit.verified')}
          </span>
        </div>
      </div>

      <Tooltip title="点击查看系统完整性校验报告">
        <div className="flex items-center gap-2 text-text-disabled group-hover:text-brand transition-colors cursor-help">
          <Info size={14} />
        </div>
      </Tooltip>
    </div>
  );
};

export default AuditChainStatusBar;