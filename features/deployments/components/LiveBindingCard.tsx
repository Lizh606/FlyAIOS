import React from 'react';
import { Popover, Badge, Tooltip } from 'antd';
import { Info, Globe, ShieldCheck, Clock, Zap } from 'lucide-react';
import { useI18n } from '../../../i18n';
import FACard from '../../../ui/FACard';
import { Deployment } from '../../../shared/mocks/deployments';

/**
 * LiveBindingCard - Deployment Detail View (Page C)
 * Position: Read-only summary of the Live Session Routing policy.
 * Ref: v0.2 Interaction Matrix - "Live Binding Summary (Read Only)"
 */
const LiveBindingCard: React.FC<{ deployment: Deployment; onPreviewManifest?: () => void }> = ({ deployment }) => {
  const { t } = useI18n();

  return (
    <FACard 
      title={t('deployments.detail.liveBinding')} 
      density="comfort"
      className="bg-white border-gray-100 shadow-sm"
      extra={
        <Popover 
          title={<span className="fa-t6 font-bold uppercase tracking-widest text-gray-400">Policy Explanation</span>}
          content={
            <div className="fa-t6 text-gray-500 max-w-[240px] leading-relaxed">
              此面板展示当前执行会话的直播流动态绑定策略。系统将根据边缘 Ingest 状态自动在物理节点与云端链路间切换路由。
            </div>
          } 
          trigger="hover"
        >
          <Info size={14} className="text-gray-300 cursor-help" />
        </Popover>
      }
    >
      <div className="space-y-4 pt-2">
        <FieldRow 
          label={t('deployments.live.ingestStatus')} 
          value={deployment.liveBinding.enabled ? '已确认 (CONFIRMED)' : '未开启 (OFF)'} 
          icon={<ShieldCheck size={12} />}
          highlight={deployment.liveBinding.enabled} 
          status={deployment.liveBinding.enabled ? 'success' : 'default'}
          tooltip="边缘节点是否已成功接收到飞控的 Ingest 信号"
        />
        <FieldRow 
          label={t('deployments.live.heartbeat')} 
          value="14:21:40" 
          tabular
          icon={<Clock size={12} />}
          sub="最后一次路径校验"
          tooltip="最后一次检测到活跃链路握手的时间"
        />
        <FieldRow 
          label={t('deployments.live.targetPriority')} 
          value={deployment.liveBinding.preferTarget} 
          mono 
          icon={<Globe size={12} />}
          tooltip="策略首选的推流目标地址或节点标识"
        />
        <FieldRow 
          label={t('deployments.live.failover')} 
          value={deployment.liveBinding.fallback ? '从未触发' : '未开启'} 
          status={deployment.liveBinding.fallback ? 'success' : 'default'}
          icon={<Zap size={12} />}
          tooltip="自动故障切换机制的状态及历史触发记录"
        />
        <FieldRow 
          label={t('deployments.live.latency')} 
          value="182ms" 
          tabular
          sub="采样自 Edge-G2"
          tooltip="边缘侧到核心网关的平均端到端延迟"
        />
        
        {/* Notice Panel replacing Action Button */}
        <div className="mt-4 p-4 bg-gray-50/50 rounded-xl border border-gray-100 border-dashed">
           <p className="fa-t6 text-gray-400 leading-relaxed italic text-center">
             若需查看实时画面或进行深度诊断，请通过右侧「部署历史与联动」进入「物理执行 (Executions)」视图。
           </p>
        </div>
      </div>
    </FACard>
  );
};

const FieldRow = ({ label, value, highlight, mono, icon, tabular, status, sub, tooltip }: any) => (
  <div className="flex flex-col gap-0.5">
    <div className="flex items-center justify-between gap-4">
      <Tooltip title={tooltip} placement="left" mouseEnterDelay={0.4}>
        <span className="fa-t6 text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-help">
          {icon && <span className="opacity-60">{icon}</span>}
          {label}
        </span>
      </Tooltip>
      <div className="flex flex-col items-end">
        <div className="flex items-center">
          {status && <Badge status={status} className="mr-2" />}
          <span className={`fa-t5-strong ${highlight ? 'text-brand' : 'text-gray-900'} ${mono ? 'font-mono tracking-tighter' : ''} ${tabular ? 'font-mono tabular-nums' : ''}`}>
            {value}
          </span>
        </div>
        {sub && <span className="fa-t7-mono text-[9px] text-gray-400 font-bold uppercase">{sub}</span>}
      </div>
    </div>
  </div>
);

export default LiveBindingCard;