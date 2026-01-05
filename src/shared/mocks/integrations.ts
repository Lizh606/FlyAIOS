
export interface Delivery {
  id: string;
  runId: string;
  timestamp: string;
  status: 'success' | 'fail' | 'retrying';
  httpCode: number;
  latency: string;
  error?: string;
  payloadSize: string;
}

export interface Connection {
  id: string;
  name: string;
  type: 'Webhook' | 'WorkOrder';
  status: 'connected' | 'degraded' | 'failed';
  endpoint: string;
  authType: string;
  mapping: string[];
  updatedAt: string;
  deliveries: Delivery[];
}

const generateDeliveries = (connId: string, runIdPrefix: string): Delivery[] => {
  // Fix: Explicitly type the array to ensure literal status values are correctly inferred
  const items: Delivery[] = [
    { id: `del-${connId}-01`, runId: `${runIdPrefix}-101`, timestamp: '14:22:05', status: 'success', httpCode: 200, latency: '124ms', payloadSize: '2.4KB' },
    { id: `del-${connId}-02`, runId: `${runIdPrefix}-101`, timestamp: '14:23:10', status: 'success', httpCode: 201, latency: '440ms', payloadSize: '1.1KB' },
    { id: `del-${connId}-03`, runId: `${runIdPrefix}-102`, timestamp: '14:45:12', status: 'fail', httpCode: 500, latency: '82ms', error: 'Internal Server Error', payloadSize: '0.8KB' },
    { id: `del-${connId}-04`, runId: `${runIdPrefix}-102`, timestamp: '14:46:00', status: 'retrying', httpCode: 0, latency: '-', error: 'Timeout - Retry 1/3', payloadSize: '0.8KB' },
    { id: `del-${connId}-05`, runId: `${runIdPrefix}-103`, timestamp: '15:10:00', status: 'success', httpCode: 200, latency: '156ms', payloadSize: '4.2KB' },
    { id: `del-${connId}-06`, runId: `${runIdPrefix}-104`, timestamp: '15:30:45', status: 'fail', httpCode: 403, latency: '22ms', error: 'Forbidden: Invalid API Key', payloadSize: '0.5KB' },
    { id: `del-${connId}-07`, runId: `${runIdPrefix}-105`, timestamp: '16:00:10', status: 'success', httpCode: 200, latency: '310ms', payloadSize: '3.3KB' },
    { id: `del-${connId}-08`, runId: `${runIdPrefix}-106`, timestamp: '16:45:00', status: 'success', httpCode: 200, latency: '98ms', payloadSize: '2.9KB' },
  ];
  return items.reverse();
};

export const MOCK_CONNECTIONS: Connection[] = [
  {
    id: 'conn-sg-001',
    name: 'StateGrid EAM Connector',
    type: 'WorkOrder',
    status: 'connected',
    endpoint: 'https://api.stategrid.com/v2/wo/ingest',
    authType: 'OAuth2 / Bearer',
    mapping: ['ReviewTrue', 'ReportReady'],
    updatedAt: '2025-12-19 14:20:00',
    deliveries: generateDeliveries('sg', 'run-power')
  },
  {
    id: 'conn-slack-01',
    name: 'Ops-Slack-Alerts',
    type: 'Webhook',
    status: 'degraded',
    endpoint: 'https://hooks.slack.com/services/T00/B00/XXX',
    authType: 'Hmac-Signature',
    mapping: ['EdgeAlertRaised', 'SystemError'],
    updatedAt: '2025-12-19 15:30:12',
    deliveries: generateDeliveries('slk', 'run-gen')
  },
  {
    id: 'conn-sap-pi',
    name: 'SAP Plant Maintenance',
    type: 'WorkOrder',
    status: 'failed',
    endpoint: 'https://sap-pi.internal.corp:8443/rfc',
    authType: 'Basic Auth',
    mapping: ['ReviewTrue'],
    updatedAt: '2025-12-19 16:45:00',
    deliveries: generateDeliveries('sap', 'run-power')
  }
];
