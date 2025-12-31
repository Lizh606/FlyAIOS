
import React from 'react';
// Added AlertCircle to imports to fix "Cannot find name 'AlertCircle'" error
import { GitBranch, Box, Activity, ShieldCheck, CheckCircle2, XCircle, ExternalLink, Clock, Radio, Info, FileText, Download, AlertCircle } from 'lucide-react';
import { Divider, Tag, Tooltip, Button } from 'antd';
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
      {/* 1. Policies Matrix */}
      <div className="lg:col-span-12">
        <FACard title={t('executions.auto.boundPolicies')} density="comfort">
           <div className="flex flex-col lg:flex-row gap-x-12 gap-y-8">
              <div className="flex-1 min-w-0">
                 <div className="fa-t6 font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                    <GitBranch size={14} className="text-gray-300" /> {t('executions.auto.workflow')}
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-brand/40 hover:bg-white transition-all cursor-pointer group shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-brand shrink-0 group-hover:bg-blue-50 transition-colors shadow-sm">
                       <GitBranch size={24} />
                    </div>
                    <div className="min-w-0 flex-1">
                       <h4 className="fa-t5-strong text-gray-900 truncate leading-tight mb-1">NorthGrid-E2E-Inspection</h4>
                       <div className="flex items-center gap-2">
                          <Tag color="blue" className="fa-t7-mono text-[10px] font-black px-1.5 m-0 border-none uppercase leading-none py-0.5">v1.3.0</Tag>
                          <span className="fa-t7-mono text-[11px] text-gray-400 font-medium uppercase tracking-tight">已发布于 2024-12-19</span>
                       </div>
                    </div>
                    <ChevronDownLeft size={16} className="text-gray-200 group-hover:text-brand transition-colors rotate-[-45deg]" />
                 </div>
              </div>

              <div className="hidden lg:block w-px bg-gray-100 self-stretch my-2 opacity-40" />

              <div className="flex-1">
                 <div className="fa-t6 font-bold uppercase tracking-widest text-gray-400 mb-5 flex items-center gap-2">
                    <ShieldCheck size={14} className="text-gray-300" /> {t('executions.auto.deployment')}
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

      {/* 2. Logic Runs (Evidence) */}
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
              className="fa-t6 font-bold uppercase h-8 px-4 flex items-center gap-2 border-brand/40"
              onClick={() => navigate(`/run/${execution.runId}`)}
            >
              {t('executions.auto.openRun')}
            </Button>
          )}
        >
           {execution.runId ? (
             <div className="p-5 border border-gray-100 rounded-2xl bg-gray-50/20 shadow-sm relative group/run">
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                      <span className="fa-t3 font-mono font-bold uppercase tracking-tighter text-gray-900">RUN-{execution.runId.toUpperCase()}</span>
                   </div>
                   <Tag color="success" className="m-0 fa-t7-mono font-black uppercase px-3 py-0.5 border-none shadow-sm">已完成 (SUCCESS)</Tag>
                </div>
                
                <div className="grid grid-cols-4 gap-6">
                   <PolicyMeta label="触发源" value="边缘识别告警" />
                   <PolicyMeta label="执行耗时" value="04分 22秒" tabular />
                   <PolicyMeta label="逻辑产物" value="5 个结果集" highlight />
                   <PolicyMeta label="完成时刻" value="14:22:10" tabular />
                </div>
                
                <div className="mt-8 pt-5 border-t border-gray-100/60 flex items-center flex-wrap gap-3">
                   <span className="fa-t7-mono text-[10px] text-gray-400 font-bold uppercase mr-2 tracking-widest">证据链产物:</span>
                   <ArtifactChip icon={<FileText size={13}/>} label="PDF 巡检报告" color="brand" />
                   <ArtifactChip icon={<Activity size={13}/>} label="边缘推理日志" color="gray" />
                   <ArtifactChip icon={<Download size={13}/>} label="分析产物 CSV" color="gray" />
                </div>
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-gray-100 shadow-inner">
                  <Activity size={32} />
                </div>
                <span className="fa-t5-strong font-black uppercase tracking-widest text-gray-300">暂无触发的运行记录</span>
             </div>
           )}
        </FACard>
      </div>

      {/* 3. Session Facts (Audit) */}
      <div className="lg:col-span-4">
        <FACard title={t('executions.auto.sessionFacts')} density="comfort">
           <div className="space-y-4 pt-1">
              <FactRow label={t('executions.auto.fact.sessionId')} value={facts?.sessionId?.toUpperCase() || '—'} mono />
              <FactRow label={t('executions.auto.fact.startedAt')} value={facts?.startedAt || '-'} tabular />
              <FactRow label={t('executions.auto.fact.heartbeat')} value={facts?.lastHeartbeat || '-'} tabular />
              <FactRow 
                label={t('executions.auto.fact.ingest')} 
                value={
                  <Tag color={facts?.ingestConfirmed ? 'success' : 'default'} className="m-0 fa-t7-mono font-black border-none uppercase px-2 py-0.5 leading-none">
                    {facts?.ingestConfirmed ? 'YES' : 'NO'}
                  </Tag>
                } 
              />
              
              <Divider className="my-3 opacity-5" />
              
              <div className="flex flex-col gap-2.5">
                 <span className="fa-t7-mono text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] mb-1">{t('executions.auto.fact.fallback')}</span>
                 {facts?.fallbackHistory && facts.fallbackHistory.length > 0 ? (
                   <div className="p-3.5 bg-orange-50/50 rounded-xl border border-orange-100 flex items-start gap-3">
                     <AlertCircle size={14} className="text-orange-500 shrink-0 mt-0.5" />
                     <div className="flex-1 min-w-0">
                        <span className="fa-t6 font-bold text-orange-700 block mb-1">检测到会话切源记录</span>
                        <p className="fa-t7-mono text-[10px] text-orange-600 truncate opacity-80">{facts.fallbackHistory[0]}</p>
                     </div>
                   </div>
                 ) : (
                   <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center gap-2 opacity-60">
                     <ShieldCheck size={14} className="text-gray-300" />
                     <span className="fa-t6 font-medium text-gray-400 italic">链路稳定，未发生故障切换</span>
                   </div>
                 )}
              </div>
           </div>
        </FACard>
      </div>
    </div>
  );
};

