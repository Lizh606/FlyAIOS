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
 * Refactored for React 19: ref is now a standard prop.
 */
function FATable<T extends object>(
  { density = 'comfort', className = "", pagination, ref, ...props }: FATableProps<T>
) {
  const { t } = useI18n();
  const paddingY = density === 'compact' ? '8px' : '11px';

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
        <style>{`
          /* 1. 基础容器背景锁定 */
          .fa-standard-table {
            background-color: rgba(var(--fa-bg-card), 1) !important;
          }

          /* 2. 表头样式隔离：使用 :not 排除测量行 */
          .fa-standard-table .ant-table-thead > tr:not(.ant-table-measure-row) > th {
            padding: ${paddingY} 16px !important;
            font-size: var(--fa-fs-t5) !important;
            line-height: var(--fa-lh-t5) !important;
            font-weight: var(--fa-fw-medium) !important;
            border-bottom: 1px solid rgba(var(--fa-divider), var(--fa-divider-alpha)) !important;
            background-color: rgba(var(--fa-bg-card), 1) !important;
            color: rgba(var(--fa-text-secondary), 1) !important;
            vertical-align: middle !important;
          }

          /* 3. 内容行样式隔离 */
          .fa-standard-table .ant-table-tbody > tr:not(.ant-table-measure-row) > td {
            padding: ${paddingY} 16px !important;
            font-size: var(--fa-fs-t5) !important;
            line-height: var(--fa-lh-t5) !important;
            font-weight: var(--fa-fw-regular) !important;
            color: rgba(var(--fa-text-primary), 1) !important;
            border-bottom: 1px solid rgba(var(--fa-divider), var(--fa-divider-alpha)) !important;
            vertical-align: middle !important;
          }

          /* 4. 终极重置 (CRITICAL RESET) */
          .fa-standard-table .ant-table-measure-row,
          .fa-standard-table .ant-table-measure-row td {
            padding: 0 !important;
            height: 0 !important;
            line-height: 0 !important;
            border: 0 !important;
            visibility: hidden !important;
            font-size: 0 !important;
            margin: 0 !important;
            pointer-events: none !important;
          }

          .fa-standard-table .ant-table-row-selected > td {
            background-color: rgba(var(--fa-brand-bg), var(--fa-brand-bg-alpha)) !important;
          }
          
          .fa-standard-table .ant-table-pagination.ant-pagination {
            margin: 16px 24px !important; 
            padding: 0 !important;
          }

          @media (max-width: 767px) {
            .fa-standard-table .ant-table-pagination.ant-pagination {
              margin: 16px 16px !important;
              justify-content: center !important;
            }
          }
        `}</style>
      </div>
    </ConfigProvider>
  );
}

export default FATable;