
export enum ExecutionStatus {
  PENDING = 'Pending',
  PREPARING = 'Preparing',
  READY = 'Ready',
  RUNNING = 'Running',
  COMPLETED = 'Completed',
  FAILED = 'Failed'
}

export interface Project {
  id: string;
  name: string;
  lastCaptured: string;
  thumbnail: string;
  missionsCount: number;
  collaborators: number;
}

export interface Mission {
  id: string;
  name: string;
  patternType: 'grid_mapping' | 'facade_scan' | 'corridor' | 'orbit';
  captureProfileId: string;
  status: 'active' | 'draft';
}

export interface CaptureProfile {
  id: string;
  name: string;
  description: string;
  overlap: string;
  altitude: number;
  speed: number;
}
