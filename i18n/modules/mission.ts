
import { TranslationModule } from '../types';

export const mission: TranslationModule = {
  'mission.title': { zh: '机场任务控制', en: 'Dock Missions' },
  'mission.viewHistory': { zh: '执行历史', en: 'History' },
  'mission.step1': { zh: '1. 设备选择', en: '1. Device' },
  'mission.step2': { zh: '2. 任务定义', en: '2. Mission' },
  'mission.step3': { zh: '3. 采集参数', en: '3. Profile' },
  'mission.validate': { zh: '校验并生成计划', en: 'Validate & Plan' },
  'mission.validating': { zh: '正在生成计划...', en: 'Planning...' },
  'mission.preparing': { zh: '设备预检...', en: 'Preflight...' },
  'mission.launch': { zh: '立即启动任务', en: 'Launch Mission' },
  'mission.executing': { zh: '正在执行...', en: 'Executing...' },
  'mission.restart': { zh: '重新开始', en: 'Restart' },
  'mission.snapshot': { zh: '计划快照', en: 'Snapshot' },
  'mission.v_nfz': { zh: '禁飞区校验', en: 'NFZ Check' },
  'mission.v_dem': { zh: '地形安全校验', en: 'Terrain' },
  'mission.v_health': { zh: '健康诊断', en: 'Health' },
  'mission.dockOnline': { zh: '在线', en: 'ONLINE' },
  'mission.console': { zh: '任务控制台', en: 'CONSOLE' },
  
  // Patterns
  'pattern.grid_mapping': { zh: '网格航拍', en: 'Grid Mapping' },
  'pattern.facade_scan': { zh: '立面扫描', en: 'Facade Scan' },
  'pattern.corridor': { zh: '廊道巡检', en: 'Corridor' },
  'pattern.orbit': { zh: '环绕探测', en: 'Orbit' },
  
  // Phases
  'phase.takeoff': { zh: '起飞/发射', en: 'Takeoff / Launch' },
  'phase.mission': { zh: '执行任务 ({pattern})', en: 'Mission ({pattern})' },
  'phase.rtl': { zh: '自动返航', en: 'RTL' },
  'phase.docked': { zh: '已入舱', en: 'Docked' },
};
