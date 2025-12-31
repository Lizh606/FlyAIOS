
import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { useI18n } from '../../../i18n/index';
import { Delivery } from '../../../shared/mocks/integrations';
import FATable from '../../../ui/FATable';
import FAStatus from '../../../ui/FAStatus';
import { Button, Tooltip, Popover } from 'antd';
import { ExternalLink, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DeliveriesTableProps {
  data: Delivery[];
}

const DeliveriesTable: React.FC<DeliveriesTableProps> = ({ data }) => {
  const { t } = useI18n();
  const navigate = useNavigate();

  const handleViewRun = (runId: string) => {
    // Navigating to Page E (Run Detail) with query param for positioning
    navigate(`/run/${runId}?from=integration_trace`);
  };

  const columns: ColumnsType<Delivery> = [
    {
      title: t('integrations.delivery.time'),
      dataIndex: 'timestamp',
      key: 'time',
      width: 100,
      fixed: 'left',
      render: (text) => <span className="fa-t7-mono text-gray-400 tabular-nums">{text}</span>
    },
    {
      title: t('integrations.delivery.status'),
      dataIndex: 'status',
      key: 'status',
      width: 140, 
      align: 'left',
      render: (status, record) => {
        const typeMap: any = { success: 'success', fail: 'error', retrying: 'warning' };
        
        return (
          <div className="flex items-center gap-2">
            <div className="w-[84px] flex shrink-0">
              <FAStatus 
                status={typeMap[status]} 
                label={t(`integrations.state.${status}`)} 
                className="w-full justify-center"
              />
            </div>
            <div className="w-6 h-6 flex items-center justify-center">
              {record.error && (
                <Popover 
                  title={
                    <span className="fa-t5-strong text-gray-900 px-1 py-1 block">
                      {t('integrations.delivery.errorDetail')}
                    </span>
                  }
                  content={
                    <div className="p-1 max-w-[280px]">
                      <span className="fa-t7-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-2">
                        {t('integrations.delivery.reason')}
                      </span>
                      <div className="fa-t6 text-red-600 leading-relaxed bg-red-50/50 p-2.5 rounded-lg border border-red-100/50">
                        {record.error}
                      </div>
                    </div>
                  }
                  trigger="hover"
                  placement="top"
                  overlayClassName="fa-popover-v2"
                >
                  <button className="flex items-center justify-center p-1 hover:bg-red-50 rounded transition-colors text-red-400 border-none bg-transparent cursor-help">
                    <Info size={14} />
                  </button>
                </Popover>
              )}
            </div>
          </div>
        );
      }
    },
    {
      title: t('integrations.delivery.code'),
      dataIndex: 'httpCode',
      key: 'code',
      width: 80,
      responsive: ['md'],
      align: 'right',
      render: (code) => (
        <span className={`fa-t7-mono font-bold tabular-nums ${code >= 200 && code < 300 ? 'text-green-500' : 'text-red-500'}`}>
          {code || '—'}
        </span>
      )
    },
    {
      title: t('integrations.delivery.latency'),
      dataIndex: 'latency',
      key: 'latency',
      width: 80,
      responsive: ['lg'],
      align: 'right',
      render: (text) => <span className="fa-t7-mono text-gray-400 tabular-nums">{text}</span>
    },
    {
      title: t('integrations.delivery.run'),
      dataIndex: 'runId',
      key: 'run',
      fixed: 'right',
      width: 160,
      render: (id) => (
        <div className="flex items-center justify-between group/run">
          <Tooltip title={`Jump to Evidence Trace ${id}`}>
            <span 
              onClick={() => handleViewRun(id)}
              className="fa-t7-mono text-brand font-bold uppercase cursor-pointer hover:underline tabular-nums"
            >
              #{id.slice(-8)}
            </span>
          </Tooltip>
          <Button 
            type="text" 
            size="small" 
            className="h-6 w-6 p-0 flex items-center justify-center text-gray-300 hover:text-brand opacity-0 group-hover/run:opacity-100 transition-all"
            icon={<ExternalLink size={12}/>}
            onClick={() => handleViewRun(id)}
          />
        </div>
      )
    }
  ];

  return (
    <div className="fa-table-v2">
      <FATable 
        dataSource={data} 
        columns={columns} 
        rowKey="id" 
        density="compact"
        pagination={{ pageSize: 8, size: 'small' }}
        scroll={{ x: 'max-content' }}
        className="border-gray-100"
      />
    </div>
  );
};

export default DeliveriesTable;
