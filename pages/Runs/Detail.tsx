import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n/index';
import { MOCK_RUNS } from '../../shared/mocks/runs';
import { ArrowLeft, Activity, RefreshCcw, ExternalLink, Play, MoreVertical, Copy, History, AlertTriangle } from 'lucide-react';
import { Button, Divider, Dropdown, Popconfirm, message, Tooltip } from 'antd';
import FAStatus from '../../ui/FAStatus';
import FACard from '../../ui/FACard';
import RunTimeline from '../../features/runs/components/RunTimeline';
import RunInspector from '../../features/runs/components/RunInspector';
import ArtifactsPanel from '../../features/runs/components/ArtifactsPanel';

const RunDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useI18n();

  const run = useMemo(() => 
    MOCK_RUNS.find(r => r.id === id) || MOCK_RUNS[0]
  , [id]);

  const liveAvailable = !!run.streamSessionId;

  const handleCopyId = () => {
    navigator.clipboard.writeText(run.id);
    message.success({ content: '运行 ID 已复制', key: 'copy-id' });
  };

  const handleRerun = () => {
    message.loading({ content: '正在重新下发逻辑策略...', key: 'rerun' });
    setTimeout(() => {
      message.success({ content: '逻辑执行已重新启动，证据链同步中', key: 'rerun' });
    }, 1500);
  };

  const moreItems = [
    {
      key: 'copy',
      label: '复制运行链接',
      icon: <Copy size={14} />,
      onClick: () => {
        navigator.clipboard.writeText(window.location.href);
        message.success('链接已复制');
      }
    },
    {
      key: 'audit',
      label: '查看完整审计日志',
      icon: <History size={14} />,
    },
    { type: 'divider' as const },
    {
      key: 'rerun',
      danger: true,
      label: (
        <Popconfirm
          title={t('runs.action.rerun')}
          description={t('runs.action.rerunConfirm')}
          onConfirm={handleRerun}
          okText={t('common.retry')}
          cancelText={t('common.cancel')}
          icon={<AlertTriangle size={16} className="text-red-500" />}
        >
          <div className="w-full">{t('runs.action.rerun')}</div>
        </Popconfirm>
      ),
      icon: <RefreshCcw size={14} />
    }
  ];

  return (
    <div className="min-h-full bg-[#F8FAFC]">
      <div className="px-6 py-8 max-w-[1440px] mx-auto w-full animate-in fade-in duration-500">
        
        {/* 1. Header Section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-5 min-w-0">
              <button 
                onClick={() => navigate('/runs')} 
                className="p-2.5 mt-1 text-gray-400 hover:text-brand hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-gray-100 transition-all"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-2.5">
                   <h1 className="fa-t2 text-gray-900 leading-none m-0 truncate">Run Evidence Trace</h1>
                   
                   {/* Optimized Neutral ID Chip */}
                   <Tooltip title="点击复制 ID">
                      <div 
                        onClick={handleCopyId}
                        className="inline-flex items-center gap-2 px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-md cursor-pointer transition-all hover:border-brand/30 hover:bg-white group/idchip"
                      >
                        <span className="fa-t7-mono text-[11px] text-gray-500 font-bold uppercase tracking-tighter tabular-nums">
                          #{run.id.toUpperCase().slice(-8)}
                        </span>
                        <Copy size={12} className="text-brand opacity-0 group-hover/idchip:opacity-100 transition-opacity" />
                      </div>
                   </Tooltip>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                   <FAStatus 
                    status={run.status === 'completed' ? 'success' : run.status === 'failed' ? 'error' : 'running'} 
                    label={t(`runs.state.${run.status}`)} 
                   />
                   <Divider type="vertical" className="bg-gray-200 h-3" />
                   <span className="fa-t6 font-semibold text-gray-400 truncate">Project: {run.projectName}</span>
                   <Divider type="vertical" className="bg-gray-200 h-3" />
                   <span className="fa-t7-mono text-[11px] text-gray-400 font-bold tabular-nums uppercase tracking-tight">
                     {t('runs.detail.triggeredAt', { time: run.startedAt })}
                   </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
               <Tooltip title={!liveAvailable ? "暂无活跃直播会话" : ""}>
                 <Button 
                  type="primary" 
                  icon={<Play size={14} fill="currentColor" />} 
                  disabled={!liveAvailable}
                  onClick={() => navigate(`/execution/${run.executionId}?tab=live`)}
                  className="fa-t6 font-bold uppercase tracking-widest h-10 px-6 flex items-center gap-2 shadow-lg"
                 >
                   {t('runs.detail.openLive')}
                 </Button>
               </Tooltip>

               <Button 
                icon={<Activity size={16}/>} 
                onClick={() => run.executionId && navigate(`/execution/${run.executionId}`)}
                className="fa-t6 font-bold uppercase tracking-widest h-10 px-5 flex items-center gap-2 border-gray-200 hover:border-brand hover:text-brand bg-white"
               >
                 {t('runs.detail.openExecution')} <ExternalLink size={13} className="opacity-40" />
               </Button>
               
               <Dropdown menu={{ items: moreItems }} placement="bottomRight" trigger={['click']}>
                 <Button icon={<MoreVertical size={18} />} className="h-10 w-10 flex items-center justify-center border-gray-200 bg-white" />
               </Dropdown>
            </div>
          </div>
        </div>

        {/* 2. Content Layout - Combined Evidence Chain Card */}
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 lg:col-span-8 space-y-8 min-w-0">
             
             {/* Unified Evidence Chain Module */}
             <FACard title={t('runs.detail.timeline')} density="comfort" className="bg-white border-gray-100 shadow-sm overflow-visible">
                <RunTimeline run={run} />
             </FACard>

             {/* Artifacts Module */}
             <ArtifactsPanel run={run} />
          </div>

          {/* Metadata Sidebar */}
          <aside className="col-span-12 lg:col-span-4 shrink-0">
             <RunInspector run={run} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default RunDetailPage;