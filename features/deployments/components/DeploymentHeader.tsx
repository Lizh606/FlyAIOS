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
    message.success('已复制到剪贴板');
  };

  // 严格遵循 v0.8 6.1.1C 状态解释面板模板
  const statusContent = (
    <div className="w-[340px] p-1 space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase tracking-widest">{t('deployments.status.panelTitle')}</span>
        <HelpCircle size={14} className="text-text-tertiary" />
      </div>
      <div className="space-y-4">
        <StatusField label={t('deployments.status.what')} value={deployment.status.toUpperCase()} highlight />
        <StatusField label={t('deployments.status.why')} value={deployment.status === 'partial' ? '2 个节点同步超时' : '策略校验已通过'} />
        <StatusField label={t('deployments.status.when')} value={deployment.updatedAt} tabular />
        <StatusField label={t('deployments.status.impact')} value={`${deployment.appliedNodes.length} 台边缘节点 (机队全局)`} />
        
        <Divider className="my-1 opacity-10" />
        
        <div className="space-y-3">
          <div className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase tracking-widest">{t('deployments.status.next')}</div>
          <div className="flex flex-col gap-2">
            <Button 
              type="primary" 
              ghost 
              block
              icon={<Activity size={14} />} 
              className="h-9 text-fa-t6 font-fa-semibold uppercase text-left justify-start"
              onClick={() => navigate(`/runs?deploymentId=${deployment.id}`)}
            >
              {t('deployments.links.recentRuns')}
            </Button>
            <Button 
              block
              icon={<ExternalLink size={14} />} 
              className="h-9 text-fa-t6 font-fa-semibold uppercase text-left justify-start text-text-secondary border-border"
              onClick={() => navigate(`/executions?projectId=${deployment.projectId}`)}
            >
              {t('deployments.links.executions')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex items-center flex-wrap gap-4 mb-3">
            <button 
              onClick={() => navigate('/deployments')}
              className="p-2 -ml-2 text-text-tertiary hover:text-brand hover:bg-brand-bg rounded-lg transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-fa-t2 font-fa-semibold text-text-primary truncate m-0 leading-none">
              {deployment.workflowName} @ {deployment.version}
            </h1>
            
            <div className="hidden md:block">
              <Popover content={statusContent} trigger="hover" placement="bottomLeft" overlayClassName="fa-popover-v2">
                <div className="cursor-help inline-flex">
                  <FAStatus status={deployment.status === 'applied' ? 'online' : deployment.status === 'failed' ? 'failed' : 'queued'} label={deployment.status} />
                </div>
              </Popover>
            </div>
          </div>

          <div className="flex items-center gap-3 text-fa-t6 text-text-secondary pl-10">
            <span className="font-fa-semibold">项目: {deployment.projectName}</span>
            <Divider type="vertical" className="bg-divider h-3" />
            <span className="font-fa-medium tabular-nums text-text-tertiary">同步于 {deployment.updatedAt}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button 
            icon={<FileCode size={16} />} 
            onClick={onPreview} 
            className="text-fa-t6 font-fa-semibold h-9 px-4 border-border shadow-sm text-text-secondary hover:text-brand hover:border-brand"
          >
            {t('deployments.detail.preview')}
          </Button>
          <Button 
            type="primary" 
            icon={<ShieldCheck size={16} />} 
            className="text-fa-t6 font-fa-semibold h-9 px-6 shadow-lg uppercase tracking-widest"
          >
            {t('deployments.detail.publish')}
          </Button>
          <Dropdown menu={{ items: [{ key: 'rollback', danger: true, icon: <RefreshCcw size={14} />, label: t('deployments.detail.rollback'), onClick: onRollback }] }} placement="bottomRight">
            <Button icon={<MoreVertical size={16} />} className="border-border text-text-tertiary" />
          </Dropdown>
        </div>
      </div>

      {/* KPI 卡片区 (v0.8 2.3.3) */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-10 mt-8 p-6 bg-bg-card border border-border rounded-card shadow-card">
        <KPICell 
          label={t('deployments.detail.targets')} 
          value={deployment.appliedNodes.length.toString()} 
          subValue={`${deployment.appliedNodes.filter(n => n.status === 'online').length} 在线`} 
        />
        <Divider type="vertical" className="hidden sm:block h-10 bg-divider opacity-40" />
        <KPICell 
          label={t('deployments.detail.lastApplied')} 
          value={deployment.updatedAt.split(' ')[1]} 
          subValue={deployment.updatedAt.split(' ')[0]} 
          tabular
        />
        <Divider type="vertical" className="hidden sm:block h-10 bg-divider opacity-40" />
        <MetaKPI label="Manifest ID" value={deployment.manifestVersion} onCopy={() => handleCopy(deployment.manifestVersion)} />
        <Divider type="vertical" className="hidden sm:block h-10 bg-divider opacity-40" />
        <MetaKPI label="策略版本" value={deployment.policyVersion} onCopy={() => handleCopy(deployment.policyVersion)} isBrand />
      </div>

      <Drawer
        open={statusDrawerOpen}
        onClose={() => setStatusDrawerOpen(false)}
        placement="bottom"
        height="auto"
        closable={false}
        styles={{ body: { padding: '24px', backgroundColor: 'rgba(var(--fa-bg-card), 1)' } }}
        className="md:hidden rounded-t-2xl"
      >
        <div className="w-12 h-1.5 bg-border rounded-full mx-auto mb-6" />
        {statusContent}
      </Drawer>
    </div>
  );
};

const StatusField = ({ label, value, tabular, highlight }: any) => (
  <div className="flex justify-between items-center">
    <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase tracking-widest">{label}</span>
    <span className={`text-fa-t6 font-fa-semibold ${tabular ? 'tabular-nums font-mono' : ''} ${highlight ? 'text-brand' : 'text-text-primary'}`}>
      {value}
    </span>
  </div>
);

const KPICell = ({ label, value, subValue, tabular }: any) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase tracking-widest">{label}</span>
    <div className="flex items-baseline gap-2.5">
      <span className={`text-fa-t2 font-fa-semibold text-text-primary leading-none ${tabular ? 'tabular-nums font-mono' : 'font-mono tracking-tight'}`}>{value}</span>
      <span className="text-fa-t6 font-fa-semibold text-text-tertiary whitespace-nowrap">{subValue}</span>
    </div>
  </div>
);

const MetaKPI = ({ label, value, onCopy, isBrand }: any) => (
  <div className="flex flex-col gap-1.5 min-w-0">
    <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase tracking-widest">{label}</span>
    <div className="flex items-center gap-2">
      <span className={`text-fa-t3 font-fa-semibold font-mono truncate max-w-[140px] tabular-nums ${isBrand ? 'text-brand' : 'text-text-primary'}`}>{value}</span>
      <button onClick={onCopy} className="p-1.5 hover:bg-action-hover rounded text-text-tertiary hover:text-brand transition-all shrink-0">
        <Copy size={13} />
      </button>
    </div>
  </div>
);

export default DeploymentHeader;