
import React from 'react';
import { Drawer, DrawerProps } from 'antd';
import { X } from 'lucide-react';

// Standard FlyAIOS Drawer wrapper
interface FADrawerProps extends DrawerProps {
  // Add open explicitly to resolve property not found errors during component usage
  open?: boolean;
  // Explicitly add common DrawerProps to resolve destructuring and React 18 children errors
  title?: React.ReactNode;
  children?: React.ReactNode;
  onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  width?: string | number;
  footerActions?: React.ReactNode;
}

// Fix: Destructuring inherited props correctly by ensuring they are defined in FADrawerProps
const FADrawer = ({
  open,
  title,
  children,
  footerActions,
  onClose,
  width = 560, // Standard from v2.3.3A
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
          className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-400"
        >
          <X size={20} />
        </button>
      }
      title={title ? <span className="fa-t2 text-[var(--fa-text-primary)]">{title}</span> : null}
      footer={footerActions ? (
        <div className="flex items-center justify-end gap-3 px-2 py-1">
          {footerActions}
        </div>
      ) : null}
    >
      <div className="h-full flex flex-col">
        {children}
      </div>
    </Drawer>
  );
};

export default FADrawer;
