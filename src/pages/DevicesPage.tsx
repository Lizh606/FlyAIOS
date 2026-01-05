
import React from 'react';
import { Plus, Cpu, Battery as BatteryIcon, Settings } from 'lucide-react';
import { Button, Progress, Tooltip, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { useI18n } from '../i18n';
import FAPageHeader from '../ui/FAPageHeader';
import FATable from '../ui/FATable';
import FAStatus from '../ui/FAStatus';

const MOCK_DEVICES = [
  { id: 'dev-001', name: 'Alpha-X-01', model: 'DJI Matrice 350 RTK', status: 'online', battery: 85, firmware: 'v02.04.0102' },
  { id: 'dev-002', name: 'Alpha-X-02', model: 'DJI Matrice 350 RTK', status: 'idle', battery: 42, firmware: 'v02.04.0102' },
  { id: 'dev-003', name: 'Delta-Scan-09', model: 'DJI Mavic 3 Enterprise', status: 'online', battery: 98, firmware: 'v01.00.0605' },
  { id: 'dev-004', name: 'Storm-P1', model: 'Custom VTOL', status: 'failed', battery: 12, firmware: 'v4.2.0-beta' },
];

const DevicesPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();

  const columns: ColumnsType<any> = [
    {
      title: t('devices.col.name'),
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center text-gray-400">
            <Cpu size={16} />
          </div>
          <div className="flex flex-col">
            <span className="fa-t5-strong text-gray-900">{text}</span>
            <span className="fa-t7-mono text-[10px] text-gray-400 uppercase">#{record.id}</span>
          </div>
        </div>
      )
    },
    {
      title: t('devices.col.status'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => <FAStatus status={status as any} />
    },
    {
      title: t('devices.col.model'),
      dataIndex: 'model',
      key: 'model',
      width: 220,
      render: (text) => <span className="fa-t5 text-gray-600">{text}</span>
    },
    {
      title: t('devices.col.battery'),
      dataIndex: 'battery',
      key: 'battery',
      width: 180,
      render: (val) => (
        <div className="flex items-center gap-2 w-32">
          <BatteryIcon size={14} className={val < 20 ? 'text-error' : 'text-gray-400'} />
          <Progress percent={val} size="small" status={val < 20 ? 'exception' : 'normal'} showInfo={false} />
          <span className={`fa-t7-mono font-bold ${val < 20 ? 'text-error' : 'text-gray-600'}`}>{val}%</span>
        </div>
      )
    },
    {
      title: t('devices.col.firmware'),
      dataIndex: 'firmware',
      key: 'firmware',
      width: 150,
      render: (text) => <span className="fa-t7-mono text-gray-400">{text}</span>
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
                message.info('Device settings coming soon');
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
        title={t('devices.title')}
        subtitle={t('devices.subtitle')}
        actions={
          <Button type="primary" icon={<Plus size={16} />} className="font-bold uppercase tracking-widest h-10 shadow-lg">
            {t('devices.new')}
          </Button>
        }
      />
      <FATable 
        dataSource={MOCK_DEVICES} 
        columns={columns} 
        rowKey="id" 
        density="comfort"
        onRow={(record) => ({
          onClick: () => navigate(`/device/${record.id}`),
          className: 'cursor-pointer group'
        })}
      />
    </div>
  );
};

export default DevicesPage;
