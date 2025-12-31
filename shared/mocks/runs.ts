
import { ProcessingMode } from './apps';

export type RunStatus = 'completed' | 'failed' | 'running';

export interface RunArtifact {
  id: string;
  type: 'image' | 'pdf' | 'json' | 'link';
  name: string;
  url?: string;
  thumbnail?: string;
}

export interface RunInstance {
  id: string;
  projectId: string;
  projectName: string;
  workflowId: string;
  workflowName: string;
  workflowVersion: string;
  deploymentId: string;
  policyVersion: string;
  executionId?: string;
  streamSessionId?: string;
  appPackVersion: string;
  modelRelease: string;
  status: RunStatus;
  trigger: {
    type: string;
    eventId: string;
    idempotencyKey: string;
  };
  startedAt: string;
  duration: string;
  error?: {
    step: string;
    message: string;
    retries: number;
  };
  receipt?: {
    id: string;
    system: string;
    url: string;
  };
  artifacts: RunArtifact[];
}

export const MOCK_RUNS: RunInstance[] = [
  {
    id: 'run-power-001',
    projectId: 'p-ng-2026',
    projectName: 'NorthGrid-2026Q1',
    workflowId: 'wf-ng-ins-01',
    workflowName: 'Powerline-Inspection',
    workflowVersion: 'v1.3.0',
    deploymentId: 'dep-8821',
    policyVersion: 'P-20251219-01',
    executionId: 'ex-82731',
    streamSessionId: 'ss-live-992',
    appPackVersion: 'PowerPack-v1.3',
    modelRelease: 'Transformer-v2-L',
    status: 'completed',
    trigger: { type: 'EdgeAlertRaised', eventId: 'evt-9901', idempotencyKey: 'idx-sh-101' },
    startedAt: '2025-12-19 14:22:01',
    duration: '04m 22s',
    receipt: { id: 'WO-88721-A', system: 'StateGrid-EAM', url: '#' },
    artifacts: [
      { id: 'art-1', type: 'image', name: 'Defect-01.jpg', thumbnail: 'https://picsum.photos/seed/d1/200/200' },
      { id: 'art-2', type: 'image', name: 'Defect-02.jpg', thumbnail: 'https://picsum.photos/seed/d2/200/200' },
      { id: 'art-3', type: 'pdf', name: 'Inspection-Report-v1.pdf' }
    ]
  },
  {
    id: 'run-power-002',
    projectId: 'p-ng-2026',
    projectName: 'NorthGrid-2026Q1',
    workflowId: 'wf-ng-ins-01',
    workflowName: 'Powerline-Inspection',
    workflowVersion: 'v1.3.0',
    deploymentId: 'dep-8821',
    policyVersion: 'P-20251219-01',
    executionId: 'ex-82731',
    appPackVersion: 'PowerPack-v1.3',
    modelRelease: 'Transformer-v2-L',
    status: 'failed',
    trigger: { type: 'Manual', eventId: 'evt-9905', idempotencyKey: 'idx-man-202' },
    startedAt: '2025-12-19 14:45:00',
    duration: '12s',
    error: { step: 'CloudReview', message: 'Auth token expired for reviewer endpoint', retries: 3 },
    artifacts: []
  },
  {
    id: 'run-power-003',
    projectId: 'p-ng-2026',
    projectName: 'NorthGrid-2026Q1',
    workflowId: 'wf-ng-ins-01',
    workflowName: 'Powerline-Inspection',
    workflowVersion: 'v1.3.0',
    deploymentId: 'dep-8821',
    policyVersion: 'P-20251219-01',
    executionId: 'ex-82732',
    appPackVersion: 'PowerPack-v1.3',
    modelRelease: 'Transformer-v2-L',
    status: 'running',
    trigger: { type: 'EdgeAlertRaised', eventId: 'evt-9912', idempotencyKey: 'idx-sh-103' },
    startedAt: '2025-12-19 15:01:20',
    duration: '01m 05s',
    artifacts: []
  },
  ...Array.from({ length: 9 }).map((_, i) => ({
    id: `run-gen-${i + 10}`,
    projectId: i % 2 === 0 ? 'p-ng-2026' : 'p-marina-01',
    projectName: i % 2 === 0 ? 'NorthGrid-2026Q1' : 'Marina-Solar',
    workflowId: 'wf-generic',
    workflowName: 'Standard-Survey',
    workflowVersion: 'v2.0.1',
    deploymentId: `dep-00${i}`,
    policyVersion: 'P-STD-01',
    appPackVersion: 'Core-v2.0',
    modelRelease: 'ResNet-50',
    status: 'completed' as RunStatus,
    trigger: { type: 'ExecutionCompleted', eventId: `e-77${i}`, idempotencyKey: `k-${i}` },
    startedAt: `2025-12-18 10:0${i}:00`,
    duration: '02m 30s',
    artifacts: [{ id: `a-${i}`, type: 'pdf' as const, name: 'Report.pdf' }]
  }))
];
