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
      {/* 1. Header Area within Card Body */}
      <AuditChainStatusBar />
      
      {/* 2. Timeline Container - pl-4 for consistent base padding */}
      <div className="relative pl-4 space-y-0">
        {/* Vertical Line: Centered with 32px icons (Center = padding + icon_w/2 = 16px + 16px = 32px) */}
        <div className="absolute left-[31.5px] top-8 bottom-8 w-[1.5px] bg-gray-100" />
        
        <TimelineStep 
          icon={<Zap size={14} />}
          title={t('runs.step.edge')}
          conclusion={
            <div className="flex items-center gap-2">
              <span>检测到高置信度绝缘子损坏</span>
              <Badge 
                count="置信度 0.94" 
                style={{ 
                  backgroundColor: 'rgba(38, 100, 255, 0.08)', 
                  color: 'var(--fa-brand-primary)', 
                  border: '1px solid rgba(38, 100, 255, 0.1)', 
                  fontSize: '10px', 
                  fontWeight: 'bold' 
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
    success: 'bg-green-500 text-white shadow-sm',
    error: 'bg-red-500 text-white shadow-sm',
    running: 'bg-brand text-white animate-pulse',
    neutral: 'bg-gray-100 text-gray-400 shadow-none'
  };

  return (
    <div className={`relative flex gap-6 ${isLast ? '' : 'pb-10'} group`}>
      {/* Icon Circle - w-8 (32px) */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all group-hover:scale-105 ${statusStyles[status as keyof typeof statusStyles]}`}>
        {icon}
      </div>
      
      <div className="pt-0.5 flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-2">
           <div className="min-w-0">
             <span className="fa-t7-mono font-black text-gray-400 uppercase tracking-[0.15em] block mb-1.5">{title}</span>
             <div className={`fa-t5-strong leading-tight ${status === 'error' ? 'text-red-600' : 'text-gray-900'}`}>{conclusion}</div>
           </div>
           <Tooltip title={absoluteTime} placement="left">
             <div className="shrink-0 text-right">
                <span className="fa-t7-mono text-[11px] text-gray-400 font-bold tabular-nums bg-gray-50 border border-gray-100/50 px-2 py-0.5 rounded cursor-help hover:text-brand hover:border-brand/20 transition-all">
                  {time}
                </span>
             </div>
           </Tooltip>
        </div>

        {details && (
          <div className="mt-3">
            <button 
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 fa-t6 font-bold text-gray-400 hover:text-brand transition-all uppercase tracking-widest"
            >
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {t('runs.step.details')}
            </button>
            
            {expanded && (
              <div className="mt-4 bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-200 animate-in slide-in-from-top-1 duration-200">
                <div className="flex items-center justify-between px-4 h-9 bg-gray-100/50 border-b border-gray-200 group/toolbar">
                  <div className="flex items-center gap-2">
                    <Terminal size={12} className="text-brand" />
                    <span className="fa-t7-mono text-[9px] font-black text-gray-400 uppercase tracking-widest">METADATA PAYLOAD</span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover/toolbar:opacity-100 transition-opacity">
                    <Tooltip title="复制 JSON">
                      <Button 
                        type="text" 
                        size="small" 
                        icon={<Copy size={12} />} 
                        onClick={(e) => handleCopy(e, JSON.stringify(details))}
                        className="text-gray-400 hover:text-brand flex items-center justify-center"
                      />
                    </Tooltip>
                  </div>
                </div>
                <div className="p-4 overflow-x-auto custom-scrollbar bg-white">
                  <div className="space-y-3">
                    {Object.entries(details).map(([key, val]) => (
                      <div key={key} className="flex gap-4 items-start">
                        <span className="fa-t7-mono text-[10px] text-gray-400 w-24 shrink-0 uppercase font-bold tracking-widest pt-0.5">{key}</span>
                        <pre className="fa-t7-mono text-[11px] text-gray-600 m-0 leading-relaxed whitespace-pre font-mono">
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