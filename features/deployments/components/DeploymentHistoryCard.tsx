import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, ExternalLink, Clock, ArrowRight, GitBranch, ShieldCheck
} from 'lucide-react';
import { Button, Divider } from 'antd';
import { useI18n } from '../../../i18n';
import FACard from '../../../ui/FACard';
import { Deployment } from '../../../shared/mocks/deployments';

const DeploymentHistoryCard: React.FC<{ deployment: Deployment }> = ({ deployment }) => {
  const { t } = useI18n();

  return (
    <FACard title={t('deployments.detail.history')} density="comfort" className="bg-bg-card border-border shadow-sm">
      <div className="space-y-6">
        <div className="space-y-3">
          <Link to={`/runs?deploymentId=${deployment.id}`} className="flex items-center justify-between p-4 bg-bg-page hover:bg-bg-card border border-border hover:border-brand/40 rounded-xl transition-all group shadow-sm">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-bg-card border border-border flex items-center justify-center text-text-tertiary group-hover:text-brand group-hover:bg-brand-bg transition-all">
                <Activity size={20} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-fa-t5 font-fa-semibold text-text-primary truncate">{t('deployments.links.recentRuns')}</span>
                <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase text-[9px]">v{deployment.version} 逻辑作用域</span>
              </div>
            </div>
            <ExternalLink size={14} className="text-text-disabled group-hover:text-brand transition-colors" />
          </Link>

          <Link to={`/executions?projectId=${deployment.projectId}`} className="flex items-center justify-between p-4 bg-bg-page hover:bg-bg-card border border-border hover:border-brand/40 rounded-xl transition-all group shadow-sm">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-bg-card border border-border flex items-center justify-center text-text-tertiary group-hover:text-brand group-hover:bg-brand-bg transition-all">
                <Clock size={20} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-fa-t5 font-fa-semibold text-text-primary truncate">{t('deployments.links.executions')}</span>
                <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase text-[9px]">最近 24H 物理视窗</span>
              </div>
            </div>
            <ExternalLink size={14} className="text-text-disabled group-hover:text-brand transition-colors" />
          </Link>
        </div>

        <Divider className="my-0 opacity-10" />

        <div className="space-y-5">
           <h5 className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary mb-3 px-1">近期策略事件</h5>
           <div className="space-y-6 ml-2.5 pl-6 border-l border-divider relative">
              <EventItem time="14:20" text={`策略 ${deployment.version} 已成功生效`} status="success" icon={<ShieldCheck size={11} />} />
              {(deployment.status === 'failed' || deployment.status === 'partial') && (
                <div className="relative">
                  <div className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-bg-card shadow-sm bg-error" />
                  <div className="text-fa-t7 font-fa-semibold text-error uppercase font-mono mb-1">09:15</div>
                  <div className="text-fa-t6 font-fa-semibold text-text-primary leading-tight">2 个节点同步验证失败</div>
                </div>
              )}
              <EventItem time="12-18" text="生成新部署清单 (Manifest)" status="neutral" icon={<GitBranch size={11} />} />
           </div>
           
           <div className="pt-2 px-1">
             <Button 
              type="link" 
              className="p-0 h-auto text-fa-t6 font-fa-semibold uppercase tracking-widest text-brand hover:text-brand-hover flex items-center gap-1.5 group"
             >
               {t('deployments.detail.viewHistory')} 
               <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
             </Button>
           </div>
        </div>
      </div>
    </FACard>
  );
};

const EventItem = ({ time, text, status, icon }: any) => (
  <div className="relative">
    <div className={`absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-bg-card shadow-sm ${
      status === 'success' ? 'bg-success' : 'bg-text-disabled'
    }`} />
    <div className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase font-mono mb-1 tabular-nums flex items-center gap-1.5">
      {time} {icon && <span className="opacity-50">{icon}</span>}
    </div>
    <div className="text-fa-t6 font-fa-medium text-text-secondary leading-tight">{text}</div>
  </div>
);

export default DeploymentHistoryCard;