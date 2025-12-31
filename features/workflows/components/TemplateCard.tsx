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
        <div className="fa-t7-mono text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] mb-3">
          {title.toUpperCase()}
        </div>
        <div className="space-y-1.5">
          {remaining.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-brand/40 shrink-0" />
              <span className="fa-t6 text-gray-700 font-medium truncate">{item}</span>
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
          className="w-6 h-6 flex items-center justify-center bg-blue-50 border border-blue-100 text-brand rounded-full fa-t7-mono text-[10px] font-bold transition-all hover:bg-blue-100 cursor-help shrink-0 shadow-sm ml-1"
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
      className="group flex flex-col h-[260px] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
      density="compact"
    >
      {/* 1. Header: Icon + Title + Meta */}
      <div className="flex items-start gap-3 mb-3 shrink-0">
        <div className="w-11 h-11 rounded-xl bg-blue-50/50 border border-blue-100/30 flex items-center justify-center text-brand shrink-0 group-hover:bg-white group-hover:border-brand/10 transition-colors">
          <Zap size={20} fill="currentColor" className="opacity-70" />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="fa-t5-strong text-gray-900 truncate group-hover:text-brand transition-colors mb-0.5">
            {template.name}
          </h3>
          <p className="fa-t6 text-gray-400 truncate tracking-tight font-medium uppercase">
            {template.industry}
          </p>
        </div>
      </div>

      {/* 2. Body: Description + KV Tag Sections */}
      <div className="flex-1 flex flex-col min-h-0 pb-4">
        <Tooltip title={template.description} mouseEnterDelay={0.5}>
          <p className="fa-t6 text-gray-500 truncate mb-1 h-[22px] leading-relaxed cursor-help">
            {template.description}
          </p>
        </Tooltip>

        <div className="space-y-4">
          {/* Triggers Section */}
          <div className="flex flex-col gap-1">
            <span className="fa-t7-mono text-[9px] text-gray-400 font-bold uppercase tracking-widest block">
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

          {/* Outputs Section */}
          <div className="flex flex-col gap-1">
            <span className="fa-t7-mono text-[9px] text-gray-400 font-bold uppercase tracking-widest block">
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

      {/* 3. Footer: Adaptive height, vertically centered */}
      <div className="mt-auto py-3 border-t border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4 text-gray-400">
          <Tooltip title={`${template.processingModes.length} Modes`}>
            <div className="flex items-center gap-1.5">
              <LayoutGrid size={13} className="opacity-60" />
              <span className="fa-t7-mono text-[11px] font-bold tabular-nums">{template.processingModes.length}</span>
            </div>
          </Tooltip>
          <Tooltip title={`${template.apps.length} Apps`}>
            <div className="flex items-center gap-1.5">
              <Box size={13} className="opacity-60" />
              <span className="fa-t7-mono text-[11px] font-bold tabular-nums">{template.apps.length}</span>
            </div>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2 text-gray-300 group-hover:text-brand transition-colors">
          <span className="fa-t7-mono text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            {t('common.viewDetail')}
          </span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      <style>{`
        .fa-popover-v2 .ant-popover-inner {
          padding: 12px;
          border-radius: 12px;
          box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(0,0,0,0.05);
        }
      `}</style>
    </FACard>
  );
};

export default TemplateCard;