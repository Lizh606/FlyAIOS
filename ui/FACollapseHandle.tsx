import React from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { Tooltip } from 'antd';

interface FACollapseHandleProps {
  side: 'left' | 'right' | 'top' | 'bottom';
  isCollapsed: boolean;
  onClick: () => void;
  tooltip?: string;
  className?: string;
}

const FACollapseHandle: React.FC<FACollapseHandleProps> = ({ 
  side, 
  isCollapsed, 
  onClick, 
  tooltip,
  className = "" 
}) => {
  const isVertical = side === 'left' || side === 'right';
  
  const getIcon = () => {
    const props = { size: 14, strokeWidth: 2.5, className: "text-text-tertiary group-hover:text-brand transition-colors" };
    if (side === 'right') return isCollapsed ? <ChevronRight {...props} /> : <ChevronLeft {...props} />;
    if (side === 'left') return isCollapsed ? <ChevronLeft {...props} /> : <ChevronRight {...props} />;
    if (side === 'top') return isCollapsed ? <ChevronUp {...props} /> : <ChevronDown {...props} />;
    if (side === 'bottom') return isCollapsed ? <ChevronDown {...props} /> : <ChevronUp {...props} />;
    return null;
  };

  const baseStyles = "bg-bg-card border border-border flex items-center justify-center transition-all active:scale-95 shadow-sm group cursor-pointer hover:shadow-md z-50";
  const positionStyles = {
    right: "w-3.5 h-12 rounded-r-md border-l-0",
    left: "w-3.5 h-12 rounded-l-md border-r-0",
    top: "w-16 h-4 rounded-t-md border-b-0",
    bottom: "w-16 h-4 rounded-b-md border-t-0",
  };

  const handle = (
    <div 
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`${baseStyles} ${positionStyles[side]} ${className}`}
    >
      {getIcon()}
    </div>
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip} placement={isVertical ? (side === 'right' ? 'right' : 'left') : (side === 'top' ? 'top' : 'bottom')}>
        {handle}
      </Tooltip>
    );
  }

  return handle;
};

export default FACollapseHandle;