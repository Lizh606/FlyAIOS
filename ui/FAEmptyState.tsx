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
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center bg-bg-card border border-dashed border-border rounded-card ${className}`}>
      {Icon && (
        <div className="mb-4 p-4 rounded-full bg-bg-page text-text-disabled">
          <Icon size={48} strokeWidth={1.5} />
        </div>
      )}
      
      <h3 className="text-fa-t4 font-fa-semibold text-text-primary mb-2">{title}</h3>
      
      {(description || nextStep) && (
        <div className="max-w-md mb-8">
          {description && <p className="text-fa-t5 text-text-secondary leading-relaxed">{description}</p>}
          {nextStep && <p className="text-fa-t7 font-fa-medium font-mono text-text-tertiary mt-1 uppercase tracking-tight">{nextStep}</p>}
        </div>
      )}

      {(primaryAction || secondaryAction) && (
        <div className="flex items-center gap-3">
          {secondaryAction && (
            <Button onClick={secondaryAction.onClick} className="h-10 px-6 font-fa-semibold">
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button 
              type="primary" 
              icon={primaryAction.icon} 
              onClick={primaryAction.onClick} 
              className="h-10 px-8 font-fa-semibold uppercase tracking-widest shadow-md"
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