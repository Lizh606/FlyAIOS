
import React from 'react';
import { AlertCircle, ChevronRight, ShieldAlert, ShieldCheck, MapPin } from 'lucide-react';
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
      className="h-full flex flex-col overflow-hidden bg-white shadow-sm border-gray-100"
      extra={<ShieldAlert size={15} className={alerts.length > 0 ? 'text-red-500 animate-bounce' : 'text-gray-300'} />}
    >
      <div className="flex-1 overflow-y-auto custom-scrollbar -mx-1 px-1 py-1 space-y-2.5">
         {alerts.length > 0 ? (
           alerts.map((al) => (
             <div key={al.id} className="flex items-start gap-4 p-3.5 bg-white border border-gray-100 rounded-xl relative overflow-hidden group hover:border-red-200 transition-all cursor-pointer shadow-sm">
                {/* Semantic Vertical Accent - Optimized width per v0.8 */}
                <div className={`absolute left-0 inset-y-0 w-[3px] ${al.level === 'Critical' ? 'bg-red-500' : 'bg-orange-400'}`} />
                
                <div className="flex-1 min-w-0 pl-1">
                   <div className="flex items-center justify-between mb-1.5">
                      <h4 className={`fa-t6 font-black uppercase truncate tracking-tight ${al.level === 'Critical' ? 'text-red-950' : 'text-orange-950'}`}>
                        {al.message}
                      </h4>
                      <span className={`fa-t7-mono text-[9px] font-black uppercase shrink-0 ml-2 px-1.5 py-0.5 rounded leading-none ${al.level === 'Critical' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-600'}`}>
                        {al.level === 'Critical' ? t('executions.live.tag.critical') : t('executions.live.tag.warning')}
                      </span>
                   </div>
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <span className="fa-t7-mono text-[10px] text-gray-400 tabular-nums">{al.timestamp}</span>
                         {al.distance && al.distance !== 'N/A' && (
                           <div className="flex items-center gap-1 text-gray-400">
                             <MapPin size={10} className="shrink-0" />
                             <span className="fa-t7-mono text-[10px] font-bold">{al.distance}</span>
                           </div>
                         )}
                      </div>
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-red-400 transition-colors" />
                   </div>
                </div>
             </div>
           ))
         ) : (
           <div className="h-full flex flex-col items-center justify-center py-10 text-center opacity-30 grayscale">
              <ShieldCheck size={40} className="text-gray-200 mb-3" />
              <span className="fa-t7-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                当前监控环境安全<br/>暂无异常风险告警
              </span>
           </div>
         )}
      </div>
    </FACard>
  );
};

export default AlertsPanel;
