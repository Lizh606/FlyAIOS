
import React from 'react';
import { Cpu } from 'lucide-react';
import { Popover } from 'antd';
import { useI18n } from '../i18n';

interface VersionItem {
  version: string;
  count: number;
}

interface FAVersionDistributionProps {
  items: VersionItem[];
  limit?: number;
  label?: string;
  className?: string;
}

const FAVersionDistribution: React.FC<FAVersionDistributionProps> = ({
  items,
  limit = 2,
  label,
  className = ""
}) => {
  const { t } = useI18n();
  const visibleItems = items.slice(0, limit);
  const remainingItems = items.slice(limit);

  const popoverContent = (
    <div className="w-[180px] p-1">
      <div className="fa-t7-mono text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] mb-4">
        {t('workflows.distribution.allStatus')}
      </div>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="fa-t5 text-gray-600 font-mono">{item.version}</span>
            <span className="fa-t5-strong text-gray-900 font-mono tabular-nums">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <h4 className="fa-t6 font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          {label}
        </h4>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        {visibleItems.map((item, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 border border-gray-100 rounded-lg shadow-sm"
          >
            <Cpu size={12} className="text-gray-400" />
            <span className="fa-t7-mono text-gray-600">{item.version}</span>
            <span className="fa-t7-mono font-bold text-gray-900 ml-1 tabular-nums">{item.count}</span>
          </div>
        ))}
        
        {remainingItems.length > 0 && (
          <Popover 
            content={popoverContent} 
            trigger="hover" 
            placement="top"
            overlayClassName="fa-popover-v2"
          >
            <div className="cursor-help flex items-center justify-center px-3 py-1.5 bg-blue-50 border border-blue-100 text-brand rounded-lg fa-t7-mono font-bold transition-all hover:bg-blue-100 shadow-sm">
              +{remainingItems.length}
            </div>
          </Popover>
        )}
      </div>
      <style>{`
        .fa-popover-v2 .ant-popover-inner {
          padding: 16px;
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0,0,0,0.05);
        }
      `}</style>
    </div>
  );
};

export default FAVersionDistribution;
