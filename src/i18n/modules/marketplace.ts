
import { TranslationModule } from '../types';

export const marketplace: TranslationModule = {
  'marketplace.title': { zh: '应用中心', en: 'App Marketplace' },
  'marketplace.subtitle': { zh: '探索并安装行业 AI 能力包，扩展您的工作流自动化能力。', en: 'Explore and install industry AI packs to extend your workflow automation.' },
  'marketplace.searchPlaceholder': { zh: '搜索应用名称、能力或发布者...', en: 'Search app name, capability or publisher...' },
  'marketplace.filter.installed': { zh: '仅显示已安装', en: 'Installed Only' },
  'marketplace.empty': { zh: '未找到符合条件的应用', en: 'No apps found matching your criteria' },
  'marketplace.status.installed': { zh: '已安装', en: 'INSTALLED' },
  
  // Industry Tabs
  'marketplace.industry.all': { zh: '全部行业', en: 'All Industries' },
  'marketplace.industry.powerline': { zh: '电力巡检', en: 'Powerline' },
  'marketplace.industry.solar': { zh: '光伏新能源', en: 'Solar Energy' },
  'marketplace.industry.security': { zh: '安全安防', en: 'Security' },
  'marketplace.industry.generic': { zh: '通用测绘', en: 'Generic Mapping' },

  // Drawer
  'marketplace.drawer.install': { zh: '获取并安装应用', en: 'Get & Install' },
  'marketplace.drawer.updateTo': { zh: '更新至 {version}', en: 'Update to {version}' },
  'marketplace.drawer.installed': { zh: '已安装 {version}', en: 'Installed {version}' },
  'marketplace.drawer.capabilities': { zh: '包含的能力', en: 'Capabilities' },
  'marketplace.drawer.compatibility': { zh: '兼容性', en: 'Compatibility' },
  'marketplace.drawer.scopes': { zh: '权限范围', en: 'Permissions & Scopes' },
  'marketplace.drawer.historyTitle': { zh: '版本记录与变更说明', en: 'Change Log' },
  'marketplace.drawer.history': { zh: '版本记录', en: 'Version History' },
  'marketplace.drawer.recentRuns': { zh: '最近执行记录', en: 'Recent Runs' },
  'marketplace.drawer.usedByWorkflows': { zh: '关联工作流', en: 'Workflows' },
  'marketplace.drawer.usedByCount': { zh: '管理 {count} 个关联工作流', en: 'Manage {count} Workflows' },
  'marketplace.drawer.adapterNodes': { zh: '适配节点', en: 'Compatible Nodes' },
  'marketplace.drawer.gpuRequired': { zh: '硬件加速 (GPU)', en: 'GPU Acceleration' },
  'marketplace.drawer.gpuTrue': { zh: '需要 NVIDIA 加速', en: 'NVIDIA Required' },
  'marketplace.drawer.gpuFalse': { zh: '支持 CPU 运行', en: 'CPU Only' },
  'marketplace.drawer.minOS': { zh: '最低固件要求', en: 'Min Firmware' },
  'marketplace.drawer.certifiedTooltip': { zh: 'FlyAIOS 官方签名认证', en: 'FlyAIOS Certified' },
  'marketplace.drawer.models': { zh: '适配机型', en: 'UAV Models' },
  'marketplace.drawer.nodes': { zh: '边缘节点类型', en: 'Node Types' },

  // Wizard
  'marketplace.wizard.title': { zh: '安装应用向导', en: 'App Installation Wizard' },
  'marketplace.wizard.step.scopes': { zh: '授权范围', en: 'Scopes' },
  'marketplace.wizard.step.target': { zh: '安装目标', en: 'Target' },
  'marketplace.wizard.step.config': { zh: '预设参数', en: 'Config' },
  'marketplace.wizard.scope.desc': { zh: '数据域读取/写入说明', en: 'Data Access Description' },
  'marketplace.wizard.scope.media': { zh: '应用将获取项目媒体数据 (Images/Videos) 的读取权限', en: 'Read access to project media (Images/Videos)' },
  'marketplace.wizard.scope.artifacts': { zh: '应用将被允许向结果域 (Artifacts) 写入新数据', en: 'Write access to results domain (Artifacts)' },
  'marketplace.wizard.scope.outbound': { zh: '警告：此应用包含外发 Webhook 能力', en: 'Warning: This app has outbound Webhook capability' },
  'marketplace.wizard.scope.agree': { zh: '我已阅读并知晓该应用所需的权限范围', en: 'I have read and acknowledged the permissions' },
  'marketplace.wizard.target.label': { zh: '安装到 (Scope)', en: 'Install to (Scope)' },
  'marketplace.wizard.target.tenant': { zh: '全租户 (Tenant Global)', en: 'Tenant Global' },
  'marketplace.wizard.target.project': { zh: 'NorthGrid-2026Q1 (项目级)', en: 'Project: NorthGrid-2026Q1' },
  'marketplace.wizard.target.tip': { zh: '提示：安装到租户全局将使所有项目可引用此应用包。', en: 'Tip: Installing to Tenant Global allows all projects to reference this pack.' },
  'marketplace.wizard.config.threshold': { zh: '缺陷识别阈值', en: 'Detection Threshold' },
  'marketplace.wizard.config.template': { zh: '报告模板', en: 'Report Template' },
  'marketplace.wizard.installing': { zh: '正在安装...', en: 'Installing...' },
  'marketplace.wizard.installNow': { zh: '立即安装', en: 'Install Now' },
  'marketplace.wizard.success': { zh: '{name} 安装成功！', en: '{name} installed successfully!' },

  // Processing Modes
  'marketplace.mode.edge': { zh: '边缘实时', en: 'Edge Real-time' },
  'marketplace.mode.cloud': { zh: '近实时云', en: 'Near Real-time Cloud' },
  'marketplace.mode.batch': { zh: '离线批处理', en: 'Offline Batch' },
};
