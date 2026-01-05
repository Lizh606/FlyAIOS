
import React from 'react';
import { Calendar, FileText, Box, ChevronRight } from 'lucide-react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { useI18n } from '../i18n';
import { ExecutionStatus } from '../shared/types';
import FATable from '../ui/FATable';
import FAStatus from '../ui/FAStatus';

const MOCK_EXECUTIONS = [
  { id: 'ex-001', missionName: 'Alpha Grid Survey', date: '2025-12-19 14:20', duration: '12m 40s', status: ExecutionStatus.COMPLETED, mediaCount: 128, distance: '1.2km', thumbnail: 'https://picsum.photos/seed/ex1/200/200' },
  { id: 'ex-002', missionName: 'Facade Inspection', date: '2025-12-18 09:15', duration: '08m 15s', status: ExecutionStatus.COMPLETED, mediaCount: 94, distance: '0.8km', thumbnail: 'https://picsum.photos/seed/ex2/200/200' },
  { id: 'ex-003', missionName: 'Alpha Grid Survey', date: '2025-12-17 16:30', duration: '05m 10s', status: ExecutionStatus.FAILED, mediaCount: 22, distance: '0.4km', thumbnail: 'https://picsum.photos/seed/ex3/200/200' },
];

const ExecutionsListPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useI18n();

  const columns: ColumnsType<any> = [
    {
      title: t('history.col.mission'),
      dataIndex: 'missionName',
      key: 'mission',
      width: 320,
      render: (text: string, record: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-bg-page overflow-hidden shrink-0 border border-border flex items-center justify-center shadow-sm">
            {record.thumbnail ? <img src={record.thumbnail} alt="" className="w-full h-full object-cover" /> : <FileText size={18} className="text-text-disabled" />}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-fa-t5 font-fa-semibold text-text-primary truncate group-hover:text-brand transition-colors leading-tight">{text}</span>
            <span className="text-fa-t7 font-fa-semibold font-mono text-text-tertiary uppercase tracking-tighter text-[11px] mt-0.5">#{record.id}</span>
          </div>
        </div>
      )
    },
    {
      title: t('history.col.date'),
      dataIndex: 'date',
      key: 'date',
      width: 200,
      render: (text: string) => (
        <div className="flex items-center gap-2 text-text-secondary">
          <Calendar size={13} className="text-text-disabled" />
          <span className="text-fa-t5 tabular-nums font-fa-medium">{text}</span>
        </div>
      )
    },
    {
      title: t('history.col.status'),
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status: string) => (
        <FAStatus status={status.toLowerCase() === 'completed' ? 'success' : 'failed'} label={status} />
      )
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-bg-page overflow-hidden">
      {/* Sub Header for breadcrumbs */}
      <header className="bg-bg-card border-b border-border px-6 h-12 flex items-center justify-between shrink-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-1.5 text-text-tertiary hover:text-brand transition-colors">
              <Box size={14} />
              <span className="text-fa-t6 font-fa-semibold uppercase tracking-[0.05em] leading-none pt-0.5">{t('nav.projects')}</span>
            </Link>
            <ChevronRight size={10} className="text-text-disabled/40" />
            <h1 className="text-fa-t6 font-fa-semibold text-text-primary uppercase tracking-tight m-0 leading-none pt-0.5">{t('history.title')}</h1>
          </nav>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-8 max-w-[1440px] mx-auto w-full custom-scrollbar animate-in fade-in duration-500">
        <div className="mb-6">
          <h2 className="text-fa-t2 font-fa-semibold text-text-primary m-0 tracking-tight leading-none">{t('history.title')}</h2>
          <p className="text-fa-t5 text-text-secondary mt-2">追溯本工作空间产生的所有任务执行结果、证据链及报告。</p>
        </div>

        <FATable 
          dataSource={MOCK_EXECUTIONS}
          columns={columns}
          rowKey="id"
          density="comfort"
          onRow={(record: any) => ({
            onClick: () => navigate(`/execution/${record.id}`),
            className: 'cursor-pointer group'
          })}
        />
      </div>
    </div>
  );
};

export default ExecutionsListPage;
