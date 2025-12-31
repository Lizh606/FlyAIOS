import React from 'react';
import { GitBranch, Activity, ShieldCheck, CheckCircle2, ExternalLink, Radio, FileText, Download, AlertCircle } from 'lucide-react';
import { Divider, Tag, Button } from 'antd';
import { useI18n } from '../../../i18n';
import { Execution } from '../../../shared/types/domain';
import FACard from '../../../ui/FACard';
import { MOCK_STREAM_FACTS } from '../../../shared/mocks/streams';
import { useNavigate } from 'react-router-dom';

interface AutomationPanelProps {
  execution: Execution;
}

const AutomationPanel: React.FC<AutomationPanelProps> = ({ execution }) => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const facts = MOCK_STREAM_FACTS[execution.id];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pb-12 animate-in fade-in duration-300">
      <div className="lg:col-span-12">
        <FACard title={t('executions.auto.boundPolicies')} density="comfort">
           <div className="flex flex-col lg:flex-row gap-x-12 gap-y-8">
              <div className="flex-1 min-w-0">
                 <div className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary mb-4 flex items-center gap-2">
                    <GitBranch size={14} className="text-text-tertiary" /> {t('executions.auto.workflow')}
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-bg-page border border-border hover:border-brand/40 hover:bg-bg-card transition-all cursor-pointer group shadow-sm rounded-2xl">
                    <div className="w-12 h-12 rounded-xl bg-bg-card border border-border flex items-center justify-center text-brand shrink-0 group-hover:bg-brand-bg transition-colors shadow-sm">
                       <GitBranch size={24} />
                    </div>
                    <div className="min-w-0 flex-1">
                       <h4 className="text-fa-t5 font-fa-semibold text-text-primary truncate leading-tight mb-1">NorthGrid-E2E-Inspection</h4>
                       <div className="flex items-center gap-2">
                          <Tag color="blue" className="text-fa-t7 font-fa-semibold px-1.5 m-0 border-none uppercase leading-none py-0.5">v1.3.0</Tag>
                          <span className="text-fa-t7 font-fa-medium text-text-tertiary uppercase tracking-tight">已发布于 2024-12-19</span>
                       </div>
                    </div>
                    <Activity size={16} className="text-text-tertiary group-hover:text-brand transition-colors rotate-[-45deg]" />
                 </div>
              </div>

              <div className="hidden lg:block w-px bg-divider self-stretch my-2 opacity-40" />

              <div className="flex-1">
                 <div className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary mb-5 flex items-center gap-2">
                    <ShieldCheck size={14} className="text-text-tertiary" /> {t('executions.auto.deployment')}
                 </div>
                 <div className="grid grid-cols-2 gap-y-6">
                    <PolicyMeta label="部署 ID" value="#DEP-8821" tabular />
                    <PolicyMeta label={t('executions.auto.policy.applied')} value="生效中 (P-20251219)" highlight status="success" />
                    <PolicyMeta label="清单版本" value="M-772A-B9" tabular />
                    <PolicyMeta label={t('executions.auto.policy.nodes')} value="全机队: 12 个边缘节点" />
                 </div>
              </div>
           </div>
        </FACard>
      </div>

      <div className="lg:col-span-8">
        <FACard 
          title={t('executions.auto.triggeredRuns')} 
          density="comfort"
          extra={execution.runId && (
            <Button 
              type="primary" 
              size="middle"
              ghost
              icon={<ExternalLink size={14}/>} 
              className="text-fa-t6 font-fa-semibold uppercase h-8 px-4 flex items-center gap-2 border-brand/40"
              onClick={() => navigate(`/run/${execution.runId}`)}
            >
              {t('executions.auto.openRun')}
            </Button>
          )}
        >
           {execution.runId ? (
             <div className="p-5 border border-border rounded-2xl bg-bg-page shadow-sm relative">
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-success shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                      <span className="text-fa-t3 font-mono font-fa-semibold uppercase tracking-tighter text-text-primary">RUN-{execution.runId.toUpperCase()}</span>
                   </div>
                   <Tag color="success" className="m-0 text-fa-t7 font-fa-semibold uppercase px-3 py-0.5 border-none shadow-sm">已完成 (SUCCESS)</Tag>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   <PolicyMeta label="触发源" value="边缘识别告警" />
                   <PolicyMeta label="执行耗时" value="04分 22秒" tabular />
                   <PolicyMeta label="逻辑产物" value="5 个结果集" highlight />
                   <PolicyMeta label="完成时刻" value="14:22:10" tabular />
                </div>
                
                <div className="mt-8 pt-5 border-t border-divider flex items-center flex-wrap gap-3">
                   <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase mr-2 tracking-widest">证据链产物:</span>
                   <ArtifactChip icon={<FileText size={13}/>} label="PDF 巡检报告" color="brand" />
                   <ArtifactChip icon={<Activity size={13}/>} label="边缘推理日志" color="gray" />
                   <ArtifactChip icon={<Download size={13}/>} label="分析产物 CSV" color="gray" />
                </div>
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-full bg-bg-page flex items-center justify-center mb-4 text-text-disabled shadow-inner">
                  <Activity size={32} />
                </div>
                <span className="text-fa-t5 font-fa-semibold uppercase tracking-widest text-text-tertiary">暂无触发的运行记录</span>
             </div>
           )}
        </FACard>
      </div>

      <div className="lg:col-span-4">
        <FACard title={t('executions.auto.sessionFacts')} density="comfort">
           <div className="space-y-4 pt-1">
              <FactRow label={t('executions.auto.fact.sessionId')} value={facts?.sessionId?.toUpperCase() || '—'} mono />
              <FactRow label={t('executions.auto.fact.startedAt')} value={facts?.startedAt || '-'} tabular />
              <FactRow label={t('executions.auto.fact.heartbeat')} value={facts?.lastHeartbeat || '-'} tabular />
              <FactRow 
                label={t('executions.auto.fact.ingest')} 
                value={
                  <Tag color={facts?.ingestConfirmed ? 'success' : 'default'} className="m-0 text-fa-t7 font-fa-semibold border-none uppercase px-2 py-0.5 leading-none">
                    {facts?.ingestConfirmed ? 'YES' : 'NO'}
                  </Tag>
                } 
              />
              
              <Divider className="my-3 opacity-10" />
              
              <div className="flex flex-col gap-2.5">
                 <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase tracking-[0.15em] mb-1">{t('executions.auto.fact.fallback')}</span>
                 {facts?.fallbackHistory && facts.fallbackHistory.length > 0 ? (
                   <div className="p-3.5 bg-warning/5 rounded-xl border border-warning/20 flex items-start gap-3">
                     <AlertCircle size={14} className="text-warning shrink-0 mt-0.5" />
                     <div className="flex-1 min-w-0">
                        <span className="text-fa-t6 font-fa-semibold text-warning block mb-1">检测到会话切源记录</span>
                        <p className="text-fa-t7 font-fa-medium text-warning/80 truncate m-0">{facts.fallbackHistory[0]}</p>
                     </div>
                   </div>
                 ) : (
                   <div className="p-3.5 bg-bg-page rounded-xl border border-border flex items-center justify-center gap-2 opacity-60">
                     <CheckCircle2 size={14} className="text-text-tertiary" />
                     <span className="text-fa-t6 font-fa-medium text-text-tertiary italic">链路稳定，未发生故障切换</span>
                   </div>
                 )}
              </div>
           </div>
        </FACard>
      </div>
    </div>
  );
};

