
import React from 'react';
import { Button, Tooltip, Popover, Divider } from 'antd';
import { 
  Zap, Target, Activity, Cpu, ArrowRight, PlayCircle, 
  Info, ShieldCheck, CheckCircle2, Box,
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
  const tagClassName = "px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md fa-t6 font-medium text-gray-500 uppercase tracking-tight shadow-sm transition-colors hover:border-brand/20";

  const handleUseTemplate = () => {
    // Navigate to studio with template context
    navigate(`/workflows/wf-northgrid-001`);
  };

  // Helper for rendering tags with overflow
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
            title={<span className="fa-t7-mono text-gray-400 font-bold uppercase tracking-widest">{title}</span>}
            content={
              <div className="space-y-1.5 p-1 min-w-[140px]">
                {remaining.map(item => (
                  <div key={item} className="fa-t5-strong text-gray-700 flex items-center gap-2">
                    <div className="w-1 h-1 bg-brand/40 rounded-full" /> {item}
                  </div>
                ))}
              </div>
            }
            overlayClassName="fa-popover-v2"
          >
            <div className="cursor-help px-2.5 py-1 bg-blue-50 border border-blue-100 text-brand rounded-md fa-t6 font-bold shadow-sm">
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
      title={null} // Manual header implementation for better layout control
      footerActions={
        <div className="flex items-center gap-3 w-full justify-between">
          <Button 
            onClick={onClose} 
            className="h-10 px-6 font-bold text-gray-400 border-none hover:bg-gray-100 hover:text-gray-900 transition-all"
          >
            {t('common.cancel')}
          </Button>
          <Button 
            type="primary" 
            size="large" 
            onClick={handleUseTemplate}
            className="h-10 px-10 font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg hover:translate-y-[-1px] active:translate-y-[0px] transition-all"
          >
            {t('workflows.drawer.useTemplate')} <ArrowRight size={16} />
          </Button>
        </div>
      }
    >
      <div className="h-full flex flex-col bg-white overflow-hidden">
        {/* 1. Refactored Header Section per v0.8 */}
        <div className="px-8 py-6 bg-gray-50/50 border-b border-gray-100 shrink-0 relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-1.5 hover:bg-gray-200/50 rounded-lg transition-colors text-gray-400"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-start gap-5 pr-8">
            <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-brand shrink-0">
              <Zap size={24} fill="currentColor" className="opacity-70" />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex items-center gap-2 mb-1.5">
                <h2 className="fa-t2 text-gray-900 truncate leading-tight">{template.name}</h2>
                <Tooltip title={t('marketplace.drawer.certifiedTooltip')}>
                  <ShieldCheck size={18} className="text-green-500 shrink-0" />
                </Tooltip>
              </div>
              <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-gray-400">
                <span className="fa-t7-mono font-bold uppercase tracking-widest bg-gray-200/50 text-gray-500 px-1.5 py-0.5 rounded leading-none">{template.industry}</span>
                <span className="fa-t6 font-medium flex items-center gap-1">
                  <Globe size={12} className="opacity-50" />
                  {t('workflows.drawer.official')}
                </span>
                <span className="fa-t6 font-medium flex items-center gap-1">
                  <Calendar size={12} className="opacity-50" />
                  2024-12-19
                </span>
              </div>
            </div>
          </div>
          
          {/* Header Brief Description */}
          <p className="fa-t5 text-gray-500 mt-5 line-clamp-2 leading-relaxed max-w-[440px]">
            {template.description}
          </p>
        </div>

        {/* 2. Content Sections */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-12">
          
          {/* Overview Detail */}
          <section>
            <h3 className="fa-t6 font-bold uppercase tracking-[0.15em] text-gray-400 mb-3.5 flex items-center gap-2">
              <Info size={14} className="text-gray-300" /> {t('workflows.drawer.overview')}
            </h3>
            <p className="fa-t5 text-gray-600 leading-relaxed bg-gray-50/50 p-4 rounded-xl border border-gray-100/50">
              本模板定义了从现场物理执行到逻辑证据链生成的完整自动化巡检链路。支持多模态数据输入，通过边缘AI与云端闭环逻辑，确保高价值告警的准确产出。
            </p>
          </section>

          {/* 3. CORE SECTION: Workflow Preview Timeline */}
          <section>
            <h3 className="fa-t6 font-bold uppercase tracking-[0.15em] text-gray-400 mb-6 flex items-center gap-2">
              <GitBranch size={14} className="text-gray-300" /> {t('workflows.drawer.flow')}
            </h3>
            <div className="space-y-0 pl-1">
              <WorkflowStep 
                icon={<Zap size={14} />} 
                title="触发源 (Trigger Source)" 
                desc="当巡检任务完成、边缘产生高风险告警或手动触发时自动启动流程。"
                isStart
              />
              <WorkflowStep 
                icon={<ShieldCheck size={14} />} 
                title="边缘 AI 识别 (Edge Detection)" 
                desc="在边缘侧进行缺陷、异物、鸟巢等 12 类典型目标的实时识别与初步过滤。"
                app="Edge Defect Alert v1.2"
              />
              <WorkflowStep 
                icon={<Globe size={14} />} 
                title="云端人工复核 (Cloud Review)" 
                desc="针对低置信度识别结果自动推送至云端平台，由专业人员进行线上复核确认。"
                app="Cloud Reviewer Pack"
              />
              <WorkflowStep 
                icon={<FileText size={14} />} 
                title="自动化产物生成 (Post Processing)" 
                desc="汇总全量证据链数据，自动生成多格式巡检报告并推送回执到工单系统。"
                app="LLM Report Engine"
                isEnd
              />
            </div>
          </section>

          <Divider className="my-0 opacity-40" />

          {/* 4. Supporting Supporting Details Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            <section className="col-span-1">
              <h3 className="fa-t6 font-bold uppercase tracking-[0.15em] text-gray-400 mb-4 flex items-center gap-2">
                <Target size={14} className="text-gray-300" /> {t('workflows.drawer.triggers')}
              </h3>
              {renderTags(template.triggers, t('workflows.drawer.triggers'))}
            </section>

            <section className="col-span-1">
              <h3 className="fa-t6 font-bold uppercase tracking-[0.15em] text-gray-400 mb-4 flex items-center gap-2">
                <Box size={14} className="text-gray-300" /> {t('workflows.drawer.expectedOutputs')}
              </h3>
              {renderTags(template.outputs, t('workflows.drawer.expectedOutputs'))}
            </section>

            <section className="col-span-2">
              <h3 className="fa-t6 font-bold uppercase tracking-[0.15em] text-gray-400 mb-4 flex items-center gap-2">
                <Activity size={14} className="text-gray-300" /> {t('workflows.drawer.processingModes')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {template.processingModes.map(mode => (
                  <div key={mode} className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100/80 shadow-sm transition-colors hover:border-brand/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                    <span className="fa-t7-mono text-[11px] font-bold text-gray-600 uppercase tracking-tight">{mode.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section>
            <h3 className="fa-t6 font-bold uppercase tracking-[0.15em] text-gray-400 mb-5 flex items-center gap-2">
              <PlayCircle size={14} className="text-gray-300" /> {t('workflows.drawer.usedApps')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {template.apps.map(appName => (
                <div 
                  key={appName} 
                  className="group p-3 bg-white border border-gray-100 rounded-xl flex items-center gap-3.5 hover:border-brand/30 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-brand group-hover:bg-blue-50 transition-all shrink-0">
                    <Box size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                       <h4 className="fa-t5-strong text-gray-800 truncate group-hover:text-brand transition-colors">{appName}</h4>
                       <ChevronRight size={14} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0" />
                    </div>
                    <p className="fa-t6 text-gray-400 truncate text-[11px] tracking-tight">AI 识别与闭环处理内核</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      
      <style>{`
        .fa-popover-v2 .ant-popover-inner {
          padding: 12px;
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0,0,0,0.06);
        }
      `}</style>
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
      <div className="absolute left-[13px] top-[26px] bottom-0 w-[1px] bg-gray-100 group-hover:bg-brand/20 transition-colors" />
    )}
    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
      isStart 
        ? 'bg-brand text-white shadow-brand/20 shadow-lg scale-110' 
        : 'bg-white text-gray-400 border-2 border-gray-100 group-hover:border-brand/30 group-hover:text-brand'
    }`}>
      {icon}
    </div>
    <div className="pt-0.5 min-w-0">
      <h4 className={`fa-t5-strong mb-1 transition-colors ${isStart ? 'text-gray-900' : 'text-gray-700 group-hover:text-brand'}`}>{title}</h4>
      <p className="fa-t6 text-gray-400 leading-relaxed mb-2.5 max-w-[380px]">{desc}</p>
      {app && (
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-gray-100/50 border border-gray-200/50 rounded-md fa-t7-mono text-[10px] text-gray-500 font-bold uppercase transition-all group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-brand">
          <Box size={10} strokeWidth={2.5} /> {app}
        </div>
      )}
    </div>
  </div>
);

export default TemplateDetailDrawer;
