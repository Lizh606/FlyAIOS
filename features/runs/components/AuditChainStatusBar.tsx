import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { useI18n } from '../../../i18n/index';
import { Tooltip } from 'antd';

const AuditChainStatusBar: React.FC = () => {
  const { t } = useI18n();
  
  return (
    <div className="flex items-center justify-between px-4 h-9 bg-white border border-gray-100 rounded-lg mb-8 shadow-sm group transition-all hover:border-gray-200">
      <div className="flex items-center gap-3">
        {/* Status indicator: pulse green dot */}
        <div className="relative flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] animate-pulse" />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="fa-t6 font-bold text-gray-700 leading-none">
            {t('runs.audit.valid')}
          </span>
          <div className="w-1 h-1 rounded-full bg-gray-200" />
          <span className="fa-t7-mono text-[10px] text-gray-400 uppercase font-black tracking-widest">
            {t('runs.audit.verified')}
          </span>
        </div>
      </div>

      <Tooltip title="点击查看系统完整性校验报告">
        <div className="flex items-center gap-2 text-gray-300 group-hover:text-brand transition-colors cursor-help">
          <Info size={14} />
        </div>
      </Tooltip>
    </div>
  );
};

export default AuditChainStatusBar;