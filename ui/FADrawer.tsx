import React from 'react';
import { Drawer, DrawerProps } from 'antd';
import { X } from 'lucide-react';

interface FADrawerProps extends DrawerProps {
  open?: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
  onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  width?: string | number;
  footerActions?: React.ReactNode;
  styles?: DrawerProps['styles'];
}

const FADrawer = ({
  open,
  title,
  children,
  footerActions,
  onClose,
  width = 560,
  ...props
}: FADrawerProps) => {
  return (
    <Drawer
      {...props}
      open={open}
      width={width}
      closable={false}
      onClose={onClose}
      extra={
        <button 
          onClick={onClose}
          className="p-2 hover:bg-action-hover rounded-lg transition-colors text-text-tertiary hover:text-text-primary -mr-2"
        >
          <X size={20} />
        </button>
      }
      title={title ? <span className="text-fa-t2 font-fa-semibold text-text-primary tracking-tight">{title}</span> : null}
      footer={footerActions ? (
        <div className="flex items-center justify-end gap-3">
          {footerActions}
        </div>
      ) : null}
      styles={{
        header: { 
          borderBottom: '1px solid rgba(var(--fa-divider), var(--fa-divider-alpha))', 
          padding: '24px', // FlyAIOS v0.8 Standard
          backgroundColor: 'rgba(var(--fa-bg-card), 1)',
          ...props.styles?.header
        },
        body: { 
          padding: '24px', // FlyAIOS v0.8 Standard
          backgroundColor: 'rgba(var(--fa-bg-card), 1)',
          ...props.styles?.body
        },
        footer: { 
          borderTop: '1px solid rgba(var(--fa-divider), var(--fa-divider-alpha))', 
          padding: '16px 24px', 
          backgroundColor: 'rgba(var(--fa-bg-card), 1)',
          ...props.styles?.footer
        }
      }}
    >
      <div className="h-full flex flex-col">
        {children}
      </div>
    </Drawer>
  );
};

export default FADrawer;