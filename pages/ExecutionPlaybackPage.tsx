
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Play, Pause, Download, Battery, Navigation2, 
  SignalHigh, Layers, Gauge, Activity,
  ChevronRight, Clock, Maximize2, MapPin, Camera, RotateCcw,
  FileArchive, HardDriveDownload, Box, ExternalLink, LayoutPanelLeft
} from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ExecutionStatus } from '../types';
import { useI18n } from '../i18n';

const PLAYBACK_ROUTE = [
  { x: 200, y: 200 }, { x: 800, y: 200 }, { x: 800, y: 300 }, { x: 200, y: 300 },
  { x: 200, y: 400 }, { x: 800, y: 400 }, { x: 800, y: 500 }, { x: 200, y: 500 },
  { x: 200, y: 600 }, { x: 800, y: 600 }, { x: 800, y: 700 }, { x: 200, y: 700 }
];

const DroneMarker = ({ x, y, angle = 0, active = false }: { x: number, y: number, angle?: number, active?: boolean }) => (
  <g transform={`translate(${x}, ${y}) rotate(${angle})`}>
    {active && <circle r="18" fill="rgba(var(--fa-brand), 0.2)" className="animate-pulse" />}
    <path d="M-12,-12 L12,12 M-12,12 L12,-12" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <circle cx="-12" cy="-12" r="4" fill="rgba(var(--fa-brand), 1)" stroke="white" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" fill="rgba(var(--fa-brand), 1)" stroke="white" strokeWidth="1.5" />
    <circle cx="-12" cy="12" r="4" fill="rgba(var(--fa-brand), 1)" stroke="white" strokeWidth="1.5" />
    <circle cx="12" cy="-12" r="4" fill="rgba(var(--fa-brand), 1)" stroke="white" strokeWidth="1.5" />
    <rect x="-6" y="-6" width="12" height="12" fill="rgba(var(--fa-bg-topbar), 1)" rx="2" stroke="white" strokeWidth="1" />
    <circle cx="0" cy="-6" r="1.5" fill={active ? "rgba(var(--fa-error), 1)" : "rgba(var(--fa-text-tertiary), 1)"} />
  </g>
);

const ExecutionPlaybackPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useI18n();
  
  const [currentStatus, setCurrentStatus] = useState<ExecutionStatus>(ExecutionStatus.RUNNING);
  const [progress, setProgress] = useState(15);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval: any;
    if (isPlaying && currentStatus === ExecutionStatus.RUNNING) {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + 0.2;
          if (next >= 100) {
            setIsPlaying(false);
            setCurrentStatus(ExecutionStatus.COMPLETED);
            return 100;
          }
          return next;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStatus]);

  const isLive = currentStatus === ExecutionStatus.RUNNING;
  const isFinished = progress >= 100;

  const { dronePos, historyPath } = useMemo(() => {
    if (!PLAYBACK_ROUTE.length) return { dronePos: { x: 0, y: 0, angle: 0 }, historyPath: [] };
    const safeProgress = Math.max(0, Math.min(100, progress));
    const index = (safeProgress / 100) * (PLAYBACK_ROUTE.length - 1);
    const lower = Math.floor(index);
    const upper = Math.min(Math.ceil(index), PLAYBACK_ROUTE.length - 1);
    const tVal = index - lower;
    const p1 = PLAYBACK_ROUTE[lower] || PLAYBACK_ROUTE[0];
    const p2 = PLAYBACK_ROUTE[upper] || p1;
    const currentPos = {
      x: p1.x + (p2.x - p1.x) * (isNaN(tVal) ? 0 : tVal),
      y: p1.y + (p2.y - p1.y) * (isNaN(tVal) ? 0 : tVal),
      angle: Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI) + 90
    };
    const path = PLAYBACK_ROUTE.slice(0, lower + 1);
    if (safeProgress < 100) path.push(currentPos);
    return { dronePos: currentPos, historyPath: path };
  }, [progress]);

  const handlePlayToggle = useCallback(() => {
    if (isFinished) {
      setProgress(0);
      setCurrentStatus(ExecutionStatus.RUNNING);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  }, [isFinished, isPlaying]);

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col bg-bg-page overflow-hidden relative">
      <header className="bg-bg-card border-b border-border px-6 h-12 flex items-center justify-between z-30 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-1.5 text-text-tertiary hover:text-brand transition-colors">
              <Box size={14} />
              <span className="text-fa-t6 font-fa-semibold uppercase tracking-widest">{t('nav.projects')}</span>
            </Link>
            <ChevronRight size={10} className="text-text-disabled/40" />
            <div className="text-text-tertiary text-fa-t6 font-fa-semibold uppercase tracking-widest truncate max-w-[120px]">Alpha-X-01</div>
            <ChevronRight size={10} className="text-text-disabled/40" />
            
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 text-fa-t7 font-fa-semibold font-mono rounded-tag border flex items-center gap-1.5 tracking-widest uppercase transition-all
                ${isLive ? 'bg-brand-bg text-brand border-brand/20' : 'bg-bg-page text-text-tertiary border-border'}`}>
                {isLive && <div className="w-1 h-1 bg-brand rounded-full animate-pulse"></div>}
                {isLive ? t('playback.status.live') : t('playback.status.archived')}
              </span>
              <span className="text-fa-t6 font-fa-semibold text-text-primary uppercase font-mono tracking-tight m-0">
                #{id?.slice(0, 8).toUpperCase() || '82731B'}
              </span>
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(`/execution/${id}/analysis`)}
            className="h-8 px-4 bg-bg-card border border-border text-text-secondary rounded-control text-fa-t6 font-fa-semibold uppercase tracking-widest hover:text-brand hover:border-brand transition-all flex items-center gap-2"
          >
            <LayoutPanelLeft size={13} /> {t('mission.console')}
          </button>
          <button className="h-8 px-4 bg-bg-topbar text-text-inverse rounded-control text-fa-t6 font-fa-semibold uppercase tracking-widest hover:bg-black flex items-center gap-2 shadow-sm transition-all active:scale-95 border-none">
            <Download size={13} /> {t('playback.export')}
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col relative overflow-hidden bg-[#0A0F1E]">
          <div className="absolute inset-0 opacity-5 pointer-events-none grayscale" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          <div className="flex-1 relative">
             <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000">
                <polyline points={PLAYBACK_ROUTE.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" strokeDasharray="5" />
                <polyline points={historyPath.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="rgba(var(--fa-brand), 1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <DroneMarker x={dronePos.x} y={dronePos.y} angle={dronePos.angle} active={isPlaying} />
             </svg>
             
             <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className="bg-bg-topbar/80 backdrop-blur text-text-inverse px-3 py-2 rounded-control border border-white/10 flex items-center gap-4 shadow-overlay">
                   <div className="flex flex-col">
                      <span className="text-[8px] text-text-inverse/40 font-fa-semibold uppercase tracking-[0.1em]">{t('playback.metrics.altitude')}</span>
                      <span className="text-fa-t7 font-fa-semibold font-mono text-[12px] leading-none tabular-nums">{progress > 0 ? (82.4 + Math.sin(progress/10)).toFixed(1) : "0.0"}m</span>
                   </div>
                   <div className="w-[1px] h-5 bg-white/10"></div>
                   <div className="flex flex-col">
                      <span className="text-[8px] text-text-inverse/40 font-fa-semibold uppercase tracking-[0.1em]">{t('playback.metrics.battery')}</span>
                      <span className={`text-fa-t7 font-fa-semibold font-mono text-[12px] leading-none tabular-nums ${progress > 85 ? 'text-error' : 'text-success'}`}>
                        {Math.max(12, 98 - Math.round(progress * 0.8))}%
                      </span>
                   </div>
                </div>
             </div>

             <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="w-9 h-9 bg-bg-topbar/90 backdrop-blur-md rounded-control border border-white/10 text-text-inverse flex items-center justify-center hover:bg-black transition-colors shadow-overlay border-none p-0 cursor-pointer"><Layers size={16}/></button>
                <button className="w-9 h-9 bg-bg-topbar/90 backdrop-blur-md rounded-control border border-white/10 text-text-inverse flex items-center justify-center hover:bg-black transition-colors shadow-overlay border-none p-0 cursor-pointer"><Maximize2 size={14}/></button>
             </div>
          </div>

          <div className="h-16 bg-bg-card border-t border-border px-6 flex items-center gap-5 shadow-sm shrink-0 z-20">
            <button onClick={handlePlayToggle} className="w-9 h-9 bg-brand text-text-inverse rounded-full flex items-center justify-center hover:bg-brand-hover shadow-overlay transition-all active:scale-90 shrink-0 border-none p-0 cursor-pointer">
              {isFinished ? <RotateCcw size={18} strokeWidth={3} /> : isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </button>
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                 <span className="text-fa-t7 font-fa-semibold font-mono text-[9px] text-text-tertiary uppercase tracking-widest">
                   {isFinished ? t('playback.progress.complete') : t('playback.progress.label')}
                 </span>
                 <span className="text-brand text-fa-t7 font-fa-semibold font-mono text-[10px] tabular-nums">{Math.round(progress)}%</span>
              </div>
              <div className="h-1 bg-bg-page rounded-full overflow-hidden relative">
                <div className="h-full bg-brand transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <aside className="w-[300px] bg-bg-panel border-l border-border overflow-y-auto flex flex-col shrink-0 custom-scrollbar">
          <div className="p-5 space-y-8">
            <section className="space-y-4">
              <h3 className="text-fa-t7 font-fa-semibold font-mono uppercase tracking-widest text-text-tertiary flex items-center gap-2 m-0 leading-none">
                <Activity size={14} className="text-brand"/> {t('playback.telemetry')}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <MetricCard label={t('playback.metrics.speed')} value={isPlaying ? "3.8 m/s" : "0.0 m/s"} icon={<Gauge size={12}/>} />
                <MetricCard label={t('playback.metrics.signal')} value={progress > 0 ? t('playback.metrics.excellent') : '-'} icon={<SignalHigh size={12}/>} />
                <MetricCard label={t('playback.metrics.dist')} value={`${(progress * 0.012).toFixed(2)} km`} icon={<MapPin size={12}/>} />
                <MetricCard label={t('playback.metrics.media')} value={Math.round(progress * 1.2)} icon={<Camera size={12}/>} />
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-fa-t7 font-fa-semibold font-mono uppercase tracking-widest text-text-tertiary flex items-center gap-2 m-0 leading-none">
                <FileArchive size={14} className="text-warning"/> {t('playback.logTitle')}
              </h3>
              <div className="bg-warning/5 rounded-control p-3 border border-warning/10 space-y-2">
                 <LogFileItem name="FLIGHT_RECORD_8273.dat" size="1.2 MB" />
                 <LogFileItem name="DOCK_SYSTEM_DUMP.json" size="2.4 MB" />
              </div>
            </section>
          </div>
        </aside>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, icon, alert }: any) => (
  <div className="bg-bg-page p-3 rounded-control border border-border flex flex-col gap-1 min-w-0">
    <div className="flex items-center gap-1.5 text-fa-t7 font-fa-semibold font-mono text-text-tertiary uppercase overflow-hidden">
      <span className="shrink-0 flex items-center">{icon}</span>
      <span className="truncate tracking-wide flex-1">{label}</span>
    </div>
    <span className={`font-fa-semibold leading-none text-fa-t7 font-mono text-[14px] tabular-nums ${alert ? 'text-error animate-pulse' : 'text-text-primary'}`}>{value}</span>
  </div>
);

const LogFileItem = ({ name, size }: { name: string, size: string }) => (
  <div className="flex items-center justify-between group cursor-pointer hover:bg-bg-card p-1.5 rounded-tag transition-all">
    <div className="flex items-center gap-2 min-w-0">
      <FileArchive size={11} className="text-text-tertiary" />
      <span className="text-fa-t7 font-fa-semibold font-mono text-[10px] text-text-secondary truncate">{name}</span>
    </div>
    <button className="text-brand shrink-0 bg-transparent border-none p-0 cursor-pointer"><HardDriveDownload size={13} /></button>
  </div>
);

export default ExecutionPlaybackPage;
