import React from 'react';
import { Tooltip } from 'antd';

interface FATagProps {
  children: React.ReactNode;
  className?: string;
  mono?: boolean;
}

/**
 * FATag - 标准化标签组件
 * 采用 Design Tokens 定义的语义类名，支持 T7-mono 或 T6 字体。
 */
const FATag: React.FC<FATagProps> = ({ children, className = "", mono = true }) => {
  return (
    <Tooltip title={children} mouseEnterDelay={0.5}>
      <div className={`
        inline-flex items-center px-2 py-1 bg-bg-page border border-border rounded-tag 
        ${mono ? 'text-fa-t7 font-fa-medium font-mono' : 'text-fa-t6 font-fa-semibold'} 
        text-text-secondary uppercase
        max-w-[120px] overflow-hidden shrink-0
        shadow-sm transition-colors hover:border-brand/30
        ${className}
      `}>
        <span className="truncate w-full block">
          {children}
        </span>
      </div>
    </Tooltip>
  );
};

export default FATag;