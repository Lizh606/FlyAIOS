import React from 'react';
import { Modal, ModalProps, Button } from 'antd';

// Standard FlyAIOS Modal wrapper
interface FAModalProps extends ModalProps {
  open?: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'S' | 'M' | 'L';
  isDanger?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  styles?: ModalProps['styles'];
}

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
      title={title ? <span className="text-fa-t3 font-fa-semibold text-text-primary">{title}</span> : null}
      centered
      destroyOnClose
      footer={footer !== undefined ? footer : [
        <Button 
          key="cancel" 
          onClick={onCancel}
          className="font-fa-medium"
        >
          {cancelText || 'Cancel'}
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          danger={isDanger}
          onClick={onOk}
          className="font-fa-semibold px-6"
        >
          {okText || 'Confirm'}
        </Button>
      ]}
      onCancel={onCancel}
      styles={{
        content: { padding: 0, borderRadius: 'var(--fa-radius-card)', overflow: 'hidden' },
        header: { padding: 'var(--fa-content-padding) var(--fa-content-padding) 0', marginBottom: 0 },
        body: { padding: 'var(--fa-content-padding)' },
        footer: { padding: '16px var(--fa-content-padding) var(--fa-content-padding)', marginTop: 0 },
        ...props.styles
      }}
    >
      <div className="text-fa-t5 text-text-secondary leading-relaxed">
        {children}
      </div>
    </Modal>
  );
};

export default FAModal;