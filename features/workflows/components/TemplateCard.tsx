
import React from 'react';
import { Zap, LayoutGrid, ArrowRight, Box } from 'lucide-react';
import { Tooltip, Popover } from 'antd';
import { useI18n } from '../../../i18n';
import { WorkflowTemplate } from '../../../shared/mocks/templates';
import FACard from '../../../ui/FACard';
import FATag from '../../../ui/FATag';

interface TemplateCardProps {
  template: WorkflowTemplate;
  onClick: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onClick }) => {
  const { t } = useI18n();
  const triggerLimit = 2;
  const outputLimit = 3;

  const renderOverflow = (items: string[], limit: number, title: string) => {
    const remaining = items.slice(limit);
    if (remaining.length === 0) return null;

    const content = (
      <div className="w-[200px] p-2" onClick={(e) => e.stopPropagation()}>
        <div className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase tracking-[0.15em] mb-3">
          {title.toUpperCase()}
        </div>
        <div className="space-y-1.5">
          {remaining.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-brand/40 shrink-0" />
              <span className="text-fa-t6 text-text-secondary font-fa-medium truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <Popover 
        content={content} 
        trigger={['hover', 'click']} 
        placement="top" 
        overlayClassName="fa-popover-v2"
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          className="w-6 h-6 flex items-center justify-center bg-bg-page border border-border text-text-tertiary rounded-full text-fa-t7 font-fa-semibold transition-all hover:border-brand/30 hover:text-brand cursor-help shrink-0 shadow-sm ml-1"
        >
          +{remaining.length}
        </div>
      </Popover>
    );
  };

  return (
    <FACard 
      hoverable 
      onClick={onClick}
      className="group flex flex-col h-[280px] border-border shadow-card bg-bg-card transition-all duration-300"
      density="compact"
    >
      {/* 1. Header: Icon + Title + Meta (对齐 AppCard) */}
      <div className="flex items-start gap-3 mb-3 shrink-0">
        <div className="w-11 h-11 rounded-xl bg-brand-bg border border-brand/10 flex items-center justify-center text-brand shrink-0 group-hover:bg-bg-card group-hover:border-brand/20 transition-colors">
          <Zap size={20} fill="currentColor" className="opacity-70" />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="text-fa-t5 font-fa-semibold text-text-primary truncate group-hover:text-brand transition-colors leading-tight m-0 mb-0.5">
            {template.name}
          </h3>
          <p className="text-fa-t6 font-fa-medium text-text-tertiary truncate tracking-tight m-0 uppercase">
            {template.industry}
          </p>
        </div>
      </div>

      {/* 2. Body: Description + Metadata Groups (space-y-3 对齐) */}
      <div className="flex-1 flex flex-col min-h-0 space-y-3">
        <Tooltip title={template.description}>
          <p className="text-fa-t6 text-text-secondary truncate leading-relaxed m-0">
            {template.description}
          </p>
        </Tooltip>

        <div className="space-y-3">
          <div className="flex flex-col gap-1.5">
            <span className="text-fa-t7 font-fa-semibold font-mono text-text-tertiary uppercase tracking-widest text-[9px] block">
              {t('workflows.drawer.triggers')}
            </span>
            <div className="flex items-center gap-1.5 h-6">
              <div className="flex items-center gap-1.5 truncate">
                {template.triggers.slice(0, triggerLimit).map(tr => (
                  <FATag key={tr}>{tr}</FATag>
                ))}
              </div>
              {renderOverflow(template.triggers, triggerLimit, t('workflows.drawer.triggers'))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-fa-t7 font-fa-semibold font-mono text-text-tertiary uppercase tracking-widest text-[9px] block">
              {t('workflows.drawer.expectedOutputs')}
            </span>
            <div className="flex items-center gap-1.5 h-6">
              <div className="flex items-center gap-1.5 truncate">
                {template.outputs.slice(0, outputLimit).map(out => (
                  <FATag key={out}>{out}</FATag>
                ))}
              </div>
              {renderOverflow(template.outputs, outputLimit, t('workflows.drawer.expectedOutputs'))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Footer: Stats + Action (对齐布局) */}
      <div className="mt-auto py-3 border-t border-divider flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4 text-text-tertiary">
          <Tooltip title={`${template.processingModes.length} Modes`}>
            <div className="flex items-center gap-1.5">
              <LayoutGrid size={13} className="opacity-60" />
              <span className="text-fa-t7 font-fa-semibold font-mono tabular-nums">{template.processingModes.length}</span>
            </div>
          </Tooltip>
          <Tooltip title={`${template.apps.length} Apps`}>
            <div className="flex items-center gap-1.5">
              <Box size={13} className="opacity-60" />
              <span className="text-fa-t7 font-fa-semibold font-mono tabular-nums">{template.apps.length}</span>
            </div>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2">
          <button className="text-fa-t7 font-fa-semibold uppercase h-7 px-2.5 text-text-tertiary border border-border rounded-md hover:text-brand hover:border-brand/40 flex items-center gap-1 group/btn transition-all">
            {t('common.view')} <ArrowRight size={12} className="transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>

      <style>{`
        .fa-popover-v2 .ant-popover-inner {
          padding: 12px;
          border-radius: 12px;
          background: rgba(var(--fa-bg-card), 1);
          box-shadow: var(--fa-shadow-overlay);
          border: 1px solid rgba(var(--fa-border), var(--fa-border-alpha));
        }
      `}</style>
    </FACard>
  );
};

export default TemplateCard;
