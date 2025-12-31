import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n/index';
import FAPageHeader from '../../ui/FAPageHeader';
import RunsTable from '../../features/runs/components/RunsTable';
import { MOCK_RUNS } from '../../shared/mocks/runs';
import { Select, Input, Button, Tooltip } from 'antd';
import { Search, RefreshCcw, History, ArrowRight } from 'lucide-react';
import FAStatus from '../../ui/FAStatus';
import FACard from '../../ui/FACard';
import ArtifactSummary from '../../features/runs/components/ArtifactSummary';

const RunsListPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [filters, setFilters] = useState({
    workflow: 'All',
    status: 'All',
    search: ''
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredData = useMemo(() => {
    return MOCK_RUNS.filter(r => {
      const matchWorkflow = filters.workflow === 'All' || r.workflowId === filters.workflow;
      const matchStatus = filters.status === 'All' || r.status === filters.status;
      const matchSearch = r.id.toLowerCase().includes(filters.search.toLowerCase()) || 
                          r.projectName.toLowerCase().includes(filters.search.toLowerCase());
      return matchWorkflow && matchStatus && matchSearch;
    });
  }, [filters]);

  const renderMobileCards = () => (
    <div className="space-y-4">
      {filteredData.map(run => (
        <FACard 
          key={run.id}
          density="compact"
          onClick={() => navigate(`/run/${run.id}`)}
          className="border-gray-100 shadow-sm active:scale-[0.98] transition-all"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="min-w-0 pr-2">
               <span className="fa-t7-mono text-gray-400 font-bold uppercase block mb-1">#{run.id.slice(-8)}</span>
               <h3 className="fa-t5-strong text-gray-900 truncate leading-tight">{run.projectName}</h3>
            </div>
            <FAStatus 
              status={run.status === 'completed' ? 'success' : run.status === 'failed' ? 'error' : 'running'} 
              label={t(`runs.state.${run.status}`)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
               <span className="fa-t7-mono text-[9px] text-gray-400 font-bold uppercase tracking-widest">{t('runs.col.started')}</span>
               <span className="fa-t6 text-gray-600 font-medium tabular-nums">{run.startedAt.split(' ')[1]}</span>
            </div>
            <div className="flex flex-col">
               <span className="fa-t7-mono text-[9px] text-gray-400 font-bold uppercase tracking-widest">{t('runs.col.duration')}</span>
               <span className="fa-t6 text-gray-600 font-medium tabular-nums">{run.duration}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
             <ArtifactSummary artifacts={run.artifacts} hasReceipt={!!run.receipt} />
             <ArrowRight size={14} className="text-gray-300" />
          </div>
        </FACard>
      ))}
    </div>
  );

  return (
    <div className="px-6 py-8 max-w-[1440px] mx-auto w-full animate-in fade-in duration-500">
      <FAPageHeader 
        title={t('runs.title')}
        subtitle={t('runs.subtitle')}
      />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <Input 
            prefix={<Search size={14} className="text-gray-400" />}
            placeholder={t('runs.filter.searchPlaceholder')}
            className="w-full sm:w-[320px] h-9 shadow-sm rounded-lg"
            allowClear
            value={filters.search}
            onChange={e => setFilters({...filters, search: e.target.value})}
          />
          
          <div className="flex items-center gap-2">
            <Select 
              value={filters.workflow} 
              onChange={v => setFilters({...filters, workflow: v})}
              className="h-9 min-w-[160px]"
              placeholder={t('runs.filter.workflow')}
              options={[
                { label: t('runs.filter.allWorkflow'), value: 'All' },
                { label: t('runs.mock.wf.powerline'), value: 'wf-ng-ins-01' },
                { label: t('runs.mock.wf.survey'), value: 'wf-generic' },
              ]}
            />
            <Select 
              value={filters.status} 
              onChange={v => setFilters({...filters, status: v})}
              className="h-9 min-w-[120px]"
              placeholder={t('runs.filter.status')}
              options={[
                { label: t('runs.filter.allStatus'), value: 'All' },
                { label: t('runs.state.completed'), value: 'completed' },
                { label: t('runs.state.failed'), value: 'failed' },
                { label: t('runs.state.running'), value: 'running' },
              ]}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
           <Tooltip title={t('runs.tool.refresh')}>
             <Button 
                icon={<RefreshCcw size={14}/>} 
                className="h-9 w-9 p-0 flex items-center justify-center text-gray-400 hover:text-brand border-gray-200 transition-colors" 
             />
           </Tooltip>
           <Button 
              icon={<History size={14}/>} 
              className="h-9 px-4 fa-t6 font-bold uppercase tracking-widest text-gray-500 border-gray-200 hover:text-gray-900"
            >
             {t('runs.tool.audit')}
           </Button>
        </div>
      </div>

      {isMobile ? renderMobileCards() : (
        <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
          <RunsTable 
            data={filteredData} 
            density="comfort"
            onRowClick={(id) => navigate(`/run/${id}`)}
          />
        </div>
      )}
    </div>
  );
};

export default RunsListPage;