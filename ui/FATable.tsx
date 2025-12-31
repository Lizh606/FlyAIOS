
import React from 'react';
import { Table, ConfigProvider } from 'antd';
import type { TableProps } from 'antd';
import { useI18n } from '../i18n';

/**
 * FATableProps - FlyAIOS specialized table properties
 */
export type FATableProps<T> = TableProps<T> & {
  density?: 'comfort' | 'compact';
  stickyHeader?: boolean;
};

/**
 * Internal FATable Implementation using Ant Design ConfigProvider for token injection
 * and custom CSS for FlyAIOS specific layout rules (Spec v0.8 Section 6.2).
 */
function InternalFATable<T extends object>(
  { density = 'comfort', stickyHeader = true, className = "", pagination, scroll, ...props }: FATableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { t } = useI18n();
  // Map density to FlyAIOS padding tokens
  const paddingY = density === 'compact' ? '8px' : '11px';
  const paddingX = '16px';

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: 'var(--fa-bg-card)',
            headerColor: 'var(--fa-text-secondary)',
            headerSplitColor: 'transparent',
            headerBorderRadius: 0,
            colorBgContainer: 'var(--fa-bg-card)',
            colorText: 'var(--fa-text-primary)',
            colorBorderSecondary: 'var(--fa-border-divider)',
            rowHoverBg: 'var(--fa-sidebar-hover-bg)',
            selectedRowBg: 'var(--fa-sidebar-selected-bg)',
            padding: density === 'compact' ? 8 : 12,
            paddingXS: 4,
          },
          Pagination: {
            itemSize: 32,
            borderRadius: 8,
            colorPrimary: 'var(--fa-brand-primary)',
            colorText: 'var(--fa-text-secondary)',
          }
        }
      }}
    >
      <div 
        ref={ref} 
        className={`fa-table-wrapper rounded-[12px] border border-[var(--fa-border-default)] bg-[var(--fa-bg-card)] overflow-hidden shadow-sm ${className}`}
      >
        <Table<T>
          {...props}
          className="fa-standard-table"
          size="middle"
          scroll={stickyHeader ? { x: 'max-content', ...scroll } : scroll}
          pagination={
            pagination !== false
              ? {
                  size: 'small',
                  showSizeChanger: true,
                  showTotal: (total: number) => t('common.pagination.total', { total }),
                  locale: {
                    items_per_page: t('common.pagination.size', { size: '' }).trim(),
                  },
                  position: ['bottomRight'],
                  ...(typeof pagination === 'object' ? (pagination as any) : {}),
                }
              : false
          }
        />
        <style>{`
          /* === FlyAIOS Standard Table Typography & Layout Overrides === */
          
          /* Header Styling: T5 Body Strong (14/22, 500) */
          .fa-standard-table .ant-table-thead > tr:not(.ant-table-measure-row) > th {
            padding: ${paddingY} ${paddingX} !important;
            font-size: 14px !important;
            line-height: 22px !important;
            font-weight: 500 !important;
            border-bottom: 1px solid var(--fa-border-divider) !important;
            background-color: var(--fa-bg-card) !important;
            vertical-align: middle !important;
            color: var(--fa-text-secondary) !important;
          }

          /* Body Styling: T5 Body (14/22, 400) */
          .fa-standard-table .ant-table-tbody > tr:not(.ant-table-measure-row) > td {
            padding: ${paddingY} ${paddingX} !important;
            font-size: 14px !important;
            line-height: 22px !important;
            font-weight: 400 !important;
            color: var(--fa-text-primary) !important;
            border-bottom: 1px solid var(--fa-border-divider) !important;
            vertical-align: middle !important;
          }

          /* Tabular numbers for ID/Numeric columns */
          .fa-standard-table td, .fa-standard-table th {
            font-variant-numeric: tabular-nums;
          }

          /* CRITICAL RESET: Eliminate measure row spacing */
          .fa-standard-table .ant-table-measure-row,
          .fa-standard-table .ant-table-measure-row td {
            padding: 0 !important;
            height: 0 !important;
            line-height: 0 !important;
            border: 0 !important;
            visibility: hidden !important;
            font-size: 0 !important;
          }

          /* Row Feedback - Selected/Active */
          .fa-standard-table .ant-table-row-selected > td {
            background-color: var(--fa-sidebar-selected-bg) !important;
          }

          /* Pagination Alignment (Spec V0.8 Section 6.2.3D) */
          .fa-standard-table .ant-table-pagination.ant-pagination {
            margin: 16px 24px !important; 
            padding: 0 !important;
          }

          @media (max-width: 767px) {
            .fa-standard-table .ant-table-pagination.ant-pagination {
              margin: 16px 16px !important;
              justify-content: center !important;
              width: calc(100% - 32px);
            }
          }
        `}</style>
      </div>
    </ConfigProvider>
  );
}

export const FATable = React.forwardRef(InternalFATable) as <T extends object>(
  props: FATableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

export default FATable;
