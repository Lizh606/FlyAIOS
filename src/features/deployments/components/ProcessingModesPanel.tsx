import React from 'react';
import { Zap, Globe, FileText, ChevronRight } from 'lucide-react';
import { Popover } from 'antd';
import { useI18n } from '../../../i18n';
import FACard from '../../../ui/FACard';
import FATag from '../../../ui/FATag';

interface Step {
  name: string;
  app: string;
  trigger?: string;
  mode: string;
}

const ProcessingModesPanel: React.FC = () => {
  const { t } = useI18n();

  const edgeSteps: Step[] = [
    { name: "Edge Defect Alert", app: "Powerline-AI-Pack v1.3", mode: "Edge" }
  ];

  const cloudSteps: Step[] = [
    { name: "Cloud Review", app: "Cloud-Review-Pack v2.0", trigger: "EdgeAlertRaised", mode: "Cloud" }
  ];

  const batchSteps: Step[] = [
    { name: "LLM Report", app: "Reporting-Engine v1.1", trigger: "ExecutionCompleted", mode: "Batch" },
    { name: "Data Sync", app: "Sync-Module v0.9", trigger: "Daily", mode: "Batch" }
  ];

  const renderSection = (titleKey: string, icon: React.ReactNode, steps: Step[], colorClass: string, meta: string) => {
    const resolvedTitle = t(titleKey);
    const finalTitle = resolvedTitle === titleKey ? 
      (titleKey.includes('edge') ? 'Edge Realtime' : 
       titleKey.includes('cloud') ? 'Near Real-time Cloud' : 'Offline Batch') : resolvedTitle;

    return (
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          {/* 修改点：离线批处理不再使用 bg-brand */}
          <div className={`p-1.5 rounded-lg ${colorClass} bg-opacity-10 text-opacity-100`}>
            {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 16 }) : icon}
          </div>
          <h4 className="fa-t4 text-text-primary leading-none">{finalTitle}</h4>
        </div>
        <p className="fa-t6 text-text-tertiary uppercase tracking-widest font-fa-semibold mb-4 ml-8 text-[10px]">{meta}</p>
        
        <div className="space-y-1 ml-8">
          {steps.map((step, idx) => (
            <div key={idx} className="group py-2.5 border-b border-divider last:border-0 hover:bg-action-hover rounded-md transition-colors px-1">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="fa-t5-strong text-text-secondary truncate leading-tight">{step.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="fa-t7-mono text-[9px] text-text-tertiary font-bold uppercase tracking-tight">{step.app}</span>
                    {step.trigger && (
                      <>
                        <div className="w-1 h-1 bg-divider rounded-full" />
                        <span className="fa-t7-mono text-[9px] text-brand/60 font-fa-semibold uppercase">TRIG: {step.trigger.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </>
                    )}
                  </div>
                </div>
                <FATag mono className="shrink-0">{step.mode}</FATag>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <FACard title={t('deployments.detail.modes')} density="comfort" className="bg-bg-card border-border">
      <div className="flex flex-col lg:flex-row gap-x-12 gap-y-10">
        {renderSection('deployments.mode.edge', <Zap className="text-orange-500" />, edgeSteps, "bg-orange-500", "Real-time Inference")}
        <div className="hidden lg:block w-px bg-divider self-stretch my-2 opacity-40" />
        {renderSection('deployments.mode.cloud', <Globe className="text-teal-500" />, cloudSteps, "bg-teal-500", "Alert Verification")}
        <div className="hidden lg:block w-px bg-divider self-stretch my-2 opacity-40" />
        {/* 修改点：将 bg-brand 修改为中性的 bg-action-hover */}
        {renderSection('deployments.mode.batch', <FileText className="text-text-tertiary" />, batchSteps, "bg-action-hover", "Reporting & Sync")}
      </div>
    </FACard>
  );
};

export default ProcessingModesPanel;