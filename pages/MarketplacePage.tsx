
import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, RefreshCcw } from 'lucide-react';
import { Input, Tabs, Switch } from 'antd';
import { useI18n } from '../i18n';
import { MOCK_APPS } from '../shared/mocks/apps';
import AppCard from '../features/marketplace/components/AppCard';
import AppDetailDrawer from '../features/marketplace/components/AppDetailDrawer';
import FAEmptyState from '../ui/FAEmptyState';

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
    <div className="px-6 py-8 max-w-[1440px] mx-auto w-full animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="fa-t2 text-gray-900 mb-1">{t('marketplace.title')}</h1>
        <p className="fa-t5 text-gray-500">{t('marketplace.subtitle')}</p>
      </div>

      {/* Standard Toolbar Layout (v0.8) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 border-b border-[var(--fa-border-default)]">
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
        <div className="flex items-center gap-4 pb-3">
          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm shrink-0">
            <span className="fa-t6 text-gray-400 uppercase tracking-widest font-bold">{t('marketplace.filter.installed')}</span>
            <Switch size="small" checked={showInstalledOnly} onChange={setShowInstalledOnly} />
          </div>
          <Input 
            prefix={<Search size={14} className="text-gray-400" />}
            placeholder={t('marketplace.searchPlaceholder')}
            className="w-full md:w-72 h-9"
            allowClear
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* Grid: v0.8 Spec - Desktop (>=1024) 3 columns, Gap 16px (gap-4) */}
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

      {/* Detail Drawer */}
      <AppDetailDrawer 
        app={selectedApp} 
        open={!!selectedAppId} 
        onClose={() => setSelectedAppId(null)} 
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

export default MarketplacePage;
