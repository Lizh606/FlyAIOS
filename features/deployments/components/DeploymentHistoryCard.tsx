import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, ExternalLink, Clock, ArrowRight, GitBranch, ShieldCheck
} from 'lucide-react';
import { Button, Divider } from 'antd';
import { useI18n } from '../../../i18n';
import FACard from '../../../ui/FACard';
import { Deployment } from '../../../shared/mocks/deployments';

/**
 * DeploymentHistoryCard - v0.2 Link Hub
 * Authority entry point to Runs (Evidence) and Executions (Monitoring).
 */
const DeploymentHistoryCard: React.FC<{ deployment: Deployment }> = ({ deployment }) => {
  const { t } = useI18n();

  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
  
  const runsLink = `/runs?deploymentId=${deployment.id}`;
  const executionsLink = `/executions?projectId=${deployment.projectId}&start=${yesterday}`;

  return (
    <FACard title={t('deployments.detail.history')} density="comfort" className="bg-white border-gray-100 shadow-sm">
      <div className="space-y-6">
        {/* Authoritative Entry Points */}
        <div className="space-y-3">
          <Link to={runsLink} className="flex items-center justify-between p-4 bg-gray-50/50 hover:bg-white border border-gray-100 hover:border-brand rounded-xl transition-all group shadow-sm hover:shadow-md">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-brand group-hover:bg-blue-50 transition-all">
                <Activity size={20} />
              </div>
              <div className="flex flex-col">
                <span className="fa-t5-strong text-gray-800">{t('deployments.links.recentRuns')}</span>
                <span className="fa-t7-mono text-[9px] text-gray-400 font-bold uppercase">v{deployment.version} Logic Scope</span>
              </div>
            </div>
            <ExternalLink size={14} className="text-gray-300 group-hover:text-brand" />
          </Link>

          <Link to={executionsLink} className="flex items-center justify-between p-4 bg-gray-50/50 hover:bg-white border border-gray-100 hover:border-brand rounded-xl transition-all group shadow-sm hover:shadow-md">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-brand group-hover:bg-blue-50 transition-all">
                <Clock size={20} />
              </div>
              <div className="flex flex-col">
                <span className="fa-t5-strong text-gray-800">{t('deployments.links.executions')}</span>
                <span className="fa-t7-mono text-[9px] text-gray-400 font-bold uppercase">Last 24H Physical Window</span>
              </div>
            </div>
            <ExternalLink size={14} className="text-gray-300 group-hover:text-brand" />
          </Link>
        </div>

        <Divider className="my-0 opacity-5" />

        <div className="space-y-5">
           <h5 className="fa-t6 font-bold uppercase tracking-widest text-gray-400 mb-2 px-1">Recent Policy Events</h5>
           <div className="space-y-6 ml-2.5 pl-5 border-l border-gray-100 relative">
              <EventItem time="14:20" text={`Policy ${deployment.version} Applied Successfully`} status="success" icon={<ShieldCheck size={10} />} />
              {(deployment.status === 'failed' || deployment.status === 'partial') && (
                <div className="relative">
                  <div className="absolute -left-[21.5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm bg-red-500" />
                  <div className="fa-t7-mono text-[10px] text-red-500 uppercase font-bold mb-0.5">09:15</div>
                  <div className="fa-t6 font-bold text-red-700 leading-tight">Verification Failed on 2 Nodes</div>
                </div>
              )}
              <EventItem time="Dec 18" text="New Deployment Manifest Generated" status="neutral" icon={<GitBranch size={10} />} />
           </div>
           
           <div className="pt-2 px-1">
             <Button 
              type="link" 
              className="p-0 h-auto fa-t6 font-bold uppercase tracking-widest text-brand hover:underline flex items-center gap-1.5 group"
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
    <div className={`absolute -left-[21.5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm ${
      status === 'success' ? 'bg-green-500' : 'bg-gray-300'
    }`} />
    <div className="fa-t7-mono text-[10px] text-gray-400 uppercase font-bold mb-0.5 tabular-nums flex items-center gap-1.5">
      {time} {icon && <span className="opacity-50">{icon}</span>}
    </div>
    <div className="fa-t6 font-semibold text-gray-800 leading-tight">{text}</div>
  </div>
);

export default DeploymentHistoryCard;