
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronRight, RefreshCw, 
  Battery, Navigation2, Zap, ExternalLink, 
  Box, PencilRuler, Gauge, Camera, History, Activity, SlidersHorizontal, Loader2,
  Wind, CircleStop, CheckCircle2, Monitor, ShieldCheck
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useI18n } from '../i18n';
// Fix: Updated import path from '../types' to '../shared/types'
import { ExecutionStatus, CaptureProfile } from '../shared/types';
import FACollapseHandle from '../ui/FACollapseHandle';
import { links } from '../shared/linkBuilders';

const patternIds = ['grid_mapping', 'facade_scan', 'corridor', 'orbit'] as const;

const CAPTURE_PROFILES: CaptureProfile[] = [
  { id: 'standard', name: 'Standard Mapping', description: '80/70 Overlap', overlap: '80/70', altitude: 80, speed: 5.0 },
  { id: 'high_res', name: 'High Resolution', description: '90/80 Overlap', overlap: '90/80', altitude: 50, speed: 3.5 },
  { id: 'fast', name: 'Fast Patrol', description: '60/40 Overlap', overlap: '60/40', altitude: 100, speed: 8.0 },
];

const ROUTES = {
  grid_mapping: [
    { x: 200, y: 200 }, { x: 800, y: 200 }, { x: 800, y: 300 }, { x: 200, y: 300 },
    { x: 200, y: 400 }, { x: 800, y: 400 }, { x: 800, y: 500 }, { x: 200, y: 500 },
    { x: 200, y: 600 }, { x: 800, y: 600 }, { x: 800, y: 700 }, { x: 200, y: 700 }
  ],
  facade_scan: [
    { x: 300, y: 300 }, { x: 700, y: 300 }, { x: 700, y: 700 }, { x: 300, y: 700 }, { x: 300, y: 300 }
  ],
  corridor: [
    { x: 100, y: 100 }, { x: 300, y: 200 }, { x: 500, y: 150 }, { x: 700, y: 350 }, { x: 900, y: 300 }
  ],
  orbit: Array.from({ length: 41 }, (_, i) => {
    const angle = (i / 40) * Math.PI * 2;
    return { x: 500 + Math.cos(angle) * 200, y: 500 + Math.sin(angle) * 200 };
  })
};

const DroneMarker = ({ x, y, angle = 0, isPaused = false }: { x: number, y: number, angle?: number, isPaused?: boolean }) => (
  <g transform={`translate(${x}, ${y}) rotate(${angle})`}>
    <circle r="18" fill="rgba(var(--fa-brand), 0.1)" className={isPaused ? "" : "animate-ping"} />
    <path d="M-12,-12 L12,12 M-12,12 L12,-12" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <circle cx="-12" cy="-12" r="4" fill="rgba(var(--fa-brand), 1)" stroke="white" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" fill="rgba(var(--fa-brand), 1)" stroke="white" strokeWidth="1.5" />
    <circle cx="-12" cy="12" r="4" fill="rgba(var(--fa-brand), 1)" stroke="white" strokeWidth="1.5" />
    <circle cx="12" cy="-12" r="4" fill="rgba(var(--fa-brand), 1)" stroke="white" strokeWidth="1.5" />
    <rect x="-6" y="-6" width="12" height="12" fill="rgba(var(--fa-bg-topbar), 1)" rx="2" stroke="white" strokeWidth="1" />
    <circle cx="0" cy="-6" r="1.5" fill={isPaused ? "rgba(var(--fa-warning), 1)" : "rgba(var(--fa-error), 1)"} />
  </g>
);

const MissionControlPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useI18n();
  
  const [isValidating, setIsValidating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<ExecutionStatus>(ExecutionStatus.READY);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [patternType, setPatternType] = useState<typeof patternIds[number]>('grid_mapping');
  const [selectedProfileId, setSelectedProfileId] = useState('standard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isBottomPanelCollapsed, setIsBottomPanelCollapsed] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [isPaused] = useState(false);

  const currentRoute = useMemo(() => ROUTES[patternType] || [], [patternType]);
  const activeProfile = useMemo(() => CAPTURE_PROFILES.find(p => p.id === selectedProfileId), [selectedProfileId]);

  const dronePos = useMemo(() => {
    if (!currentRoute.length) return { x: 0, y: 0, angle: 0 };
    if (executionProgress <= 0) return { ...currentRoute[0], angle: 0 };
    if (executionProgress >= 100) return { ...currentRoute[currentRoute.length - 1], angle: 0 };
    const index = (executionProgress / 100) * (currentRoute.length - 1);
    const lower = Math.floor(index);
    const upper = Math.min(Math.ceil(index), currentRoute.length - 1);
    const tVal = index - lower;
    const p1 = currentRoute[lower] || currentRoute[0];
    const p2 = currentRoute[upper] || p1;
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI) + 90;
    return { x: p1.x + (p2.x - p1.x) * tVal, y: p1.y + (p2.y - p1.y) * tVal, angle };
  }, [executionProgress, currentRoute]);

  const currentPhase = useMemo(() => {
    if (currentStatus === ExecutionStatus.PREPARING) return t('mission.preparing');
    if (currentStatus === ExecutionStatus.READY) return t('mission.launch');
    if (executionProgress < 5) return t('phase.takeoff');
    if (executionProgress < 85) return t('phase.mission', { pattern: t('pattern.' + patternType) });
    if (executionProgress < 98) return t('phase.rtl');
    return t('phase.docked');
  }, [currentStatus, executionProgress, patternType, t]);

  useEffect(() => {
    let interval: any;
    if (isExecuting && executionProgress < 100 && !isPaused && currentStatus === ExecutionStatus.RUNNING) {
      interval = setInterval(() => {
        setExecutionProgress(prev => {
          const step = isReturning ? 1.5 : 0.5;
          const next = prev + step;
          return next >= 100 ? 100 : next;
        });
      }, 150);
    }
    if (executionProgress >= 100) setCurrentStatus(ExecutionStatus.COMPLETED);
    return () => clearInterval(interval);
  }, [isExecuting, executionProgress, isPaused, isReturning, currentStatus]);

  const handleValidate = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setIsValidated(true);
    }, 1200);
  };

  const handleExecute = () => {
    if (currentStatus === ExecutionStatus.COMPLETED) {
      setExecutionProgress(0);
      setIsExecuting(false);
      setCurrentStatus(ExecutionStatus.READY);
      setIsReturning(false);
      return;
    }
    setIsExecuting(true);
    setCurrentStatus(ExecutionStatus.PREPARING);
    setTimeout(() => {
      setCurrentStatus(ExecutionStatus.READY);
      setTimeout(() => {
        setCurrentStatus(ExecutionStatus.RUNNING);
        setExecutionProgress(0.1);
      }, 1000);
    }, 2500);
  };

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col bg-bg-page overflow-hidden">
      {/* Sub Header */}
      <div className="bg-bg-card border-b border-border px-6 h-12 flex items-center justify-between shrink-0 z-30 shadow-card">
        <div className="flex items-center gap-5">
          <nav className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-1.5 text-text-tertiary hover:text-brand transition-colors">
              <Box size={14} />
              <span className="text-fa-t6 font-fa-semibold uppercase tracking-widest">{t('nav.projects')}</span>
            </Link>
            <ChevronRight size={10} className="text-text-disabled/40" />
            <div className="flex items-center gap-2">
              <h1 className="text-fa-t6 font-fa-semibold text-text-primary uppercase tracking-tight m-0">{t('mission.title')}</h1>
              <div className="flex items-center gap-1.5 bg-success/10 px-2 py-0.5 rounded-full border border-success/20 ml-1">
                <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                <span className="text-[9px] font-fa-semibold text-success tracking-widest uppercase">D-729 {t('mission.dockOnline')}</span>
              </div>
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(links.executions({ projectId: id }))} 
            className="h-8 px-4 bg-bg-card border border-border text-text-secondary rounded-control text-fa-t6 font-fa-semibold hover:bg-action-hover transition-all uppercase tracking-wider flex items-center gap-2"
          >
            <History size={14} className="shrink-0" /> {t('mission.viewHistory')}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden min-0 relative">
        {/* Detail Sidebar */}
        <div className={`bg-bg-panel border-r border-border flex flex-col relative z-20 shrink-0 transition-all duration-300 ${isSidebarCollapsed ? 'w-sidebar-collapsed' : 'w-sidebar-expanded'}`}>
          <div className="absolute top-1/2 -translate-y-1/2 left-full">
            <FACollapseHandle 
              side="right" 
              isCollapsed={isSidebarCollapsed} 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
            />
          </div>
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className={`flex-1 overflow-y-auto custom-scrollbar transition-all duration-300 ${isSidebarCollapsed ? 'px-2 py-4 pt-2 space-y-2 flex flex-col items-center' : 'p-4 space-y-8'}`}>
              <section className="w-full">
                <div className={`flex items-center gap-2 ${isSidebarCollapsed ? 'justify-center h-10' : 'mb-3'}`}>
                  <Monitor size={18} className="text-text-tertiary shrink-0" />
                  {!isSidebarCollapsed && <h2 className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary m-0">{t('mission.step1')}</h2>}
                </div>
                {!isSidebarCollapsed && (
                  <div className="p-3 border border-border bg-bg-card rounded-control flex items-center justify-between shadow-sm overflow-hidden group">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                      <Zap size={16} className="text-text-tertiary shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-fa-t5 font-fa-semibold text-text-primary leading-tight truncate m-0">DJI Dock Alpha-X</p>
                        <p className="text-fa-t7 font-fa-regular font-mono text-text-tertiary uppercase truncate tracking-tighter m-0">D-729-DOCK-HUB</p>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              <section className="w-full">
                <div className={`flex items-center gap-2 ${isSidebarCollapsed ? 'justify-center h-10' : 'mb-3'}`}>
                  <PencilRuler size={18} className="text-text-tertiary shrink-0" />
                  {!isSidebarCollapsed && <h2 className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary m-0">{t('mission.step2')}</h2>}
                </div>
                {!isSidebarCollapsed && (
                  <div className="grid grid-cols-2 gap-2">
                    {patternIds.map(pid => (
                      <button key={pid} disabled={isExecuting} onClick={() => { setPatternType(pid); setIsValidated(false); setExecutionProgress(0); }} className={`h-11 text-left px-3 rounded-control border transition-all ${patternType === pid ? 'bg-brand-bg border-brand text-brand shadow-sm' : 'bg-bg-card border-border text-text-secondary hover:border-brand/40'} ${isExecuting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <p className="text-fa-t7 font-fa-semibold font-mono leading-tight uppercase tracking-tight m-0">{t('pattern.' + pid)}</p>
                      </button>
                    ))}
                  </div>
                )}
              </section>

              <section className="w-full">
                <div className={`flex items-center gap-2 ${isSidebarCollapsed ? 'justify-center h-10' : 'mb-3'}`}>
                  <SlidersHorizontal size={18} className="text-text-tertiary shrink-0" />
                  {!isSidebarCollapsed && <h2 className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary m-0">{t('mission.step3')}</h2>}
                </div>
                {!isSidebarCollapsed && (
                  <div className="space-y-2">
                    {CAPTURE_PROFILES.map(profile => (
                      <button 
                        key={profile.id}
                        disabled={isExecuting}
                        onClick={() => { setSelectedProfileId(profile.id); setIsValidated(false); }}
                        className={`w-full p-2.5 text-left rounded-control border transition-all ${selectedProfileId === profile.id ? 'bg-brand-bg border-brand' : 'bg-bg-card border-border text-text-tertiary hover:border-brand/30'}`}
                      >
                        <p className="text-fa-t6 font-fa-semibold uppercase tracking-wide text-text-secondary m-0">{profile.name}</p>
                        <p className="text-fa-t7 text-text-disabled mt-0.5 m-0">{profile.description} • {profile.altitude}m</p>
                      </button>
                    ))}
                  </div>
                )}
              </section>

              {/* 计划快照 */}
              {isValidated && !isSidebarCollapsed && (
                <section className="bg-bg-page border border-dashed border-border rounded-control p-4 space-y-4 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-brand" />
                      <h3 className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-primary m-0">{t('mission.snapshot')}</h3>
                    </div>
                    <div className="px-1.5 py-0.5 bg-brand-bg rounded text-[9px] font-fa-semibold text-brand tracking-tighter uppercase">Verified</div>
                  </div>
                  <div className="space-y-3">
                    <ValidationItem label={t('mission.v_nfz')} status="OK" />
                    <ValidationItem label={t('mission.v_dem')} status="SAFE" />
                    <ValidationItem label={t('mission.v_health')} status="READY" />
                  </div>
                </section>
              )}
            </div>

            <div className={`shrink-0 border-t border-divider w-full flex justify-center bg-bg-panel ${isSidebarCollapsed ? 'p-2' : 'p-4'}`}>
              <button 
                onClick={!isValidated ? handleValidate : handleExecute} 
                className={`group relative overflow-hidden transition-all shadow-overlay active:scale-95 border-none bg-brand hover:bg-brand-hover text-text-inverse font-fa-semibold uppercase tracking-widest flex items-center justify-center gap-2 ${isSidebarCollapsed ? 'w-10 h-10 rounded-full' : 'w-full h-11 rounded-control text-fa-t6'}`}
              >
                {isValidating ? <Loader2 className="animate-spin" size={18} /> : (currentStatus === ExecutionStatus.PREPARING ? <RefreshCw className="animate-spin" size={18} /> : <Zap size={18} fill="currentColor" />)}
                {!isSidebarCollapsed && (
                   isValidating ? t('mission.validating') : 
                   currentStatus === ExecutionStatus.PREPARING ? t('mission.preparing') : 
                   !isValidated ? t('mission.validate') : 
                   (isExecuting && currentStatus !== ExecutionStatus.COMPLETED ? t('mission.executing') : (currentStatus === ExecutionStatus.COMPLETED ? t('mission.restart') : t('mission.launch')))
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col bg-bg-page relative overflow-hidden min-w-0">
          <div className="flex-1 relative min-h-0 bg-[#0A0F1E]">
            <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
              <polyline points={currentRoute.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="rgba(var(--fa-brand), 0.15)" strokeWidth="1.5" strokeDasharray="8" />
              {isExecuting && <DroneMarker x={dronePos.x} y={dronePos.y} angle={dronePos.angle} isPaused={isPaused} />}
            </svg>
          </div>
          
          {/* Execution Panel */}
          {(isExecuting || currentStatus === ExecutionStatus.COMPLETED) && (
            <div className={`bg-bg-card border-t border-border flex flex-col shrink-0 z-40 transition-all duration-500 shadow-overlay relative ${isBottomPanelCollapsed ? 'h-[6px]' : 'h-[72px]'}`}>
              <div className="absolute -top-[16px] left-1/2 -translate-x-1/2">
                <FACollapseHandle 
                  side="top" 
                  isCollapsed={isBottomPanelCollapsed} 
                  onClick={() => setIsBottomPanelCollapsed(!isBottomPanelCollapsed)} 
                />
              </div>
              <div className="h-1 bg-bg-page flex overflow-visible w-full shrink-0 relative">
                <div className={`h-full transition-all duration-300 ${isReturning ? 'bg-warning' : 'bg-brand'}`} style={{ width: `${executionProgress}%` }}></div>
              </div>
              <div className={`flex-1 px-6 flex items-center justify-between transition-opacity duration-300 ${isBottomPanelCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="flex items-center gap-3 shrink-0 pr-6 border-r border-divider">
                  <div className={`w-9 h-9 rounded-control flex items-center justify-center shadow-inner ${isPaused ? 'bg-warning/10 text-warning' : 'bg-brand-bg text-brand'}`}>
                    {isPaused ? <CircleStop size={18} /> : <Activity size={18} />}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-fa-t6 font-fa-semibold text-text-primary uppercase tracking-wide truncate m-0">
                      {isPaused ? t('status.paused') : t('status.' + currentStatus.toLowerCase())}
                    </h3>
                    <span className="text-fa-t7 font-fa-semibold font-mono text-brand uppercase truncate block">{currentPhase}</span>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-around px-4">
                  <MetricItem label={t('playback.metrics.altitude')} value={`${executionProgress > 0 ? (82.4 + Math.random()).toFixed(1) : '0.0'}m`} icon={<Navigation2 size={11}/>} />
                  <MetricItem label={t('playback.metrics.speed')} value={isPaused || currentStatus !== ExecutionStatus.RUNNING ? "0.0m/s" : `${activeProfile?.speed || 5.2}m/s`} icon={<Gauge size={12}/>} />
                  <MetricItem label={t('playback.metrics.battery')} value={`${Math.max(12, 98 - Math.round(executionProgress * 0.8))}%`} icon={<Battery size={11}/>} warning={executionProgress > 85} />
                  <MetricItem label={t('playback.metrics.wind')} value="3.2m/s" icon={<Wind size={11}/>} dock />
                  <MetricItem label={t('playback.metrics.media')} value={`${Math.round(executionProgress * 1.28)} / 128`} icon={<Camera size={11}/>} />
                </div>

                <div className="shrink-0 pl-6 border-l border-divider">
                  <button 
                    onClick={() => {
                      if (currentStatus === ExecutionStatus.COMPLETED) {
                        navigate(links.playback(id || '82731'));
                      } else {
                        navigate(links.execution(id || '82731'));
                      }
                    }} 
                    className="h-8 px-4 bg-bg-topbar text-text-inverse text-fa-t6 font-fa-semibold rounded-control border-none uppercase tracking-wider hover:bg-black flex items-center gap-2 transition-all active:scale-95"
                  >
                    {currentStatus === ExecutionStatus.COMPLETED ? (
                      <> {t('projects.viewPlayback')} <CheckCircle2 size={12} /> </>
                    ) : (
                      <> {t('mission.console')} <ExternalLink size={12} /> </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ValidationItem = ({ label, status }: { label: string, status: string }) => (
  <div className="flex items-center justify-between text-fa-t6">
    <span className="text-text-secondary uppercase tracking-widest">{label}</span>
    <span className="text-success font-fa-semibold font-mono tracking-tighter flex items-center gap-1.5">
      <CheckCircle2 size={10} /> {status}
    </span>
  </div>
);

const MetricItem = ({ label, value, icon, warning, dock }: any) => {
  const isNumeric = /\d/.test(value);
  return (
    <div className="flex flex-col min-w-0">
      <div className="flex items-center gap-1.5 text-fa-t7 font-fa-semibold font-mono text-text-tertiary uppercase mb-0.5 overflow-hidden">
        <span className="shrink-0 text-brand/70 flex items-center justify-center w-4 h-4">{icon}</span>
        <span className="truncate tracking-wider flex-1">{label}</span>
        {dock && <span className="shrink-0 text-[8px] bg-bg-page px-1 rounded text-text-tertiary font-mono uppercase ml-auto">Dock</span>}
      </div>
      <div className={`font-fa-semibold leading-none tracking-tight whitespace-nowrap ${isNumeric ? 'text-fa-t7 font-mono text-[15px]' : 'text-fa-t5'} ${warning ? 'text-error' : 'text-text-primary'}`}>
        {value}
      </div>
    </div>
  );
};

export default MissionControlPage;
