import React, { useState, useActionState } from 'react';
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

  // React 19 Actions: useActionState replaces manual isPending logic
  const [state, installAction, isPending] = useActionState(async (prevState: any) => {
    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { success: true };
  }, null);

  const handleNext = () => {
    if (current === 2) {
      // Trigger the action
      installAction();
    } else {
      setCurrent(current + 1);
    }
  };

  // Observe action success
  React.useEffect(() => {
    if (state?.success) {
      message.success(t('marketplace.wizard.success', { name: app.name }));
      onClose();
    }
  }, [state, app.name, onClose, t]);

  const steps = [
    { title: t('marketplace.wizard.step.scopes'), icon: <Lock size={16} /> },
    { title: t('marketplace.wizard.step.target'), icon: <Database size={16} /> },
    { title: t('marketplace.wizard.step.config'), icon: <SlidersHorizontal size={16} /> },
  ];

  return (
    <FAModal
      open={open}
      onCancel={onClose}
      size="M"
      footer={null}
      closable={!isPending}
      maskClosable={false}
      styles={{ body: { padding: 0 } }}
    >
      <div className="bg-bg-card rounded-card overflow-hidden">
        {/* Wizard Header */}
        <div className="p-8 pb-6 bg-bg-page border-b border-border">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-bg-card shadow-sm border border-border p-2 shrink-0">
                <img src={app.icon} alt="" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="text-fa-t4 font-fa-semibold text-text-primary uppercase tracking-widest m-0">{t('marketplace.wizard.title')}</h2>
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
        <div className="p-8 min-h-[400px]">
          {current === 0 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="p-4 bg-brand-bg border border-brand/10 rounded-xl flex gap-3.5 items-start">
                  <Info size={18} className="text-brand shrink-0 mt-0.5" />
                  <p className="text-fa-t6 text-text-secondary leading-relaxed m-0">
                    {t('marketplace.wizard.scope.desc')}：该应用包被签名机构确认为安全，但仍需授权访问您的逻辑数据域。
                  </p>
               </div>
               
               <div className="space-y-3">
                  <PermissionItem 
                    icon={<Lock size={16} />} 
                    title="数据读取"
                    desc={t('marketplace.wizard.scope.media')}
                  />
                  <PermissionItem 
                    icon={<CheckCircle2 size={16} />} 
                    title="产物写入"
                    desc={t('marketplace.wizard.scope.artifacts')}
                  />
                  {app.scopes.outbound && (
                    <PermissionItem 
                      icon={<Globe size={16} />} 
                      title="网络外发"
                      desc={t('marketplace.wizard.scope.outbound')}
                      warning
                    />
                  )}
               </div>

               <div className="pt-4 border-t border-divider">
                  <Checkbox checked={agreed} onChange={e => setAgreed(e.target.checked)}>
                    <span className="text-fa-t5 font-fa-semibold text-text-primary ml-2">{t('marketplace.wizard.scope.agree')}</span>
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
               <div className="p-5 bg-bg-page border border-border border-dashed rounded-xl flex gap-4 items-start">
                  <Info size={18} className="text-brand shrink-0 mt-0.5" />
                  <p className="text-fa-t5 text-text-secondary leading-relaxed m-0">
                    {t('marketplace.wizard.target.tip')}
                  </p>
               </div>
            </div>
          )}

          {current === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="flex flex-col gap-2.5">
                  <label className="text-fa-t6 font-fa-semibold text-text-tertiary uppercase tracking-widest">{t('marketplace.wizard.config.threshold')}</label>
                  <Input defaultValue="0.80" className="h-11 font-mono text-fa-t5" />
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
          )}
        </div>

        {/* Wizard Footer */}
        <div className="p-6 bg-bg-page border-t border-border flex justify-between items-center shrink-0">
          <Button 
            disabled={current === 0 || isPending} 
            onClick={() => setCurrent(current - 1)}
            className="h-10 px-6 font-fa-semibold text-text-tertiary border-none"
          >
            {t('common.back')}
          </Button>
          
          <div className="flex gap-3">
            <Button onClick={onClose} disabled={isPending} className="h-10 px-6 font-fa-semibold text-text-secondary">{t('common.cancel')}</Button>
            <Button 
              type="primary" 
              disabled={current === 0 && !agreed}
              loading={isPending}
              onClick={handleNext}
              className="h-10 px-8 font-fa-semibold uppercase tracking-widest shadow-lg flex items-center gap-2"
            >
              {isPending ? t('marketplace.wizard.installing') : (current === 2 ? t('marketplace.wizard.installNow') : t('common.next'))}
              {!isPending && current < 2 && <ChevronRight size={16} />}
            </Button>
          </div>
        </div>
      </div>
    </FAModal>
  );
};

const PermissionItem = ({ icon, title, desc, warning }: any) => (
  <div className={`p-4 rounded-xl border flex gap-4 transition-all ${warning ? 'bg-warning/5 border-warning/20' : 'bg-bg-page border-border shadow-sm'}`}>
     <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${warning ? 'bg-bg-card text-warning shadow-sm' : 'bg-bg-card text-text-tertiary shadow-sm'}`}>
        {icon}
     </div>
     <div className="min-w-0">
        <h4 className={`text-fa-t5 font-fa-semibold mb-0.5 m-0 ${warning ? 'text-warning' : 'text-text-primary'}`}>{title}</h4>
        <p className="text-fa-t6 text-text-secondary leading-relaxed m-0 opacity-80">{desc}</p>
     </div>
  </div>
);

export default InstallWizardModal;