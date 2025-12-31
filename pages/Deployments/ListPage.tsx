import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GitBranch, 
  Plus, Undo2, History, Activity, FileCode,
  Info, AlertCircle, CircleDashed, CheckCircle2, Copy
} from 'lucide-react';
import { Button, Tag, Tooltip, Popover, message } from 'antd';
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
      <div className="flex items-center gap-1.5">
        {visible.map(node => (
          <Tooltip key={node.id} title={`${node.name} (${node.status})`}>
            <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded border fa-t7-mono text-[10px] font-bold uppercase ${
              node.status === 'online' ? 'bg-teal-50 text-teal-600 border-teal-100' : 'bg-red-50 text-red-600 border-red-100'
            }`}>
              <div className={`w-1 h-1 rounded-full ${node.status === 'online' ? 'bg-teal-500' : 'bg-red-500'}`} />
              {node.name}
            </div>
          </Tooltip>
        ))}
        {remaining > 0 && (
          <Popover 
            content={
              <div className="p-2 space-y-1">
                {nodes.slice(limit).map(n => (
                  <div key={n.id} className="flex items-center gap-2 fa-t6">
                    <div className={`w-1.5 h-1.5 rounded-full ${n.status === 'online' ? 'bg-teal-500' : 'bg-red-500'}`} />
                    <span className="font-mono text-[11px]">{n.name}</span>
                    <span className="text-gray-400 text-[10px] uppercase">({n.status})</span>
                  </div>
                ))}
              </div>
            }
          >
            <div className="w-6 h-6 flex items-center justify-center bg-gray-100 border border-gray-200 text-gray-500 rounded fa-t7-mono text-[10px] font-bold cursor-help hover:bg-gray-200 transition-colors">
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
          <span className="fa-t7-mono text-gray-400 font-bold uppercase tracking-tighter tabular-nums truncate">
            {`#${id.slice(-8)}`}
          </span>
          <button 
            onClick={(e) => handleCopyId(e, id)}
            className="p-1 hover:bg-gray-100 rounded opacity-0 group-hover/id:opacity-100 transition-all text-gray-400 hover:text-brand"
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
      width: 280,
      render: (name, record) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-brand shrink-0">
            <GitBranch size={16} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="fa-t5-strong text-gray-900 truncate">{name}</span>
            <span className="fa-t7-mono text-[10px] text-gray-400">v{record.version}</span>
          </div>
        </div>
      )
    },
    {
      title: t('deployments.col.policyVersion'),
      dataIndex: 'policyVersion',
      key: 'policyVersion',
      width: 140,
      render: (v) => <span className="fa-t7-mono text-brand font-bold uppercase text-[11px]">{v}</span>
    },
    {
      title: t('deployments.col.nodes'),
      dataIndex: 'appliedNodes',
      key: 'nodes',
      width: 220,
      render: (nodes) => renderNodes(nodes)
    },
    {
      title: t('deployments.col.status'),
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status, record) => {
        const config = {
          applying: { icon: CircleDashed, color: 'processing', text: t('deployments.status.applying'), spin: true },
          applied: { icon: CheckCircle2, color: 'success', text: t('deployments.status.applied'), spin: false },
          failed: { icon: AlertCircle, color: 'error', text: t('deployments.status.failed'), spin: false },
          partial: { icon: Info, color: 'warning', text: t('deployments.status.partial'), spin: false },
        };
        const s = config[status as keyof typeof config];
        const content = (
          <Tag color={s.color} className="m-0 fa-t7-mono font-bold uppercase px-2 py-0.5 border-none flex items-center gap-1.5 w-fit">
            <s.icon size={12} className={s.spin ? 'animate-spin' : ''} />
            {s.text}
          </Tag>
        );

        if (status === 'failed' && record.errorSummary) {
          return (
            <Tooltip title={record.errorSummary} color="#EF4444" placement="top">
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
          <span className="fa-t5 text-gray-600">{date.split(' ')[0]}</span>
          <span className="fa-t7-mono text-gray-400 text-[11px]">{date.split(' ')[1]}</span>
        </div>
      )
    },
    {
      title: '',
      key: 'actions',
      fixed: 'right',
      align: 'right',
      width: 200,
      render: (_, record) => (
        <div className="flex items-center justify-end gap-1">
          <Tooltip title={t('deployments.detail.preview')} placement="left" mouseEnterDelay={0.3}>
            <Button 
              type="text" 
              icon={<FileCode size={16} />} 
              onClick={(e) => { e.stopPropagation(); setSelectedPolicy(record); }}
              className="text-gray-400 hover:text-brand"
            />
          </Tooltip>
          <Tooltip title={t('deployments.detail.rollback')} placement="left" mouseEnterDelay={0.3}>
            <Button 
              type="text" 
              icon={<Undo2 size={16} />} 
              onClick={(e) => { e.stopPropagation(); handleRollback(record); }}
              className="text-gray-400 hover:text-orange-500"
            />
          </Tooltip>
          <div className="w-[1px] h-4 bg-gray-100 mx-1" />
          <Tooltip title={t('deployments.links.recentRuns')} placement="left" mouseEnterDelay={0.3}>
            <Button 
              type="text" 
              icon={<History size={16} />} 
              onClick={(e) => { e.stopPropagation(); navigate(`/runs?deploymentId=${record.id}`); }}
              className="text-gray-400 hover:text-brand"
            />
          </Tooltip>
          <Tooltip title={t('deployments.links.executions')} placement="left" mouseEnterDelay={0.3}>
            <Button 
              type="text" 
              icon={<Activity size={16} />} 
              onClick={(e) => { e.stopPropagation(); navigate(`/executions?projectId=${record.projectId}`); }}
              className="text-gray-400 hover:text-brand"
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
          <Button type="primary" icon={<Plus size={16} />} className="font-bold uppercase tracking-widest h-10 shadow-lg">
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