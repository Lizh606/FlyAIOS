
import React from 'react';
import FADrawer from '../../../ui/FADrawer';
import { useI18n } from '../../../i18n/index';
import { Connection } from '../../../shared/mocks/integrations';
import { Divider, Tag, Button, Tooltip } from 'antd';
import { Link2, ShieldCheck, Zap, Activity, Info, Copy, Settings } from 'lucide-react';
import DeliveriesTable from './DeliveriesTable';

interface ConnectionDrawerProps {
  connection: Connection | null;
  open: boolean;
  onClose: () => void;
}

const ConnectionDrawer: React.FC<ConnectionDrawerProps> = ({ connection, open, onClose }) => {
  const { t } = useI18n();

  if (!connection) return null;

  return (
    <FADrawer
      title={connection.name}
      open={open}
      onClose={onClose}
      width={720}
      footerActions={
        <Button icon={<Settings size={14}/>} className="fa-t5-strong uppercase tracking-widest">
          Edit Configuration
        </Button>
      }
    >
      <div className="space-y-8">
        {/* 1. Header Overview */}
        <section className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
           <div className="grid grid-cols-2 gap-8">
              <InfoBlock 
                label={t('integrations.drawer.endpoint')} 
                value={connection.endpoint.replace(/(?<=https:\/\/)[^/]+/, '***')} 
                icon={<Link2 size={12}/>}
                mask
              />
              <InfoBlock 
                label={t('integrations.drawer.auth')} 
                value={connection.authType} 
                icon={<ShieldCheck size={12}/>}
              />
           </div>
           
           <Divider className="my-5 opacity-5" />
           
           <div>
              <span className="fa-t7-mono text-[9px] text-gray-400 font-bold uppercase tracking-widest block mb-3">
                {t('integrations.drawer.mapping')}
              </span>
              <div className="flex flex-wrap gap-2">
                 {connection.mapping.map(m => (
                   <Tag key={m} color="blue" className="m-0 fa-t7-mono font-black uppercase border-none px-2.5 py-0.5 shadow-sm">
                     {m}
                   </Tag>
                 ))}
                 <Tag className="m-0 fa-t7-mono border-dashed bg-transparent text-gray-300">+ New Event</Tag>
              </div>
           </div>
        </section>

        {/* 2. Deliveries Trace */}
        <section className="space-y-4">
           <div className="flex items-center justify-between px-1">
              <h3 className="fa-t4 text-gray-900 flex items-center gap-2">
                <Activity size={18} className="text-brand" />
                {t('integrations.drawer.deliveries')}
              </h3>
              <div className="flex items-center gap-2">
                 <span className="fa-t7-mono text-[10px] text-gray-400">STATUS: ACTIVE</span>
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              </div>
           </div>
           
           <DeliveriesTable data={connection.deliveries} />
        </section>
      </div>
    </FADrawer>
  );
};

const InfoBlock = ({ label, value, icon, mask }: any) => (
  <div className="flex flex-col gap-1.5">
    <span className="fa-t7-mono text-[9px] text-gray-400 font-bold uppercase tracking-widest">{label}</span>
    <div className="flex items-center gap-2">
       <span className="text-gray-300">{icon}</span>
       <span className={`fa-t5-strong text-gray-800 ${mask ? 'font-mono text-[13px] opacity-60' : ''}`}>
         {value}
       </span>
    </div>
  </div>
);

export default ConnectionDrawer;
