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
  | 'active'
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
  live: { colorClass: 'text-live bg-live/10', icon: Radio, label: 'Live' },
  info: { colorClass: 'text-info bg-info/10', icon: Activity, label: 'Info' },
  success: { colorClass: 'text-success bg-success/10', icon: CheckCircle, label: 'Success' },
  error: { colorClass: 'text-error bg-error/10', icon: XCircle, label: 'Error' },
  warning: { colorClass: 'text-warning bg-warning/10', icon: AlertCircle, label: 'Warning' },
  neutral: { colorClass: 'text-text-tertiary bg-action-hover', icon: Circle, label: 'Idle' },
  
  online: { colorClass: 'text-live bg-live/10', icon: Circle, label: 'Online' },
  running: { colorClass: 'text-brand bg-brand/10', icon: PlayCircle, label: 'Running' },
  active: { colorClass: 'text-brand bg-brand/10', icon: Activity, label: 'Active' },
  syncing: { colorClass: 'text-info bg-info/10', icon: Clock, label: 'Syncing' },
  idle: { colorClass: 'text-text-tertiary bg-action-hover', icon: Circle, label: 'Idle' },
  completed: { colorClass: 'text-success bg-success/10', icon: CheckCircle, label: 'Completed' },
  failed: { colorClass: 'text-error bg-error/10', icon: XCircle, label: 'Failed' },
  queued: { colorClass: 'text-text-tertiary bg-action-hover', icon: Clock, label: 'Queued' },
  degraded: { colorClass: 'text-warning bg-warning/10', icon: AlertCircle, label: 'Degraded' },
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

  const content = (
    <div 
      className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-0.5 text-fa-t6 font-fa-semibold rounded-tag shrink-0 ${config.colorClass} ${className}`}
    >
      <Icon 
        size={12} 
        strokeWidth={3} 
        className={status === 'running' || status === 'syncing' || status === 'live' || status === 'active' ? 'animate-pulse' : ''} 
      />
      {showText && <span className="tracking-widest uppercase truncate leading-none pt-0.5">{displayText}</span>}
    </div>
  );

  if (tooltip) {
    return <Tooltip title={tooltip}>{content}</Tooltip>;
  }

  return content;
};

export default FAStatus;