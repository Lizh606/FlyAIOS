
import React, { useState } from 'react';
import { Steps, Checkbox, Select, Input, Alert, message, Button } from 'antd';
import { ShieldCheck, Database, SlidersHorizontal, CheckCircle2, ChevronRight, Info, Lock, Globe } from 'lucide-react';
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
    { title: t('marketplace.wizard.step.scopes'), description: '权限确认', icon: <Lock size={16} /> },
    { title: t('marketplace.wizard.step.target'), description: '安装位置', icon: <Database size={16} /> },
    { title: t('marketplace.wizard.step.config'), description: '环境参数', icon: <SlidersHorizontal size={16} /> },
  ];

  const handleNext = () => {
    if (current === 2) {
      handleInstall();
    } else {
      setCurrent(current + 1);
    }
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
      <div className="bg-white overflow-hidden rounded-xl">
        {/* Wizard Header with Stepper */}
        <div className="p-8 pb-6 bg-gray-50/50 border-b border-gray-100">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 p-2 shrink-0">
                <img src={app.icon} alt="" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="fa-t4 text-gray-900 uppercase tracking-[0.1em] font-black">{t('marketplace.wizard.title')}</h2>
                <p className="fa-t6 text-gray-400 mt-0.5">{app.name} • {app.version}</p>
              </div>
           </div>
           
           <Steps 
            current={current} 
            items={steps} 
            size="small"
            className="fa-steps-v3"
           />
        </div>

        {/* Wizard Body Content */}
        <div className="p-8 min-h-[360px]">
          {current === 0 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="flex items-center gap-2 mb-1 text-gray-400">
                  <Info size={14} />
                  <span className="fa-t6 font-bold uppercase tracking-widest">{t('marketplace.wizard.scope.desc')}</span>
               </div>
               
               <div className="grid grid-cols-1 gap-3">
                  {/* READ Permission Card */}
                  <div className="p-4 bg-blue-50/20 border border-blue-100 rounded-xl flex gap-4">
                     <div className="w-10 h-10 rounded-lg bg-blue-50 text-brand flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                        <Lock size={18} />
                     </div>
                     <div>
                        <h4 className="fa-t5-strong text-gray-900 mb-0.5">{t('marketplace.wizard.scope.media')}</h4>
                        <p className="fa-t6 text-gray-400 leading-relaxed">
                          应用将访问当前项目的 Telemetry、Images、Videos 数据域，用于缺陷识别分析。
                        </p>
                     </div>
                  </div>

                  {/* WRITE Permission Card */}
                  <div className="p-4 bg-green-50/20 border border-green-100 rounded-xl flex gap-4">
                     <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0 border border-green-100 shadow-sm">
                        <CheckCircle2 size={18} />
                     </div>
                     <div>
                        <h4 className="fa-t5-strong text-gray-900 mb-0.5">{t('marketplace.wizard.scope.artifacts')}</h4>
                        <p className="fa-t6 text-gray-400 leading-relaxed">
                          应用具有结果域 (Artifacts) 的写入权限，可生成新的告警事件、报告与分析产物。
                        </p>
                     </div>
                  </div>

                  {/* Warning for Outbound if applicable */}
                  {app.scopes.outbound && (
                    <div className="p-4 bg-orange-50/30 border border-orange-100 rounded-xl flex gap-4">
                       <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100 shadow-sm">
                          <Globe size={18} />
                       </div>
                       <div>
                          <h4 className="fa-t5-strong text-orange-900 mb-0.5">{t('marketplace.wizard.scope.outbound')}</h4>
                          <p className="fa-t6 text-orange-700 leading-relaxed">
                            该应用包具有网络外发权限，用于将识别结果实时推送到外部业务工单系统。
                          </p>
                       </div>
                    </div>
                  )}
               </div>

               <div className="pt-4 border-t border-gray-100">
                  <Checkbox 
                    checked={agreed} 
                    onChange={e => setAgreed(e.target.checked)}
                    className="fa-t5 font-medium text-gray-600 select-none items-start"
                  >
                    <span className="relative -top-0.5">{t('marketplace.wizard.scope.agree')}</span>
                  </Checkbox>
               </div>
            </div>
          )}

          {current === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="fa-t6 text-gray-400 font-bold uppercase tracking-widest">{t('marketplace.wizard.target.label')}</label>
                    <Select 
                      defaultValue="tenant" 
                      className="w-full h-11"
                      options={[
                        { value: 'tenant', label: t('marketplace.wizard.target.tenant') },
                        { value: 'p1', label: t('marketplace.wizard.target.project') }
                      ]}
                    />
                  </div>
                  
                  <div className="p-5 bg-gray-50 border border-gray-100 rounded-xl flex gap-4 items-start">
                    <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
                    <p className="fa-t5 text-gray-600 leading-relaxed">
                      {t('marketplace.wizard.target.tip')}
                    </p>
                  </div>
               </div>
            </div>
          )}

          {current === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="grid grid-cols-1 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="fa-t6 text-gray-400 font-bold uppercase tracking-widest">{t('marketplace.wizard.config.threshold')}</label>
                    <Input defaultValue="0.72" className="h-11 font-mono text-gray-900" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="fa-t6 text-gray-400 font-bold uppercase tracking-widest">{t('marketplace.wizard.config.template')}</label>
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

        {/* Wizard Footer Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center shrink-0">
          <Button 
            disabled={current === 0 || installing} 
            onClick={() => setCurrent(current - 1)}
            className="h-10 px-6 font-bold text-gray-400 border-none hover:text-gray-900"
          >
            {t('common.back')}
          </Button>
          
          <div className="flex gap-3">
            <Button onClick={onClose} disabled={installing} className="h-10 px-6 font-bold text-gray-500">{t('common.cancel')}</Button>
            <Button 
              type="primary" 
              disabled={isNextDisabled}
              loading={installing}
              onClick={handleNext}
              className="h-10 px-8 font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden"
            >
              {installing ? (
                <span className="whitespace-nowrap">{t('marketplace.wizard.installing')}</span>
              ) : (
                current === 2 ? (
                  <span className="whitespace-nowrap">{t('marketplace.wizard.installNow')}</span>
                ) : (
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <span className="shrink-0">{t('common.next')}</span>
                    <ChevronRight size={16} className="shrink-0" />
                  </div>
                )
              )}
            </Button>
          </div>
        </div>
      </div>
      
      <style>{`
        .fa-steps-v3 .ant-steps-item-title { font-size: 11px !important; font-weight: 800 !important; color: #9CA3AF !important; text-transform: uppercase; letter-spacing: 0.1em; }
        .fa-steps-v3 .ant-steps-item-description { font-size: 10px !important; color: #D1D5DB !important; margin-top: -2px; }
        
        /* Icon styles: Hollow line style, no solid block, no border, no shadow */
        .fa-steps-v3 .ant-steps-item-icon { 
          background: transparent !important; 
          border: none !important; 
          box-shadow: none !important;
          width: 32px !important; 
          height: 32px !important; 
          line-height: 32px !important; 
          display: flex !important; 
          align-items: center; 
          justify-content: center; 
          color: #D1D5DB !important;
        }
        
        /* Active step: Text high contrast, Icon brand color, no background/border/shadow */
        .fa-steps-v3 .ant-steps-item-active .ant-steps-item-title { color: #2664FF !important; }
        .fa-steps-v3 .ant-steps-item-active .ant-steps-item-description { color: #9CA3AF !important; }
        .fa-steps-v3 .ant-steps-item-active .ant-steps-item-icon { 
          color: #2664FF !important; 
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        
        /* Finished step: Icon brand color, no background/border/shadow */
        .fa-steps-v3 .ant-steps-item-finish .ant-steps-item-title { color: #2664FF !important; }
        .fa-steps-v3 .ant-steps-item-finish .ant-steps-item-icon { 
          color: #2664FF !important; 
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        
        .fa-steps-v3 .ant-steps-item-tail::after { background-color: #F3F4F6 !important; height: 1px !important; }

        /* Ensure Antd Button content doesn't wrap or get hidden unexpectedly */
        .whitespace-nowrap.ant-btn > span {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          width: 100% !important;
        }
      `}</style>
    </FAModal>
  );
};

export default InstallWizardModal;
