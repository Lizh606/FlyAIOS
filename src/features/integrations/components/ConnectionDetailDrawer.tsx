import React, { useState, useEffect } from 'react';
import { Tabs, Tag, Divider, Empty, Button, message, Tooltip, Form, Input, Select } from 'antd';
import { Settings, Activity, Link2, ShieldCheck, History, ExternalLink, RefreshCw, Copy, Clock, Globe, Save, XCircle, Plus } from 'lucide-react';
import { useI18n } from '../../../i18n';
import FADrawer from '../../../ui/FADrawer';
import { Connection } from '../../../shared/mocks/integrations';
import FAStatus from '../../../ui/FAStatus';
import DeliveriesTable from './DeliveriesTable';

interface ConnectionDetailDrawerProps {
  connection: Connection | null;
  open: boolean;
  onClose: () => void;
}

const ConnectionDetailDrawer: React.FC<ConnectionDetailDrawerProps> = ({ connection, open, onClose }) => {
  const { t } = useI18n();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Mock permission check
  const hasEditPermission = true;

  useEffect(() => {
    if (open && connection) {
      form.setFieldsValue({
        endpoint: connection.endpoint,
        mapping: connection.mapping
      });
      setIsEditing(false);
      setHasChanges(false);
    }
  }, [open, connection, form]);

  if (!connection) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    message.success({ content: `${label} 已复制`, key: 'copy' });
  };

  const handleTestConnection = () => {
    message.loading({ content: `正在向 ${connection.name} 发送探测包...`, key: 'test-conn' });
    setTimeout(() => {
      message.success({ content: '探测成功：目标端点响应 HTTP 200 OK', key: 'test-conn', duration: 3 });
    }, 1500);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const values = await form.validateFields();
      // Mock API call
      setTimeout(() => {
        setIsSaving(false);
        setIsEditing(false);
        setHasChanges(false);
        message.success('配置已保存并生效');
      }, 1000);
    } catch (err) {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const requestClose = () => {
    if (isEditing && hasChanges) {
      message.warning(t('integrations.action.unsavedConfirm'));
      return;
    }
    onClose();
  };

  const renderFooter = () => {
    const commonBtnClass = "text-fa-t5 font-fa-semibold uppercase tracking-widest h-10 px-6 w-full md:w-auto";
    
    if (isEditing) {
      return (
        <div className="flex flex-col md:flex-row items-center gap-3 w-full justify-end px-2">
          <Button 
            onClick={handleCancelEdit}
            className={`${commonBtnClass} text-text-secondary border-border order-2 md:order-1`}
          >
            {t('integrations.action.cancel')}
          </Button>
          <Button 
            type="primary" 
            icon={<Save size={16}/>} 
            loading={isSaving}
            onClick={handleSave}
            className={`${commonBtnClass} shadow-lg order-1 md:order-2`}
          >
            {t('integrations.action.save')}
          </Button>
        </div>
      );
    }

    return (
      <div className="flex flex-col md:flex-row items-center gap-3 w-full justify-between px-2">
        <Button 
          icon={<RefreshCw size={14}/>} 
          onClick={handleTestConnection}
          className={`${commonBtnClass} text-text-tertiary border-border hover:text-brand hover:border-brand/40 order-2 md:order-1`}
        >
          {t('integrations.action.test')}
        </Button>
        <Tooltip title={!hasEditPermission ? t('integrations.drawer.noPermission') : ''}>
          <Button 
            type="primary" 
            disabled={!hasEditPermission}
            icon={<Settings size={16}/>} 
            onClick={() => setIsEditing(true)}
            className={`${commonBtnClass} shadow-lg order-1 md:order-2`}
          >
            {t('integrations.action.edit')}
          </Button>
        </Tooltip>
      </div>
    );
  };

  return (
    <FADrawer
      title={
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-fa-t2 font-fa-semibold text-text-primary leading-none">{connection.name}</span>
            <FAStatus 
              status={connection.status === 'connected' ? 'success' : connection.status === 'failed' ? 'error' : 'warning'} 
              label={t(`integrations.state.${connection.status}`)} 
            />
          </div>
          <div className="flex items-center gap-4 text-text-tertiary">
             <div className="flex items-center gap-1.5 group cursor-pointer" onClick={() => handleCopy(connection.id, 'ID')}>
                <span className="text-fa-t7 font-fa-semibold font-mono text-[10px] uppercase tracking-widest">{t('integrations.drawer.auditId')}:</span>
                <span className="text-fa-t7 font-fa-semibold font-mono text-[11px] group-hover:text-brand transition-colors tabular-nums">#{connection.id.toUpperCase()}</span>
                <Copy size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
             <Divider type="vertical" className="bg-divider h-3" />
             <div className="flex items-center gap-1.5">
                <Globe size={12} className="opacity-50" />
                <span className="text-fa-t6 font-fa-medium uppercase tracking-tight">{connection.type === 'Webhook' ? 'Webhook / HTTP' : 'Work Order / RFC'}</span>
             </div>
          </div>
        </div>
      }
      open={open}
      onClose={requestClose}
      width={640}
      footerActions={renderFooter()}
    >
      <div className="fa-tabs-v2 h-full flex flex-col">
        <Tabs
          activeKey={isEditing ? 'basic' : undefined}
          defaultActiveKey="basic"
          className="flex-1"
          items={[
            {
              key: 'basic',
              label: t('integrations.drawer.tab.basic'),
              children: (
                <Form 
                  form={form} 
                  layout="vertical" 
                  onValuesChange={() => setHasChanges(true)}
                  className="py-8 space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300"
                >
                  {/* Meta Section */}
                  <section>
                    <h4 className="text-fa-t4 font-fa-semibold text-text-primary mb-6 flex items-center gap-2">
                      <Activity size={18} className="text-brand" />
                      {t('integrations.drawer.section.meta')}
                    </h4>
                    <div className="bg-bg-page/50 p-6 rounded-2xl border border-border shadow-sm space-y-6">
                       <div className="grid grid-cols-1 gap-6">
                          <Form.Item 
                            name="endpoint" 
                            label={<span className="text-fa-t7 font-fa-semibold font-mono text-[10px] text-text-tertiary uppercase tracking-[0.15em]">{t('integrations.drawer.endpoint')}</span>}
                            className="m-0"
                          >
                            {isEditing ? (
                              <Input className="h-10 text-fa-t5 font-mono" prefix={<Link2 size={14} className="text-text-disabled" />} />
                            ) : (
                              <MetaBlock 
                                label={t('integrations.drawer.endpoint')} 
                                value={connection.endpoint} 
                                icon={<Link2 size={12}/>} 
                                mono 
                                copyable 
                                onCopy={() => handleCopy(connection.endpoint, 'Endpoint')}
                                noLabel
                              />
                            )}
                          </Form.Item>
                       </div>
                       <div className="grid grid-cols-2 gap-8 pt-4 border-t border-divider">
                          <MetaBlock label={t('integrations.drawer.auth')} value={connection.authType} icon={<ShieldCheck size={12}/>} />
                          <MetaBlock label={t('integrations.col.updated')} value={connection.updatedAt} icon={<Clock size={12}/>} tabular />
                       </div>
                    </div>
                  </section>
                  
                  {/* Events Section */}
                  <section>
                    <h4 className="text-fa-t4 font-fa-semibold text-text-primary mb-6 flex items-center gap-2">
                      <ShieldCheck size={18} className="text-live" />
                      {t('integrations.drawer.section.events')}
                    </h4>
                    {isEditing ? (
                      <Form.Item name="mapping" className="m-0">
                        <Select
                          mode="multiple"
                          className="w-full"
                          placeholder="选择要订阅的系统事件..."
                          options={[
                            { label: t('integrations.event.ReviewTrue'), value: 'ReviewTrue' },
                            { label: t('integrations.event.ReportReady'), value: 'ReportReady' },
                            { label: t('integrations.event.EdgeAlertRaised'), value: 'EdgeAlertRaised' },
                            { label: t('integrations.event.SystemError'), value: 'SystemError' },
                          ]}
                        />
                      </Form.Item>
                    ) : (
                      <div className="flex flex-wrap gap-2.5">
                        {connection.mapping.map(m => (
                          <Tooltip key={m} title={`Code: ${m.toUpperCase()}`}>
                            <Tag className="m-0 text-fa-t6 font-fa-semibold text-text-secondary bg-bg-card border border-border rounded-lg px-3 py-1.5 shadow-sm hover:border-brand/40 transition-colors cursor-help">
                              {t(`integrations.event.${m}`) || m}
                            </Tag>
                          </Tooltip>
                        ))}
                      </div>
                    )}
                  </section>
                </Form>
              )
            },
            {
              key: 'deliveries',
              label: t('integrations.drawer.tab.deliveries'),
              disabled: isEditing,
              children: (
                <div className="py-6">
                  {connection.deliveries && connection.deliveries.length > 0 ? (
                    <div className="space-y-5 animate-in fade-in duration-500">
                      <div className="flex items-center justify-between px-1">
                         <div className="flex items-center gap-2">
                            <span className="text-fa-t7 font-fa-semibold font-mono text-[10px] text-text-tertiary uppercase tracking-widest leading-none">
                              审计流水线 • {connection.deliveries.length} 条记录
                            </span>
                         </div>
                         <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-live animate-pulse shadow-[0_0_8px_rgba(var(--fa-live),0.4)]" />
                           <span className="text-fa-t7 font-fa-semibold font-mono text-[9px] text-live uppercase">{t('integrations.delivery.listening')}</span>
                         </div>
                      </div>
                      <DeliveriesTable data={connection.deliveries} />
                    </div>
                  ) : (
                    <div className="py-24 flex flex-col items-center justify-center grayscale opacity-40">
                      <Empty 
                        image={<History size={48} className="text-text-disabled" />} 
                        description={<span className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-text-tertiary">{t('integrations.drawer.emptyDeliveries')}</span>} 
                      />
                      <Button type="link" icon={<ExternalLink size={14}/>} className="text-fa-t6 font-fa-semibold mt-2">查看完整审计流水</Button>
                    </div>
                  )}
                </div>
              )
            }
          ]}
        />
      </div>
    </FADrawer>
  );
};

const MetaBlock = ({ label, value, icon, mono, tabular, copyable, onCopy, noLabel }: any) => (
  <div className="flex flex-col gap-2 min-w-0 group/meta">
    {!noLabel && <span className="text-fa-t7 font-fa-semibold font-mono text-[10px] text-text-tertiary uppercase tracking-[0.15em] leading-none">{label}</span>}
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="text-text-disabled shrink-0">{icon}</span>
        <Tooltip title={value}>
          <span className={`text-fa-t5 font-fa-semibold text-text-primary truncate ${mono ? 'font-mono tracking-tighter' : ''} ${tabular ? 'font-mono tabular-nums' : ''}`}>
            {value}
          </span>
        </Tooltip>
      </div>
      {copyable && (
        <button 
          onClick={onCopy}
          className="p-1.5 hover:bg-action-hover rounded-md text-text-tertiary hover:text-brand opacity-0 group-hover/meta:opacity-100 transition-all shrink-0 border-none bg-transparent cursor-pointer"
        >
          <Copy size={13} />
        </button>
      )}
    </div>
  </div>
);

export default ConnectionDetailDrawer;