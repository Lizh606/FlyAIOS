
import React, { useState, useMemo } from 'react';
import { 
  HardDrive, CheckCircle2, AlertCircle, Zap, Search, Filter, 
  LayoutGrid, List, MoreHorizontal, Eye, Box
} from 'lucide-react';
import { Input, Button, Dropdown, Divider, Segmented, Tooltip, ConfigProvider } from 'antd';
import { useI18n } from '../../../i18n';
import FATable from '../../../ui/FATable';
import FAStatus from '../../../ui/FAStatus';
import FACard from '../../../ui/FACard';
import { MOCK_EDGE_NODES, EdgeNode } from '../../../shared/mocks/edgeNodes';
import { ColumnsType } from 'antd/es/table';

const EdgeNodesTable: React.FC = () => {
  const { t } = useI18n();
  const [viewMode, setViewMode] = useState<'LIST' | 'GRID'>('LIST');
  const [searchText, setSearchText] = useState('');

  const filteredNodes = useMemo(() => 
    MOCK_EDGE_NODES.filter(n => 
      n.name.toLowerCase().includes(searchText.toLowerCase()) || 
      n.id.toLowerCase().includes(searchText.toLowerCase())
    )
  , [searchText]);

  const renderCapabilities = (record: EdgeNode, isGrid: boolean = false) => {
    const caps = [
      { id: 'ingest', ready: record.ingestReady, label: t('deployments.node.ingest'), err: t('deployments.node.ingestNot'), icon: record.ingestReady ? CheckCircle2 : AlertCircle },
      { id: 'disk', ready: record.disk === 'ok', label: t('deployments.node.diskOk'), err: t('deployments.node.diskWarn'), icon: HardDrive },
      { id: 'gpu', ready: record.gpu, label: 'GPU', err: 'CPU', icon: Zap },
    ];

    return (
      <div className={`flex flex-wrap ${isGrid ? 'gap-1.5' : 'gap-1'} max-w-[400px]`}>
        {caps.map(c => {
          const Icon = c.icon;
          return (
            <div 
              key={c.id} 
              className={`flex items-center gap-1 px-1.5 py-0.5 border rounded-md fa-t7-mono text-[9px] font-bold uppercase transition-all ${
                c.ready 
                  ? 'bg-gray-50/50 text-gray-500 border-gray-100' 
                  : 'bg-red-50 text-red-600 border-red-100'
              }`}
            >
              <Icon size={10} className={c.ready ? "opacity-50" : ""} /> {c.ready ? c.label : c.err}
            </div>
          );
        })}
      </div>
    );
  };

  const columns: ColumnsType<EdgeNode> = [
    {
      title: 'Target Edge Identifier',
      dataIndex: 'name',
      key: 'name',
      width: 240,
      render: (text, record) => (
        <div className="flex flex-col min-w-[160px] group-hover:translate-x-1 transition-transform">
          <span className="fa-t5-strong text-gray-900 leading-tight">{text}</span>
          <span className="fa-t7-mono text-gray-400 uppercase text-[9px] tracking-widest mt-0.5">UUID: {record.id.toUpperCase()}</span>
        </div>
      )
    },
    {
      title: 'Connectivity',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <FAStatus status={status === 'online' ? 'online' : 'failed'} label={status.toUpperCase()} />
      )
    },
    {
      title: 'Resource Matrix',
      key: 'capabilities',
      render: (_, record) => renderCapabilities(record)
    },
    {
      title: 'Hardware Profile',
      key: 'system',
      align: 'right',
      width: 160,
      render: (_, record) => (
        <div className="flex flex-col items-end">
          <span className="fa-t6 font-bold text-gray-600 tracking-tight">{record.model}</span>
          <span className="fa-t7-mono text-gray-400 text-[10px] tabular-nums">{record.version}</span>
        </div>
      )
    },
    {
      title: '',
      key: 'actions',
      width: 64,
      fixed: 'right',
      align: 'right',
      render: () => (
        <div className="flex items-center justify-end">
          <Divider type="vertical" className="h-6 mx-2 opacity-5" />
          <Dropdown
            menu={{
              items: [
                { key: 'details', icon: <Eye size={14} />, label: <span className="fa-t6 font-bold uppercase tracking-wider">Inspect</span> },
              ]
            }}
            placement="bottomRight"
          >
            <Button type="text" icon={<MoreHorizontal size={16} />} className="text-gray-400 hover:text-brand" />
          </Dropdown>
        </div>
      )
    }
  ];

  const renderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-300">
      {filteredNodes.map(node => (
        <FACard key={node.id} className="border-gray-100 group relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${node.status === 'online' ? 'bg-teal-50 text-teal-600' : 'bg-red-50 text-red-600'}`}>
                <Box size={20} />
              </div>
              <div className="min-w-0">
                <h4 className="fa-t5-strong text-gray-900 leading-tight mb-0.5 truncate">{node.name}</h4>
                <p className="fa-t7-mono text-gray-400 uppercase text-[9px] tracking-wider truncate">{node.id.toUpperCase()}</p>
              </div>
            </div>
            <FAStatus status={node.status === 'online' ? 'online' : 'failed'} label={node.status.toUpperCase()} />
          </div>
          <div className="space-y-4">
            {renderCapabilities(node, true)}
            <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
              <span className="fa-t7-mono text-[10px] text-gray-400 font-medium tabular-nums">{node.model} • {node.version}</span>
              <button className="text-gray-300 hover:text-brand transition-colors"><MoreHorizontal size={14}/></button>
            </div>
          </div>
        </FACard>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Table Pattern Toolbar (v0.8 Section 6.2.1) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Input 
            prefix={<Search size={14} className="text-gray-400" />}
            placeholder="Search Identifier / UUID..."
            className="w-full sm:w-72 h-9 shadow-sm"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            allowClear
          />
          <Button 
            icon={<Filter size={14} />} 
            className="h-9 fa-t6 font-bold uppercase tracking-widest text-gray-500 hover:text-brand"
          >
            Filter
          </Button>
        </div>
        
        <div className="flex items-center shrink-0">
          <ConfigProvider
            theme={{
              components: {
                Segmented: {
                  trackBg: '#FFFFFF',
                  itemSelectedBg: 'rgba(38, 100, 255, 0.08)',
                  itemSelectedColor: 'var(--fa-brand-primary)',
                  itemColor: 'var(--fa-text-tertiary)',
                  itemHoverColor: 'var(--fa-text-primary)',
                  itemHoverBg: 'rgba(0, 0, 0, 0.02)',
                  controlHeight: 28, // Reduced from 36px to 28px for a compact look
                  borderRadius: 6,   // Slightly tighter radius for small size
                  paddingXXS: 2,     // Tighter internal padding
                }
              }
            }}
          >
            <div className="p-0.5 bg-white border border-gray-200 rounded-lg shadow-sm">
              <Segmented
                size="small"
                options={[
                  { 
                    value: 'LIST', 
                    icon: (
                      <Tooltip title="列表视图" placement="top">
                        <div className="flex items-center justify-center h-full w-7" aria-label="列表视图">
                          <List size={14} />
                        </div>
                      </Tooltip>
                    ) 
                  },
                  { 
                    value: 'GRID', 
                    icon: (
                      <Tooltip title="网格视图" placement="top">
                        <div className="flex items-center justify-center h-full w-7" aria-label="网格视图">
                          <LayoutGrid size={14} />
                        </div>
                      </Tooltip>
                    ) 
                  }
                ]}
                value={viewMode}
                onChange={(v) => setViewMode(v as any)}
              />
            </div>
          </ConfigProvider>
        </div>
      </div>

      {viewMode === 'LIST' ? (
        <FATable 
          dataSource={filteredNodes} 
          columns={columns} 
          rowKey="id" 
          density="comfort"
          pagination={{ pageSize: 5 }}
          onRow={() => ({ className: 'cursor-pointer group' })}
        />
      ) : renderGridView()}

      <style>{`
        /* Standard height for list items */
        .ant-table-tbody > tr > td {
          height: 44px;
        }

        /* Standardized Segmented thumb transition */
        .ant-segmented-thumb {
          transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
        }
        
        /* Adjust segment height consistency */
        .ant-segmented-item-label {
          min-height: 24px !important;
          line-height: 24px !important;
          display: flex !important;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default EdgeNodesTable;
