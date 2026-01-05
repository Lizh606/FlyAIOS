
import { TranslationModule } from '../types';

export const integrations: TranslationModule = {
  'integrations.title': { zh: '外部集成管理', en: 'Integrations' },
  'integrations.subtitle': { zh: '配置并监控外部业务系统、Webhooks 及工单系统的连接事实。', en: 'Manage and monitor connections to external systems.' },
  'integrations.newConnection': { zh: '新建连接', en: 'New Connection' },
  'integrations.searchPlaceholder': { zh: '搜索连接名称 / UID / 协议类型...', en: 'Search Name / UID / Type...' },
  
  // Tabs
  'integrations.tab.all': { zh: '全部连接', en: 'All' },
  'integrations.tab.webhook': { zh: 'Webhooks', en: 'Webhooks' },
  'integrations.tab.workorder': { zh: '工单系统', en: 'Work Orders' },
  
  // Columns
  'integrations.col.name': { zh: '连接名称', en: 'Connection Name' },
  'integrations.col.type': { zh: '协议类型', en: 'Type' },
  'integrations.col.status': { zh: '状态', en: 'Status' },
  'integrations.col.updated': { zh: '更新时刻', en: 'Updated' },
  
  // Actions
  'integrations.action.view': { zh: '查看详情', en: 'View' },
  'integrations.action.edit': { zh: '编辑配置', en: 'Edit Config' },
  'integrations.action.save': { zh: '保存配置', en: 'Save Config' },
  'integrations.action.cancel': { zh: '取消编辑', en: 'Cancel' },
  'integrations.action.enable': { zh: '启用连接', en: 'Enable' },
  'integrations.action.disable': { zh: '禁用连接', en: 'Disable' },
  'integrations.action.test': { zh: '测试连通性', en: 'Test Connection' },
  'integrations.action.logs': { zh: '查看投递日志', en: 'Delivery Logs' },
  'integrations.action.delete': { zh: '删除连接', en: 'Delete' },
  'integrations.action.deleteConfirm': { zh: '确定删除该集成连接吗？此操作不可撤销且会中断自动化流程。', en: 'Delete this connection? This is irreversible.' },
  'integrations.action.unsavedConfirm': { zh: '您有尚未保存的更改，确定要关闭吗？', en: 'You have unsaved changes. Are you sure you want to close?' },
  
  // Drawer
  'integrations.drawer.tab.basic': { zh: '基础配置', en: 'Basic Config' },
  'integrations.drawer.tab.deliveries': { zh: '投递记录', en: 'Deliveries' },
  'integrations.drawer.endpoint': { zh: '回调地址 (Endpoint)', en: 'Endpoint' },
  'integrations.drawer.auth': { zh: '鉴权方式', en: 'Auth Type' },
  'integrations.drawer.mapping': { zh: '事件路由映射', en: 'Event Mapping' },
  'integrations.drawer.emptyDeliveries': { zh: '暂无近期投递记录', en: 'No recent deliveries' },
  'integrations.drawer.auditId': { zh: '连接 ID', en: 'Connection ID' },
  'integrations.drawer.section.meta': { zh: '元数据摘要', en: 'Metadata Summary' },
  'integrations.drawer.section.events': { zh: '订阅事件', en: 'Subscribed Events' },
  'integrations.drawer.noPermission': { zh: '您没有权限编辑此连接配置', en: 'No permission to edit this config' },

  // Event Mapping
  'integrations.event.ReviewTrue': { zh: '云端复核完成 (真)', en: 'Review Completed (True)' },
  'integrations.event.ReportReady': { zh: '巡检报告就绪', en: 'Report Ready' },
  'integrations.event.EdgeAlertRaised': { zh: '边缘告警触发', en: 'Edge Alert Raised' },
  'integrations.event.SystemError': { zh: '系统运行异常', en: 'System Error' },

  // Delivery Table
  'integrations.delivery.time': { zh: '投递时刻', en: 'Time' },
  'integrations.delivery.status': { zh: '状态', en: 'Status' },
  'integrations.delivery.code': { zh: '响应', en: 'HTTP' },
  'integrations.delivery.latency': { zh: '延迟', en: 'Latency' },
  'integrations.delivery.run': { zh: '关联 Run', en: 'Linked Run' },
  'integrations.delivery.viewRun': { zh: '查看证据', en: 'View Run' },
  'integrations.delivery.listening': { zh: '实时监听中', en: 'LIVE LISTENING' },
  'integrations.delivery.errorDetail': { zh: '错误详情', en: 'Error Details' },
  'integrations.delivery.reason': { zh: '原因说明', en: 'Reason' },
  
  // States
  'integrations.state.connected': { zh: '正常', en: 'CONNECTED' },
  'integrations.state.degraded': { zh: '降级', en: 'DEGRADED' },
  'integrations.state.failed': { zh: '失败', en: 'FAILED' },
  'integrations.state.success': { zh: '成功', en: 'SUCCESS' },
  'integrations.state.fail': { zh: '失败', en: 'FAIL' },
  'integrations.state.retrying': { zh: '重试中', en: 'RETRYING' },
  'integrations.state.manage': { zh: '管理集成连接', en: 'Manage' },
  'integrations.state.viewConnection': { zh: '查看集成详情', en: 'View Integration' },
};
