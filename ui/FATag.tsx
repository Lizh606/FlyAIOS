import React from 'react';
import { Tooltip } from 'antd';

interface FATagProps {
  children: React.ReactNode;
  className?: string;
  mono?: boolean;
}

/**
 * FATag - 标准化标签组件
 * 采用 10px 字号，支持 T7-mono 或 T6 字体，具备轻微阴影与边框。
 * 增强：集成 Tooltip，处理内容截断展示。
 */
const FATag: React.FC<FATagProps> = ({ children, className = "", mono = true }) => {
  return (
    <Tooltip title={children} mouseEnterDelay={0.5}>
      <div className={`
        inline-flex items-center px-2 py-1 bg-gray-50 border border-gray-100 rounded-md 
        ${mono ? 'fa-t7-mono' : 'fa-t6'} 
        text-[10px] leading-none text-gray-600 font-bold uppercase
        max-w-[100px] overflow-hidden shrink-0
        shadow-sm transition-colors hover:border-brand/20
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