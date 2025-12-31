
import React from 'react';
import { Calendar, FileText, Box, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { useI18n } from '../i18n';
import { ExecutionStatus } from '../shared/types';
import FATable from '../ui/FATable';

const MOCK_EXECUTIONS = [
  { id: 'ex-001', missionName: 'Alpha Grid Survey', date: '2025-12-19 14:20', duration: '12m 40s', status: ExecutionStatus.COMPLETED, mediaCount: 128, distance: '1.2km', thumbnail: 'https://picsum.photos/seed/ex1/200/200' },
  { id: 'ex-002', missionName: 'Facade Inspection', date: '2025-12-18 09:15', duration: '08m 15s', status: ExecutionStatus.COMPLETED, mediaCount: 94, distance: '0.8km', thumbnail: 'https://picsum.photos/seed/ex2/200/200' },
  { id: 'ex-003', missionName: 'Alpha Grid Survey', date: '2025-12-17 16:30', duration: '05m 10s', status: ExecutionStatus.FAILED, mediaCount: 22, distance: '0.4km', thumbnail: 'https://picsum.photos/seed/ex3/200/200' },
];

const ExecutionsListPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();

  const columns: ColumnsType<any> = [
    {
      title: t('history.col.mission'),
      dataIndex: 'missionName',
      key: 'mission',
      width: 320,
      render: (text: string, record: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200 flex items-center justify-center">
            {record.thumbnail ? <img src={record.thumbnail} alt="" className="w-full h-full object-cover" /> : <FileText size={18} className="text-gray-400" />}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="fa-t5-strong text-gray-900 truncate group-hover:text-brand transition-colors">{text}</span>
            <span className="fa-t7-mono text-gray-400 uppercase tracking-tighter text-[11px]">#{record.id}</span>
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
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={13} className="text-gray-400" />
          <span className="fa-t5">{text}</span>
        </div>
      )
    },
    {
      title: t('history.col.status'),
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status: string) => (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border fa-t6 font-bold tracking-widest uppercase ${
          status === ExecutionStatus.COMPLETED ? 'bg-green-50 border-green-100 text-green-600' : 'bg-red-50 border-red-100 text-red-600'
        }`}>
          {status}
        </div>
      )
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F9FAFB] overflow-hidden">
      <header className="bg-white border-b border-[#E5E7EB] px-6 h-12 flex items-center justify-between shrink-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-1.5 text-gray-400 hover:text-brand transition-colors">
              <Box size={14} />
              <span className="fa-t6 font-bold uppercase tracking-[0.05em]">{t('nav.projects')}</span>
            </Link>
            <ChevronRight size={10} className="text-gray-300" />
            <h1 className="fa-t6 font-bold text-gray-900 uppercase tracking-tight">{t('history.title')}</h1>
          </nav>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-8 max-w-[1440px] mx-auto w-full custom-scrollbar">
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
