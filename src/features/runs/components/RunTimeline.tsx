import React, { useState } from 'react';
import { Zap, Globe, Webhook, FileText, ChevronDown, ChevronUp, Copy, Terminal } from 'lucide-react';
import { useI18n } from '../../../i18n/index';
import { RunInstance } from '../../../shared/mocks/runs';
import { Tooltip, message, Button, Badge } from 'antd';
import AuditChainStatusBar from './AuditChainStatusBar';

const RunTimeline: React.FC<{ run: RunInstance }> = ({ run }) => {
  const { t } = useI18n();

  return (
    <div className="pt-2">
      <AuditChainStatusBar />
      
      <div className="relative pl-4 space-y-0">
        {/* Standardized Vertical Line using divider token */}
        <div className="absolute left-[31.5px] top-8 bottom-8 w-[1.5px] bg-border-divider" />
        
        <TimelineStep 
          icon={<Zap size={14} />}
          title={t('runs.step.edge')}
          conclusion={
            <div className="flex items-center gap-2">
              <span>检测到高置信度绝缘子损坏</span>
              <Badge 
                count="置信度 0.94" 
                style={{ 
                  backgroundColor: 'rgba(var(--fa-brand-bg), var(--fa-brand-bg-alpha))', 
                  color: 'rgba(var(--fa-brand), 1)', 
                  border: '1px solid rgba(var(--fa-brand), 0.1)', 
                  fontSize: '10px', 
                  fontWeight: 600
                }} 
              />
            </div>
          }
          time="T+0s"
          absoluteTime="2025-12-19 14:22:01"
          status="success"
          details={{ 
            eventId: run.trigger.eventId, 
            node: 'NorthGrid-Edge-G2-01', 
            payload: JSON.stringify({ class: "insulator", conf: 0.94, bbox: [120, 440, 80, 80] }, null, 2) 
          }}
        />

        <TimelineStep 
          icon={<Globe size={14} />}
          title={t('runs.step.cloud')}
          conclusion={run.status === 'failed' && run.error?.step === 'CloudReview' ? run.error.message : "云端复核确认：目标存在结构性缺陷"}
          time="T+45s"
          absoluteTime="2025-12-19 14:22:46"
          status={run.status === 'failed' && run.error?.step === 'CloudReview' ? 'error' : 'success'}
          details={{ reviewer: 'System Auto-Check v2.1', policy: run.policyVersion }}
        />

        <TimelineStep 
          icon={<Webhook size={14} />}
          title={t('runs.step.receipt')}
          conclusion={run.receipt ? `已向业务系统推送工单回执` : "正在等待策略触发回执..."}
          time="T+2m"
          absoluteTime="2025-12-19 14:24:01"
          status={run.receipt ? 'success' : run.status === 'running' ? 'running' : 'neutral'}
          details={run.receipt ? { receiptId: run.receipt.id, system: run.receipt.system, endpoint: 'https://api.stategrid.com/v2/wo' } : null}
        />

        <TimelineStep 
          icon={<FileText size={14} />}
          title={t('runs.step.offline')}
          conclusion="自动化巡检报告已生成并归档"
          time="T+4m"
          absoluteTime="2025-12-19 14:26:01"
          status={run.status === 'completed' ? 'success' : run.status === 'running' ? 'running' : 'neutral'}
          isLast
        />
      </div>
    </div>
  );
};

const TimelineStep = ({ icon, title, conclusion, time, absoluteTime, status, details, isLast }: any) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useI18n();

  const handleCopy = (e: React.MouseEvent, content: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(content);
    message.success({ content: 'Payload 已复制', key: 'copy' });
  };

  const statusStyles = {
    success: 'bg-success text-text-inverse shadow-sm',
    error: 'bg-error text-text-inverse shadow-sm',
    running: 'bg-brand text-text-inverse animate-pulse',
    neutral: 'bg-bg-page text-text-tertiary border border-border shadow-none'
  };

  return (
    <div className={`relative flex gap-6 ${isLast ? '' : 'pb-10'} group`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all group-hover:scale-105 ${statusStyles[status as keyof typeof statusStyles]}`}>
        {icon}
      </div>
      
      <div className="pt-0.5 flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-2">
           <div className="min-w-0">
             <span className="text-fa-t7 font-fa-semibold font-mono text-text-tertiary uppercase tracking-[0.15em] block mb-1.5">{title}</span>
             <div className={`text-fa-t5 font-fa-semibold leading-tight ${status === 'error' ? 'text-error' : 'text-text-primary'}`}>{conclusion}</div>
           </div>
           <Tooltip title={absoluteTime} placement="left">
             <div className="shrink-0 text-right">
                <span className="text-fa-t7 font-fa-semibold font-mono text-[11px] text-text-tertiary tabular-nums bg-bg-page border border-border px-2 py-0.5 rounded cursor-help hover:text-brand hover:border-brand/20 transition-all">
                  {time}
                </span>
             </div>
           </Tooltip>
        </div>

        {details && (
          <div className="mt-3">
            <button 
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 text-fa-t6 font-fa-semibold text-text-tertiary hover:text-brand transition-all uppercase tracking-widest border-none bg-transparent cursor-pointer"
            >
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {t('runs.step.details')}
            </button>
            
            {expanded && (
              <div className="mt-4 bg-bg-page rounded-control overflow-hidden shadow-sm border border-border animate-in slide-in-from-top-1 duration-200">
                <div className="flex items-center justify-between px-4 h-9 bg-action-hover border-b border-border group/toolbar">
                  <div className="flex items-center gap-2">
                    <Terminal size={12} className="text-brand" />
                    <span className="text-fa-t7 font-fa-semibold font-mono text-[9px] text-text-tertiary uppercase tracking-widest">METADATA PAYLOAD</span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover/toolbar:opacity-100 transition-opacity">
                    <Tooltip title="复制 JSON">
                      <Button 
                        type="text" 
                        size="small" 
                        icon={<Copy size={12} />} 
                        onClick={(e) => handleCopy(e, JSON.stringify(details))}
                        className="text-text-tertiary hover:text-brand flex items-center justify-center p-0 h-6 w-6"
                      />
                    </Tooltip>
                  </div>
                </div>
                <div className="p-4 overflow-x-auto custom-scrollbar bg-bg-card">
                  <div className="space-y-3">
                    {Object.entries(details).map(([key, val]) => (
                      <div key={key} className="flex gap-4 items-start">
                        <span className="text-fa-t7 font-fa-semibold font-mono text-[10px] text-text-tertiary w-24 shrink-0 uppercase tracking-widest pt-0.5">{key}</span>
                        <pre className="text-fa-t7 font-fa-medium font-mono text-[11px] text-text-secondary m-0 leading-relaxed whitespace-pre">
                          {String(val)}
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RunTimeline;