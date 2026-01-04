
import React from 'react';
import { Button, Tooltip, Popover, Divider } from 'antd';
import { 
  Zap, Target, Activity, Cpu, ArrowRight, PlayCircle, 
  Info, ShieldCheck, Box,
  ChevronRight, Calendar, Globe, X,
  GitBranch, FileText
} from 'lucide-react';
import { useI18n } from '../../../i18n';
import { WorkflowTemplate } from '../../../shared/mocks/templates';
import FADrawer from '../../../ui/FADrawer';
import { useNavigate } from 'react-router-dom';

interface TemplateDetailDrawerProps {
  template: WorkflowTemplate | null;
  open: boolean;
  onClose: () => void;
}

const TemplateDetailDrawer: React.FC<TemplateDetailDrawerProps> = ({ template, open, onClose }) => {
  const { t } = useI18n();
  const navigate = useNavigate();

  if (!template) return null;

  const tagLimit = 3;
  const tagClassName = "px-2.5 py-1 bg-white border border-border rounded-tag text-fa-t6 font-fa-medium text-text-secondary uppercase tracking-tight shadow-sm transition-colors hover:border-brand/20";

  const handleUseTemplate = () => {
    navigate(`/workflows/wf-northgrid-001`);
  };

  const renderTags = (items: string[], title: string) => {
    const visible = items.slice(0, tagLimit);
    const remaining = items.slice(tagLimit);

    return (
      <div className="flex flex-wrap gap-2 items-center">
        {visible.map(item => (
          <div key={item} className={tagClassName}>{item}</div>
        ))}
        {remaining.length > 0 && (
          <Popover 
            title={<span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase tracking-widest">{title}</span>}
            content={
              <div className="space-y-1.5 p-1 min-w-[140px]">
                {remaining.map(item => (
                  <div key={item} className="text-fa-t5 font-fa-semibold text-text-secondary flex items-center gap-2">
                    <div className="w-1 h-1 bg-brand/40 rounded-full" /> {item}
                  </div>
                ))}
              </div>
            }
            overlayClassName="fa-popover-v2"
          >
            <div className="cursor-help px-2.5 py-1 bg-brand-bg border border-brand/20 text-brand rounded-tag text-fa-t6 font-fa-semibold shadow-sm">
              +{remaining.length}
            </div>
          </Popover>
        )}
      </div>
    );
  };

  return (
    <FADrawer
      open={open}
      onClose={onClose}
      width={560}
      title={null}
      styles={{
        footer: { padding: '16px' } // 严格执行 p-4 (16px) 规范
      }}
      footerActions={
        <div className="flex items-center gap-3 w-full justify-between">
          <Button 
            onClick={onClose} 
            className="h-9 px-4 font-fa-semibold text-text-tertiary border-none hover:bg-action-hover hover:text-text-primary transition-all"
          >
            {t('common.cancel')}
          </Button>
          <Button 
            type="primary" 
            onClick={handleUseTemplate}
            className="h-9 px-8 font-fa-semibold uppercase tracking-widest flex items-center gap-2 shadow-lg hover:translate-y-[-1px] active:translate-y-[0px] transition-all"
          >
            {t('workflows.drawer.useTemplate')} <ArrowRight size={16} />
          </Button>
        </div>
      }
    >
      <div className="h-full flex flex-col bg-bg-card overflow-hidden">
        {/* 1. Header Section */}
        <div className="px-8 py-6 bg-bg-card border-b border-border shrink-0 relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-1.5 hover:bg-action-hover rounded-lg transition-colors text-text-tertiary"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-start gap-5 pr-8">
            <div className="w-12 h-12 rounded-xl bg-bg-card shadow-sm border border-border flex items-center justify-center text-brand shrink-0">
              <Zap size={24} fill="currentColor" className="opacity-70" />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex items-center gap-2 mb-1.5">
                <h2 className="text-fa-t2 font-fa-semibold text-text-primary truncate leading-tight m-0">{template.name}</h2>
                <Tooltip title={t('marketplace.drawer.certifiedTooltip')}>
                  <ShieldCheck size={18} className="text-success shrink-0" />
                </Tooltip>
              </div>
              <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-text-tertiary">
                <span className="text-fa-t7 font-fa-semibold uppercase tracking-widest bg-action-hover text-text-secondary px-1.5 py-0.5 rounded leading-none">{template.industry}</span>
                <span className="text-fa-t6 font-fa-medium flex items-center gap-1">
                  <Globe size={12} className="opacity-50" />
                  {t('workflows.drawer.official')}
                </span>
                <span className="text-fa-t6 font-fa-medium flex items-center gap-1">
                  <Calendar size={12} className="opacity-50" />
                  2024-12-19
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-fa-t5 text-text-secondary mt-5 line-clamp-2 leading-relaxed max-w-[440px] m-0">
            {template.description}
          </p>
        </div>

        {/* 2. Content Sections - Added pb-20 for larger bottom space */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pb-20 space-y-12">
          
          <section>
            <h3 className="text-fa-t6 font-fa-semibold uppercase tracking-[0.15em] text-text-tertiary mb-3.5 flex items-center gap-2">
              <Info size={14} className="text-text-disabled" /> {t('workflows.drawer.overview')}
            </h3>
            <p className="text-fa-t5 text-text-secondary leading-relaxed bg-white p-4 rounded-xl border border-border">
              {t('workflows.drawer.overviewDesc')}
            </p>
          </section>

          <section>
            <h3 className="text-fa-t6 font-fa-semibold uppercase tracking-[0.15em] text-text-tertiary mb-6 flex items-center gap-2">
              <GitBranch size={14} className="text-text-disabled" /> {t('workflows.drawer.flow')}
            </h3>
            <div className="space-y-0 pl-1">
              <WorkflowStep 
                icon={<Zap size={14} />} 
                title={t('workflows.drawer.step.trigger.title')} 
                desc={t('workflows.drawer.step.trigger.desc')}
                isStart
              />
              <WorkflowStep 
                icon={<ShieldCheck size={14} />} 
                title={t('workflows.drawer.step.edge.title')} 
                desc={t('workflows.drawer.step.edge.desc')}
                app="Edge Defect Alert v1.2"
              />
              <WorkflowStep 
                icon={<Globe size={14} />} 
                title={t('workflows.drawer.step.cloud.title')} 
                desc={t('workflows.drawer.step.cloud.desc')}
                app="Cloud Reviewer Pack"
              />
              <WorkflowStep 
                icon={<FileText size={14} />} 
                title={t('workflows.drawer.step.post.title')} 
                desc={t('workflows.drawer.step.post.desc')}
                app="LLM Report Engine"
                isEnd
              />
            </div>
          </section>

          <Divider className="my-0 border-divider" />

          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            <section className="col-span-1">
              <h3 className="text-fa-t6 font-fa-semibold uppercase tracking-[0.15em] text-text-tertiary mb-4 flex items-center gap-2">
                <Target size={14} className="text-text-disabled" /> {t('workflows.drawer.triggers')}
              </h3>
              {renderTags(template.triggers, t('workflows.drawer.triggers'))}
            </section>

            <section className="col-span-1">
              <h3 className="text-fa-t6 font-fa-semibold uppercase tracking-[0.15em] text-text-tertiary mb-4 flex items-center gap-2">
                <Box size={14} className="text-text-disabled" /> {t('workflows.drawer.expectedOutputs')}
              </h3>
              {renderTags(template.outputs, t('workflows.drawer.expectedOutputs'))}
            </section>

            <section className="col-span-2">
              <h3 className="text-fa-t6 font-fa-semibold uppercase tracking-[0.15em] text-text-tertiary mb-4 flex items-center gap-2">
                <Activity size={14} className="text-text-disabled" /> {t('workflows.drawer.processingModes')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {template.processingModes.map(mode => (
                  <div key={mode} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-border shadow-sm transition-colors hover:border-brand/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                    <span className="text-fa-t7 font-fa-semibold text-text-secondary font-mono uppercase tracking-tight">{mode.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section>
            <h3 className="text-fa-t6 font-fa-semibold uppercase tracking-[0.15em] text-text-tertiary mb-5 flex items-center gap-2">
              <PlayCircle size={14} className="text-text-disabled" /> {t('workflows.drawer.usedApps')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {template.apps.map(appName => (
                <div 
                  key={appName} 
                  className="group p-3 bg-bg-card border border-border rounded-xl flex items-center gap-3.5 hover:border-brand/30 hover:shadow-card transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center text-text-tertiary group-hover:text-brand group-hover:bg-brand-bg transition-all shrink-0">
                    <Box size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                       <h4 className="text-fa-t5 font-fa-semibold text-text-primary truncate group-hover:text-brand transition-colors m-0 leading-tight">{appName}</h4>
                       <ChevronRight size={14} className="text-text-disabled opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0" />
                    </div>
                    <p className="text-fa-t6 text-text-tertiary truncate tracking-tight m-0">AI 识别与闭环处理内核</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </FADrawer>
  );
};

const WorkflowStep: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  app?: string;
  isStart?: boolean;
  isEnd?: boolean;
}> = ({ icon, title, desc, app, isStart, isEnd }) => (
  <div className="relative flex gap-5 pb-8 last:pb-0 group">
    {!isEnd && (
      <div className="absolute left-[13.5px] top-[26px] bottom-0 w-[1px] bg-divider group-hover:bg-brand/20 transition-colors" />
    )}
    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
      isStart 
        ? 'bg-brand text-text-inverse shadow-brand/20 shadow-lg scale-110' 
        : 'bg-bg-card text-text-tertiary border-2 border-border group-hover:border-brand/30 group-hover:text-brand'
    }`}>
      {icon}
    </div>
    <div className="pt-0.5 min-w-0">
      <h4 className={`text-fa-t5 font-fa-semibold mb-1 transition-colors m-0 ${isStart ? 'text-text-primary' : 'text-text-secondary group-hover:text-brand'}`}>{title}</h4>
      <p className="text-fa-t6 text-text-tertiary leading-relaxed mb-2.5 max-w-[380px] m-0">{desc}</p>
      {app && (
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white border border-border rounded-md text-fa-t7 font-fa-semibold text-text-secondary font-mono uppercase transition-all group-hover:bg-brand-bg group-hover:border-brand/20 group-hover:text-brand">
          <Box size={10} strokeWidth={2.5} /> {app}
        </div>
      )}
    </div>
  </div>
);

export default TemplateDetailDrawer;