const ChevronDownLeft = ({ size, className }: any) => <Activity size={size} className={className} />;

const PolicyMeta = ({ label, value, tabular, highlight, status }: any) => (
  <div className="flex flex-col gap-1.5">
    <span className="fa-t7-mono text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-none">{label}</span>
    <div className="flex items-center gap-2">
      {status === 'success' && <div className="w-1.5 h-1.5 rounded-full bg-green-500" />}
      <span className={`fa-t5-strong leading-tight ${tabular ? 'tabular-nums font-mono text-[14px] tracking-tight' : ''} ${highlight ? 'text-brand' : 'text-gray-800'}`}>
        {value}
      </span>
    </div>
  </div>
);

const ArtifactChip = ({ icon, label, color }: any) => (
  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm transition-all cursor-pointer hover:shadow-md ${
    color === 'brand' ? 'bg-blue-50 text-brand border-blue-100 hover:border-brand/40' : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-white'
  }`}>
    <span className="opacity-70">{icon}</span>
    <span className="fa-t6 font-bold uppercase tracking-tight">{label}</span>
  </div>
);

const FactRow = ({ label, value, mono, tabular }: any) => (
  <div className="flex items-center justify-between h-8 gap-6 border-b border-gray-50 last:border-0">
    <span className="fa-t7-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest shrink-0">{label}</span>
    <div className="min-w-0 truncate text-right">
      {React.isValidElement(value) ? value : (
        <span className={`fa-t5-strong text-gray-700 leading-none ${mono ? 'font-mono text-[12px] tracking-tighter' : ''} ${tabular ? 'font-mono tabular-nums' : ''}`}>
          {value}
        </span>
      )}
    </div>
  </div>
);

export default AutomationPanel;
