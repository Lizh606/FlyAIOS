import { ProcessingMode } from './apps';

export interface WorkflowNode {
  id: string;
  type: string;
  name: string;
  mode: ProcessingMode;
  params: Record<string, any>;
}

export interface WorkflowInstance {
  id: string;
  name: string;
  version: string;
  templateId: string;
  status: 'published' | 'draft';
  nodes: WorkflowNode[];
  appliedTo: {
    projects: string[];
    nodesCount: number;
  };
}

export const MOCK_WORKFLOWS: WorkflowInstance[] = [
  {
    id: 'wf-northgrid-001',
    name: 'NorthGrid-2026Q1-Inspection',
    version: 'v1.3.0',
    templateId: 'tpl-powerline-001',
    status: 'published',
    appliedTo: {
      projects: ['NorthGrid-2026Q1'],
      nodesCount: 12
    },
    nodes: [
      {
        id: 'node-1',
        type: 'edge_detection',
        name: 'Edge Defect Alert',
        mode: 'edge_realtime',
        params: { threshold: 0.80 }
      },
      {
        id: 'node-2',
        type: 'cloud_review',
        name: 'Cloud Review',
        mode: 'near_real_time_cloud',
        params: { lowConfidenceOnly: true }
      },
      {
        id: 'node-3',
        type: 'llm_report',
        name: 'LLM Report',
        mode: 'offline_batch',
        params: { template: 'StateGrid-v2' }
      },
      {
        id: 'node-4',
        type: 'webhook',
        name: 'Work Order Connector',
        mode: 'offline_batch',
        params: { verifiedOnly: true }
      }
    ]
  }
];
