
import React from 'react';
import { Modal, ModalProps, Button } from 'antd';

// Standard FlyAIOS Modal wrapper
interface FAModalProps extends ModalProps {
  // Add open explicitly to resolve property not found errors during component usage
  open?: boolean;
  // Explicitly add common ModalProps to resolve destructuring and React 18 children errors
  title?: React.ReactNode;
  children?: React.ReactNode;
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'S' | 'M' | 'L';
  isDanger?: boolean;
  // Add other properties used in component instances to ensure type compatibility
  closable?: boolean;
  maskClosable?: boolean;
  styles?: ModalProps['styles'];
}

// Fix: Destructuring inherited props correctly by ensuring they are defined in FAModalProps
const FAModal = ({
  size = 'M',
  isDanger = false,
  open,
  title,
  children,
  onCancel,
  onOk,
  okText,
  cancelText,
  footer,
  ...props
}: FAModalProps) => {
  // Width mappings from v0.8 spec
  const widthMap = {
    S: 400,
    M: 600,
    L: 800,
  };

  return (
    <Modal
      {...props}
      open={open}
      width={widthMap[size]}
      title={title ? <span className="fa-t3 text-[var(--fa-text-primary)]">{title}</span> : null}
      centered
      destroyOnClose
      // Use destructured footer property directly
      footer={footer !== undefined ? footer : [
        <Button 
          key="cancel" 
          onClick={onCancel}
          className="fa-t5-strong"
        >
          {cancelText || 'Cancel'}
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          danger={isDanger}
          onClick={onOk}
          className="fa-t5-strong px-6"
        >
          {okText || 'Confirm'}
        </Button>
      ]}
      onCancel={onCancel}
    >
      <div className="py-4 fa-t5 text-[var(--fa-text-secondary)]">
        {children}
      </div>
    </Modal>
  );
};

export default FAModal;
