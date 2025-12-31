
import { ExecutionStatus } from '../shared/types';

export const ProjectService = {
  getProjects: async () => [
    { id: '1', name: 'Alpha Substation Inspection', status: 'active', missions: 12, date: '2025-12-19', thumb: 'https://picsum.photos/seed/1/400/225' },
    { id: '2', name: 'Marina Solar Plant Phase II', status: 'idle', missions: 8, date: '2025-12-18', thumb: 'https://picsum.photos/seed/2/400/225' },
    { id: '3', name: 'Downtown Mapping Project', status: 'syncing', missions: 4, date: '2025-12-17', thumb: '' },
    { id: '4', name: 'South Pipeline Security Monitoring', status: 'active', missions: 15, date: '2025-12-16', thumb: 'https://picsum.photos/seed/4/400/225' },
  ],
};

export const ExecutionService = {
  getHistory: async (projectId: string) => [
    { id: 'ex-001', missionName: 'Alpha Grid Survey', date: '2025-12-19 14:20', duration: '12m 40s', status: ExecutionStatus.COMPLETED, mediaCount: 128, distance: '1.2km', thumbnail: 'https://picsum.photos/seed/ex1/200/200' },
    { id: 'ex-002', missionName: 'Facade Inspection', date: '2025-12-18 09:15', duration: '08m 15s', status: ExecutionStatus.COMPLETED, mediaCount: 94, distance: '0.8km', thumbnail: 'https://picsum.photos/seed/ex2/200/200' },
    { id: 'ex-003', missionName: 'Alpha Grid Survey', date: '2025-12-17 16:30', duration: '05m 10s', status: ExecutionStatus.FAILED, mediaCount: 22, distance: '0.4km', thumbnail: 'https://picsum.photos/seed/ex3/200/200' },
  ],
};
