
export type ProcessingMode = 'edge_realtime' | 'near_real_time_cloud' | 'offline_batch';

export interface AppCapability {
  id: string;
  name: string;
  description: string;
  mode: ProcessingMode;
}

export interface AppPack {
  id: string;
  name: string;
  publisher: string;
  version: string;
  icon: string;
  industry: 'Powerline' | 'Solar' | 'Security' | 'Generic';
  description: string;
  installedVersion?: string;
  capabilities: AppCapability[];
  expectedOutputs: string[];
  usedWorkflowCount: number;
  compatibility: {
    gpuRequired: boolean;
    minOS: string;
    nodes: string[];
  };
}
