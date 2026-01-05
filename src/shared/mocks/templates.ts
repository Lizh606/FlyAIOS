
import { ProcessingMode } from './apps';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  industry: 'Powerline' | 'Generic' | 'Solar' | 'Security';
  triggers: string[];
  processingModes: ProcessingMode[];
  outputs: string[];
  apps: string[];
  icon?: string;
}

export const MOCK_TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'tpl-powerline-001',
    name: 'Powerline Inspection Template',
    description: 'Standard E2E inspection workflow: Edge detection -> Cloud review -> AI Report -> WorkOrder.',
    industry: 'Powerline',
    triggers: ['ExecutionCompleted', 'EdgeAlertRaised', 'Manual'],
    processingModes: ['edge_realtime', 'near_real_time_cloud', 'offline_batch'],
    outputs: ['Alert', 'Keyframes', 'Review Result', 'PDF Report', 'Work Order Receipt', 'History Log'],
    apps: ['Edge Defect Alert', 'Cloud Review', 'LLM Report', 'Work Order Connector'],
    icon: 'Zap'
  },
  {
    id: 'tpl-solar-002',
    name: 'Solar Panel Thermal Analysis',
    description: 'Thermal anomaly detection and efficiency impact calculation.',
    industry: 'Solar',
    triggers: ['ExecutionCompleted'],
    processingModes: ['edge_realtime', 'offline_batch'],
    outputs: ['Thermal Hotspots', 'Efficiency Analysis', 'Cell Map', 'Maintenance Ticket'],
    apps: ['Thermal Hotspot', 'Efficiency Report'],
    icon: 'Sun'
  },
  {
    id: 'tpl-security-003',
    name: 'Perimeter Security Patrol',
    description: 'Intrusion detection with human/vehicle classification and instant alert.',
    industry: 'Security',
    triggers: ['EdgeAlertRaised', 'SensorTriggered'],
    processingModes: ['edge_realtime'],
    outputs: ['Intrusion Alert', 'Tracking Video', 'Snapshot', 'SMS Notification'],
    apps: ['Human Detection', 'Vehicle Tracking'],
    icon: 'Shield'
  }
];
