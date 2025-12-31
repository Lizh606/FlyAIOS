import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GitBranch, 
  Plus, Undo2, History, Activity, FileCode,
  Info, AlertCircle, CircleDashed, CheckCircle2, Copy
} from 'lucide-react';
import { Button, Tooltip, Popover, message, Divider } from 'antd';
import { useI18n } from '../../i18n';
import FAPageHeader from '../../ui/FAPageHeader';
import FATable from '../../ui/FATable';
import { MOCK_DEPLOYMENTS, Deployment, DeploymentNode } from '../../shared/mocks/deployments';
import { ColumnsType } from 'antd/es/table';
import PolicyPreviewDrawer from '../../features/deployments/components/PolicyPreviewDrawer';

const DeploymentsListPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [selectedPolicy, setSelectedPolicy] = useState<Deployment | null>(null);

  const handleCopyId = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    message.success({ content: '部署 ID 已复制', key: 'copy-id' });
  };

  const handleRollback = (record: Deployment) => {
    message.loading(`Initiating rollback for ${record.id}...`);
    setTimeout(() => {
      message.success(`Rollback request for ${record.id} sent.`);
    }, 1500);
  };

  const renderNodes = (nodes: DeploymentNode[]) => {
    const limit = 2;
    const visible = nodes.slice(0, limit);
    const remaining = nodes.length - limit;

    return (
      <div className="flex items-center gap-2 flex-nowrap">
        {visible.map(node => (
          <Tooltip key={node.id} title={`${node.name} (${node.status})`}>
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded border text-fa-t7 font-fa-semibold uppercase tracking-tight shrink-0 ${
              node.status === 'online' ? 'bg-brand-bg text-brand border-brand/10' : 'bg-error/5 text-error border-error/10'
            }`}>
              <div className={`w-1 h-1 rounded-full ${node.status === 'online' ? 'bg-brand' : 'bg-error'}`} />
              {node.name}
            </div>
          </Tooltip>
        ))}
        {remaining > 0 && (
          <Popover 
            content={
              <div className="p-2 space-y-1.5">
                {nodes.slice(limit).map(n => (
                  <div key={n.id} className="flex items-center gap-2 text-fa-t6">
                    <div className={`w-1.5 h-1.5 rounded-full ${n.status === 'online' ? 'bg-brand' : 'bg-error'}`} />
                    <span className="font-mono text-text-primary">{n.name}</span>
                    <span className="text-text-tertiary uppercase text-[10px]">({n.status})</span>
                  </div>
                ))}
              </div>
            }
          >
            <div className="w-7 h-6 flex items-center justify-center bg-bg-page border border-border text-text-tertiary rounded font-fa-semibold text-fa-t7 cursor-help hover:border-brand/40 hover:text-brand transition-colors shrink-0">
              +{remaining}
            </div>
          </Popover>
        )}
      </div>
    );
  };

  const columns: ColumnsType<Deployment> = [
    {
      title: t('deployments.col.id'),
      dataIndex: 'id',
      key: 'id',
      width: 140,
      render: (id) => (
        <div className="flex items-center gap-2 group/id">
          <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase tracking-tighter tabular-nums truncate">
            {`#${id.slice(-8)}`}
          </span>
          <button 
            onClick={(e) => handleCopyId(e, id)}
            className="p-1 hover:bg-action-hover rounded opacity-0 group-hover/id:opacity-100 transition-all text-text-tertiary hover:text-brand"
          >
            <Copy size={12} />
          </button>
        </div>
      )
    },
    {
      title: t('deployments.col.workflow'),
      dataIndex: 'workflowName',
      key: 'workflow',
      width: 260,
      render: (name, record) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-bg flex items-center justify-center text-brand shrink-0 shadow-sm border border-brand/5">
            <GitBranch size={16} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-fa-t5 font-fa-semibold text-text-primary truncate">{name}</span>
            <span className="text-fa-t7 font-fa-medium text-text-tertiary">v{record.version}</span>
          </div>
        </div>
      )
    },
    {
      title: t('deployments.col.policyVersion'),
      dataIndex: 'policyVersion',
      key: 'policyVersion',
      width: 140,
      render: (v) => <span className="text-fa-t7 font-fa-semibold text-brand font-mono uppercase">{v}</span>
    },
    {
      title: t('deployments.col.nodes'),
      dataIndex: 'appliedNodes',
      key: 'nodes',
      width: 300,
      render: (nodes) => renderNodes(nodes)
    },
    {
      title: t('deployments.col.status'),
      dataIndex: 'status',
      key: 'status',
      width: 160, // 增加列宽，防止状态文本换行
      render: (status, record) => {
        const config = {
          applying: { icon: CircleDashed, colorClass: 'text-brand bg-brand-bg', text: t('deployments.status.applying'), spin: true },
          applied: { icon: CheckCircle2, colorClass: 'text-success bg-success/10', text: t('deployments.status.applied'), spin: false },
          failed: { icon: AlertCircle, colorClass: 'text-error bg-error/10', text: t('deployments.status.failed'), spin: false },
          partial: { icon: Info, colorClass: 'text-warning bg-warning/10', text: t('deployments.status.partial'), spin: false },
        };
        const s = config[status as keyof typeof config];
        const content = (
          <div className={`m-0 text-fa-t7 font-fa-semibold uppercase px-2.5 py-1 rounded-tag flex items-center gap-2 w-fit shadow-sm border border-transparent whitespace-nowrap ${s.colorClass}`}>
            <s.icon size={12} className={s.spin ? 'animate-spin' : ''} />
            {s.text}
          </div>
        );

        if (status === 'failed' && record.errorSummary) {
          return (
            <Tooltip title={record.errorSummary} placement="top">
              <div className="cursor-help">{content}</div>
            </Tooltip>
          );
        }
        return content;
      }
    },
    {
      title: t('deployments.col.updatedAt'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 180,
      render: (date) => (
        <div className="flex flex-col">
          <span className="text-fa-t5 text-text-secondary leading-tight">{date.split(' ')[0]}</span>
          <span className="text-fa-t7 font-fa-medium text-text-tertiary tabular-nums mt-0.5">{date.split(' ')[1]}</span>
        </div>
      )
    },
    {
      title: '',
      key: 'actions',
      fixed: 'right',
      align: 'right',
      width: 160,
      render: (_, record) => (
        <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
          <Tooltip title={t('deployments.detail.preview')} mouseEnterDelay={0.3}>
            <Button 
              type="text" 
              size="small"
              icon={<FileCode size={16} />} 
              onClick={(e) => { e.stopPropagation(); setSelectedPolicy(record); }}
              className="text-text-tertiary hover:text-brand hover:bg-brand-bg rounded-lg h-8 w-8 flex items-center justify-center p-0 transition-all"
            />
          </Tooltip>
          <Tooltip title={t('deployments.detail.rollback')} mouseEnterDelay={0.3}>
            <Button 
              type="text" 
              size="small"
              icon={<Undo2 size={16} />} 
              onClick={(e) => { e.stopPropagation(); handleRollback(record); }}
              className="text-text-tertiary hover:text-warning hover:bg-warning/10 rounded-lg h-8 w-8 flex items-center justify-center p-0 transition-all"
            />
          </Tooltip>
          <Tooltip title={t('deployments.links.recentRuns')} mouseEnterDelay={0.3}>
            <Button 
              type="text" 
              size="small"
              icon={<History size={16} />} 
              onClick={(e) => { e.stopPropagation(); navigate(`/runs?deploymentId=${record.id}`); }}
              className="text-text-tertiary hover:text-brand hover:bg-brand-bg rounded-lg h-8 w-8 flex items-center justify-center p-0 transition-all"
            />
          </Tooltip>
        </div>
      )
    }
  ];

  return (
    <div className="px-6 py-8 max-w-[1440px] mx-auto w-full animate-in fade-in duration-500">
      <FAPageHeader 
        title={t('deployments.title')}
        subtitle={t('deployments.subtitle')}
        actions={
          <Button type="primary" icon={<Plus size={16} />} className="text-fa-t5 font-fa-semibold uppercase tracking-widest h-10 px-6 shadow-lg">
            {t('deployments.detail.publish')}
          </Button>
        }
      />
      
      <FATable 
        dataSource={MOCK_DEPLOYMENTS} 
        columns={columns} 
        rowKey="id" 
        density="comfort"
        onRow={(record) => ({
          onClick: () => navigate(`/deployment/${record.id}`),
          className: 'cursor-pointer group'
        })}
      />

      <PolicyPreviewDrawer 
        open={!!selectedPolicy} 
        onClose={() => setSelectedPolicy(null)} 
        policy={selectedPolicy} 
      />
    </div>
  );
};

export default DeploymentsListPage;