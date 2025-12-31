
import { TranslationModule } from '../types';

export const executions: TranslationModule = {
  'executions.title': { zh: '执行监视中心', en: 'Executions Monitor' },
  'executions.subtitle': { zh: '实时监控正在进行的飞行任务、识别事件与告警流。', en: 'Real-time monitoring of active flights.' },
  
  // Table Columns
  'executions.col.id': { zh: '执行 ID', en: 'Execution ID' },
  'executions.col.target': { zh: '目标对象', en: 'Target' },
  'executions.col.status': { zh: '执行状态', en: 'Status' },
  'executions.col.live': { zh: '实时链路', en: 'Live Session' },
  'executions.col.alerts': { zh: '实时告警', en: 'Alerts' },
  'executions.col.time': { zh: '启动时刻', en: 'Started At' },
  'executions.col.duration': { zh: '耗时', en: 'Duration' },

  // Execution Status Mapping
  'executions.status.queued': { zh: '任务排队', en: 'QUEUED' },
  'executions.status.preparing': { zh: '设备就绪中', en: 'PREPARING' },
  'executions.status.executing': { zh: '正在执行', en: 'EXECUTING' },
  'executions.status.returning': { zh: '正在返航', en: 'RETURNING' },
  'executions.status.completed': { zh: '已完成', en: 'COMPLETED' },
  'executions.status.failed': { zh: '已失败', en: 'FAILED' },

  // Status Level 2 Panel
  'executions.status.panelTitle': { zh: '执行状态详情', en: 'Status Details' },
  'executions.status.what': { zh: '当前阶段', en: 'Current Stage' },
  'executions.status.why': { zh: '状态原因', en: 'Reason' },
  'executions.status.when': { zh: '最后更新', en: 'Last Updated' },
  'executions.status.next': { zh: '操作建议', en: 'RECOMMENDED ACTIONS' },

  // Detail Tabs
  'executions.tab.overview': { zh: '任务概览', en: 'Overview' },
  'executions.tab.live': { zh: '实时直播', en: 'Live' },
  'executions.tab.automation': { zh: '证据链追溯', en: 'Automation' },

  // Live Workbench Core
  'executions.live.session': { zh: '会话 ID', en: 'SESSION' },
  'executions.live.target': { zh: '信号源', en: 'TARGET' },
  'executions.live.quality': { zh: '信号质量', en: 'QUALITY' },
  'executions.live.latency': { zh: '延迟', en: 'LATENCY' },
  'executions.live.edge': { zh: '边缘节点', en: 'Edge' },
  'executions.live.cloud': { zh: '云端转发', en: 'Cloud' },
  'executions.live.normal': { zh: '良好', en: 'Good' },
  'executions.live.degraded': { zh: '质量下降', en: 'Degraded' },
  'executions.live.retry': { zh: '重连', en: 'RETRY' },
  'executions.live.switchTarget': { zh: '切源', en: 'SWITCH' },
  'executions.live.stop': { zh: '终止', en: 'STOP' },
  'executions.live.threshold': { zh: '识别阈值', en: 'THRESHOLD' },
  'executions.live.classes': { zh: '识别类别', en: 'CLASSES' },

  // Live States (Missing fixed)
  'executions.live.state.off': { zh: '信号源已离线', en: 'STREAM OFFLINE' },
  'executions.live.state.starting': { zh: '正在接入信号', en: 'INGESTING' },
  'executions.live.state.live': { zh: '直播中', en: 'LIVE' },
  'executions.live.state.degraded': { zh: '链路降级', en: 'DEGRADED' },

  // Live Alerts & Banners
  'executions.live.alert.starting': { zh: '信号正在接入，若长时间未成功请尝试重连。', en: 'Ingest starting. Retry if timeout.' },
  'executions.live.alert.degraded': { zh: '检测到链路不稳定，视频已自动降级播放协议以优先保证流畅度。', en: 'Unstable link. Protocol degraded for latency.' },

  // Sidebar Panels
  'executions.live.detections': { zh: '实时检测流', en: 'Detections' },
  'executions.live.alerts': { zh: '严重告警流', en: 'Critical Alerts' },
  'executions.live.filter.class': { zh: '类别筛选', en: 'Classes' },
  'executions.live.filter.conf': { zh: '置信度', en: 'Confidence' },
  'executions.live.tag.verified': { zh: '高置信', en: 'VERIFIED' },
  'executions.live.tag.critical': { zh: '危急', en: 'CRITICAL' },
  'executions.live.tag.warning': { zh: '警告', en: 'WARN' },

  // Sections
  'executions.detail.telemetry': { zh: '遥测数据摘要', en: 'Telemetry Summary' },
  'executions.detail.routeLogs': { zh: '飞行路径日志', en: 'Route Logs' },
  'executions.detail.routeLogsDesc': { zh: '显示实时下发的 MAVLink 遥测坐标与关键航点事件。', en: 'Real-time MAVLink telemetry and waypoint events.' },
  'executions.detail.device': { zh: '执行设备信息', en: 'Device Info' },
  'executions.detail.timeline': { zh: '任务时间轴', en: 'Execution Timeline' },
  
  // Metrics Labels
  'executions.detail.metrics.duration': { zh: '飞行耗时', en: 'DURATION' },
  'executions.detail.metrics.alerts': { zh: '实时告警', en: 'ALERTS' },
  'executions.detail.metrics.session': { zh: '会话 ID', en: 'SESSION' },
  'executions.detail.metrics.run': { zh: '关联运行记录', en: 'LINKED RUN' },

  // Automation Panel
  'executions.auto.boundPolicies': { zh: '绑定的自动化策略', en: 'Bound Policies' },
  'executions.auto.workflow': { zh: '关联工作流', en: 'Workflow' },
  'executions.auto.deployment': { zh: '部署快照', en: 'Deployment' },
  'executions.auto.triggeredRuns': { zh: '已触发的运行记录', en: 'Triggered Runs' },
  'executions.auto.sessionFacts': { zh: '会话审计事实', en: 'Session Facts' },
  'executions.auto.openRun': { zh: '查看详情', en: 'OPEN RUN' },

  // Facts Labels
  'executions.auto.fact.sessionId': { zh: '直播会话 ID', en: 'Session ID' },
  'executions.auto.fact.startedAt': { zh: '启动时间', en: 'Started At' },
  'executions.auto.fact.heartbeat': { zh: '最后心跳', en: 'Last Heartbeat' },
  'executions.auto.fact.ingest': { zh: '接入状态确认', en: 'Ingest Confirmation' },
  'executions.auto.fact.fallback': { zh: '故障切换历史', en: 'Failover History' },
  'executions.auto.fact.occurred': { zh: '已发生切换', en: 'Occurred' },
  'executions.auto.fact.none': { zh: '暂无切换记录', en: 'None' },
  
  'executions.auto.policy.applied': { zh: '应用状态', en: 'Status' },
  'executions.auto.policy.nodes': { zh: '生效节点', en: 'Nodes' },

  'executions.route.col.time': { zh: '时刻', en: 'TIME' },
  'executions.route.col.event': { zh: '事件', en: 'EVENT' },
  'executions.route.col.coord': { zh: '坐标 (LON, LAT)', en: 'COORD' },
  'executions.route.col.alt': { zh: '高度', en: 'ALT' },

  'executions.label.model': { zh: '设备型号', en: 'MODEL' },
  'executions.label.serial': { zh: '序列号', en: 'SERIAL' },
  'executions.label.status': { zh: '连接状态', en: 'STATUS' },
  'executions.label.firmware': { zh: '固件版本', en: 'FIRMWARE' },
};
