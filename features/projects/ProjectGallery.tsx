
import React, { useEffect, useState } from 'react';
import { Plus, LayoutGrid, List as ListIcon, Filter, Clock, MoreVertical, PlayCircle, Search, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Tooltip, Input, Tabs } from 'antd';
import { useI18n } from '../../i18n';
import FAStatus from '../../ui/FAStatus';
import FACard from '../../ui/FACard';
import { ProjectService } from '../../services/api';

const ProjectGallery: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('recents');

  useEffect(() => {
    ProjectService.getProjects().then(data => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const handleProjectClick = (id: string) => {
    navigate(`/project/${id}/missions`);
  };

  const handlePlaybackClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigate(`/execution/${id}`);
  };

  if (loading) return (
    <div className="p-12 flex flex-col items-center justify-center text-[var(--fa-text-tertiary)] animate-pulse gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-brand animate-spin"></div>
      <span className="fa-t5">Loading Workspace...</span>
    </div>
  );

  return (
    <div className="px-6 py-8 max-w-[1440px] mx-auto w-full animate-in fade-in duration-500">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="fa-t2 text-[var(--fa-text-primary)] mb-1">{t('projects.title')}</h1>
          <p className="fa-t5 text-[var(--fa-text-secondary)]">{t('projects.subtitle')}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-[var(--fa-border-default)] rounded-lg p-1 shadow-sm h-9">
            <button 
              onClick={() => setViewMode('grid')} 
              className={`w-7 h-7 flex items-center justify-center rounded-md transition-all ${viewMode === 'grid' ? 'bg-gray-100 text-[var(--fa-brand-primary)]' : 'text-[var(--fa-text-tertiary)] hover:text-[var(--fa-text-primary)]'}`}
            >
              <LayoutGrid size={14} />
            </button>
            <button 
              onClick={() => setViewMode('list')} 
              className={`w-7 h-7 flex items-center justify-center rounded-md transition-all ${viewMode === 'list' ? 'bg-gray-100 text-[var(--fa-brand-primary)]' : 'text-[var(--fa-text-tertiary)] hover:text-[var(--fa-text-primary)]'}`}
            >
              <ListIcon size={14} />
            </button>
          </div>
          <Button type="primary" icon={<Plus size={16} />} className="h-9 flex items-center uppercase font-bold tracking-wider">{t('projects.newProject')}</Button>
        </div>
      </div>

      {/* 2. Tabs & Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[var(--fa-border-default)]">
        <div className="fa-tabs-v2">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              { key: 'recents', label: t('projects.tabRecents') },
              { key: 'my', label: t('projects.tabMy') },
              { key: 'org', label: t('projects.tabOrg') },
            ]}
          />
        </div>
        <div className="flex items-center gap-3 mb-3 sm:mb-0">
          <Input 
            prefix={<Search size={14} className="text-[var(--fa-text-tertiary)]" />}
            placeholder={t('common.search')}
            className="w-full sm:w-64 h-9"
          />
          <Button icon={<Filter size={14} />} className="h-9 flex items-center text-[var(--fa-text-secondary)]">
            {t('common.filter')}
          </Button>
        </div>
      </div>

      {/* 3. Grid / List View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((p) => (
            <FACard 
              key={p.id} 
              hoverable
              onClick={() => handleProjectClick(p.id)}
              className="group flex flex-col h-full"
            >
              <div className="aspect-video bg-gray-100 relative overflow-hidden -mx-4 -mt-4 mb-4">
                {p.thumb ? (
                  <img src={p.thumb} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-200">
                    <LayoutGrid size={32} />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <FAStatus status={p.status as any} label={t(`status.${p.status}`)} />
                </div>
              </div>
              
              <div className="flex-1 flex flex-col">
                <h3 className="fa-t4 text-[var(--fa-text-primary)] mb-2 group-hover:text-[var(--fa-brand-primary)] transition-colors line-clamp-2 min-h-[48px]">
                  {p.name}
                </h3>
                <div className="flex items-center gap-1.5 text-[var(--fa-text-tertiary)] mb-4">
                  <Clock size={12} />
                  <span className="fa-t6">{t('projects.lastCaptured')}: {p.date}</span>
                </div>
                
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <Tooltip title={t('projects.viewPlayback')}>
                       <button 
                        onClick={(e) => handlePlaybackClick(e, p.id)} 
                        className="text-[var(--fa-brand-primary)] hover:scale-110 transition-transform flex items-center"
                       >
                         <PlayCircle size={20} />
                       </button>
                     </Tooltip>
                     <div className="flex items-center gap-1 text-[var(--fa-text-tertiary)]">
                       <Eye size={12} />
                       <span className="fa-t6 font-semibold">{p.missions}</span>
                     </div>
                  </div>
                  <button className="text-[var(--fa-text-tertiary)] hover:text-[var(--fa-text-primary)] p-1 rounded-md hover:bg-gray-50">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            </FACard>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map((p) => (
            <div 
              key={p.id}
              onClick={() => handleProjectClick(p.id)}
              className="group bg-[var(--fa-bg-card)] border border-[var(--fa-border-default)] rounded-lg p-3 flex items-center gap-4 hover:border-[var(--fa-brand-primary)] hover:shadow-md transition-all cursor-pointer"
            >
              <div className="w-16 h-10 bg-gray-50 rounded-md overflow-hidden shrink-0 border border-gray-100">
                {p.thumb ? <img src={p.thumb} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-200"><LayoutGrid size={16}/></div>}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="fa-t5-strong text-[var(--fa-text-primary)] truncate group-hover:text-[var(--fa-brand-primary)] transition-colors">{p.name}</h3>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="fa-t6 text-[var(--fa-text-tertiary)] flex items-center gap-1"><Clock size={11} /> {p.date}</span>
                  <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                  <span className="fa-t6 text-[var(--fa-text-secondary)]">{p.missions} Missions</span>
                </div>
              </div>
              <div className="shrink-0 w-24 flex justify-center">
                <FAStatus status={p.status as any} label={t(`status.${p.status}`)} />
              </div>
              <div className="flex items-center gap-2 shrink-0 border-l border-gray-100 pl-4">
                <Tooltip title={t('projects.viewPlayback')}>
                  <button onClick={(e) => handlePlaybackClick(e, p.id)} className="p-2 text-[var(--fa-brand-primary)] hover:bg-blue-50 rounded-lg transition-colors">
                    <PlayCircle size={18} />
                  </button>
                </Tooltip>
                <button className="p-2 text-[var(--fa-text-tertiary)] hover:text-[var(--fa-text-primary)]">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .fa-tabs-v2 .ant-tabs-nav { margin-bottom: 0 !important; }
        .fa-tabs-v2 .ant-tabs-nav::before { border-bottom: none !important; }
        .fa-tabs-v2 .ant-tabs-tab { padding: 12px 0 !important; margin: 0 24px 0 0 !important; }
        .fa-tabs-v2 .ant-tabs-tab-btn { font-size: 14px !important; font-weight: 500 !important; }
      `}</style>
    </div>
  );
};

export default ProjectGallery;
