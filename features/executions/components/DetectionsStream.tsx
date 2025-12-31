import React from 'react';
import { Activity, Eye, SlidersHorizontal } from 'lucide-react';
import { Tooltip, Select, Slider, Divider, Popover, Button } from 'antd';
import { useI18n } from '../../../i18n';
import FACard from '../../../ui/FACard';
import { MOCK_DETECTIONS } from '../../../shared/mocks/streams';

interface DetectionsStreamProps {
  executionId: string;
  isActive: boolean;
  overlayOn: boolean;
  confidence?: number;
}

const DetectionsStream: React.FC<DetectionsStreamProps> = ({ executionId, isActive, confidence: currentConf = 0.8 }) => {
  const { t } = useI18n();
  const detections = MOCK_DETECTIONS[executionId] || [];

  const filterContent = (
    <div className="w-[280px] p-2 space-y-5">
      <div>
        <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase block mb-3">{t('executions.live.filter.class')}</span>
        <Select
          mode="multiple"
          placeholder="过滤显示类别..."
          className="w-full h-9"
          size="middle"
          options={[
            { label: '绝缘子 (Insulator)', value: 'ins' },
            { label: '鸟巢 (Bird Nest)', value: 'nest' },
            { label: '异物 (Foreign Object)', value: 'obj' }
          ]}
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase">{t('executions.live.filter.conf')}</span>
          <span className="text-fa-t7 font-fa-semibold text-brand">≥ {currentConf.toFixed(2)}</span>
        </div>
        <Slider min={0} max={1} step={0.05} defaultValue={currentConf} />
      </div>
      <Divider className="my-0 opacity-10" />
      <Button type="primary" size="small" block className="h-8 text-fa-t6 font-fa-semibold uppercase">应用过滤</Button>
    </div>
  );

  return (
    <FACard 
      title={t('executions.live.detections')} 
      density="compact" 
      className="h-full flex flex-col bg-bg-card shadow-card border-border overflow-hidden"
      extra={
        <div className="flex items-center gap-3">
           <Popover content={filterContent} trigger="click" placement="bottomRight" overlayClassName="fa-popover-v2">
              <button className="p-1.5 hover:bg-action-hover rounded-lg text-text-tertiary hover:text-brand transition-all flex items-center gap-1.5 border-none bg-transparent cursor-pointer">
                <SlidersHorizontal size={14} />
                <span className="text-fa-t7 font-fa-semibold uppercase">过滤</span>
              </button>
           </Popover>
           <Activity size={14} className={isActive ? 'text-brand animate-pulse' : 'text-text-tertiary'} />
        </div>
      }
    >
      <div className="flex-1 overflow-y-auto custom-scrollbar -mx-1 px-1 py-1 space-y-2.5">
        {isActive && detections.length > 0 ? (
          detections.map(det => (
            <div key={det.id} className="p-3 bg-bg-card border border-border rounded-xl hover:border-brand/30 hover:shadow-card transition-all cursor-pointer group flex flex-col gap-2">
               <div className="flex items-center justify-between min-w-0">
                  <span className={`text-fa-t6 font-fa-semibold uppercase tracking-tight truncate flex-1 ${det.confidence > 0.8 ? 'text-text-primary' : 'text-text-secondary'}`}>
                    {det.class.replace(/_/g, ' ')}
                  </span>
                  <span className="text-fa-t7 font-fa-semibold text-text-tertiary tabular-nums shrink-0 ml-3">{det.timestamp}</span>
               </div>
               
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <span className={`text-fa-t7 font-fa-semibold px-2 py-0.5 rounded leading-none ${det.confidence > 0.8 ? 'bg-brand-bg text-brand' : 'bg-bg-page text-text-disabled'}`}>
                        {Math.round(det.confidence * 100)}%
                     </span>
                     {det.confidence > 0.9 && (
                       <span className="text-fa-t7 font-fa-semibold text-live uppercase tracking-[0.15em]">{t('executions.live.tag.verified')}</span>
                     )}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Tooltip title="定位到画面"><Eye size={14} className="text-brand" /></Tooltip>
                  </div>
               </div>
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-20 text-center">
             <div className="w-14 h-14 rounded-full bg-bg-page flex items-center justify-center mb-4 text-text-tertiary">
               <Activity size={24} />
             </div>
             <span className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary">
               {isActive ? '暂无实时检测结果' : '信号流已关闭'}
             </span>
          </div>
        )}
      </div>
    </FACard>
  );
};

export default DetectionsStream;