
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
      className={`fa-card flex flex-col fa-card--${density} ${hoverable ? 'fa-card--hover' : ''} ${isClickable ? 'cursor-pointer' : ''} ${className}`}
    >
      {(header || title) && (
        <div className="fa-card__header shrink-0">
          {header ? header : (
            <div className="flex items-center justify-between w-full">
              <h4 className="fa-t4 text-[var(--fa-text-primary)] m-0">{title}</h4>
              {extra && <div className="shrink-0">{extra}</div>}
            </div>
          )}
        </div>
      )}
      
      <div className="fa-card__body flex-1">
        {children}
      </div>

      {footer && (
        <div className="fa-card__footer shrink-0">
          {footer}
        </div>
      )}
    </div>
  );
};

export default FACard;
