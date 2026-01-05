import React from 'react';
import { ChevronRight, ShieldAlert, ShieldCheck, MapPin } from 'lucide-react';
import { useI18n } from '../../../i18n';
import FACard from '../../../ui/FACard';
import { Execution } from '../../../shared/types/domain';
import { MOCK_ALERTS_DATA } from '../../../shared/mocks/streams';

interface AlertsPanelProps {
  execution: Execution;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ execution }) => {
  const { t } = useI18n();
  const alerts = MOCK_ALERTS_DATA[execution.id] || [];

  return (
    <FACard 
      title={t('executions.live.alerts')} 
      density="compact" 
      className="h-full flex flex-col bg-bg-card shadow-card border-border overflow-hidden"
      extra={<ShieldAlert size={15} className={alerts.length > 0 ? 'text-error animate-bounce' : 'text-text-tertiary'} />}
    >
      <div className="flex-1 overflow-y-auto custom-scrollbar -mx-1 px-1 py-1 space-y-2.5">
         {alerts.length > 0 ? (
           alerts.map((al) => (
             <div key={al.id} className="flex items-start gap-4 p-3.5 bg-bg-card border border-border rounded-xl relative overflow-hidden group hover:border-error/20 transition-all cursor-pointer shadow-sm">
                <div className={`absolute left-0 inset-y-0 w-[3px] ${al.level === 'Critical' ? 'bg-error' : 'bg-warning'}`} />
                
                <div className="flex-1 min-w-0 pl-1">
                   <div className="flex items-center justify-between mb-1.5">
                      <h4 className={`text-fa-t6 font-fa-semibold uppercase truncate tracking-tight ${al.level === 'Critical' ? 'text-text-primary' : 'text-text-secondary'}`}>
                        {al.message}
                      </h4>
                      <span className={`text-fa-t7 font-fa-semibold uppercase shrink-0 ml-2 px-1.5 py-0.5 rounded leading-none ${al.level === 'Critical' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'}`}>
                        {al.level === 'Critical' ? t('executions.live.tag.critical') : t('executions.live.tag.warning')}
                      </span>
                   </div>
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <span className="text-fa-t7 font-fa-semibold text-text-tertiary tabular-nums">{al.timestamp}</span>
                         {al.distance && al.distance !== 'N/A' && (
                           <div className="flex items-center gap-1 text-text-tertiary">
                             <MapPin size={10} className="shrink-0" />
                             <span className="text-fa-t7 font-fa-semibold">{al.distance}</span>
                           </div>
                         )}
                      </div>
                      <ChevronRight size={14} className="text-text-tertiary group-hover:text-error/60 transition-colors" />
                   </div>
                </div>
             </div>
           ))
         ) : (
           <div className="h-full flex flex-col items-center justify-center py-10 text-center opacity-30 grayscale">
              <ShieldCheck size={40} className="text-text-tertiary mb-3" />
              <span className="text-fa-t7 font-fa-semibold uppercase tracking-widest leading-relaxed text-text-tertiary">
                当前监控环境安全<br/>暂无异常风险告警
              </span>
           </div>
         )}
      </div>
    </FACard>
  );
};

export default AlertsPanel;