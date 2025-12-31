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
  description: string;
  publisher: string;
  publisherLogo?: string;
  version: string;
  channel: 'Stable' | 'Beta';
  signature: 'Verified' | 'Unverified';
  installedVersion?: string;
  industry: 'Powerline' | 'Generic' | 'Solar' | 'Security';
  icon: string;
  capabilities: AppCapability[];
  expectedOutputs: string[]; // Added for high-density cards
  compatibility: {
    edgeNodes: string[];
    gpuRequired: boolean;
    minOS: string;
  };
  scopes: {
    read: string[];
    write: string[];
    outbound: boolean;
  };
}

export const MOCK_APPS: AppPack[] = [
  {
    id: 'powerline-pack-001',
    name: 'Powerline Inspection Pack',
    description: '端到端电力巡检套件，包含缺陷自动检测、云端复核与 AI 报告生成。',
    publisher: 'FlyAIOS Labs',
    version: 'v1.3.0',
    channel: 'Stable',
    signature: 'Verified',
    industry: 'Powerline',
    icon: 'https://p.ipic.vip/vjblew.jpg',
    installedVersion: 'v1.2.9',
    capabilities: [
      { id: 'c1', name: 'Edge Defect Alert', description: '边缘缺陷/异物实时告警', mode: 'edge_realtime' },
      { id: 'c2', name: 'Cloud Review', description: '云端复核应用', mode: 'near_real_time_cloud' },
      { id: 'c3', name: 'LLM Report', description: '报告生成应用', mode: 'offline_batch' },
      { id: 'c4', name: 'Work Order Connector', description: '工单系统集成', mode: 'offline_batch' },
    ],
    expectedOutputs: ['Alert', 'Keyframes', 'Review Result', 'PDF Report', 'Work Order'],
    compatibility: {
      edgeNodes: ['Dock-12', 'Dock-17', 'Edge-Box-G2'],
      gpuRequired: true,
      minOS: 'v2.1.0'
    },
    scopes: {
      read: ['Telemetry', 'Media', 'MissionPlan'],
      write: ['AlertEvents', 'Artifacts'],
      outbound: true
    }
  },
  {
    id: 'solar-thermal-002',
    name: 'Solar Thermal Analyzer',
    description: '针对光伏电站的热成像异常检测分析包。',
    publisher: 'SunEnergy AI',
    version: 'v0.9.5',
    channel: 'Beta',
    signature: 'Verified',
    industry: 'Solar',
    icon: 'https://picsum.photos/seed/solar/100/100',
    capabilities: [
      { id: 's1', name: 'Thermal Hotspot', description: '热斑自动标定', mode: 'edge_realtime' },
      { id: 's2', name: 'Efficiency Report', description: '发电效率预测', mode: 'offline_batch' }
    ],
    expectedOutputs: ['Thermal Map', 'Hotspot Alert', 'Efficiency Data'],
    compatibility: {
      edgeNodes: ['Edge-Box-G2'],
      gpuRequired: true,
      minOS: 'v2.0.0'
    },
    scopes: {
      read: ['Media'],
      write: ['Artifacts'],
      outbound: false
    }
  },
  {
    id: 'basic-mapping-003',
    name: 'Standard Mapping Engine',
    description: '基础测绘与正射影像生成内核。',
    publisher: 'FlyAIOS Labs',
    version: 'v2.0.1',
    channel: 'Stable',
    signature: 'Verified',
    industry: 'Generic',
    icon: 'https://picsum.photos/seed/map/100/100',
    capabilities: [
      { id: 'm1', name: 'Ortho Engine', description: '正射处理内核', mode: 'offline_batch' }
    ],
    expectedOutputs: ['Orthophoto', 'Point Cloud', '3D Model'],
    compatibility: {
      edgeNodes: ['All'],
      gpuRequired: false,
      minOS: 'v1.0.0'
    },
    scopes: {
      read: ['Media'],
      write: ['Artifacts'],
      outbound: false
    }
  }
];