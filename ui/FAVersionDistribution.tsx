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
    <div className="w-[180px] p-fa-1">
      <div className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase tracking-[0.15em] mb-fa-4">
        {t('workflows.distribution.allStatus')}
      </div>
      <div className="space-y-fa-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="text-fa-t5 text-text-secondary font-mono">{item.version}</span>
            <span className="text-fa-t5 font-fa-semibold text-text-primary font-mono tabular-nums">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`space-y-fa-3 ${className}`}>
      {label && (
        <h4 className="text-fa-t6 font-fa-semibold text-text-tertiary uppercase tracking-widest flex items-center gap-fa-2">
          {label}
        </h4>
      )}
      <div className="flex items-center gap-fa-2 flex-wrap">
        {visibleItems.map((item, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-fa-2 px-fa-2.5 py-fa-1.5 bg-bg-page border border-border rounded-lg shadow-sm"
          >
            <Cpu size={12} className="text-text-tertiary" />
            <span className="text-fa-t7 font-fa-medium text-text-secondary font-mono">{item.version}</span>
            <span className="text-fa-t7 font-fa-semibold text-text-primary ml-fa-1 tabular-nums">{item.count}</span>
          </div>
        ))}
        
        {remainingItems.length > 0 && (
          <Popover 
            content={popoverContent} 
            trigger="hover" 
            placement="top"
            overlayClassName="fa-popover-v2"
          >
            <div className="cursor-help flex items-center justify-center px-fa-3 py-fa-1.5 bg-brand-bg border border-brand/20 text-brand rounded-lg text-fa-t7 font-fa-semibold transition-all hover:bg-brand/20 shadow-sm">
              +{remainingItems.length}
            </div>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default FAVersionDistribution;