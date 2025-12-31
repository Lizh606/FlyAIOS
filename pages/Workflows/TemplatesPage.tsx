
import React, { useState, useMemo } from 'react';
import { Search, Plus, RefreshCcw } from 'lucide-react';
import { Input, Button, Tabs } from 'antd';
import { useI18n } from '../../i18n';
import { MOCK_TEMPLATES } from '../../shared/mocks/templates';
import FAPageHeader from '../../ui/FAPageHeader';
import TemplateCard from '../../features/workflows/components/TemplateCard';
import TemplateDetailDrawer from '../../features/workflows/components/TemplateDetailDrawer';
import FAEmptyState from '../../ui/FAEmptyState';
import { useNavigate } from 'react-router-dom';

const TemplatesPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  const filteredTemplates = useMemo(() => {
    return MOCK_TEMPLATES.filter(tpl => {
      const matchesSearch = tpl.name.toLowerCase().includes(searchText.toLowerCase()) || 
                            tpl.description.toLowerCase().includes(searchText.toLowerCase());
      const matchesTab = activeTab === 'All' || tpl.industry === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchText, activeTab]);

  const selectedTemplate = useMemo(() => 
    MOCK_TEMPLATES.find(t => t.id === selectedTemplateId) || null
  , [selectedTemplateId]);

  return (
    <div className="px-6 py-8 max-w-[1440px] mx-auto w-full animate-in fade-in duration-500">
      <FAPageHeader 
        title={t('workflows.title')}
        subtitle={t('workflows.subtitle')}
      />

      {/* 1. Standard Toolbar Layout (v0.8) */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 border-b border-[var(--fa-border-default)]">
        <div className="fa-tabs-v2 shrink-0">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              { key: 'All', label: t('workflows.industry.all') },
              { key: 'Powerline', label: t('workflows.industry.powerline') },
              { key: 'Solar', label: t('workflows.industry.solar') },
              { key: 'Security', label: t('workflows.industry.security') },
            ]}
          />
        </div>
        
        <div className="flex items-center gap-3 pb-3 w-full lg:w-auto">
          <Input 
            prefix={<Search size={14} className="text-gray-400" />}
            placeholder={t('workflows.searchPlaceholder')}
            className="flex-1 md:w-72 lg:w-64 h-9 shadow-sm"
            allowClear
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <Button 
            type="primary" 
            icon={<Plus size={16} />} 
            className="h-9 font-bold uppercase tracking-widest shrink-0 shadow-md flex items-center"
          >
            {t('workflows.custom')}
          </Button>
        </div>
      </div>

      {/* 2. Grid: v0.8 Spec - Desktop (>=1024) 3 columns, Gap 16px (gap-4) */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map(tpl => (
            <TemplateCard 
              key={tpl.id}
              template={tpl}
              onClick={() => setSelectedTemplateId(tpl.id)}
            />
          ))}
        </div>
      ) : (
        <FAEmptyState 
          icon={RefreshCcw}
          title={t('workflows.empty')}
          description="尝试调整行业分类或搜索关键词，或者创建一个全新的自定义巡检工作流。"
          primaryAction={{
            label: "重置过滤器",
            onClick: () => { setSearchText(''); setActiveTab('All'); },
            icon: <RefreshCcw size={16} />
          }}
        />
      )}

      {/* 3. Detail Overlay (v0.8 Drawer Pattern) */}
      <TemplateDetailDrawer 
        template={selectedTemplate} 
        open={!!selectedTemplateId} 
        onClose={() => setSelectedTemplateId(null)} 
      />

      <style>{`
        .fa-tabs-v2 .ant-tabs-nav { margin-bottom: 0 !important; }
        .fa-tabs-v2 .ant-tabs-nav::before { border-bottom: none !important; }
        .fa-tabs-v2 .ant-tabs-tab { padding: 12px 0 !important; margin-right: 24px !important; }
        .fa-tabs-v2 .ant-tabs-tab-btn { font-size: 13px !important; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600 !important; }
        .fa-tabs-v2 .ant-tabs-ink-bar { bottom: 0 !important; }
      `}</style>
    </div>
  );
};

export default TemplatesPage;
