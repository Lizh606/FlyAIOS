import React, { useState } from 'react';
import { Steps, Checkbox, Select, Input, message, Button } from 'antd';
import { Database, SlidersHorizontal, CheckCircle2, ChevronRight, Info, Lock, Globe } from 'lucide-react';
import { AppPack } from '../../../shared/mocks/apps';
import { useI18n } from '../../../i18n';
import FAModal from '../../../ui/FAModal';

interface InstallWizardModalProps {
  app: AppPack;
  open: boolean;
  onClose: () => void;
}

const InstallWizardModal: React.FC<InstallWizardModalProps> = ({ app, open, onClose }) => {
  const { t } = useI18n();
  const [current, setCurrent] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [installing, setInstalling] = useState(false);

  const steps = [
    { title: t('marketplace.wizard.step.scopes'), description: '权限确认', icon: <Lock size={18} /> },
    { title: t('marketplace.wizard.step.target'), description: '安装位置', icon: <Database size={18} /> },
    { title: t('marketplace.wizard.step.config'), description: '环境参数', icon: <SlidersHorizontal size={18} /> },
  ];

  const handleNext = () => {
    if (current === 2) handleInstall();
    else setCurrent(current + 1);
  };

  const handleInstall = () => {
    setInstalling(true);
    setTimeout(() => {
      setInstalling(false);
      message.success(t('marketplace.wizard.success', { name: app.name }));
      onClose();
    }, 2000);
  };

  const isNextDisabled = current === 0 && !agreed;

  return (
    <FAModal
      open={open}
      onCancel={onClose}
      size="M"
      footer={null}
      closable={!installing}
      maskClosable={false}
      styles={{ body: { padding: 0 } }}
    >
      <div className="bg-bg-card overflow-hidden rounded-card">
        {/* Wizard Header */}
        <div className="p-8 pb-6 bg-bg-page/50 border-b border-border">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-bg-card shadow-sm border border-border p-2 shrink-0">
                <img src={app.icon} alt="" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="text-fa-t4 font-fa-semibold text-text-primary uppercase tracking-[0.1em] m-0">{t('marketplace.wizard.title')}</h2>
                <p className="text-fa-t6 font-fa-medium text-text-tertiary mt-0.5 m-0">{app.name} • {app.version}</p>
              </div>
           </div>
           
           <Steps 
            current={current} 
            items={steps} 
            size="small"
            className="fa-steps-v2"
           />
        </div>

        {/* Wizard Body */}
        <div className="p-8 min-h-[380px]">
          {current === 0 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="flex items-center gap-2 mb-1 text-text-tertiary">
                  <span className="shrink-0"><Info size={14} /></span>
                  <span className="text-fa-t6 font-fa-semibold uppercase tracking-widest leading-none">{t('marketplace.wizard.scope.desc')}</span>
               </div>
               
               <div className="grid grid-cols-1 gap-3.5">
                  <PermissionItem 
                    icon={<Lock size={18} />} 
                    title={t('marketplace.wizard.scope.media')}
                    desc="应用将访问当前项目的 Telemetry、Images、Videos 数据域，用于缺陷识别分析。"
                    color="brand"
                  />
                  <PermissionItem 
                    icon={<CheckCircle2 size={18} />} 
                    title={t('marketplace.wizard.scope.artifacts')}
                    desc="应用具有结果域 (Artifacts) 的写入权限，可生成新的告警事件、报告与分析产物。"
                    color="success"
                  />
                  {app.scopes.outbound && (
                    <PermissionItem 
                      icon={<Globe size={18} />} 
                      title={t('marketplace.wizard.scope.outbound')}
                      desc="该应用包具有网络外发权限，用于将识别结果实时推送到外部业务工单系统。"
                      color="warning"
                    />
                  )}
               </div>

               <div className="pt-5 border-t border-divider">
                  <Checkbox 
                    checked={agreed} 
                    onChange={e => setAgreed(e.target.checked)}
                    className="fa-checkbox-custom text-fa-t5 font-fa-medium text-text-secondary select-none"
                  >
                    <span className="ml-2">{t('marketplace.wizard.scope.agree')}</span>
                  </Checkbox>
               </div>
            </div>
          )}

          {current === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="flex flex-col gap-2.5">
                  <label className="text-fa-t6 font-fa-semibold text-text-tertiary uppercase tracking-widest">{t('marketplace.wizard.target.label')}</label>
                  <Select 
                    defaultValue="tenant" 
                    className="w-full h-11"
                    options={[
                      { value: 'tenant', label: t('marketplace.wizard.target.tenant') },
                      { value: 'p1', label: t('marketplace.wizard.target.project') }
                    ]}
                  />
               </div>
               <div className="p-5 bg-bg-page border border-border rounded-xl flex gap-4 items-start shadow-inner">
                  <Info size={18} className="text-brand shrink-0 mt-0.5" />
                  <p className="text-fa-t5 text-text-secondary leading-relaxed m-0">
                    {t('marketplace.wizard.target.tip')}
                  </p>
               </div>
            </div>
          )}

          {current === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="grid grid-cols-1 gap-8">
                  <div className="flex flex-col gap-2.5">
                    <label className="text-fa-t6 font-fa-semibold text-text-tertiary uppercase tracking-widest">{t('marketplace.wizard.config.threshold')}</label>
                    <Input defaultValue="0.72" className="h-11 font-mono text-text-primary" />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className="text-fa-t6 font-fa-semibold text-text-tertiary uppercase tracking-widest">{t('marketplace.wizard.config.template')}</label>
                    <Select 
                      defaultValue="v2" 
                      className="w-full h-11"
                      options={[
                        { value: 'v1', label: 'Standard Inspection v1' },
                        { value: 'v2', label: 'StateGrid Standard v2' }
                      ]}
                    />
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Wizard Footer */}
        <div className="p-6 bg-bg-page border-t border-border flex justify-between items-center shrink-0">
          <Button 
            disabled={current === 0 || installing} 
            onClick={() => setCurrent(current - 1)}
            className="h-10 px-6 font-fa-semibold text-text-tertiary border-none hover:bg-action-hover whitespace-nowrap"
          >
            {t('common.back')}
          </Button>
          
          <div className="flex gap-3">
            <Button onClick={onClose} disabled={installing} className="h-10 px-6 font-fa-semibold text-text-secondary whitespace-nowrap">{t('common.cancel')}</Button>
            <Button 
              type="primary" 
              disabled={isNextDisabled}
              loading={installing}
              onClick={handleNext}
              className="h-10 px-8 font-fa-semibold uppercase tracking-widest shadow-lg flex items-center justify-center whitespace-nowrap overflow-hidden"
            >
              <div className="flex items-center gap-2 whitespace-nowrap flex-nowrap">
                {installing ? (
                  <span>{t('marketplace.wizard.installing')}</span>
                ) : (
                  current === 2 ? (
                    <span>{t('marketplace.wizard.installNow')}</span>
                  ) : (
                    <>
                      <span className="leading-none">{t('common.next')}</span>
                      <ChevronRight size={16} className="shrink-0" />
                    </>
                  )
                )}
              </div>
            </Button>
          </div>
        </div>
      </div>
      
      <style>{`
        /* 1. Steps 整体布局优化 */
        .fa-steps-v2 .ant-steps-item-icon { 
          margin-inline-end: 8px !important; 
          background: transparent !important; 
          border: none !important; 
          box-shadow: none !important; 
          width: 24px !important; 
          height: 24px !important; 
          display: flex !important; 
          align-items: center !important; 
          justify-content: center !important; 
          color: rgba(var(--fa-text-disabled), 1) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .fa-steps-v2 .ant-steps-item-icon .ant-steps-icon {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 100% !important;
          height: 100% !important;
          line-height: 0 !important;
        }

        /* 2. Title 样式调整 (T5 Strong 语义) */
        .fa-steps-v2 .ant-steps-item-title { 
          font-size: 11px !important; 
          font-weight: 700 !important; 
          color: rgba(var(--fa-text-tertiary), 1) !important; 
          text-transform: uppercase; 
          letter-spacing: 0.1em; 
          line-height: 24px !important;
          white-space: nowrap;
          transition: color 0.3s ease !important;
        }

        /* 3. Description 样式调整 (符合 T6 Caption 规范) */
        .fa-steps-v2 .ant-steps-item-description {
          font-size: 11px !important;
          font-weight: 400 !important;
          color: rgba(var(--fa-text-tertiary), 0.6) !important;
          margin-top: -2px !important; /* 紧凑排列 */
          line-height: 14px !important;
          transition: color 0.3s ease !important;
        }

        /* 激活与完成状态颜色映射 (应用品牌蓝) */
        .fa-steps-v2 .ant-steps-item-active .ant-steps-item-icon,
        .fa-steps-v2 .ant-steps-item-finish .ant-steps-item-icon {
          color: rgba(var(--fa-brand), 1) !important;
        }

        .fa-steps-v2 .ant-steps-item-active .ant-steps-item-title,
        .fa-steps-v2 .ant-steps-item-finish .ant-steps-item-title {
          color: rgba(var(--fa-brand), 1) !important;
        }

        .fa-steps-v2 .ant-steps-item-active .ant-steps-item-description {
          color: rgba(var(--fa-text-secondary), 1) !important;
        }

        /* 连线样式优化 */
        .fa-steps-v2 .ant-steps-item-tail::after { 
          background-color: rgba(var(--fa-divider), var(--fa-divider-alpha)) !important; 
          height: 1px !important; 
          top: 12px !important;
        }

        .fa-steps-v2 .ant-steps-item-finish .ant-steps-item-tail::after {
          background-color: rgba(var(--fa-brand), 0.3) !important;
        }

        /* Checkbox 品牌色补丁 */
        .fa-checkbox-custom.ant-checkbox-wrapper:hover .ant-checkbox-inner {
          border-color: rgba(var(--fa-brand), 1) !important;
        }
        
        .ant-btn.flex-nowrap {
          display: flex !important;
        }
      `}</style>
    </FAModal>
  );
};

const PermissionItem = ({ icon, title, desc, color }: any) => {
  const colorMap = {
    brand: "bg-brand-bg text-brand border-brand/10",
    success: "bg-success/5 text-success border-success/10",
    warning: "bg-warning/5 text-warning border-warning/10"
  };
  return (
    <div className={`p-4 rounded-xl border flex gap-4 shadow-sm ${colorMap[color as keyof typeof colorMap]}`}>
       <div className="w-10 h-10 rounded-lg bg-bg-card flex items-center justify-center shrink-0 shadow-sm border border-divider">
          {icon}
       </div>
       <div className="min-w-0">
          <h4 className="text-fa-t5 font-fa-semibold text-text-primary mb-0.5 m-0 leading-tight">{title}</h4>
          <p className="text-fa-t6 text-text-secondary leading-relaxed m-0 opacity-80">{desc}</p>
       </div>
    </div>
  );
};

export default InstallWizardModal;