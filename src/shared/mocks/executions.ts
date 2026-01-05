
import { Execution, ExecutionStatus, LiveState, RouteLog } from '../types/domain';

const generateLogs = (count: number): RouteLog[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `log-${1000 + i}`,
    timestamp: `14:${20 + Math.floor(i / 4)}:${(i % 4) * 15}`,
    event: i % 5 === 0 ? 'Waypoint Reached' : 'Telemetry Sync',
    coordinate: `121.${340 + i}, 31.${220 + i}`,
    altitude: 80 + Math.random() * 5
  })).reverse();
};

export const MOCK_EXECUTIONS: Execution[] = [
  {
    id: 'ex-82731',
    projectId: 'p-ng-2026',
    projectName: 'NorthGrid-2026Q1',
    deviceId: 'drone-alpha-01',
    deviceName: 'Alpha-X-01',
    dockId: 'dock-12',
    dockName: 'North-Dock-12',
    status: ExecutionStatus.EXECUTING,
    liveState: LiveState.LIVE,
    alertsCount: 3,
    startTime: '2025-12-19 14:20:00',
    duration: '12m 45s',
    streamSessionId: 'ss-live-992',
    runId: 'run-101',
    routeLogs: generateLogs(24)
  },
  {
    id: 'ex-82732',
    projectId: 'p-ng-2026',
    projectName: 'NorthGrid-2026Q1',
    deviceId: 'drone-alpha-02',
    deviceName: 'Alpha-X-02',
    dockId: 'dock-17',
    dockName: 'North-Dock-17',
    status: ExecutionStatus.RETURNING,
    liveState: LiveState.DEGRADED,
    alertsCount: 1,
    startTime: '2025-12-19 14:35:00',
    duration: '02m 10s',
    streamSessionId: 'ss-live-993',
    routeLogs: generateLogs(12)
  },
  {
    id: 'ex-82733',
    projectId: 'p-ng-2026',
    projectName: 'NorthGrid-2026Q1',
    deviceId: 'drone-alpha-03',
    deviceName: 'Alpha-X-03',
    status: ExecutionStatus.PREPARING,
    liveState: LiveState.STARTING,
    alertsCount: 0,
    startTime: '2025-12-19 14:55:00',
    routeLogs: []
  },
  {
    id: 'ex-82734',
    projectId: 'p-marina-01',
    projectName: 'Marina-Solar-Plant',
    deviceId: 'drone-solar-01',
    deviceName: 'Solar-Scan-01',
    status: ExecutionStatus.QUEUED,
    liveState: LiveState.OFF,
    alertsCount: 0,
    startTime: '2025-12-19 15:10:00'
  },
  {
    id: 'ex-82730',
    projectId: 'p-ng-2026',
    projectName: 'NorthGrid-2026Q1',
    deviceId: 'drone-alpha-01',
    deviceName: 'Alpha-X-01',
    status: ExecutionStatus.COMPLETED,
    liveState: LiveState.OFF,
    alertsCount: 5,
    startTime: '2025-12-19 13:00:00',
    endTime: '2025-12-19 13:22:00',
    duration: '22m 15s',
    runId: 'run-100',
    routeLogs: generateLogs(40)
  }
];
