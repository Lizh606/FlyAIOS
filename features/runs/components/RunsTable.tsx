import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { Copy, GitBranch, Eye, MoreHorizontal, MapPin, ExternalLink, Link2 } from 'lucide-react';
import { Tooltip, message, Button, Dropdown, MenuProps } from 'antd';
import { useI18n } from '../../../i18n/index';
import FATable from '../../../ui/FATable';
import FAStatus from '../../../ui/FAStatus';
import ArtifactSummary from './ArtifactSummary';
import { RunInstance } from '../../../shared/mocks/runs';

interface RunsTableProps {
  data: RunInstance[];
  density?: 'comfort' | 'compact';
  onRowClick: (id: string) => void;
}

const RunsTable: React.FC<RunsTableProps> = ({ data, density = 'comfort', onRowClick }) => {
  const { t } = useI18n();

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    message.success({ content: '运行 ID 已复制', key: 'copy-msg' });
  };

  const getWorkflowDisplayName = (name: string) => {
    if (name.includes('Powerline')) return t('runs.mock.wf.powerline');
    if (name.includes('Survey') || name.includes('Standard')) return t('runs.mock.wf.survey');
    return name;
  };

  const moreActions = (record: RunInstance): MenuProps['items'] => [
    { key: 'view', label: t('common.viewDetail'), icon: <Eye size={14} />, onClick: () => onRowClick(record.id) },
    { key: 'tab', label: '在新标签页打开', icon: <ExternalLink size={14} /> },
    { key: 'link', label: '复制运行链接', icon: <Link2 size={14} /> },
  ];

  const columns: ColumnsType<RunInstance> = [
    {
      title: t('runs.col.id'),
      dataIndex: 'id',
      key: 'id',
      width: 140,
      fixed: 'left',
      align: 'left',
      render: (id: string) => (
        <div className="flex items-center gap-2 group/id">
          <span className="text-fa-t7 font-fa-semibold font-mono text-text-tertiary uppercase tracking-tighter tabular-nums truncate">
            {`#${id.slice(-8)}`}
          </span>
          <Tooltip title="复制运行 ID">
            <button 
              onClick={(e) => handleCopy(e, id)}
              className="p-1 hover:bg-bg-page rounded opacity-0 group-hover/id:opacity-100 transition-all text-text-tertiary hover:text-brand"
            >
              <Copy size={12} />
            </button>
          </Tooltip>
        </div>
      )
    },
    {
      title: t('runs.col.project'),
      dataIndex: 'projectName',
      key: 'project',
      width: 200,
      align: 'left',
      render: (text: string) => (
        <div className="flex items-center gap-2">
           <MapPin size={12} className="text-text-tertiary shrink-0" />
           <span className="text-fa-t5 font-fa-semibold text-text-primary truncate">{text}</span>
        </div>
      )
    },
    {
      title: t('runs.col.workflow'),
      key: 'workflow',
      width: 220,
      align: 'left',
      responsive: ['xl'],
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <div className="p-1 bg-bg-page rounded text-text-tertiary border border-border shrink-0">
            <GitBranch size={12}/>
          </div>
          <div className="flex flex-col min-w-0">
             <span className="text-fa-t6 font-fa-semibold text-text-secondary truncate">
               {getWorkflowDisplayName(record.workflowName)}
             </span>
             <span className="text-fa-t7 font-fa-semibold font-mono text-[9px] text-brand uppercase tracking-tighter">
               {record.workflowVersion}
             </span>
          </div>
        </div>
      )
    },
    {
      title: t('runs.col.status'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center',
      render: (status: string) => {
        const s = status.toLowerCase();
        const statusTypeMap: Record<string, any> = { 
          completed: 'success', 
          failed: 'error', 
          running: 'running' 
        };
        return (
          <FAStatus 
            status={statusTypeMap[s] || 'neutral'} 
            label={t(`runs.state.${s}`)} 
          />
        );
      }
    },
    {
      title: t('runs.col.started'),
      dataIndex: 'startedAt',
      key: 'started',
      width: 140,
      align: 'right',
      render: (date: string) => {
        const parts = date.split(' ');
        return (
          <div className="flex flex-col items-end">
            <span className="text-fa-t7 font-fa-semibold font-mono text-text-secondary tabular-nums leading-tight">{parts[1] || ''}</span>
            <span className="text-fa-t7 font-fa-semibold font-mono text-text-tertiary text-[10px] tabular-nums tracking-tighter">{parts[0] || ''}</span>
          </div>
        );
      }
    },
    {
      title: t('runs.col.duration'),
      dataIndex: 'duration',
      key: 'duration',
      width: 100,
      align: 'right',
      render: (val: string) => <span className="text-fa-t7 font-fa-semibold font-mono text-[11px] text-text-secondary tabular-nums">{val}</span>
    },
    {
      title: t('runs.col.outputs'),
      key: 'outputs',
      width: 160,
      align: 'right',
      render: (_, record) => (
        <ArtifactSummary artifacts={record.artifacts} hasReceipt={!!record.receipt} />
      )
    },
    {
      title: '',
      key: 'actions',
      fixed: 'right',
      width: 72,
      align: 'center',
      render: (_, record) => (
        <div className="flex items-center justify-center gap-1" onClick={e => e.stopPropagation()}>
           <Tooltip title={t('common.viewDetail')}>
             <Button 
              type="text" 
              size="small" 
              className="p-1 h-8 w-8 flex items-center justify-center text-text-tertiary hover:text-brand hover:bg-brand-bg"
              icon={<Eye size={16} />}
              onClick={() => onRowClick(record.id)}
             />
           </Tooltip>
           <Dropdown menu={{ items: moreActions(record) }} placement="bottomRight" trigger={['click']}>
             <Tooltip title="更多操作">
               <Button 
                type="text" 
                size="small" 
                className="p-1 h-8 w-8 flex items-center justify-center text-text-tertiary hover:text-text-primary"
                icon={<MoreHorizontal size={16} />} 
               />
             </Tooltip>
           </Dropdown>
        </div>
      )
    }
  ];

  return (
    <div className="fa-runs-table-container">
      <FATable 
        dataSource={data}
        columns={columns}
        rowKey="id"
        density={density}
        scroll={{ x: 1200 }}
        onRow={(record) => ({
          onClick: () => onRowClick(record.id),
          className: 'cursor-pointer'
        })}
      />
    </div>
  );
};

export default RunsTable;