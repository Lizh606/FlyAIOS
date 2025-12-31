
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Play, Pause, Download, Battery, Navigation2, 
  SignalHigh, Layers, Gauge, Activity,
  ChevronRight, Clock, Maximize2, Info, MapPin, Camera, RotateCcw,
  FileArchive, HardDriveDownload, Box
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
    {active && <circle r="18" fill="rgba(38, 100, 255, 0.2)" className="animate-pulse" />}
    <path d="M-12,-12 L12,12 M-12,12 L12,-12" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <circle cx="-12" cy="-12" r="4" fill="#2664FF" stroke="white" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" fill="#2664FF" stroke="white" strokeWidth="1.5" />
    <circle cx="-12" cy="12" r="4" fill="#2664FF" stroke="white" strokeWidth="1.5" />
    <circle cx="12" cy="-12" r="4" fill="#2664FF" stroke="white" strokeWidth="1.5" />
    <rect x="-6" y="-6" width="12" height="12" fill="#111827" rx="2" stroke="white" strokeWidth="1" />
    <circle cx="0" cy="-6" r="1.5" fill={active ? "#EF4444" : "#9CA3AF"} />
  </g>
);

// ExecutionPlaybackPage with fixed react-router-dom hooks and Link
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
    <div className="h-[calc(100vh-56px)] flex flex-col bg-[#F3F4F6] overflow-hidden relative">
      <header className="bg-white border-b border-[#E5E7EB] px-6 h-12 flex items-center justify-between z-30 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-1.5 text-gray-400 hover:text-[#2664FF] transition-colors">
              <Box size={14} />
              <span className="text-[11px] font-bold uppercase tracking-[0.05em]">{t('nav.projects')}</span>
            </Link>
            <ChevronRight size={10} className="text-gray-300" />
            <div className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.05em]">Alpha-01</div>
            <ChevronRight size={10} className="text-gray-300" />
            
            <div className="flex items-center gap-2">
              <span className={`px-1.5 py-0.5 text-[9px] font-black rounded-lg flex items-center gap-1 tracking-widest uppercase transition-all
                ${isLive ? 'bg-blue-50 text-[#2664FF] border border-blue-100' : 'bg-gray-50 text-gray-500 border border-gray-100'}`}>
                {isLive && <div className="w-1 h-1 bg-[#2664FF] rounded-full animate-pulse"></div>}
                {isLive ? t('playback.status.live') : t('playback.status.archived')}
              </span>
              <span className="text-[12px] font-bold text-gray-900 uppercase font-mono tracking-tight">
                #{id?.slice(0, 8).toUpperCase() || '82731B'}
              </span>
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button className="h-8 px-4 bg-[#111827] text-white rounded-lg text-[10px] font-bold uppercase tracking-[0.1em] hover:bg-black flex items-center gap-2 transition-all active:scale-95 shadow-sm">
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
                <polyline points={historyPath.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#2664FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <DroneMarker x={dronePos.x} y={dronePos.y} angle={dronePos.angle} active={isPlaying} />
             </svg>
             
             <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className="bg-[#111827]/80 backdrop-blur text-white px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-4 shadow-2xl">
                   <div className="flex flex-col">
                      <span className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.1em]">{t('playback.metrics.altitude')}</span>
                      <span className="text-[12px] font-mono font-bold leading-none">{progress > 0 ? (82.4 + Math.sin(progress/10)).toFixed(1) : "0.0"}m</span>
                   </div>
                   <div className="w-[1px] h-5 bg-white/10"></div>
                   <div className="flex flex-col">
                      <span className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.1em]">{t('playback.metrics.battery')}</span>
                      <span className={`text-[12px] font-mono font-bold leading-none ${progress > 85 ? 'text-red-400' : 'text-green-400'}`}>
                        {Math.max(12, 98 - Math.round(progress * 0.8))}%
                      </span>
                   </div>
                </div>
             </div>

             <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="w-9 h-9 bg-[#111827]/90 backdrop-blur-md rounded-lg border border-white/10 text-white flex items-center justify-center hover:bg-black transition-colors shadow-xl"><Layers size={16}/></button>
                <button className="w-9 h-9 bg-[#111827]/90 backdrop-blur-md rounded-lg border border-white/10 text-white flex items-center justify-center hover:bg-black transition-colors shadow-xl"><Maximize2 size={14}/></button>
             </div>
          </div>

          <div className="h-16 bg-white border-t border-gray-200 px-6 flex items-center gap-5 shadow-sm shrink-0 z-20">
            <button onClick={handlePlayToggle} className="w-9 h-9 bg-[#2664FF] text-white rounded-full flex items-center justify-center hover:bg-blue-700 shadow-md transition-all active:scale-90 shrink-0">
              {isFinished ? <RotateCcw size={18} strokeWidth={3} /> : isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </button>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                 <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono">
                   {isFinished ? t('playback.progress.complete') : t('playback.progress.label')}
                 </span>
                 <span className="text-[#2664FF] font-mono text-[10px] font-bold">{Math.round(progress)}%</span>
              </div>
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden relative">
                <div className="h-full bg-[#2664FF] transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[300px] bg-white border-l border-gray-200 overflow-y-auto flex flex-col shrink-0 custom-scrollbar">
          <div className="p-5 space-y-8">
            <section className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <span className="w-4 h-4 flex items-center justify-center shrink-0">
                  <Activity size={14} className="text-[#2664FF]"/>
                </span>
                {t('playback.telemetry')}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <MetricCard label={t('playback.metrics.speed')} value={isPlaying ? "3.8 m/s" : "0.0 m/s"} icon={<Gauge size={12}/>} />
                <MetricCard label={t('playback.metrics.signal')} value={progress > 0 ? t('playback.metrics.excellent') : '-'} icon={<SignalHigh size={12}/>} />
                <MetricCard label={t('playback.metrics.dist')} value={`${(progress * 0.012).toFixed(2)} km`} icon={<MapPin size={12}/>} />
                <MetricCard label={t('playback.metrics.media')} value={Math.round(progress * 1.2)} icon={<Camera size={12}/>} />
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <span className="w-4 h-4 flex items-center justify-center shrink-0">
                  <FileArchive size={14} className="text-orange-500"/>
                </span>
                {t('playback.logTitle')}
              </h3>
              <div className="bg-orange-50/50 rounded-lg p-3 border border-orange-100 space-y-2">
                 <LogFileItem name="FLIGHT_RECORD_8273.dat" size="1.2 MB" />
                 <LogFileItem name="DOCK_SYSTEM_DUMP.json" size="2.4 MB" />
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <span className="w-4 h-4 flex items-center justify-center shrink-0">
                  <Clock size={14}/>
                </span>
                {t('playback.events')}
              </h3>
              <div className="space-y-4 border-l border-gray-100 ml-1.5 pl-4">
                <TimelinePoint time="14:20:01" text={t('event.validated')} done />
                <TimelinePoint time="14:22:40" text={t('event.dockOpened')} done />
                {progress > 5 && <TimelinePoint time="14:23:15" text={t('event.takeoff')} done />}
                {progress > 40 && <TimelinePoint time="14:35:22" text={`${t('event.waypoint')} 12`} active={isPlaying} done={isFinished} />}
                {isFinished && <TimelinePoint time="14:50:00" text={t('event.rtl')} done />}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, icon, alert }: any) => (
  <div className="bg-gray-50/50 p-2.5 rounded-lg border border-gray-100 flex flex-col gap-0.5 min-w-0">
    <div className="flex items-center gap-1.5 text-[8px] text-gray-400 font-bold uppercase overflow-hidden">
      <span className="shrink-0 flex items-center">{icon}</span>
      <span className="truncate tracking-wide flex-1">{label}</span>
    </div>
    <span className={`font-bold leading-none text-[14px] font-mono tracking-tight ${alert ? 'text-red-500 animate-pulse' : 'text-gray-900'}`}>{value}</span>
  </div>
);

const LogFileItem = ({ name, size }: { name: string, size: string }) => (
  <div className="flex items-center justify-between group cursor-pointer hover:bg-white p-1 rounded-lg transition-all">
    <div className="flex items-center gap-2 min-w-0">
      <FileArchive size={11} className="text-gray-400" />
      <span className="text-[10px] font-mono text-gray-600 truncate">{name}</span>
    </div>
    <button className="text-[#2664FF] shrink-0"><HardDriveDownload size={13} /></button>
  </div>
);

const TimelinePoint = ({ time, text, done, active }: any) => (
  <div className="relative pb-1">
    <div className={`absolute -left-[20.5px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm ${active ? 'bg-[#2664FF] ring-2 ring-blue-50' : done ? 'bg-[#10B981]' : 'bg-gray-200'}`}></div>
    <span className="text-[9px] font-mono text-gray-400 font-bold">{time}</span>
    <p className="text-[11px] font-bold text-gray-900 leading-tight">{text}</p>
  </div>
);

export default ExecutionPlaybackPage;