const PolicyMeta = ({ label, value, tabular, highlight, status }: any) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase tracking-widest leading-none">{label}</span>
    <div className="flex items-center gap-2">
      {status === 'success' && <div className="w-1.5 h-1.5 rounded-full bg-success" />}
      <span className={`text-fa-t5 font-fa-semibold leading-tight ${tabular ? 'tabular-nums font-mono text-[14px]' : ''} ${highlight ? 'text-brand' : 'text-text-primary'}`}>
        {value}
      </span>
    </div>
  </div>
);

const ArtifactChip = ({ icon, label, color }: any) => (
  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm transition-all cursor-pointer hover:shadow-card ${
    color === 'brand' ? 'bg-brand-bg text-brand border-brand/20 hover:border-brand/40' : 'bg-bg-page text-text-secondary border-border hover:bg-bg-card'
  }`}>
    <span className="opacity-70">{icon}</span>
    <span className="text-fa-t6 font-fa-semibold uppercase tracking-tight">{label}</span>
  </div>
);

const FactRow = ({ label, value, mono, tabular }: any) => (
  <div className="flex items-center justify-between h-8 gap-6 border-b border-divider last:border-0">
    <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase tracking-widest shrink-0">{label}</span>
    <div className="min-w-0 truncate text-right">
      {React.isValidElement(value) ? value : (
        <span className={`text-fa-t5 font-fa-semibold text-text-secondary leading-none ${mono ? 'font-mono text-[12px] tracking-tighter' : ''} ${tabular ? 'font-mono tabular-nums' : ''}`}>
          {value}
        </span>
      )}
    </div>
  </div>
);

export default AutomationPanel;