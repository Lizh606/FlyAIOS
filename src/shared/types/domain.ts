
export enum ExecutionStatus {
  QUEUED = 'queued',
  PREPARING = 'preparing',
  EXECUTING = 'executing',
  RETURNING = 'returning',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export enum LiveState {
  OFF = 'off',
  STARTING = 'starting',
  LIVE = 'live',
  DEGRADED = 'degraded'
}

export interface RouteLog {
  id: string;
  timestamp: string;
  event: string;
  coordinate: string;
  altitude: number;
}

export interface AlertEvent {
  id: string;
  timestamp: string;
  type: 'System' | 'AI' | 'Security';
  level: 'Critical' | 'Warning' | 'Info';
  message: string;
  distance?: string;
}

export interface Execution {
  id: string;
  projectId: string;
  projectName: string;
  deviceId: string;
  deviceName: string;
  dockId?: string;
  dockName?: string;
  status: ExecutionStatus;
  liveState: LiveState;
  alertsCount: number;
  startTime: string;
  duration?: string;
  endTime?: string;
  streamSessionId?: string;
  runId?: string;
  routeLogs?: RouteLog[];
  alerts?: AlertEvent[];
}

export interface DetectionEvent {
  id: string;
  timestamp: string;
  class: string;
  confidence: number;
  thumbnail?: string;
}
