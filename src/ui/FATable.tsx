import React from 'react';
import { Table, ConfigProvider } from 'antd';
import type { TableProps } from 'antd';
import { useI18n } from '../i18n';

export type FATableProps<T> = TableProps<T> & {
  density?: 'comfort' | 'compact';
  ref?: React.Ref<HTMLDivElement>;
};

/**
 * FATable - FlyAIOS Standard Table Component
 */
function FATable<T extends object>(
  { density = 'comfort', className = "", pagination, ref, ...props }: FATableProps<T>
) {
  const { t } = useI18n();

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: 'rgba(var(--fa-bg-card), 1)', 
            headerColor: 'rgba(var(--fa-text-secondary), 1)',
            headerSplitColor: 'transparent',
            headerBorderRadius: 0,
            colorBgContainer: 'rgba(var(--fa-bg-card), 1)',
            colorText: 'rgba(var(--fa-text-primary), 1)',
            colorBorderSecondary: 'rgba(var(--fa-divider), var(--fa-divider-alpha))', 
            rowHoverBg: 'rgba(var(--fa-hover), var(--fa-hover-alpha))',
            selectedRowBg: 'rgba(var(--fa-brand-bg), var(--fa-brand-bg-alpha))',
            padding: density === 'compact' ? 8 : 12,
          },
          Pagination: {
            itemSize: 32,
            borderRadius: 8,
            colorPrimary: 'rgba(var(--fa-brand), 1)',
            colorText: 'rgba(var(--fa-text-secondary), 1)',
          }
        }
      }}
    >
      <div ref={ref} className={`fa-table-container rounded-card border border-border bg-bg-card overflow-hidden shadow-card ${className}`}>
        <Table<T>
          {...props}
          className="fa-standard-table"
          size="middle"
          pagination={
            pagination !== false
              ? {
                  size: 'small',
                  showTotal: (total: number) => t('common.pagination.total', { total }),
                  position: ['bottomRight'],
                  ...(typeof pagination === 'object' ? (pagination as any) : {}),
                }
              : false
          }
        />
      </div>
    </ConfigProvider>
  );
}

export default FATable;