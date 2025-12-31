import { TranslationModule } from '../types';

export const runs: TranslationModule = {
  'runs.title': { zh: '运行记录', en: 'Execution Runs' },
  'runs.subtitle': { zh: '追溯自动化执行的每一个环节：从触发事件到最终业务回执。', en: 'Trace every step of automation.' },
  
  // Detail Page
  'runs.detail.title': { zh: '运行证据链', en: 'Run Evidence Trace' },
  'runs.detail.timeline': { zh: '证据时间线', en: 'Evidence Timeline' },
  'runs.detail.artifacts': { zh: '产物与结果', en: 'Artifacts & Results' },
  'runs.detail.inspector': { zh: '检查器', en: 'Inspector' },
  'runs.detail.openExecution': { zh: '查看执行', en: 'View Execution' },
  'runs.detail.openLive': { zh: '进入直播', en: 'Open Live' },
  'runs.detail.triggeredAt': { zh: '触发于 {time}', en: 'Triggered at {time}' },

  // Timeline Steps
  'runs.step.edge': { zh: '边缘侧 AI 识别', en: 'Edge AI Inference' },
  'runs.step.cloud': { zh: '云端逻辑复核', en: 'Cloud Review' },
  'runs.step.receipt': { zh: '业务回执推送', en: 'Business Receipt' },
  'runs.step.offline': { zh: '巡检报告生成', en: 'Report Generation' },
  'runs.step.details': { zh: '查看原始证据', en: 'Evidence Details' },

  // Audit Status
  'runs.audit.valid': { zh: '审计链完整有效', en: 'Audit Chain Valid' },
  'runs.audit.verified': { zh: '系统完整性校验已通过', en: 'Verified' },
  'runs.audit.statusLabel': { zh: '审计校验状态', en: 'Audit Status' },

  // Inspector Labels
  'runs.label.policy': { zh: '部署策略版本', en: 'Policy Version' },
  'runs.label.appPack': { zh: '应用包版本', en: 'AppPack' },
  'runs.label.model': { zh: '模型发布版本', en: 'Model Release' },
  'runs.label.event': { zh: '触发事件 ID', en: 'Event ID' },
  'runs.label.idempotency': { zh: '业务幂等键', en: 'Idempotency Key' },
  'runs.label.external': { zh: '外部回执信息', en: 'External Receipt' },

  // Artifacts (Component Specific)
  'runs.artifact.pdf': { zh: '分析报告', en: 'Reports' },
  'runs.artifact.image': { zh: '任务关键帧', en: 'Keyframes' },
  'runs.artifact.log': { zh: '执行日志', en: 'Logs' },
  'runs.artifact.receipt': { zh: '业务回执', en: 'Receipts' },
  'runs.artifact.detailsTitle': { zh: '产物清单详情', en: 'Artifact Details' },

  // Legacy Plurals
  'runs.artifacts.keyframes': { zh: '任务关键帧', en: 'Keyframes' },
  'runs.artifacts.reports': { zh: '分析报告', en: 'Reports' },
  'runs.artifacts.viewAll': { zh: '查看全部', en: 'View All' },
  'runs.artifacts.download': { zh: '下载文件', en: 'Download' },

  // Filters & Columns
  'runs.col.id': { zh: '运行 ID', en: 'Run ID' },
  'runs.col.project': { zh: '项目名称', en: 'Project' },
  'runs.col.workflow': { zh: '工作流', en: 'Workflow' },
  'runs.col.status': { zh: '运行状态', en: 'Status' },
  'runs.col.started': { zh: '启动时刻', en: 'Started' },
  'runs.col.duration': { zh: '耗时', en: 'Duration' },
  'runs.col.outputs': { zh: '产物摘要', en: 'Artifacts' },
  'runs.filter.searchPlaceholder': { zh: '搜索运行 ID、项目名称...', en: 'Search...' },
  'runs.filter.workflow': { zh: '关联工作流', en: 'Workflow' },
  'runs.filter.status': { zh: '运行状态', en: 'Status' },
  'runs.filter.allWorkflow': { zh: '全部工作流', en: 'All' },
  'runs.filter.allStatus': { zh: '全部状态', en: 'All Status' },

  // Status Labels
  'runs.state.completed': { zh: '已完成', en: 'Success' },
  'runs.state.failed': { zh: '已失败', en: 'Failed' },
  'runs.state.running': { zh: '运行中', en: 'Running' },
  'runs.state.generating': { zh: '产物生成中', en: 'Generating...' },

  // Actions
  'runs.action.rerun': { zh: '重跑逻辑', en: 'Rerun' },
  'runs.action.rerunConfirm': { zh: '确定要重新触发该工作流的逻辑吗？', en: 'Rerun this logic?' },
  'runs.tool.refresh': { zh: '刷新', en: 'Refresh' },
  'runs.tool.audit': { zh: '审计日志', en: 'Audit Log' },
};