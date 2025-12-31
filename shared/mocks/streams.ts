
import { DetectionEvent, AlertEvent } from '../types/domain';

export const MOCK_DETECTIONS: Record<string, DetectionEvent[]> = {
  'ex-82731': [
    { id: 'det-101', timestamp: '14:22:01', class: 'Insulator Damage', confidence: 0.94 },
    { id: 'det-102', timestamp: '14:22:15', class: 'Bird Nest', confidence: 0.88 },
    { id: 'det-103', timestamp: '14:23:40', class: 'Foreign Object', confidence: 0.72 },
    { id: 'det-104', timestamp: '14:24:12', class: 'Corrosion', confidence: 0.91 },
  ],
  'ex-82732': [
    { id: 'det-201', timestamp: '14:36:10', class: 'Tree Encroachment', confidence: 0.92 },
    { id: 'det-202', timestamp: '14:37:05', class: 'Foreign Object', confidence: 0.65 },
  ]
};

export const MOCK_ALERTS_DATA: Record<string, AlertEvent[]> = {
  'ex-82731': [
    { id: 'al-01', timestamp: '14:22:05', type: 'AI', level: 'Critical', message: 'Structural Hazard: Damage Detected', distance: '12.4m' },
    { id: 'al-02', timestamp: '14:25:30', type: 'System', level: 'Warning', message: 'Signal Intermittence detected', distance: 'N/A' },
    { id: 'al-03', timestamp: '14:28:10', type: 'Security', level: 'Critical', message: 'Proximity violation', distance: '5.2m' },
  ],
  'ex-82732': [
    { id: 'al-11', timestamp: '14:38:00', type: 'AI', level: 'Warning', message: 'Vegetation encroachment', distance: '8.5m' },
  ]
};

export interface StreamFacts {
  executionId: string;
  sessionId: string;
  startedAt: string;
  lastHeartbeat: string;
  ingestConfirmed: boolean;
  target: 'Edge' | 'Cloud';
  quality: 'OK' | 'Degraded';
  latency: string;
  fallbackHistory: string[];
}

export const MOCK_STREAM_FACTS: Record<string, StreamFacts> = {
  'ex-82731': {
    executionId: 'ex-82731',
    sessionId: 'ss-live-992',
    startedAt: '14:20:05',
    lastHeartbeat: '14:32:15',
    ingestConfirmed: true,
    target: 'Edge',
    quality: 'OK',
    latency: '120ms',
    fallbackHistory: []
  },
  'ex-82732': {
    executionId: 'ex-82732',
    sessionId: 'ss-live-993',
    startedAt: '14:35:10',
    lastHeartbeat: '14:37:12',
    ingestConfirmed: true,
    target: 'Cloud',
    quality: 'Degraded',
    latency: '480ms',
    fallbackHistory: ['Edge timeout - Switched to Cloud Ingest']
  }
};
