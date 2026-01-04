
import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, RefreshCcw, Filter } from 'lucide-react';
import { Input, Tabs, Switch, Button } from 'antd';
import { useI18n } from '../i18n';
import { MOCK_APPS } from '../shared/mocks/apps';
import AppCard from '../features/marketplace/components/AppCard';
import AppDetailDrawer from '../features/marketplace/components/AppDetailDrawer';
import FAEmptyState from '../ui/FAEmptyState';
import FAPageHeader from '../ui/FAPageHeader';

const MarketplacePage: React.FC = () => {
  const { t } = useI18n();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [showInstalledOnly, setShowInstalledOnly] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const filteredApps = useMemo(() => {
    return MOCK_APPS.filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(searchText.toLowerCase()) || 
                            app.description.toLowerCase().includes(searchText.toLowerCase());
      const matchesTab = activeTab === 'All' || app.industry === activeTab;
      const matchesInstalled = !showInstalledOnly || !!app.installedVersion;
      return matchesSearch && matchesTab && matchesInstalled;
    });
  }, [searchText, activeTab, showInstalledOnly]);

  const selectedApp = useMemo(() => 
    MOCK_APPS.find(a => a.id === selectedAppId) || null
  , [selectedAppId]);

  return (
    <div className="px-6 py-8 max-w-[1440px] mx-auto w-full animate-in fade-in duration-500 bg-bg-page min-h-full">
      <FAPageHeader 
        title={t('marketplace.title')}
        subtitle={t('marketplace.subtitle')}
      />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-border">
        <div className="fa-tabs-v2 shrink-0">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              { key: 'All', label: t('marketplace.industry.all') },
              { key: 'Powerline', label: t('marketplace.industry.powerline') },
              { key: 'Solar', label: t('marketplace.industry.solar') },
              { key: 'Security', label: t('marketplace.industry.security') },
              { key: 'Generic', label: t('marketplace.industry.generic') },
            ]}
          />
        </div>
        
        <div className="flex items-center gap-4 pb-3 w-full md:w-auto">
          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-bg-card border border-border rounded-control shadow-sm shrink-0">
            <span className="text-fa-t6 text-text-tertiary uppercase tracking-widest font-fa-semibold">
              {t('marketplace.filter.installed')}
            </span>
            <Switch size="small" checked={showInstalledOnly} onChange={setShowInstalledOnly} />
          </div>
          
          <Input 
            prefix={<Search size={14} className="text-text-tertiary" />}
            placeholder={t('marketplace.searchPlaceholder')}
            className="flex-1 md:w-72 h-9 shadow-sm"
            allowClear
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          
          <Button 
            icon={<Filter size={14} />} 
            className="h-9 w-9 p-0 flex items-center justify-center text-text-tertiary border-border hover:text-brand"
          />
        </div>
      </div>

      {filteredApps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredApps.map(app => (
            <AppCard 
              key={app.id} 
              app={app} 
              onClick={() => setSelectedAppId(app.id)} 
            />
          ))}
        </div>
      ) : (
        <FAEmptyState 
          icon={ShoppingBag}
          title={t('marketplace.empty')}
          description="尝试调整搜索关键词或重置过滤器来查找您需要的 AI 应用包。"
          primaryAction={{
            label: "重置搜索条件",
            icon: <RefreshCcw size={16} />,
            onClick: () => { setSearchText(''); setShowInstalledOnly(false); setActiveTab('All'); }
          }}
        />
      )}

      <AppDetailDrawer 
        app={selectedApp} 
        open={!!selectedAppId} 
        onClose={() => setSelectedAppId(null)} 
      />

      <style>{`
        .fa-tabs-v2 .ant-tabs-nav { margin-bottom: 0 !important; }
        .fa-tabs-v2 .ant-tabs-nav::before { border-bottom: none !important; }
        .fa-tabs-v2 .ant-tabs-tab { padding: 12px 0 !important; margin-right: 24px !important; }
        .fa-tabs-v2 .ant-tabs-tab-btn { font-size: 14px !important; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600 !important; }
        .fa-tabs-v2 .ant-tabs-ink-bar { bottom: 0 !important; }
      `}</style>
    </div>
  );
};

export default MarketplacePage;
