
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useI18n } from '../../i18n/index';
import FAPageHeader from '../../ui/FAPageHeader';
import ConnectionsTable from '../../features/integrations/components/ConnectionsTable';
import ConnectionDetailDrawer from '../../features/integrations/components/ConnectionDetailDrawer';
import { MOCK_CONNECTIONS, Connection } from '../../shared/mocks/integrations';
import { Tabs, Input, Button } from 'antd';
import { Search, Plus, RefreshCcw } from 'lucide-react';

const IntegrationsPage: React.FC = () => {
  const { t } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [selectedConn, setSelectedConn] = useState<Connection | null>(null);

  // Jump/Link Logic: Handle ?connId or ?type in URL
  useEffect(() => {
    const connId = searchParams.get('connId');
    const typeFilter = searchParams.get('type');
    
    if (connId) {
      const conn = MOCK_CONNECTIONS.find(c => c.id === connId);
      if (conn) setSelectedConn(conn);
    }
    if (typeFilter) {
      setActiveTab(typeFilter === 'webhook' ? 'Webhook' : typeFilter === 'workorder' ? 'WorkOrder' : 'All');
    }
  }, [searchParams]);

  const filteredData = useMemo(() => {
    return MOCK_CONNECTIONS.filter(c => {
      const matchTab = activeTab === 'All' || c.type === activeTab;
      const lowerSearch = searchText.toLowerCase();
      const matchSearch = c.name.toLowerCase().includes(lowerSearch) || 
                          c.id.toLowerCase().includes(lowerSearch) ||
                          c.type.toLowerCase().includes(lowerSearch);
      return matchTab && matchSearch;
    });
  }, [activeTab, searchText]);

  return (
    <div className="px-6 py-8 max-w-[1440px] mx-auto w-full animate-in fade-in duration-500">
      <FAPageHeader 
        title={t('integrations.title')}
        subtitle={t('integrations.subtitle')}
        actions={
          <div className="flex items-center gap-3">
             <Button icon={<RefreshCcw size={14}/>} className="text-gray-400 border-gray-200" />
             <Button type="primary" icon={<Plus size={16}/>} className="fa-t5-strong uppercase tracking-widest shadow-lg h-10 px-6">
               {t('integrations.newConnection')}
             </Button>
          </div>
        }
      />

      {/* Standard Toolbar Layout (v0.8 Section 6.2.1) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-[var(--fa-border-default)]">
        <div className="fa-tabs-v2 shrink-0">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              { key: 'All', label: t('integrations.tab.all') },
              { key: 'Webhook', label: t('integrations.tab.webhook') },
              { key: 'WorkOrder', label: t('integrations.tab.workorder') },
            ]}
          />
        </div>
        <div className="pb-3 w-full md:w-80">
          <Input 
            prefix={<Search size={14} className="text-gray-400" />}
            placeholder={t('integrations.searchPlaceholder')}
            className="h-9 shadow-sm"
            allowClear
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onKeyDown={e => e.key === 'Escape' && setSearchText('')}
          />
        </div>
      </div>

      <ConnectionsTable 
        data={filteredData} 
        onView={setSelectedConn} 
      />

      <ConnectionDetailDrawer 
        connection={selectedConn} 
        open={!!selectedConn} 
        onClose={() => {
          setSelectedConn(null);
          // Clear query params on close to reset state
          const newParams = new URLSearchParams(searchParams);
          newParams.delete('connId');
          setSearchParams(newParams);
        }} 
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

export default IntegrationsPage;
