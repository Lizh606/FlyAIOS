import { TranslationModule } from '../types';

export const deployments: TranslationModule = {
  'deployments.title': { zh: '部署策略管理', en: 'Deployments' },
  'deployments.subtitle': { zh: '监控工作流在各个项目和边缘节点上的部署状态与策略。', en: 'Monitor workflow deployment status across projects and edge nodes.' },
  'deployments.col.id': { zh: '部署 ID', en: 'Deployment ID' },
  'deployments.col.workflow': { zh: '工作流', en: 'Workflow' },
  'deployments.col.project': { zh: '项目', en: 'Project' },
  'deployments.col.version': { zh: '版本', en: 'Version' },
  'deployments.col.status': { zh: '状态', en: 'Status' },
  'deployments.col.policyVersion': { zh: 'Policy 版本', en: 'Policy Ver.' },
  'deployments.col.nodes': { zh: '下发目标', en: 'Edge Nodes' },
  'deployments.col.updatedAt': { zh: '更新时间', en: 'Updated At' },
  
  // Status Labels
  'deployments.status.applying': { zh: '正在下发', en: 'Applying' },
  'deployments.status.applied': { zh: '下发成功', en: 'Applied' },
  'deployments.status.failed': { zh: '下发失败', en: 'Failed' },
  'deployments.status.partial': { zh: '部分成功', en: 'Partial' },
  'deployments.status.impact': { zh: '影响范围', en: 'Impact' },
  'deployments.status.panelTitle': { zh: '部署详情摘要', en: 'Deployment Summary' },
  'deployments.status.what': { zh: '当前状态', en: 'Stage' },
  'deployments.status.why': { zh: '原因说明', en: 'Reason' },
  'deployments.status.when': { zh: '最后同步', en: 'Last Sync' },
  'deployments.status.next': { zh: '后续操作建议', en: 'NEXT STEPS' },

  // Detail Layout
  'deployments.detail.modes': { zh: '处理链路', en: 'Processing Modes' },
  'deployments.detail.liveBinding': { zh: 'Live 会话绑定策略 (摘要)', en: 'Live Session Binding (Summary)' },
  'deployments.detail.nodes': { zh: '生效边缘节点', en: 'Edge Nodes' },
  'deployments.detail.history': { zh: '部署历史与联动', en: 'History & Links' },
  'deployments.detail.rollback': { zh: '回滚策略', en: 'Rollback Policy' },
  'deployments.detail.publish': { zh: '发布新部署', en: 'Publish' },
  'deployments.detail.preview': { zh: '预览策略', en: 'Preview Policy' },
  'deployments.detail.targets': { zh: '目标节点', en: 'Targets' },
  'deployments.detail.lastApplied': { zh: '最后下发', en: 'Last Applied' },
  'deployments.detail.viewHistory': { zh: '查看完整审计日志', en: 'View full audit log' },

  // Live Binding Labels (v0.2 Requirements - Read Only)
  'deployments.live.ingestStatus': { zh: 'Ingest 确认', en: 'Ingest Confirmed' },
  'deployments.live.heartbeat': { zh: '最后心跳', en: 'Last Heartbeat' },
  'deployments.live.targetPriority': { zh: '目标优先级', en: 'Target Priority' },
  'deployments.live.failover': { zh: '故障切换历史', en: 'Failover History' },
  'deployments.live.latency': { zh: '传输延迟', en: 'Latency' },

  // Link Buttons (Standardized)
  'deployments.links.recentRuns': { zh: '查看运行记录 (Runs)', en: 'View Runs' },
  'deployments.links.executions': { zh: '查看物理执行 (Executions)', en: 'View Executions' },

  // Processing Modes
  'deployments.mode.edge': { zh: '边缘实时', en: 'Edge Real-time' },
  'deployments.mode.cloud': { zh: '近实时云', en: 'Near Real-time' },
  'deployments.mode.batch': { zh: '离线批处理', en: 'Offline Batch' },

  // Node Metrics/Tags
  'deployments.node.ingest': { zh: '接入就绪', en: 'Ingest Ready' },
  'deployments.node.ingestNot': { zh: '接入异常', en: 'Ingest Not Ready' },
  'deployments.node.diskOk': { zh: '存储正常', en: 'Disk OK' },
  'deployments.node.diskWarn': { zh: '空间预警', en: 'Disk WARN' },

  // Rollback Modal
  'deployments.rollback.confirm': { zh: '确认回滚部署策略', en: 'Confirm Policy Rollback' },
  'deployments.rollback.desc': { zh: '此操作将撤销当前所有节点的策略部署，并将机队回退到版本 {version}。', en: 'This will undo current deployment and rollback the fleet to version {version}.' },
  'deployments.rollback.impact': { zh: '此操作将导致 {count} 个边缘节点的业务服务重启。', en: 'This will cause {count} edge nodes to restart services.' },
};