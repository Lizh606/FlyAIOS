
import React from 'react';
import { Plus, Boxes, MapPin, Settings } from 'lucide-react';
import { Button, Tooltip, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { useI18n } from '../i18n';
import FAPageHeader from '../ui/FAPageHeader';
import FATable from '../ui/FATable';
import FAStatus from '../ui/FAStatus';

const MOCK_DOCKS = [
  { id: 'dock-001', name: 'NorthGrid-Dock-12', location: 'Section A, Site 01', status: 'online', occupancy: 'Empty' },
  { id: 'dock-002', name: 'NorthGrid-Dock-17', location: 'Section C, Site 05', status: 'online', occupancy: 'Charging' },
  { id: 'dock-003', name: 'Marina-Alpha-Dock', location: 'Pier 9, Marina Bay', status: 'idle', occupancy: 'Empty' },
  { id: 'dock-004', name: 'Downtown-Hub-01', location: 'Central Square', status: 'failed', occupancy: 'Faulty' },
];

const DocksPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();

  const columns: ColumnsType<any> = [
    {
      title: t('docks.col.name'),
      dataIndex: 'name',
      key: 'name',
      width: 220,
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-brand">
            <Boxes size={16} />
          </div>
          <div className="flex flex-col">
            <span className="fa-t5-strong text-gray-900">{text}</span>
            <span className="fa-t7-mono text-[10px] text-gray-400 uppercase">#{record.id}</span>
          </div>
        </div>
      )
    },
    {
      title: t('docks.col.status'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => <FAStatus status={status as any} />
    },
    {
      title: t('docks.col.location'),
      dataIndex: 'location',
      key: 'location',
      width: 250,
      render: (text) => (
        <div className="flex items-center gap-2 text-gray-500">
          <MapPin size={14} className="text-gray-300 shrink-0" />
          <span className="fa-t5 truncate">{text}</span>
        </div>
      )
    },
    {
      title: t('docks.col.occupancy'),
      dataIndex: 'occupancy',
      key: 'occupancy',
      width: 150,
      render: (text) => (
        <span className={`fa-t7-mono font-bold uppercase text-[11px] ${
          text === 'Empty' ? 'text-gray-400' : text === 'Faulty' ? 'text-error' : 'text-brand'
        }`}>
          {text}
        </span>
      )
    },
    {
      title: '',
      key: 'actions',
      fixed: 'right',
      width: 64,
      align: 'right',
      render: () => (
        <div className="flex items-center justify-end">
          {/* Use placement="left" to prevent tooltip from overflowing the right edge */}
          <Tooltip title={t('common.viewDetail')} placement="left">
            <Button 
              type="text" 
              icon={<Settings size={16} className="text-gray-400" />} 
              onClick={(e) => {
                e.stopPropagation();
                message.info('Dock settings coming soon');
              }}
            />
          </Tooltip>
        </div>
      )
    }
  ];

  return (
    <div className="px-6 py-8 max-w-[1440px] mx-auto w-full">
      <FAPageHeader 
        title={t('docks.title')}
        subtitle={t('docks.subtitle')}
        actions={
          <Button type="primary" icon={<Plus size={16} />} className="font-bold uppercase tracking-widest h-10 shadow-lg">
            {t('docks.new')}
          </Button>
        }
      />
      <FATable 
        dataSource={MOCK_DOCKS} 
        columns={columns} 
        rowKey="id" 
        density="comfort"
        onRow={(record) => ({
          onClick: () => navigate(`/dock/${record.id}`),
          className: 'cursor-pointer group'
        })}
      />
    </div>
  );
};

export default DocksPage;
