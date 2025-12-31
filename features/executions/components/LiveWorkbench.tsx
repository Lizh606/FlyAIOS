import React, { useState } from 'react';
import { 
  Radio, ShieldCheck, Activity, Maximize2, 
  Settings2, Square, RefreshCcw,
  LayoutTemplate, Layers, Clock, AlertTriangle
} from 'lucide-react';
import { Button, Slider, Select, Divider, Switch, Alert } from 'antd';
import { useI18n } from '../../../i18n';
import { Execution, LiveState } from '../../../shared/types/domain';
import FACard from '../../../ui/FACard';
import DetectionsStream from './DetectionsStream';
import AlertsPanel from './AlertsPanel';
import { MOCK_STREAM_FACTS } from '../../../shared/mocks/streams';

interface LiveWorkbenchProps {
  execution: Execution;
}

const LiveWorkbench: React.FC<LiveWorkbenchProps> = ({ execution }) => {
  const { t } = useI18n();
  const facts = MOCK_STREAM_FACTS[execution.id];

  const [overlayOn, setOverlayOn] = useState(true);
  const [confidence, setConfidence] = useState(0.80);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const renderLiveAlert = () => {
    if (execution.liveState === LiveState.STARTING) {
      return (
        <Alert
          message={t('executions.live.alert.starting')}
          type="info"
          showIcon
          className="mb-3 text-fa-t6 font-fa-semibold py-2.5 rounded-xl border-border bg-brand-bg"
          icon={<Clock size={16} />}
        />
      );
    }
    if (execution.liveState === LiveState.DEGRADED) {
      return (
        <Alert
          message={t('executions.live.alert.degraded')}
          type="warning"
          showIcon
          className="mb-3 text-fa-t6 font-fa-semibold py-2.5 rounded-xl border-warning/20 bg-warning/5"
          icon={<AlertTriangle size={16} />}
        />
      );
    }
    return null;
  };

  const renderPlayer = () => {
    if (execution.liveState === LiveState.OFF) {
      return (
        <div className="h-full flex flex-col items-center justify-center bg-bg-topbar p-12 text-center rounded-2xl border border-white/5 shadow-inner">
           <Radio size={48} className="text-white/5 mb-6" />
           <h3 className="text-fa-t3 text-text-inverse/40 mb-2">{t('executions.live.state.off')}</h3>
           <p className="text-fa-t6 text-text-inverse/20 max-w-xs mb-10">实时信号流未开启，或本次物理执行已归档。</p>
           <Button type="primary" size="large" className="px-12 h-12 font-fa-semibold uppercase tracking-widest shadow-overlay">
             启动实时监测
           </Button>
        </div>
      );
    }

    return (
      <div className="h-full bg-black rounded-2xl overflow-hidden relative group border border-white/10 shadow-overlay min-h-[280px]">
        <div className="flex h-full relative overflow-hidden items-center justify-center">
           <Activity size={80} strokeWidth={0.5} className="text-white/5 animate-pulse" />
           
           {overlayOn && (
             <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute top-1/3 left-1/3 border-2 border-brand w-24 h-24">
                  <span className="bg-brand text-text-inverse text-fa-t7 font-fa-semibold px-1.5 py-0.5 rounded-r absolute -top-5 left-[-2px]">INSULATOR 0.94</span>
                </div>
             </div>
           )}
        </div>
        
        <div className="absolute bottom-0 inset-x-0 h-14 px-6 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300">
           <div className="flex items-center gap-5 text-text-inverse/80">
              <button className="hover:text-text-inverse transition-colors"><Square size={16} fill="currentColor"/></button>
              <span className="text-fa-t7 font-fa-semibold uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" /> {t('executions.live.state.live')}
              </span>
           </div>
           <div className="flex items-center gap-4 text-text-inverse/60">
              <Settings2 size={16} className="cursor-pointer hover:text-text-inverse transition-colors" />
              <Maximize2 size={16} className="cursor-pointer hover:text-text-inverse transition-colors" />
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full gap-4 overflow-hidden">
      {/* Workbench Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-bg-card border border-border rounded-2xl shadow-card shrink-0">
         <div className="flex items-center gap-5">
            <LiveStatusChip icon={<Radio size={14}/>} label={t('executions.live.session')} value={facts?.sessionId?.slice(-6).toUpperCase() || '—'} mono />
            <Divider type="vertical" className="h-6 bg-divider mx-0" />
            <LiveStatusChip 
              icon={<ShieldCheck size={14}/>} 
              label={t('executions.live.target')} 
              value={facts?.target === 'Edge' ? t('executions.live.edge') : t('executions.live.cloud')} 
            />
            <Divider type="vertical" className="h-6 bg-divider mx-0" />
            <LiveStatusChip 
              icon={<Activity size={14}/>} 
              label={t('executions.live.quality')} 
              value={facts?.quality === 'OK' ? t('executions.live.normal') : t('executions.live.degraded')} 
              status={facts?.quality === 'OK' ? 'success' : 'warning'} 
            />
            <Divider type="vertical" className="h-6 bg-divider mx-0" />
            <div className="flex flex-col">
               <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase leading-none mb-1">{t('executions.live.latency')}</span>
               <span className="text-fa-t5 font-fa-semibold tabular-nums text-text-primary text-[13px] leading-none">{facts?.latency || '-'}</span>
            </div>
         </div>
         
         <div className="flex items-center gap-3">
            <Button size="small" icon={<RefreshCcw size={14}/>} className="text-fa-t6 font-fa-semibold uppercase h-8 px-3 rounded-lg">{t('executions.live.retry')}</Button>
            <Button size="small" icon={<LayoutTemplate size={14}/>} className="text-fa-t6 font-fa-semibold uppercase h-8 px-3 rounded-lg">{t('executions.live.switchTarget')}</Button>
            <Button 
              size="small" 
              danger 
              type="primary"
              icon={<Square size={12} fill="currentColor" />} 
              className="text-fa-t6 font-fa-semibold uppercase h-8 px-4 rounded-lg shadow-overlay"
            >
              {t('executions.live.stop')}
            </Button>
         </div>
      </div>

      {renderLiveAlert()}

      {/* Main Body: Video + Sidebar */}
      <div className="flex-1 flex gap-4 min-h-0 overflow-hidden">
        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
          <div className="flex-1 min-h-0 mb-4">
            {renderPlayer()}
          </div>
          
          <FACard title="识别叠加配置" density="comfort" className="bg-bg-card border-border shadow-card shrink-0">
             <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-1">
                <div className="md:col-span-3">
                   <div className="flex items-center justify-between px-4 py-2 bg-bg-page border border-border rounded-xl">
                      <div className="flex items-center gap-2">
                        <Layers size={14} className={overlayOn ? 'text-brand' : 'text-text-tertiary'} />
                        <span className="text-fa-t6 font-fa-semibold text-text-secondary">实时叠加</span>
                      </div>
                      <Switch size="small" checked={overlayOn} onChange={setOverlayOn} />
                   </div>
                </div>
                
                <div className="md:col-span-4 flex flex-col px-2">
                   <div className="flex justify-between items-center mb-1.5">
                      <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase tracking-widest">{t('executions.live.threshold')}</span>
                      <span className="text-fa-t7 font-fa-semibold text-brand">{confidence.toFixed(2)}</span>
                   </div>
                   <Slider min={0} max={1} step={0.01} value={confidence} onChange={setConfidence} disabled={!overlayOn} className="m-0" />
                </div>
                
                <div className="md:col-span-5 flex flex-col">
                   <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase block mb-1.5">{t('executions.live.classes')}</span>
                   <Select
                     mode="multiple"
                     placeholder="选择识别类别..."
                     className="w-full h-9"
                     disabled={!overlayOn}
                     value={selectedClasses}
                     onChange={setSelectedClasses}
                     maxTagCount="responsive"
                     options={[
                       { label: '绝缘子 (Insulator)', value: 'ins' },
                       { label: '异物 (Foreign Object)', value: 'obj' },
                       { label: '鸟巢 (Bird Nest)', value: 'nest' },
                       { label: '金属腐蚀 (Corrosion)', value: 'corr' }
                     ]}
                   />
                </div>
             </div>
          </FACard>
        </div>

        {/* Sidebar: Detections + Alerts */}
        <aside className="w-[340px] flex flex-col gap-4 shrink-0 h-full min-h-0 overflow-hidden">
           <div className="flex-[3] min-h-0 overflow-hidden">
             <DetectionsStream 
              executionId={execution.id} 
              isActive={execution.liveState === LiveState.LIVE} 
              overlayOn={overlayOn} 
              confidence={confidence}
             />
           </div>
           <div className="flex-[2] min-h-0 overflow-hidden">
             <AlertsPanel execution={execution} />
           </div>
        </aside>
      </div>
    </div>
  );
};

const LiveStatusChip = ({ icon, label, value, mono, status }: any) => (
  <div className="flex items-center gap-3">
     <div className={`p-2 rounded-xl ${status === 'warning' ? 'bg-warning/10 text-warning' : 'bg-brand-bg text-brand'}`}>
        {icon}
     </div>
     <div className="flex flex-col">
        <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase tracking-wider leading-none mb-1">{label}</span>
        <span className={`text-fa-t5 font-fa-semibold leading-none text-[13px] ${mono ? 'font-mono tracking-tighter' : ''} text-text-primary`}>{value}</span>
     </div>
  </div>
);

export default LiveWorkbench;