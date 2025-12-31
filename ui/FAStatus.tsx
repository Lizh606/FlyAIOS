import React from 'react';
import { Circle, PlayCircle, CheckCircle, XCircle, AlertCircle, Clock, Activity, Radio } from 'lucide-react';
import { Tooltip } from 'antd';

export type StatusType = 
  | 'live' 
  | 'info' 
  | 'success' 
  | 'error' 
  | 'warning' 
  | 'neutral'
  | 'online' 
  | 'syncing' 
  | 'idle' 
  | 'failed' 
  | 'completed' 
  | 'running' 
  | 'queued' 
  | 'degraded';

interface FAStatusProps {
  status: StatusType;
  label?: string;
  showText?: boolean;
  tooltip?: string;
  className?: string;
}

const statusMap = {
  // Semantic Colors (FlyAIOS v0.8)
  live: { rgb: 'var(--fa-live-rgb)', icon: Radio, label: 'Live' },
  info: { rgb: 'var(--fa-info-rgb)', icon: Activity, label: 'Info' },
  success: { rgb: 'var(--fa-success-rgb)', icon: CheckCircle, label: 'Success' },
  error: { rgb: 'var(--fa-error-rgb)', icon: XCircle, label: 'Error' },
  warning: { rgb: 'var(--fa-warning-rgb)', icon: AlertCircle, label: 'Warning' },
  neutral: { rgb: 'var(--fa-neutral-rgb)', icon: Circle, label: 'Idle' },
  
  // Backward compatibility & Aliases
  online: { rgb: 'var(--fa-live-rgb)', icon: Circle, label: 'Online' },
  active: { rgb: 'var(--fa-live-rgb)', icon: Activity, label: 'Active' },
  running: { rgb: 'var(--fa-info-rgb)', icon: PlayCircle, label: 'Running' },
  syncing: { rgb: 'var(--fa-info-rgb)', icon: Clock, label: 'Syncing' },
  idle: { rgb: 'var(--fa-neutral-rgb)', icon: Circle, label: 'Idle' },
  completed: { rgb: 'var(--fa-success-rgb)', icon: CheckCircle, label: 'Completed' },
  failed: { rgb: 'var(--fa-error-rgb)', icon: XCircle, label: 'Failed' },
  queued: { rgb: 'var(--fa-neutral-rgb)', icon: Clock, label: 'Queued' },
  degraded: { rgb: 'var(--fa-warning-rgb)', icon: AlertCircle, label: 'Degraded' },
};

const FAStatus: React.FC<FAStatusProps> = ({ 
  status, 
  label, 
  showText = true, 
  tooltip,
  className = "" 
}) => {
  const config = statusMap[status] || statusMap.neutral;
  const Icon = config.icon;
  const displayText = label || config.label;
  
  // Style according to v0.8: background 0.14 alpha, text 1.0 alpha
  const style = {
    backgroundColor: `rgba(${config.rgb}, 0.14)`,
    color: `rgb(${config.rgb})`,
    borderRadius: 'var(--fa-radius-tag)',
    border: 'none',
  };

  const content = (
    <div 
      className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-0.5 fa-t6 font-bold shadow-sm shrink-0 ${className}`}
      style={style}
    >
      <Icon 
        size={12} 
        strokeWidth={3} 
        className={status === 'running' || status === 'syncing' || status === 'live' ? 'animate-pulse' : ''} 
      />
      {showText && <span className="tracking-widest uppercase truncate">{displayText}</span>}
    </div>
  );

  if (tooltip) {
    return <Tooltip title={tooltip}>{content}</Tooltip>;
  }

  return content;
};

export default FAStatus;