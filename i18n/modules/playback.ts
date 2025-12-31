
import { TranslationModule } from '../types';

export const playback: TranslationModule = {
  'playback.session': { zh: '任务会话', en: 'Session' },
  'playback.status.live': { zh: '实时', en: 'LIVE' },
  'playback.status.archived': { zh: '已归档', en: 'ARCHIVED' },
  'playback.metrics.altitude': { zh: '相对高度', en: 'Altitude' },
  'playback.metrics.battery': { zh: '剩余电量', en: 'Battery' },
  'playback.metrics.speed': { zh: '飞行速度', en: 'Speed' },
  'playback.metrics.signal': { zh: '图传信号', en: 'Signal' },
  'playback.metrics.dist': { zh: '累计里程', en: 'Dist' },
  'playback.metrics.media': { zh: '采集总数', en: 'Media' },
  'playback.metrics.wind': { zh: '环境风速', en: 'Wind' },
  'playback.metrics.excellent': { zh: '信号极佳', en: 'Excellent' },
  'playback.export': { zh: '导出报告', en: 'Export' },
  'playback.telemetry': { zh: '实时遥测', en: 'Telemetry' },
  'playback.events': { zh: '事件日志', en: 'Events' },
  'playback.logTitle': { zh: '归档日志', en: 'Archived Logs' },
  'playback.logDesc': { zh: '包含本次任务起降及飞行全程的原始日志文件。', en: 'Includes original logs.' },
  'playback.progress.complete': { zh: '任务已完成', en: 'Complete' },
  'playback.progress.label': { zh: '回放进度', en: 'Progress' },
  
  // Timeline Events
  'event.validated': { zh: '任务校验通过', en: 'Validated' },
  'event.dockOpened': { zh: '机场舱门已开启', en: 'Dock Opened' },
  'event.takeoff': { zh: '起飞成功', en: 'Takeoff Success' },
  'event.waypoint': { zh: '到达航点', en: 'Waypoint Reached' },
  'event.rtl': { zh: '已返航并降落', en: 'RTL & Landed' },
};
