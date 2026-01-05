import React from 'react';
import { Popover, Badge, Tooltip } from 'antd';
import { Info, Globe, ShieldCheck, Clock, Zap } from 'lucide-react';
import { useI18n } from '../../../i18n';
import FACard from '../../../ui/FACard';
import { Deployment } from '../../../shared/mocks/deployments';

const LiveBindingCard: React.FC<{ deployment: Deployment }> = ({ deployment }) => {
  const { t } = useI18n();

  return (
    <FACard 
      title={t('deployments.detail.liveBinding')} 
      density="comfort"
      className="bg-bg-card border-border shadow-sm"
      extra={
        <Popover 
          title={<span className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary">策略说明</span>}
          content={
            <div className="text-fa-t6 text-text-secondary max-w-[240px] leading-relaxed">
              此面板展示当前执行会话的直播流动态绑定策略。系统将根据边缘 Ingest 状态自动在物理节点与云端链路间切换路由。
            </div>
          } 
          trigger="hover"
        >
          <Info size={14} className="text-text-disabled cursor-help" />
        </Popover>
      }
    >
      <div className="space-y-5 pt-1">
        <FieldRow 
          label={t('deployments.live.ingestStatus')} 
          value={deployment.liveBinding.enabled ? '已确认' : '未开启'} 
          icon={<ShieldCheck size={13} />}
          highlight={deployment.liveBinding.enabled} 
          status={deployment.liveBinding.enabled ? 'success' : 'default'}
          tooltip="边缘节点是否已成功接收到飞控的 Ingest 信号"
        />
        <FieldRow 
          label={t('deployments.live.heartbeat')} 
          value="14:21:40" 
          tabular
          icon={<Clock size={13} />}
          sub="最后路径校验"
          tooltip="最后一次检测到活跃链路握手的时间"
        />
        <FieldRow 
          label={t('deployments.live.targetPriority')} 
          value={deployment.liveBinding.preferTarget} 
          mono 
          icon={<Globe size={13} />}
          tooltip="策略首选的推流目标地址或节点标识"
        />
        <FieldRow 
          label={t('deployments.live.failover')} 
          value={deployment.liveBinding.fallback ? '从未触发' : '未开启'} 
          status={deployment.liveBinding.fallback ? 'success' : 'default'}
          icon={<Zap size={13} />}
          tooltip="自动故障切换机制的状态及历史触发记录"
        />
        <FieldRow 
          label={t('deployments.live.latency')} 
          value="182ms" 
          tabular
          sub="采样自 Edge-G2"
          tooltip="边缘侧到核心网关的平均端到端延迟"
        />
        
        <div className="mt-6 p-4 bg-bg-page rounded-xl border border-dashed border-border">
           <p className="text-fa-t6 text-text-tertiary leading-relaxed italic text-center m-0">
             若需查看实时画面，请通过下方「部署历史与联动」进入物理执行监视。
           </p>
        </div>
      </div>
    </FACard>
  );
};

const FieldRow = ({ label, value, highlight, mono, icon, tabular, status, sub, tooltip }: any) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center justify-between gap-4 min-w-0">
      <Tooltip title={tooltip} placement="left" mouseEnterDelay={0.4}>
        <span className="text-fa-t6 font-fa-semibold text-text-tertiary uppercase tracking-widest flex items-center gap-2 cursor-help shrink-0">
          {icon && <span className="opacity-60 text-text-tertiary">{icon}</span>}
          {label}
        </span>
      </Tooltip>
      <div className="flex flex-col items-end min-w-0">
        <div className="flex items-center">
          {status && <Badge status={status} className="mr-2" />}
          <span className={`text-fa-t5 font-fa-semibold truncate ${highlight ? 'text-brand' : 'text-text-primary'} ${mono ? 'font-mono tracking-tighter' : ''} ${tabular ? 'font-mono tabular-nums' : ''}`}>
            {value}
          </span>
        </div>
        {sub && <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase text-[9px]">{sub}</span>}
      </div>
    </div>
  </div>
);

export default LiveBindingCard;