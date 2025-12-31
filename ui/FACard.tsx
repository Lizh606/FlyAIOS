import React from 'react';

interface FACardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  extra?: React.ReactNode;
  title?: string;
  density?: 'comfort' | 'compact';
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * FACard - FlyAIOS 标准卡片封装
 * 符合 v0.8 6.5 章节规范：靠描边成立，12px 圆角
 * 增加 flex-col 支持，方便内部 content 滚动
 */
const FACard: React.FC<FACardProps> = ({
  children,
  header,
  footer,
  extra,
  title,
  density = 'comfort',
  hoverable = false,
  className = "",
  onClick,
}) => {
  const isClickable = !!onClick;
  
  return (
    <div 
      onClick={onClick}
      className={`
        bg-bg-card border border-border rounded-card overflow-hidden transition-all duration-200
        flex flex-col
        ${density === 'compact' ? 'p-3' : 'p-4'}
        ${hoverable ? 'hover:border-brand/40 hover:shadow-card' : ''}
        ${isClickable ? 'cursor-pointer active:scale-[0.99]' : ''}
        ${className}
      `}
    >
      {(header || title) && (
        <div className="mb-4 shrink-0">
          {header ? header : (
            <div className="flex items-center justify-between w-full">
              <h4 className="text-fa-t4 font-fa-semibold text-text-primary m-0 leading-tight">{title}</h4>
              {extra && <div className="shrink-0">{extra}</div>}
            </div>
          )}
        </div>
      )}
      
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        {children}
      </div>

      {footer && (
        <div className="mt-4 pt-4 border-t border-border shrink-0">
          {footer}
        </div>
      )}
    </div>
  );
};

export default FACard;