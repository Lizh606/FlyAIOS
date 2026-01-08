import React, { useEffect, useState } from 'react';
import { Plus, LayoutGrid, List as ListIcon, Filter, Clock, MoreVertical, PlayCircle, Search, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Tooltip, Input, Tabs } from 'antd';
import { useI18n } from '../../i18n';
import FAStatus from '../../ui/FAStatus';
import FACard from '../../ui/FACard';
import FATag from '../../ui/FATag';
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
    <div className="p-6 flex flex-col items-center justify-center text-text-tertiary animate-pulse gap-4 bg-bg-page min-h-full">
      <div className="w-12 h-12 rounded-full border-4 border-border border-t-brand animate-spin"></div>
      <span className="text-fa-t5 font-fa-semibold uppercase tracking-widest">Loading Workspace...</span>
    </div>
  );

  return (
    <div className="px-6 py-8 max-w-[1440px] mx-auto w-full animate-in fade-in duration-500 bg-bg-page min-h-full">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-fa-t2 font-fa-semibold text-text-primary mb-1 tracking-tight leading-none">{t('projects.title')}</h1>
          <p className="text-fa-t5 text-text-secondary mt-2">{t('projects.subtitle')}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-bg-card border border-border rounded-control p-1 shadow-sm h-10">
            <button 
              onClick={() => setViewMode('grid')} 
              className={`w-8 h-8 flex items-center justify-center rounded-control transition-all border-none bg-transparent cursor-pointer ${viewMode === 'grid' ? 'bg-brand-bg text-brand shadow-sm' : 'text-text-tertiary hover:text-text-primary'}`}
            >
              <LayoutGrid size={14} />
            </button>
            <button 
              onClick={() => setViewMode('list')} 
              className={`w-8 h-8 flex items-center justify-center rounded-control transition-all border-none bg-transparent cursor-pointer ${viewMode === 'list' ? 'bg-brand-bg text-brand shadow-sm' : 'text-text-tertiary hover:text-text-primary'}`}
            >
              <ListIcon size={14} />
            </button>
          </div>
          <Button 
            type="primary" 
            icon={<Plus size={16} />} 
            className="h-10 flex items-center px-5 font-fa-semibold uppercase tracking-widest shadow-card"
          >
            {t('projects.newProject')}
          </Button>
        </div>
      </div>

      {/* 2. Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-b border-border">
        <div className="fa-tabs-v2 shrink-0">
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
        <div className="flex items-center gap-3 pb-3 w-full sm:w-auto">
          <Input 
            prefix={<Search size={14} className="text-text-tertiary" />}
            placeholder={t('common.search')}
            className="flex-1 sm:w-72 h-9 shadow-sm rounded-control"
            allowClear
          />
          <Button 
            icon={<Filter size={14} />} 
            className="h-9 flex items-center text-text-secondary font-fa-medium border-border"
          >
            {t('common.filter')}
          </Button>
        </div>
      </div>

      {/* 3. Data View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {projects.map((p) => (
            <FACard 
              key={p.id} 
              hoverable
              onClick={() => handleProjectClick(p.id)}
              className="group flex flex-col h-full bg-bg-card border-border shadow-card overflow-hidden"
              density="comfort"
            >
              <div className="aspect-video bg-bg-page relative overflow-hidden mb-4 rounded-control border border-border shadow-inner">
                {p.thumb ? (
                  <img src={p.thumb} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-disabled/20">
                    <LayoutGrid size={48} strokeWidth={1} />
                  </div>
                )}
                <div className="absolute top-2.5 left-2.5">
                  <FAStatus status={p.status as any} label={t(`status.${p.status}`)} className="shadow-overlay border-border-strong/10 bg-bg-card/90 backdrop-blur-md" />
                </div>
              </div>
              
              <div className="flex-1 flex flex-col min-h-[110px]">
                <h3 className="text-fa-t4 font-fa-semibold text-text-primary group-hover:text-brand transition-colors line-clamp-2 leading-tight m-0 mb-2">
                  {p.name}
                </h3>

                <div className="flex flex-wrap gap-1.5 mb-auto">
                  {p.tags?.map((tag: string) => (
                    <FATag key={tag} className="bg-bg-page/50 border-border/60">{tag}</FATag>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-divider flex items-center justify-between">
                   <div className="flex items-center gap-3 min-w-0">
                      <div className="flex items-center gap-1.5 text-text-tertiary min-w-0">
                         <Clock size={12} className="shrink-0 opacity-60" />
                         <span className="text-fa-t6 font-fa-regular tabular-nums truncate tracking-tight">{p.date}</span>
                      </div>
                      <div className="w-px h-2.5 bg-divider shrink-0"></div>
                      <div className="flex items-center gap-1.2 text-text-tertiary shrink-0">
                         <Eye size={12} className="mr-1 opacity-60" />
                         <span className="text-fa-t6 font-fa-regular tabular-nums tracking-tight">{p.missions}</span>
                      </div>
                   </div>

                   <div className="flex items-center gap-0.5 shrink-0">
                      <Tooltip title={t('projects.viewPlayback')}>
                        <button 
                         onClick={(e) => handlePlaybackClick(e, p.id)} 
                         className="w-8 h-8 flex items-center justify-center text-brand hover:bg-brand-bg rounded-control transition-all border-none bg-transparent cursor-pointer p-0"
                        >
                          <PlayCircle size={18} />
                        </button>
                      </Tooltip>
                      <Tooltip title={t('common.more')}>
                        <button className="w-8 h-8 flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-action-hover rounded-control transition-colors border-none bg-transparent cursor-pointer">
                          <MoreVertical size={18} />
                        </button>
                      </Tooltip>
                   </div>
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
              className="group bg-bg-card border border-border rounded-card p-3 flex items-center gap-4 hover:border-brand/40 hover:shadow-card transition-all cursor-pointer"
            >
              <div className="w-16 h-10 bg-bg-page rounded-control overflow-hidden shrink-0 border border-border">
                {p.thumb ? <img src={p.thumb} className="w-full h-full object-cover transition-opacity group-hover:opacity-90" /> : <div className="w-full h-full flex items-center justify-center text-text-disabled/20"><LayoutGrid size={16}/></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="text-fa-t5 font-fa-semibold text-text-primary truncate group-hover:text-brand transition-colors mb-0.5">{p.name}</h3>
                  {p.tags?.slice(0, 1).map((tag: string) => (
                    <span key={tag} className="text-[10px] font-fa-semibold text-text-tertiary uppercase tracking-tighter opacity-60"># {tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-fa-t6 text-text-tertiary flex items-center gap-1.5 font-fa-regular tabular-nums"><Clock size={11} className="shrink-0" /> {p.date}</span>
                  <div className="w-px h-2.5 bg-divider opacity-40"></div>
                  <span className="text-fa-t6 font-fa-regular text-text-tertiary tabular-nums uppercase tracking-tight flex items-center gap-1.5"><Eye size={11} className="shrink-0" /> {p.missions} Missions</span>
                </div>
              </div>
              <div className="shrink-0 w-28 flex justify-center">
                <FAStatus status={p.status as any} label={t(`status.${p.status}`)} />
              </div>
              <div className="flex items-center gap-1 shrink-0 border-l border-divider/40 pl-3 ml-1">
                <Tooltip title={t('projects.viewPlayback')}>
                  <button onClick={(e) => handlePlaybackClick(e, p.id)} className="w-8 h-8 flex items-center justify-center text-brand hover:bg-brand-bg rounded-control transition-colors border-none bg-transparent cursor-pointer">
                    <PlayCircle size={18} />
                  </button>
                </Tooltip>
                <Tooltip title={t('common.more')}>
                  <button className="w-8 h-8 flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-action-hover rounded-control transition-colors border-none bg-transparent cursor-pointer">
                    <MoreVertical size={18} />
                  </button>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;