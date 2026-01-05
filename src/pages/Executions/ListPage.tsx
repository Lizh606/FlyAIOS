
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AlertCircle, Clock, Play, Copy, Eye, Monitor } from 'lucide-react';
import { Button, Tooltip, Dropdown, Divider, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useI18n } from '../../i18n';
import FAPageHeader from '../../ui/FAPageHeader';
import FATable from '../../ui/FATable';
import FAStatus from '../../ui/FAStatus';
import FACard from '../../ui/FACard';
import { MOCK_EXECUTIONS } from '../../shared/mocks/executions';
import { Execution, ExecutionStatus, LiveState } from '../../shared/types/domain';
import { links } from '../../shared/linkBuilders';

/**
 * ExecutionsListPage - Centralized view for monitoring drone mission executions.
 */
const ExecutionsListPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1200;

  const projectIdFilter = searchParams.get('projectId');

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCopyId = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    message.success({ content: '执行 ID 已复制', key: 'copy-id' });
  };

  const getStatusType = (status: ExecutionStatus) => {
    switch (status) {
      case ExecutionStatus.EXECUTING: return 'active';
      case ExecutionStatus.RETURNING:
      case ExecutionStatus.PREPARING: return 'syncing';
      case ExecutionStatus.QUEUED: return 'queued';
      case ExecutionStatus.COMPLETED: return 'completed';
      case ExecutionStatus.FAILED: return 'failed';
      default: return 'idle';
    }
  };

  const getLiveStatus = (state: LiveState) => {
    switch (state) {
      case LiveState.LIVE: return 'live';
      case LiveState.STARTING: return 'info';
      case LiveState.DEGRADED: return 'warning';
      case LiveState.OFF:
      default: return 'neutral';
    }
  };

  const filteredExecutions = useMemo(() => {
    if (!projectIdFilter) return MOCK_EXECUTIONS;
    return MOCK_EXECUTIONS.filter(ex => ex.projectId === projectIdFilter);
  }, [projectIdFilter]);

  // Memoized columns definition for the table view
  const columns: ColumnsType<Execution> = useMemo(() => {
    const baseCols: ColumnsType<Execution> = [
      {
        title: t('executions.col.id'),
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
        title: t('executions.col.target'),
        key: 'target',
        width: isTablet ? 240 : 360, 
        ellipsis: true,
        render: (_, record) => (
          <div className="flex flex-col min-w-0">
            <span className="text-fa-t5 font-fa-semibold text-text-primary truncate">{record.projectName}</span>
            <span className="text-fa-t7 font-fa-medium text-text-tertiary uppercase tracking-tight truncate">
              {record.deviceName} {record.dockName ? `• ${record.dockName}` : ''}
            </span>
          </div>
        )
      }
    ];

    if (isTablet) {
      baseCols.push({
        title: t('executions.col.status'),
        key: 'status_merge',
        width: 140,
        align: 'center',
        render: (_, record) => (
          <div className="flex flex-col items-center gap-2">
             <FAStatus 
               status={getStatusType(record.status) as any} 
               label={t(`executions.status.${record.status}`)} 
               className="status-tag-standard" 
             />
             <FAStatus 
               status={getLiveStatus(record.liveState) as any} 
               label={t(`executions.live.state.${record.liveState.toLowerCase()}`)} 
               className="status-tag-standard" 
             />
          </div>
        )
      });
    } else {
      baseCols.push(
        {
          title: t('executions.col.status'),
          dataIndex: 'status',
          key: 'status',
          width: 140,
          align: 'center',
          render: (status: ExecutionStatus) => (
            <FAStatus status={getStatusType(status) as any} label={t(`executions.status.${status}`)} className="status-tag-standard" />
          )
        },
        {
          title: t('executions.col.live'),
          dataIndex: 'liveState',
          key: 'live',
          width: 140,
          align: 'center',
          render: (state) => (
            <FAStatus status={getLiveStatus(state) as any} label={t(`executions.live.state.${state.toLowerCase()}`)} className="status-tag-standard" />
          )
        }
      );
    }

    baseCols.push(
      {
        title: t('executions.col.alerts'),
        dataIndex: 'alertsCount',
        key: 'alerts',
        width: 88,
        align: 'center',
        render: (count, record) => {
          const hasAlerts = count > 0;
          return (
            <div 
              onClick={(e) => { if (hasAlerts) { e.stopPropagation(); navigate(links.execution(record.id, 'live')); } }}
              className={`inline-flex items-center gap-2 text-fa-t5 font-fa-semibold transition-colors ${hasAlerts ? 'text-error cursor-pointer hover:opacity-80' : 'text-text-disabled cursor-default'}`}
            >
              <AlertCircle size={14} />
              {count}
            </div>
          );
        }
      },
      {
        title: t('executions.col.time'),
        key: 'time_duration',
        width: isTablet ? 140 : 160,
        align: 'left',
        render: (_, record) => {
          const isPending = record.status === ExecutionStatus.QUEUED || record.status === ExecutionStatus.PREPARING;
          const displayTime = record.startTime.slice(5, 16);
          return (
            <div className="flex flex-col">
              <span className="text-fa-t5 text-text-secondary leading-tight">{displayTime}</span>
              <div className="flex items-center gap-1 mt-0.5">
                 <Clock size={10} className="text-text-tertiary" />
                 <span className="text-fa-t7 font-fa-medium text-text-tertiary tabular-nums">
                   {isPending ? '—' : record.duration || '0s'}
                 </span>
              </div>
            </div>
          );
        }
      },
      {
        title: '',
        key: 'actions',
        fixed: 'right',
        align: 'right',
        width: 88,
        render: (_, record) => (
          <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
            <Tooltip title={t('common.viewDetail')}>
              <Button 
                type="text" 
                size="small" 
                icon={<Eye size={16} />} 
                onClick={() => navigate(links.execution(record.id))}
                className="text-text-tertiary hover:text-brand"
              />
            </Tooltip>
            <Tooltip title={t('common.live')}>
              <Button 
                type="text" 
                size="small" 
                icon={<Play size={14} fill="currentColor" />} 
                onClick={() => navigate(links.execution(record.id, 'live'))}
                className="text-text-tertiary hover:text-brand"
              />
            </Tooltip>
          </div>
        )
      }
    );

    return baseCols;
  }, [t, isTablet, navigate]);

  // Responsive View Handling
  if (isMobile) {
    return (
      <div className="px-4 py-6 bg-bg-page min-h-full animate-in fade-in duration-500">
        <FAPageHeader title={t('executions.title')} subtitle={t('executions.subtitle')} className="mb-6" />
        <div className="space-y-4">
          {filteredExecutions.map(ex => (
            <FACard key={ex.id} density="compact" onClick={() => navigate(links.execution(ex.id))} className="border-border shadow-card active:scale-[0.98] transition-all">
              <div className="flex justify-between items-start mb-3">
                <div className="min-w-0 pr-4">
                  <h3 className="text-fa-t5 font-fa-semibold text-text-primary truncate leading-tight">{ex.projectName}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase">#{ex.id.slice(-8)}</span>
                    <Divider type="vertical" className="bg-divider" />
                    <span className="text-fa-t7 text-text-tertiary truncate">{ex.deviceName}</span>
                  </div>
                </div>
                <div onClick={e => e.stopPropagation()}>
                  <Dropdown menu={{ 
                    items: [
                      { key: 'view', label: t('common.viewDetail'), icon: <Eye size={14} />, onClick: () => navigate(links.execution(ex.id)) },
                      { key: 'live', label: t('common.live'), icon: <Monitor size={14} />, onClick: () => navigate(links.execution(ex.id, 'live')) }
                    ]
                  }} trigger={['click']}>
                    <Button type="text" size="small" icon={<Play size={18} className="text-text-tertiary" />} />
                  </Dropdown>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <FAStatus 
                  status={getStatusType(ex.status) as any} 
                  label={t(`executions.status.${ex.status}`)} 
                  className="status-tag-standard" 
                />
                <FAStatus 
                  status={getLiveStatus(ex.liveState) as any} 
                  label={t(`executions.live.state.${ex.liveState.toLowerCase()}`)} 
                  className="status-tag-standard" 
                />
                {ex.alertsCount > 0 && (
                   <div className="flex items-center gap-1 text-error text-fa-t7 font-fa-semibold ml-1">
                     <AlertCircle size={12} /> {ex.alertsCount}
                   </div>
                )}
              </div>
              <div className="pt-2 border-t border-divider flex items-center justify-between">
                <div className="flex items-center gap-2 text-text-tertiary">
                  <Clock size={11} />
                  <span className="text-fa-t7 tabular-nums">{ex.startTime.slice(5, 16)}</span>
                </div>
                <span className="text-fa-t7 font-fa-semibold text-text-secondary">{ex.duration || '—'}</span>
              </div>
            </FACard>
          ))}
        </div>
      </div>
    );
  }

  // Desktop Table View
  return (
    <div className="px-6 py-8 bg-bg-page min-h-full max-w-[1440px] mx-auto w-full animate-in fade-in duration-500">
      <FAPageHeader title={t('executions.title')} subtitle={t('executions.subtitle')} />
      <FATable 
        dataSource={filteredExecutions} 
        columns={columns} 
        rowKey="id" 
        density="comfort"
        tableLayout="fixed"
        scroll={{ x: isTablet ? 900 : 1080 }}
        onRow={(record) => ({
          onClick: () => navigate(links.execution(record.id)),
          className: 'cursor-pointer group'
        })}
      />

      <style>{`
        .status-tag-standard {
          min-width: 100px !important;
          height: 24px !important;
        }
      `}</style>
    </div>
  );
};

export default ExecutionsListPage;
