
import React from 'react';
import { Button } from 'antd';
import { LucideIcon } from 'lucide-react';

interface FAEmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  nextStep?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const FAEmptyState: React.FC<FAEmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  nextStep,
  primaryAction,
  secondaryAction,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center bg-white border border-dashed border-[var(--fa-border-default)] rounded-xl ${className}`}>
      {Icon && (
        <div className="mb-4 p-4 rounded-full bg-gray-50 text-gray-200">
          <Icon size={48} strokeWidth={1.5} />
        </div>
      )}
      
      <h3 className="fa-t4 text-[var(--fa-text-primary)] mb-2">{title}</h3>
      
      {(description || nextStep) && (
        <div className="max-w-md mb-8">
          {description && <p className="fa-t6 text-[var(--fa-text-secondary)]">{description}</p>}
          {nextStep && <p className="fa-t7-mono text-[var(--fa-text-tertiary)] mt-1 uppercase tracking-tight">{nextStep}</p>}
        </div>
      )}

      {(primaryAction || secondaryAction) && (
        <div className="flex items-center gap-3">
          {secondaryAction && (
            <Button onClick={secondaryAction.onClick} className="h-10 px-6 fa-t5-strong">
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button 
              type="primary" 
              icon={primaryAction.icon} 
              onClick={primaryAction.onClick} 
              className="h-10 px-8 fa-t5-strong uppercase tracking-widest"
            >
              {primaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default FAEmptyState;
