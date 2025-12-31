
import React, { useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Tabs, Button, Divider, Dropdown, Tooltip, Popover, Tag } from 'antd';
import { 
  ArrowLeft, Activity, Monitor, GitBranch, 
  History, Settings, Zap, Info, Clock, ExternalLink,
  Copy, MoreVertical, HelpCircle, MapPin, ChevronDown
} from 'lucide-react';
import { ColumnsType } from 'antd/es/table';
import { useI18n } from '../../i18n';
import { MOCK_EXECUTIONS } from '../../shared/mocks/executions';
import { ExecutionStatus, RouteLog } from '../../shared/types/domain';
import FACard from '../../ui/FACard';
import FAStatus from '../../ui/FAStatus';
import FATable from '../../ui/FATable';
import LiveWorkbench from '../../features/executions/components/LiveWorkbench';
import AutomationPanel from '../../features/executions/components/AutomationPanel';

const ExecutionDetailPage: React.FC = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useI18n();

  const execution = useMemo(() => 
    MOCK_EXECUTIONS.find(e => e.id === id) || MOCK_EXECUTIONS[0]
  , [id]);

  const activeTab = searchParams.get('tab') || 'overview';

  const tabItems = [
    { key: 'overview', label: t('executions.tab.overview'), icon: <Activity size={14} /> },
    { key: 'live', label: t('executions.tab.live'), icon: <Monitor size={14} /> },
    { key: 'automation', label: t('executions.tab.automation'), icon: <GitBranch size={14} /> },
  ];

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

  /**
   * Route Logs Table Columns Definition
   * Following v0.8 Section 6.2.3 Column Priority Rules
   */
  const routeColumns: ColumnsType<RouteLog> = [
    {
      title: t('executions.route.col.time'),
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 100,
      render: (text) => <span className="fa-t7-mono text-gray-400 tabular-nums">{text}</span>
    },
    {
      title: t('executions.route.col.event'),
      dataIndex: 'event',
      key: 'event',
      width: 180,
      render: (text) => (
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${text.includes('Reached') ? 'bg-brand' : 'bg-gray-300'}`} />
          <span className="fa-t6 text-gray-700 font-medium truncate">{text}</span>
        </div>
      )
    },
    {
      title: t('executions.route.col.coord'),
      dataIndex: 'coordinate',
      key: 'coordinate',
      responsive: ['md'], // P1 Column
      render: (text) => (
        <div className="flex items-center gap-2 group">
          <MapPin size={11} className="text-gray-300 group-hover:text-brand transition-colors shrink-0" />
          <span className="fa-t7-mono text-[11px] text-gray-500 tabular-nums tracking-tighter">{text}</span>
        </div>
      )
    },
    {
      title: t('executions.route.col.alt'),
      dataIndex: 'altitude',
      key: 'altitude',
      align: 'right',
      width: 100,
      responsive: ['sm'], // P1 Column
      render: (val) => (
        <span className="fa-t7-mono text-[11px] text-gray-700 font-bold tabular-nums">
          {val.toFixed(1)}m
        </span>
      )
    }
  ];

  const statusContent = (
    <div className="w-[320px] p-1 space-y-4">
      <div className="flex items-center justify-between">
        <span className="fa-t7-mono text-gray-400 font-bold uppercase tracking-widest">{t('executions.status.panelTitle')}</span>
        <HelpCircle size={14} className="text-gray-300" />
      </div>
      <div className="space-y-3">
        <StatusField label={t('executions.status.what')} value={t(`executions.status.${execution.status.toLowerCase()}`)} highlight />
        <StatusField label={t('executions.status.why')} value={execution.status === ExecutionStatus.FAILED ? '信号接入超时' : '任务正常校验'} />
        <StatusField label={t('executions.status.when')} value={execution.startTime.split(' ')[1]} tabular />
      </div>
      <Divider className="my-2 opacity-5" />
      <Button type="primary" size="small" ghost block className="h-8 fa-t6 font-bold uppercase" onClick={() => setSearchParams({ tab: 'live' })}>
        {t('common.openLive')}
      </Button>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] overflow-hidden">
      <div className="px-6 pt-4 bg-white border-b border-gray-200 shrink-0 z-20">
        <div className="max-w-[1320px] mx-auto w-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 min-w-0">
              <button 
                onClick={() => navigate('/executions')}
                className="p-1.5 -ml-1 text-gray-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-all"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="min-w-0">
                 <div className="flex items-center gap-3">
                   <h1 className="fa-t2 text-gray-900 truncate leading-none">Execution #{execution.id.slice(-5).toUpperCase()}</h1>
                   <Popover content={statusContent} trigger="hover" placement="bottomLeft" overlayClassName="fa-popover-v2">
                      <div className="cursor-help inline-flex items-center">
                        <FAStatus status={getStatusType(execution.status) as any} label={t(`executions.status.${execution.status.toLowerCase()}`)} />
                      </div>
                   </Popover>
                 </div>
                 <div className="flex items-center gap-2 mt-1.5">
                    <span className="fa-t6 font-semibold text-gray-400">
                      {execution.projectName} • {execution.dockName || execution.deviceName}
                    </span>
                    <Divider type="vertical" className="bg-gray-200" />
                    <span className="fa-t7-mono text-gray-400 tabular-nums text-[11px]">启动于 {execution.startTime}</span>
                 </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Dropdown 
                menu={{ items: [
                  { key: 'copy', label: '复制 ID', icon: <Copy size={14} />, onClick: () => navigator.clipboard.writeText(execution.id) },
                  { key: 'run', label: '查看运行记录', icon: <ExternalLink size={14} />, disabled: !execution.runId, onClick: () => navigate(`/run/${execution.runId}`) },
                ] }} 
                placement="bottomRight"
              >
                <Button type="primary" size="middle" className="font-bold uppercase tracking-widest h-9 px-5 shadow-sm flex items-center gap-2">
                  {t('common.actions')} <ChevronDown size={14} />
                </Button>
              </Dropdown>
            </div>
          </div>

          <div className="fa-tabs-v2">
            <Tabs
              activeKey={activeTab}
              onChange={(k) => setSearchParams({ tab: k })}
              items={tabItems.map(item => ({
                key: item.key,
                label: (
                  <div className="flex items-center gap-1.5 px-1">
                    {item.icon}
                    {item.label}
                  </div>
                )
              }))}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#F8FAFC]">
        <div className="max-w-[1320px] mx-auto w-full p-4 lg:p-6 min-h-full flex flex-col">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-in fade-in duration-300">
               <div className="lg:col-span-8 space-y-4">
                  <FACard title={t('executions.detail.telemetry')} density="comfort">
                    <div className="grid grid-cols-4 gap-4 py-1">
                      <MetricItem label={t('executions.detail.metrics.duration')} value={execution.duration || '—'} tabular />
                      <MetricItem label={t('executions.detail.metrics.alerts')} value={execution.alertsCount.toString()} warning={execution.alertsCount > 0} />
                      <MetricItem label={t('executions.detail.metrics.session')} value={execution.streamSessionId || 'None'} tabular />
                      <MetricItem label={t('executions.detail.metrics.run')} value={execution.runId ? `#${execution.runId}` : '—'} highlight={!!execution.runId} />
                    </div>
                  </FACard>
                  
                  <FACard title={t('executions.detail.routeLogs')} density="comfort" extra={<History size={14} className="text-gray-300" />}>
                    <div className="mb-4">
                      <p className="fa-t6 text-gray-400">{t('executions.detail.routeLogsDesc')}</p>
                    </div>
                    
                    <FATable 
                      dataSource={execution.routeLogs || []}
                      columns={routeColumns}
                      rowKey="id"
                      density="comfort"
                      pagination={{ pageSize: 10, size: 'small' }}
                      scroll={{ y: 420 }}
                      className="border-gray-100"
                      locale={{
                        emptyText: (
                          <div className="py-20 flex flex-col items-center justify-center grayscale opacity-30">
                            <Clock size={40} className="text-gray-300 mb-3" />
                            <span className="fa-t6 font-bold uppercase tracking-widest text-gray-400">正在等待实时数据接入...</span>
                          </div>
                        )
                      }}
                    />
                  </FACard>
               </div>
               
               <div className="lg:col-span-4 space-y-4">
                  <FACard title={t('executions.detail.device')} density="comfort">
                    <div className="space-y-3">
                      <InfoRow label={t('executions.label.model')} value="DJI M350 RTK" />
                      <InfoRow label={t('executions.label.serial')} value="1ZAX-992-00" tabular />
                      <InfoRow label={t('executions.label.status')} value="在线 / 已同步" />
                      <InfoRow label={t('executions.label.firmware')} value="v02.04.01" tabular />
                    </div>
                  </FACard>
                  <FACard title={t('executions.detail.timeline')} density="comfort" className="flex-1 min-h-[300px]">
                    <div className="space-y-6 ml-2 pl-6 border-l border-gray-100 relative pt-1">
                       <TimelineNode time={execution.startTime.split(' ')[1]} text="任务开始执行" status="success" />
                       <TimelineNode time="实时" text="边缘心跳探测活跃" active />
                    </div>
                  </FACard>
               </div>
            </div>
          )}

          {activeTab === 'live' && (
            <div className="flex-1 flex flex-col min-h-0 animate-in fade-in duration-300">
              <LiveWorkbench execution={execution} />
            </div>
          )}

          {activeTab === 'automation' && (
            <div className="animate-in fade-in duration-300">
              <AutomationPanel execution={execution} />
            </div>
          )}
        </div>
      </div>

      <style>{`
        .fa-tabs-v2 .ant-tabs-nav { margin-bottom: 0 !important; }
        .fa-tabs-v2 .ant-tabs-nav::before { border-bottom: none !important; }
        .fa-tabs-v2 .ant-tabs-tab { padding: 12px 0 !important; margin-right: 24px !important; }
        .fa-tabs-v2 .ant-tabs-tab-btn { font-size: 13px !important; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700 !important; }
        .fa-popover-v2 .ant-popover-inner { border-radius: 12px; padding: 12px; box-shadow: 0 12px 32px -4px rgba(0,0,0,0.1); }
      `}</style>
    </div>
  );
};

