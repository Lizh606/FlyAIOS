import React, { useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Tabs, Button, Divider, Dropdown, Tooltip, Popover } from 'antd';
import { 
  ArrowLeft, Activity, Monitor, GitBranch, 
  Settings, Info, Clock, ExternalLink,
  Copy, MoreVertical, HelpCircle, MapPin, ChevronDown,
  AlertCircle, CheckCircle2, Timer, Zap, PlayCircle
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
  const isLiveMode = activeTab === 'live';

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

  const routeColumns: ColumnsType<RouteLog> = [
    {
      title: t('executions.route.col.time'),
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 100,
      render: (text) => <span className="text-fa-t7 font-fa-medium text-text-tertiary tabular-nums">{text}</span>
    },
    {
      title: t('executions.route.col.event'),
      dataIndex: 'event',
      key: 'event',
      width: 180,
      render: (text) => (
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${text.includes('Reached') ? 'bg-brand' : 'bg-border-strong'}`} />
          <span className="text-fa-t6 font-fa-medium text-text-primary truncate">{text}</span>
        </div>
      )
    },
    {
      title: t('executions.route.col.coord'),
      dataIndex: 'coordinate',
      key: 'coordinate',
      responsive: ['md'],
      render: (text) => (
        <div className="flex items-center gap-2 group">
          <MapPin size={11} className="text-text-tertiary group-hover:text-brand transition-colors shrink-0" />
          <span className="text-fa-t7 font-fa-medium text-text-secondary tabular-nums tracking-tighter">{text}</span>
        </div>
      )
    },
    {
      title: t('executions.route.col.alt'),
      dataIndex: 'altitude',
      key: 'altitude',
      align: 'right',
      width: 100,
      responsive: ['sm'],
      render: (val) => (
        <span className="text-fa-t7 font-fa-semibold text-text-primary tabular-nums">
          {val.toFixed(1)}m
        </span>
      )
    }
  ];

  const statusContent = (
    <div className="w-[320px] p-1 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase tracking-widest">{t('executions.status.panelTitle')}</span>
        <HelpCircle size={14} className="text-text-tertiary" />
      </div>
      <div className="space-y-3">
        <StatusField label={t('executions.status.what')} value={t(`executions.status.${execution.status.toLowerCase()}`)} highlight />
        <StatusField label={t('executions.status.why')} value={execution.status === ExecutionStatus.FAILED ? '信号接入超时' : '任务正常校验'} />
        <StatusField label={t('executions.status.when')} value={execution.startTime.split(' ')[1]} tabular />
      </div>
      <Divider className="my-2 opacity-10" />
      <Button type="primary" size="small" ghost block className="h-8 text-fa-t6 font-fa-semibold uppercase" onClick={() => setSearchParams({ tab: 'live' })}>
        {t('common.openLive')}
      </Button>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-bg-page overflow-hidden">
      <div className="bg-bg-card shrink-0 z-20">
        <div className="max-w-[1440px] mx-auto w-full px-6 pt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4 min-w-0">
              <button 
                onClick={() => navigate('/executions')}
                className="p-2 -ml-2 text-text-tertiary hover:text-brand hover:bg-brand-bg rounded-lg transition-all"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="min-w-0">
                 <div className="flex items-center gap-3">
                   <h1 className="text-fa-t2 font-fa-semibold text-text-primary truncate m-0 leading-none tracking-tight">Execution #{execution.id.slice(-5).toUpperCase()}</h1>
                   <Popover content={statusContent} trigger="hover" placement="bottomLeft" overlayClassName="fa-popover-v2">
                      <div className="cursor-help inline-flex items-center">
                        <FAStatus status={getStatusType(execution.status) as any} label={t(`executions.status.${execution.status.toLowerCase()}`)} />
                      </div>
                   </Popover>
                 </div>
                 <div className="flex items-center gap-2 mt-2">
                    <span className="text-fa-t6 font-fa-medium text-text-secondary">
                      {execution.projectName} • {execution.dockName || execution.deviceName}
                    </span>
                    <Divider type="vertical" className="bg-border-divider h-3" />
                    <span className="text-fa-t7 font-fa-medium text-text-tertiary tabular-nums">启动于 {execution.startTime}</span>
                 </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Button 
                icon={<PlayCircle size={16}/>} 
                onClick={() => navigate(`/execution/${id}`)}
                className="text-fa-t6 font-fa-semibold uppercase tracking-widest h-9 px-4 flex items-center gap-2 border-border hover:border-brand hover:text-brand bg-bg-card text-text-secondary"
              >
                {t('common.replay')}
              </Button>
              <Dropdown 
                menu={{ items: [
                  { key: 'copy', label: '复制 ID', icon: <Copy size={14} />, onClick: () => navigator.clipboard.writeText(execution.id) },
                  { key: 'run', label: '查看运行记录', icon: <ExternalLink size={14} />, disabled: !execution.runId, onClick: () => navigate(`/run/${execution.runId}`) },
                ] }} 
                placement="bottomRight"
              >
                <Button type="primary" size="middle" className="text-fa-t6 font-fa-semibold uppercase tracking-widest h-9 px-5 shadow-md flex items-center gap-2">
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
                  <div className="flex items-center gap-2 px-1">
                    {item.icon}
                    {item.label}
                  </div>
                )
              }))}
            />
          </div>
        </div>
      </div>

      <div className={`flex-1 min-h-0 bg-bg-page ${isLiveMode ? 'overflow-hidden' : 'overflow-y-auto custom-scrollbar'}`}>
        <div className={`max-w-[1440px] mx-auto w-full flex flex-col ${isLiveMode ? 'h-full p-4' : 'p-4 lg:p-6 min-h-full'}`}>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-in fade-in duration-300">
               <div className="lg:col-span-8 space-y-4">
                  <FACard title={t('executions.detail.telemetry')} density="comfort">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-1">
                      <MetricItem label={t('executions.detail.metrics.duration')} value={execution.duration || '—'} tabular />
                      <MetricItem label={t('executions.detail.metrics.alerts')} value={execution.alertsCount.toString()} warning={execution.alertsCount > 0} />
                      <MetricItem label={t('executions.detail.metrics.session')} value={execution.streamSessionId || 'None'} tabular />
                      <MetricItem label={t('executions.detail.metrics.run')} value={execution.runId ? `#${execution.runId}` : '—'} highlight={!!execution.runId} />
                    </div>
                  </FACard>
                  
                  <FACard title={t('executions.detail.routeLogs')} density="comfort" extra={<Clock size={14} className="text-text-tertiary" />}>
                    <div className="mb-4">
                      <p className="text-fa-t6 text-text-secondary">{t('executions.detail.routeLogsDesc')}</p>
                    </div>
                    
                    <FATable 
                      dataSource={execution.routeLogs || []}
                      columns={routeColumns}
                      rowKey="id"
                      density="comfort"
                      pagination={{ pageSize: 10, size: 'small' }}
                      scroll={{ y: 420 }}
                      className="border-divider"
                    />
                  </FACard>
               </div>
               
               <div className="lg:col-span-4 flex flex-col gap-4 min-h-0">
                  <FACard title={t('executions.detail.device')} density="comfort" className="shrink-0">
                    <div className="space-y-3">
                      <InfoRow label={t('executions.label.model')} value="DJI M350 RTK" />
                      <InfoRow label={t('executions.label.serial')} value="1ZAX-992-00" tabular />
                      <InfoRow label={t('executions.label.status')} value="在线 / 已同步" />
                      <InfoRow label={t('executions.label.firmware')} value="v02.04.01" tabular />
                    </div>
                  </FACard>
                  
                  <FACard title={t('executions.detail.timeline')} density="comfort" className="flex-1 overflow-visible">
                    <div className="relative space-y-10 pt-2 pb-6">
                       <div className="absolute left-[7.25px] top-4 bottom-4 w-px bg-border-strong z-0 opacity-50" />
                       <TimelineNode time="14:00" text="任务已进入排队 (Queued)" status="neutral" />
                       <TimelineNode time="14:15" text="设备预检与就绪 (Preparing)" status="info" />
                       <TimelineNode time="14:20" text="任务正式启动执行 (Executing)" status="active" />
                       <TimelineNode time="14:32" text="检测到链路降级 (Degraded)" status="warning" />
                       <TimelineNode time="14:35" text="边缘通信异常中断 (Failed)" status="error" />
                       <TimelineNode time="14:40" text="任务已完整归档 (Completed)" status="success" />
                    </div>
                  </FACard>
               </div>
            </div>
          )}

          {activeTab === 'live' && (
            <div className="flex-1 flex flex-col min-h-0 animate-in fade-in duration-300 h-full overflow-hidden">
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

const MetricItem = ({ label, value, tabular, warning, highlight }: any) => (
  <div className="flex flex-col gap-1">
    <span className="text-fa-t7 font-fa-semibold text-text-tertiary uppercase tracking-tight leading-none">{label}</span>
    <span className={`text-fa-t3 font-fa-semibold ${tabular ? 'tabular-nums font-mono' : ''} ${warning ? 'text-error' : highlight ? 'text-brand' : 'text-text-primary'}`}>
      {value}
    </span>
  </div>
);

const InfoRow = ({ label, value, tabular }: any) => (
  <div className="flex items-center gap-4 h-6">
    <span className="text-fa-t6 font-fa-medium text-text-tertiary w-[88px] shrink-0">{label}</span>
    <span className={`text-fa-t5 font-fa-semibold text-text-secondary truncate ${tabular ? 'tabular-nums font-mono' : ''}`}>{value}</span>
  </div>
);

const TimelineNode = ({ time, text, status }: { time: string, text: string, status: 'neutral' | 'info' | 'active' | 'warning' | 'error' | 'success' }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'active': return 'bg-brand ring-4 ring-brand-bg animate-pulse';
      case 'success': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'error': return 'bg-error shadow-[0_0_8px_rgba(var(--fa-error),0.4)]';
      case 'info': return 'bg-info';
      case 'neutral': 
      default: return 'bg-text-disabled';
    }
  };

  return (
    <div className="relative z-10 pl-10 flex flex-col justify-center min-h-[32px]">
      <div className="absolute left-0 top-1.5 w-[15.5px] flex justify-center">
        <div className={`w-3 h-3 rounded-full border-2 border-bg-card shadow-sm transition-all duration-500 ${getStatusStyles()}`} />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
           <span className={`text-fa-t7 font-fa-semibold font-mono tabular-nums leading-none ${status === 'active' ? 'text-brand' : 'text-text-tertiary'}`}>
             {time}
           </span>
           {status === 'active' && (
             <span className="text-[9px] font-fa-semibold px-1 py-0 bg-brand-bg text-brand rounded uppercase tracking-tighter animate-in fade-in slide-in-from-left-1">LIVE</span>
           )}
        </div>
        <p className={`text-fa-t5 font-fa-semibold m-0 leading-tight transition-colors ${
          status === 'error' ? 'text-error' : status === 'active' ? 'text-text-primary' : 'text-text-secondary'
        }`}>
          {text}
        </p>
      </div>
    </div>
  );
};

export default ExecutionDetailPage;