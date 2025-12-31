import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { useI18n } from '../../../i18n/index';
import { Connection } from '../../../shared/mocks/integrations';
import FATable from '../../../ui/FATable';
import FAStatus from '../../../ui/FAStatus';
import { Button, Tooltip, Tag, Dropdown, Modal, message } from 'antd';
import { Eye, MoreHorizontal, Settings, Play, History, Trash2, Webhook, Boxes, Power } from 'lucide-react';
import UIDChip from './UIDChip';

interface ConnectionsTableProps {
  data: Connection[];
  onView: (conn: Connection) => void;
}

const ConnectionsTable: React.FC<ConnectionsTableProps> = ({ data, onView }) => {
  const { t } = useI18n();

  const handleDelete = (record: Connection) => {
    Modal.confirm({
      title: `${t('integrations.action.delete')}?`,
      content: t('integrations.action.deleteConfirm'),
      okText: t('common.save'),
      cancelText: t('common.cancel'),
      okButtonProps: { danger: true },
      onOk: () => {
        message.loading({ content: '正在删除...', key: 'del' });
        setTimeout(() => message.success({ content: '已成功移除连接', key: 'del' }), 1000);
      }
    });
  };

  const getActionMenu = (record: Connection) => ({
    items: [
      { key: 'edit', label: t('integrations.action.edit'), icon: <Settings size={14}/> },
      { key: 'toggle', label: t('integrations.action.disable'), icon: <Power size={14}/> },
      { key: 'test', label: t('integrations.action.test'), icon: <Play size={14}/> },
      { key: 'logs', label: t('integrations.action.logs'), icon: <History size={14}/> },
      { type: 'divider' as const },
      { key: 'delete', label: t('integrations.action.delete'), icon: <Trash2 size={14}/>, danger: true, onClick: () => handleDelete(record) },
    ]
  });

  const columns: ColumnsType<Connection> = [
    {
      title: t('integrations.col.name'),
      dataIndex: 'name',
      key: 'name',
      width: 280,
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-bg-page flex items-center justify-center text-text-tertiary border border-border group-hover:bg-bg-card transition-colors">
             {record.type === 'Webhook' ? <Webhook size={18}/> : <Boxes size={18}/>}
          </div>
          <div className="flex flex-col min-w-0">
             <span className="text-fa-t5 font-fa-semibold text-text-primary truncate leading-tight mb-1">{text}</span>
             <UIDChip uid={record.id} />
          </div>
        </div>
      )
    },
    {
      title: t('integrations.col.type'),
      dataIndex: 'type',
      key: 'type',
      width: 140,
      render: (type) => (
        <Tag className="m-0 text-fa-t7 font-fa-semibold font-mono border-none bg-bg-page text-text-secondary uppercase px-2 py-0.5 leading-none h-6 flex items-center w-fit shadow-sm">
          {type}
        </Tag>
      )
    },
    {
      title: t('integrations.col.status'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center',
      render: (status) => (
        <FAStatus 
          status={status === 'connected' ? 'success' : status === 'failed' ? 'error' : 'warning'} 
          label={t(`integrations.state.${status}`)} 
        />
      )
    },
    {
      title: t('integrations.col.updated'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 180,
      render: (date) => (
        <div className="flex flex-col">
          <span className="text-fa-t5 text-text-secondary tabular-nums leading-none mb-1">{date.split(' ')[0]}</span>
          <span className="text-fa-t7 font-fa-medium text-text-tertiary text-[11px] leading-none tabular-nums">{date.split(' ')[1]}</span>
        </div>
      )
    },
    {
      title: '',
      key: 'actions',
      fixed: 'right',
      width: 100,
      align: 'right',
      render: (_, record) => (
        <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
          <Tooltip title={t('integrations.action.view')}>
            <Button 
              type="text" 
              size="small"
              icon={<Eye size={16} className="text-text-tertiary hover:text-brand" />}
              onClick={() => onView(record)}
            />
          </Tooltip>
          <Dropdown menu={getActionMenu(record)} placement="bottomRight" trigger={['click']}>
            <Button 
              type="text" 
              size="small"
              icon={<MoreHorizontal size={18} className="text-text-tertiary hover:text-text-primary" />} 
            />
          </Dropdown>
        </div>
      )
    }
  ];

  return (
    <FATable 
      dataSource={data}
      columns={columns}
      rowKey="id"
      density="comfort"
      onRow={(record) => ({
        onClick: () => onView(record),
        className: 'cursor-pointer group'
      })}
    />
  );
};

export default ConnectionsTable;