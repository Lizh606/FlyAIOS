
export type NodeStatus = 'online' | 'offline';
export type DiskStatus = 'ok' | 'warn';

export interface EdgeNode {
  id: string;
  name: string;
  status: NodeStatus;
  ingestReady: boolean;
  disk: DiskStatus;
  gpu: boolean;
  model: string;
  version: string;
}

export const MOCK_EDGE_NODES: EdgeNode[] = [
  { id: 'node-d01', name: 'Alpha-Dock-12', status: 'online', ingestReady: true, disk: 'ok', gpu: true, model: 'M300-G2', version: 'v2.1.0' },
  { id: 'node-d02', name: 'Beta-Dock-17', status: 'online', ingestReady: true, disk: 'ok', gpu: false, model: 'M30-Dock', version: 'v2.0.5' },
  { id: 'node-e01', name: 'Edge-G2-01', status: 'online', ingestReady: false, disk: 'warn', gpu: true, model: 'NVIDIA-Xavier', version: 'v2.1.0' },
  { id: 'node-d03', name: 'Gamma-Dock-04', status: 'offline', ingestReady: false, disk: 'ok', gpu: true, model: 'M300-G2', version: 'v2.1.0' },
  { id: 'node-e02', name: 'Edge-Lite-05', status: 'online', ingestReady: true, disk: 'ok', gpu: false, model: 'Pi-Compute-4', version: 'v1.8.0' },
  { id: 'node-d04', name: 'Delta-Dock-09', status: 'online', ingestReady: true, disk: 'warn', gpu: true, model: 'M300-G2', version: 'v2.1.1' },
];
