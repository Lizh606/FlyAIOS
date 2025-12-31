
import React, { useState } from 'react';
import { Button, Popover, Divider, Tooltip, Dropdown, message, Drawer } from 'antd';
import { 
  ShieldCheck, RefreshCcw, FileCode, Copy, MoreVertical, 
  Activity, ExternalLink, ArrowLeft, HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../../i18n';
import FAStatus from '../../../ui/FAStatus';
import { Deployment } from '../../../shared/mocks/deployments';

interface DeploymentHeaderProps {
  deployment: Deployment;
  onPreview: () => void;
  onRollback: () => void;
}

const DeploymentHeader: React.FC<DeploymentHeaderProps> = ({ deployment, onPreview, onRollback }) => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [statusDrawerOpen, setStatusDrawerOpen] = useState(false);

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val);
    message.success('Copied to clipboard');
  };

  // Status Level 2 Content - Strictly following v0.8 6.1.1C template
  const statusContent = (
    <div className="w-[340px] md:w-full p-1 space-y-5">
      <div className="flex items-center justify-between mb-2">
        <div className="fa-t7-mono text-gray-400 font-bold uppercase tracking-[0.15em]">{t('deployments.status.panelTitle')}</div>
        <HelpCircle size={14} className="text-gray-300" />
      </div>
      <div className="space-y-4">
        <StatusField label={t('deployments.status.what')} value={deployment.status.toUpperCase()} highlight />
        <StatusField label={t('deployments.status.why')} value={deployment.status === 'partial' ? 'Sync timeout on 2 nodes' : 'Policy verification success'} />
        <StatusField label={t('deployments.status.when')} value={deployment.updatedAt} tabular />
        <StatusField label={t('deployments.status.impact')} value={`${deployment.appliedNodes.length} Edge Nodes (Fleet Wide)`} />
        
        <Divider className="my-0 opacity-10" />
        
        <div className="space-y-2">
          <div className="fa-t7-mono text-[10px] text-gray-400 font-bold uppercase mb-2">{t('deployments.status.next')}</div>
          <div className="flex flex-col gap-2">
            <Button 
              size="small" 
              type="primary" 
              ghost 
              icon={<Activity size={14} />} 
              className="justify-start h-9 fa-t6 font-bold uppercase"
              onClick={() => navigate(`/runs?deploymentId=${deployment.id}`)}
            >
              {t('deployments.links.recentRuns')}
            </Button>
            <Button 
              size="small" 
              type="text" 
              icon={<ExternalLink size={14} />} 
              className="justify-start h-9 fa-t6 text-gray-500 font-bold uppercase border border-gray-100"
              onClick={() => navigate(`/executions?projectId=${deployment.projectId}&deploymentId=${deployment.id}`)}
            >
              {t('deployments.links.executions')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const moreActions = [
    {
      key: 'rollback',
      danger: true,
      icon: <RefreshCcw size={14} />,
      label: <span className="fa-t6 font-bold uppercase">{t('deployments.detail.rollback')}</span>,
      onClick: onRollback
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center flex-wrap gap-4 mb-2">
            <button 
              onClick={() => navigate('/deployments')}
              className="p-2 -ml-2 text-gray-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="fa-t2 text-gray-900 truncate">{deployment.workflowName} @ {deployment.version}</h1>
            
            {/* Status Level 2 Implementation */}
            <div className="hidden md:block">
              <Popover content={statusContent} trigger="hover" placement="bottomLeft" overlayClassName="fa-popover-v2">
                <div className="cursor-help">
                  <FAStatus status={deployment.status === 'applied' ? 'online' : deployment.status === 'failed' ? 'failed' : 'queued'} label={deployment.status} />
                </div>
              </Popover>
            </div>
            <div className="md:hidden">
              <div className="cursor-pointer" onClick={() => setStatusDrawerOpen(true)}>
                <FAStatus status={deployment.status === 'applied' ? 'online' : deployment.status === 'failed' ? 'failed' : 'queued'} label={deployment.status} />
              </div>
            </div>
          </div>

          <p className="fa-t6 text-gray-500 flex items-center gap-2 pl-10">
            <span className="font-semibold text-gray-700">Project: {deployment.projectName}</span>
            <Divider type="vertical" className="bg-gray-200" />
            <span className="fa-t7-mono text-gray-400">Synced: <span className="tabular-nums">{deployment.updatedAt}</span></span>
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button icon={<FileCode size={16} />} onClick={onPreview} className="fa-t5-strong border-gray-200 hover:border-brand hover:text-brand shadow-sm">
            {t('deployments.detail.preview')}
          </Button>
          <Button type="primary" icon={<ShieldCheck size={16} />} className="fa-t5-strong shadow-lg uppercase tracking-widest px-6 h-9">
            {t('deployments.detail.publish')}
          </Button>
          <Dropdown menu={{ items: moreActions }} placement="bottomRight">
            <Button icon={<MoreVertical size={16} />} className="border-gray-200" />
          </Dropdown>
        </div>
      </div>

      {/* Authority KPI Section (v0.8 Section 2.3.3) */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-10 mt-6 p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
        <KPICell 
          label={t('deployments.detail.targets')} 
          value={deployment.appliedNodes.length.toString()} 
          subValue={`${deployment.appliedNodes.filter(n => n.status === 'online').length} Online`} 
        />
        <Divider type="vertical" className="hidden sm:block h-10 opacity-10" />
        <KPICell 
          label={t('deployments.detail.lastApplied')} 
          value={deployment.updatedAt.split(' ')[1]} 
          subValue={deployment.updatedAt.split(' ')[0]} 
          tabular
        />
        <Divider type="vertical" className="hidden sm:block h-10 opacity-10" />
        <div className="flex flex-col min-w-0">
          <span className="fa-t7-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Manifest ID</span>
          <div className="flex items-center gap-2">
            <Tooltip title={deployment.manifestVersion}>
              <span className="fa-t3 font-mono tracking-tighter text-gray-900 truncate max-w-[140px] tabular-nums">
                {deployment.manifestVersion}
              </span>
            </Tooltip>
            <button onClick={() => handleCopy(deployment.manifestVersion)} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-brand transition-colors">
              <Copy size={13} />
            </button>
          </div>
        </div>
        <Divider type="vertical" className="hidden sm:block h-10 opacity-10" />
        <div className="flex flex-col min-w-0">
          <span className="fa-t7-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Policy Version</span>
          <div className="flex items-center gap-2">
            <Tooltip title={deployment.policyVersion}>
              <span className="fa-t3 font-mono tracking-tighter text-brand truncate max-w-[140px] tabular-nums">
                {deployment.policyVersion}
              </span>
            </Tooltip>
            <button onClick={() => handleCopy(deployment.policyVersion)} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-brand transition-colors">
              <Copy size={13} />
            </button>
          </div>
        </div>
      </div>

      <Drawer
        open={statusDrawerOpen}
        onClose={() => setStatusDrawerOpen(false)}
        placement="bottom"
        height="auto"
        closable={false}
        styles={{ body: { padding: '24px' } }}
        className="md:hidden rounded-t-2xl"
      >
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
        {statusContent}
      </Drawer>
    </div>
  );
};

const StatusField = ({ label, value, tabular, highlight }: { label: string; value: string; tabular?: boolean; highlight?: boolean }) => (
  <div>
    <div className="fa-t7-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">{label}</div>
    <div className={`fa-t5 font-semibold ${tabular ? 'tabular-nums font-mono' : ''} ${highlight ? 'text-brand' : 'text-gray-800'}`}>
      {value}
    </div>
  </div>
);

const KPICell = ({ label, value, subValue, tabular }: { label: string; value: string; subValue: string; tabular?: boolean }) => (
  <div className="flex flex-col">
    <span className="fa-t7-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">{label}</span>
    <div className="flex items-baseline gap-2.5">
      <span className={`fa-t3 text-gray-900 leading-none ${tabular ? 'tabular-nums font-mono' : 'font-mono'}`}>{value}</span>
      <span className="fa-t6 text-gray-400 font-semibold whitespace-nowrap">{subValue}</span>
    </div>
  </div>
);

export default DeploymentHeader;
