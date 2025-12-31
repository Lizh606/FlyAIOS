
import { TranslationModule } from '../types';

export const workflows: TranslationModule = {
  'workflows.title': { zh: '工作流模板', en: 'Workflow Templates' },
  'workflows.subtitle': { zh: '从行业标准模板开始，快速构建您的自动化巡检流程。', en: 'Start from industry templates to build your automation.' },
  'workflows.searchPlaceholder': { zh: '搜索模板名称或行业...', en: 'Search templates or industries...' },
  'workflows.empty': { zh: '未找到匹配的模板', en: 'No templates found' },
  'workflows.custom': { zh: '自定义工作流', en: 'Custom Workflow' },
  
  // Distribution
  'workflows.distribution.title': { zh: '版本分布', en: 'VERSION DISTRIBUTION' },
  'workflows.distribution.allStatus': { zh: '全部状态', en: 'ALL STATUS' },

  // Industries
  'workflows.industry.all': { zh: '全部行业', en: 'All Industries' },
  'workflows.industry.powerline': { zh: '电力巡检', en: 'Powerline' },
  'workflows.industry.solar': { zh: '光伏新能源', en: 'Solar Energy' },
  'workflows.industry.security': { zh: '安全安防', en: 'Security' },

  // Drawer
  'workflows.drawer.useTemplate': { zh: '使用此模板', en: 'Use Template' },
  'workflows.drawer.overview': { zh: '方案概览', en: 'Overview' },
  'workflows.drawer.flow': { zh: '流程预览', en: 'Workflow Preview' },
  'workflows.drawer.expectedOutputs': { zh: '预期产物', en: 'Expected Outputs' },
  'workflows.drawer.triggers': { zh: '触发器', en: 'Triggers' },
  'workflows.drawer.processingModes': { zh: '处理模式', en: 'Processing Modes' },
  'workflows.drawer.usedApps': { zh: '此模板用到的 Apps', en: 'Apps used in this template' },
  'workflows.drawer.official': { zh: 'FlyAIOS 官方', en: 'FlyAIOS Official' },

  // Studio
  'workflows.studio.publish': { zh: '发布版本', en: 'Publish' },
  'workflows.studio.deploy': { zh: '部署策略', en: 'Deployment' },
  'workflows.studio.whereUsed': { zh: '部署范围', en: 'Where Used' },
  'workflows.studio.observe': { zh: '运行观测', en: 'Observe' },
  'workflows.studio.inspector': { zh: '节点配置', en: 'Inspector' },
  'workflows.studio.canvas.trigger': { zh: '触发源', en: 'Trigger' },
  'workflows.studio.canvas.triggerDesc': { zh: '执行开始 / 边缘告警触发', en: 'ExecutionStarted / EdgeAlertRaised' },
  'workflows.studio.canvas.steps': { zh: '处理步骤', en: 'Process Steps' },
  'workflows.studio.canvas.complete': { zh: '工作流执行完毕', en: 'Workflow Complete' },
  'workflows.studio.draftMode': { zh: '草稿模式', en: 'Draft Mode' },
  'workflows.studio.policyActive': { zh: '策略生效中', en: 'Policy Active' },

  // Inspector Fields & Descriptions
  'workflows.inspector.empty': { zh: '选择节点以进行配置', en: 'Select a node to configure' },
  'workflows.node.threshold': { zh: '识别阈值', en: 'Threshold' },
  'workflows.node.thresholdDesc': { zh: '提高阈值可减少噪杂环境下的误报。', en: 'Increase threshold to reduce false alerts in noisy environments.' },
  'workflows.node.lowConfidenceOnly': { zh: '仅对低置信度触发', en: 'Low Confidence Only' },
  'workflows.node.lowConfidenceDesc': { zh: '启用后，仅置信度 < 0.90 的边缘识别结果会触发云端复核。', en: 'When enabled, only edge detections with confidence < 0.90 will trigger cloud-based review.' },
  'workflows.node.reportTemplate': { zh: '报告模板', en: 'Report Template' },
  'workflows.node.verifiedOnly': { zh: '仅对复核为真触发', en: 'Only if Verified' },
  'workflows.node.webhookDesc': { zh: '仅当云端复核结果为“真”时，才在外部系统中自动创建工单。', en: 'Automatically create a Work Order in the external system only if the Cloud Review result is "True".' },
  'workflows.node.inputDeps': { zh: '输入依赖', en: 'Input Dependencies' },

  // Observe
  'workflows.observe.recentRuns': { zh: '最近 20 条运行记录', en: 'Recent 20 Runs' },
  'workflows.observe.noRuns': { zh: '暂无运行记录', en: 'No runs yet' },
  'workflows.observe.viewAll': { zh: '查看全部记录', en: 'View All Runs' },
  'workflows.observe.activeDesc': { zh: '当前工作流版本的实时监测已开启。', en: 'Live monitoring is currently active for this workflow version.' },

  // Where Used
  'workflows.whereUsed.title': { zh: '工作流部署摘要', en: 'Deployment Summary' },
  'workflows.whereUsed.policyApplied': { zh: '策略已应用', en: 'Policy Applied' },
  'workflows.whereUsed.active': { zh: '生效中', en: 'Active' },
  'workflows.whereUsed.latest': { zh: '最新', en: 'LATEST' },
  'workflows.whereUsed.projects': { zh: '关联项目', en: 'Linked Projects' },
  'workflows.whereUsed.nodes': { zh: '生效节点数', en: 'Active Nodes' },
  'workflows.whereUsed.syncStatus': { zh: '{percent}% 的 NorthGrid 机队已同步至此版本。', en: '{percent}% of NorthGrid fleet synchronized with this version.' },
  'workflows.whereUsed.viewDeployments': { zh: '查看部署详情', en: 'View Deployments' },
  'workflows.whereUsed.triggersEnabled': { zh: '已开启的触发器', en: 'Triggers Enabled' },
};
