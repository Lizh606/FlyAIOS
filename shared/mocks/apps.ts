
export type ProcessingMode = 'edge_realtime' | 'near_real_time_cloud' | 'offline_batch';

export interface AppCapability {
  id: string;
  name: string;
  description: string;
  mode: ProcessingMode;
}

export interface VersionLog {
  version: string;
  date: string;
  changes: string[];
  channel: 'Stable' | 'Beta';
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
  usedWorkflowCount: number; // 新增：关联工作流统计
  capabilities: AppCapability[];
  expectedOutputs: string[];
  compatibility: {
    edgeNodes: string[];
    supportedModels: string[];
    gpuRequired: boolean;
    minOS: string;
  };
  scopes: {
    read: string[];
    write: string[];
    outbound: boolean;
  };
  versionHistory: VersionLog[];
}

export const MOCK_APPS: AppPack[] = [
  {
    id: 'powerline-pack-001',
    name: 'Powerline Inspection Pack',
    description: '端到端电力巡检套件，包含缺陷自动检测、云端复核与 AI 报告生成，专为输电线路运维设计。',
    publisher: 'FlyAIOS Labs',
    version: 'v1.3.0',
    channel: 'Stable',
    signature: 'Verified',
    industry: 'Powerline',
    icon: 'https://p.ipic.vip/vjblew.jpg',
    installedVersion: 'v1.3.0',
    usedWorkflowCount: 3,
    capabilities: [
      { id: 'c1', name: 'Edge Defect Alert', description: '边缘缺陷/异物实时告警', mode: 'edge_realtime' },
      { id: 'c2', name: 'Cloud Review', description: '云端复核应用', mode: 'near_real_time_cloud' },
      { id: 'c3', name: 'LLM Report', description: '报告生成应用', mode: 'offline_batch' },
    ],
    expectedOutputs: ['Alert', 'Keyframes', 'Review Result', 'PDF Report'],
    compatibility: {
      edgeNodes: ['Dock-12', 'Dock-17', 'Edge-Box-G2'],
      supportedModels: ['M350 RTK', 'M30T', 'M3E'],
      gpuRequired: true,
      minOS: 'v2.1.0'
    },
    scopes: {
      read: ['Telemetry', 'Media', 'MissionPlan'],
      write: ['AlertEvents', 'Artifacts'],
      outbound: true
    },
    versionHistory: [
      { version: 'v1.3.0', date: '2024-12-19', channel: 'Stable', changes: ['新增对 M3E 系列机型的适配'] }
    ]
  },
  {
    id: 'wildfire-monitor-004',
    name: 'Wildfire Monitor Pro',
    description: '针对森林防火的大规模红外监测包。支持烟雾自动识别、火点定位与扩散趋势预测，保障生态安全。',
    publisher: 'GreenEarth Tech',
    version: 'v1.0.0',
    channel: 'Stable',
    signature: 'Verified',
    industry: 'Generic',
    icon: 'https://picsum.photos/seed/fire/100/100',
    usedWorkflowCount: 0,
    installedVersion: undefined,
    capabilities: [
      { id: 'w1', name: 'Smoke Detection', description: '全天候烟雾/明火边缘识别', mode: 'edge_realtime' },
      { id: 'w2', name: 'Hotspot Mapping', description: '火点地理坐标转换', mode: 'near_real_time_cloud' },
      { id: 'w3', name: 'Forecast Report', description: '风向/火势扩散模拟报告', mode: 'offline_batch' }
    ],
    expectedOutputs: ['Fire Alert', 'Spread Map', 'Incident Report'],
    compatibility: {
      edgeNodes: ['Dock-12', 'Edge-G2-01'],
      supportedModels: ['M30T', 'M350 + H20T'],
      gpuRequired: true,
      minOS: 'v2.0.0'
    },
    scopes: {
      read: ['Media', 'Telemetry'],
      write: ['AlertEvents'],
      outbound: true
    },
    versionHistory: [
      { version: 'v1.0.0', date: '2024-11-30', channel: 'Stable', changes: ['初始版本发布'] }
    ]
  },
  {
    id: 'solar-thermal-002',
    name: 'Solar Thermal Analyzer',
    description: '针对光伏电站的热成像异常检测分析包，支持热斑自动标定与发电效率预测。',
    publisher: 'SunEnergy AI',
    version: 'v0.9.5',
    channel: 'Beta',
    signature: 'Verified',
    industry: 'Solar',
    icon: 'https://picsum.photos/seed/solar/100/100',
    usedWorkflowCount: 1,
    installedVersion: 'v0.9.0',
    capabilities: [
      { id: 's1', name: 'Thermal Hotspot', description: '热斑自动标定', mode: 'edge_realtime' }
    ],
    expectedOutputs: ['Thermal Map', 'Hotspot Alert'],
    compatibility: {
      edgeNodes: ['Edge-Box-G2'],
      supportedModels: ['M30T (Thermal)'],
      gpuRequired: true,
      minOS: 'v2.0.0'
    },
    scopes: { read: ['Media'], write: ['Artifacts'], outbound: false },
    versionHistory: [
      { version: '0.9.5', date: '2024-12-01', channel: 'Beta', changes: ['优化热斑标定算法'] }
    ]
  }
];
