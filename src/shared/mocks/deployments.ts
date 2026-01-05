
import { ExecutionStatus } from '../types';

export interface DeploymentNode {
  id: string;
  name: string;
  status: 'online' | 'offline';
}

export interface Deployment {
  id: string;
  workflowId: string;
  workflowName: string;
  projectId: string;
  projectName: string;
  version: string;
  policyVersion: string;
  manifestVersion: string;
  status: 'applying' | 'applied' | 'failed' | 'partial';
  errorSummary?: string;
  updatedAt: string;
  appliedNodes: DeploymentNode[];
  liveBinding: {
    enabled: boolean;
    preferTarget: string;
    fallback: boolean;
  };
}

export const MOCK_DEPLOYMENTS: Deployment[] = [
  {
    id: 'dep-ng-001',
    workflowId: 'wf-northgrid-001',
    workflowName: 'NorthGrid-Inspection-E2E',
    projectId: 'p-ng-2026',
    projectName: 'NorthGrid-2026Q1',
    version: 'v1.3.0',
    policyVersion: 'P-20251219-01',
    manifestVersion: 'M-772A-B9',
    status: 'applied',
    updatedAt: '2025-12-19 14:20:00',
    appliedNodes: [
      { id: 'node-d01', name: 'Dock-12', status: 'online' },
      { id: 'node-d02', name: 'Dock-17', status: 'online' },
      { id: 'node-d04', name: 'Dock-09', status: 'online' },
      { id: 'node-e01', name: 'Edge-G2-01', status: 'online' },
    ],
    liveBinding: {
      enabled: true,
      preferTarget: 'Edge-G2-01',
      fallback: true
    }
  },
  {
    id: 'dep-ng-002',
    workflowId: 'wf-northgrid-001',
    workflowName: 'NorthGrid-Inspection-E2E',
    projectId: 'p-ng-2026',
    projectName: 'NorthGrid-2026Q1',
    version: 'v1.2.9',
    policyVersion: 'P-20251218-05',
    manifestVersion: 'M-661C-X2',
    status: 'partial',
    updatedAt: '2025-12-18 09:15:00',
    appliedNodes: [
      { id: 'node-d01', name: 'Dock-12', status: 'online' },
      { id: 'node-d03', name: 'Dock-04', status: 'offline' },
    ],
    liveBinding: {
      enabled: true,
      preferTarget: 'Auto',
      fallback: true
    }
  },
  {
    id: 'dep-ng-003',
    workflowId: 'wf-northgrid-001',
    workflowName: 'NorthGrid-Inspection-E2E',
    projectId: 'p-ng-2026',
    projectName: 'NorthGrid-2026Q1',
    version: 'v1.3.1',
    policyVersion: 'P-20251220-02',
    manifestVersion: 'M-992D-K1',
    status: 'failed',
    errorSummary: 'Request timeout on Dock-04; EdgeIngest service unavailable.',
    updatedAt: '2025-12-20 10:05:00',
    appliedNodes: [
      { id: 'node-d03', name: 'Dock-04', status: 'offline' },
    ],
    liveBinding: {
      enabled: false,
      preferTarget: 'Cloud',
      fallback: false
    }
  },
  {
    id: 'dep-ng-004',
    workflowId: 'wf-northgrid-001',
    workflowName: 'NorthGrid-Inspection-E2E',
    projectId: 'p-ng-2026',
    projectName: 'NorthGrid-2026Q1',
    version: 'v1.3.2',
    policyVersion: 'P-20251221-09',
    manifestVersion: 'M-112E-Z0',
    status: 'applying',
    updatedAt: '2025-12-21 11:30:00',
    appliedNodes: [
      { id: 'node-d01', name: 'Dock-12', status: 'online' },
      { id: 'node-d02', name: 'Dock-17', status: 'online' },
    ],
    liveBinding: {
      enabled: true,
      preferTarget: 'Edge-G2-01',
      fallback: true
    }
  }
];