const StatusField = ({ label, value, tabular, highlight }: any) => (
  <div className="flex justify-between items-center">
    <span className="fa-t7-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest">{label}</span>
    <span className={`fa-t6 font-bold ${tabular ? 'tabular-nums font-mono' : ''} ${highlight ? 'text-brand' : 'text-gray-700'}`}>
      {value}
    </span>
  </div>
);

const MetricItem = ({ label, value, tabular, warning, highlight }: any) => (
  <div className="flex flex-col gap-0.5">
    <span className="fa-t7-mono text-gray-400 font-bold text-[10px] uppercase tracking-tight">{label}</span>
    <span className={`fa-t4 ${tabular ? 'tabular-nums font-mono text-[18px]' : ''} ${warning ? 'text-error' : highlight ? 'text-brand' : 'text-gray-900'}`}>
      {value}
    </span>
  </div>
);

const InfoRow = ({ label, value, tabular }: any) => (
  <div className="flex items-center gap-4 h-6">
    <span className="fa-t6 text-gray-400 font-medium w-[88px] shrink-0">{label}</span>
    <span className={`fa-t5-strong text-gray-700 truncate ${tabular ? 'tabular-nums font-mono' : ''}`}>{value}</span>
  </div>
);

const TimelineNode = ({ time, text, status, active }: any) => (
  <div className="relative">
    <div className={`absolute -left-[28.5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm ${
      active ? 'bg-brand ring-4 ring-brand/10' : status === 'success' ? 'bg-green-500' : 'bg-gray-300'
    }`} />
    <div className="flex items-center gap-3">
      {active ? (
        <span className="fa-t7-mono text-[9px] px-1.5 py-0.5 bg-brand/10 text-brand rounded leading-none font-bold uppercase">当前</span>
      ) : (
        <span className="fa-t7-mono text-[10px] text-gray-400 font-bold uppercase tabular-nums">{time}</span>
      )}
      <p className="fa-t5-strong text-gray-800 leading-none">{text}</p>
    </div>
  </div>
);

export default ExecutionDetailPage;
