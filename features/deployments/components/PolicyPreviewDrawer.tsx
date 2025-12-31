import React from 'react';
import FADrawer from '../../../ui/FADrawer';
import { FileCode, Info, Copy } from 'lucide-react';
import { useI18n } from '../../../i18n';
import { Button, message } from 'antd';

interface PolicyPreviewDrawerProps {
  open: boolean;
  onClose: () => void;
  policy: any;
}

const PolicyPreviewDrawer: React.FC<PolicyPreviewDrawerProps> = ({ open, onClose, policy }) => {
  const { t } = useI18n();

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(policy, null, 2));
    message.success({ 
      content: t('deployments.preview.copySuccess'), 
      key: 'copy-dsl' 
    });
  };

  const byteSize = JSON.stringify(policy || {}).length;

  return (
    <FADrawer
      title={t('deployments.detail.preview')}
      open={open}
      onClose={onClose}
      width={720}
      footerActions={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-5 opacity-70">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(var(--fa-success),0.4)]" />
              <span className="text-fa-t7-mono text-[10px] text-text-tertiary uppercase font-black tracking-widest pt-0.5">
                {t('deployments.preview.syntaxLabel')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand shadow-[0_0_8px_rgba(var(--fa-brand),0.4)]" />
              <span className="text-fa-t7-mono text-[10px] text-text-tertiary uppercase font-black tracking-widest pt-0.5">
                {t('deployments.preview.activeLabel')}
              </span>
            </div>
          </div>
          <Button 
            type="primary" 
            icon={<Copy size={16} />} 
            onClick={handleCopy}
            className="fa-t6 font-fa-semibold uppercase tracking-widest h-9 px-6 shadow-md"
          >
            {t('deployments.preview.copyBtn')}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col h-full overflow-hidden">
        {/* Context Instruction Card */}
        <div className="mb-6 flex items-start gap-4 p-5 bg-brand-bg rounded-xl border border-brand/10 shadow-sm shrink-0">
          <Info size={20} className="text-brand shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <p className="text-fa-t5 text-brand font-fa-semibold m-0 leading-tight uppercase tracking-wider">
              {t('deployments.preview.manifestLabel')}
            </p>
            <p className="text-fa-t6 text-text-secondary m-0 leading-relaxed">
              {t('deployments.preview.manifestDesc')}
            </p>
          </div>
        </div>

        {/* Code Inspector Block */}
        <div className="flex-1 min-h-0 bg-[#0A0F1E] rounded-2xl border border-white/5 shadow-2xl overflow-hidden flex flex-col">
           <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5 shrink-0">
              <div className="flex items-center gap-3">
                 <FileCode size={14} className="text-brand" />
                 <span className="text-fa-t7-mono font-black text-white/80 uppercase tracking-[0.2em] pt-0.5">
                   flyai-dsl-manifest-v1.json
                 </span>
              </div>
              <span className="text-fa-t7-mono font-fa-semibold text-white/20 uppercase tabular-nums">
                {t('deployments.preview.sizeLabel', { size: byteSize })}
              </span>
           </div>
           
           <div className="flex-1 overflow-auto custom-scrollbar p-6">
              <pre className="m-0 font-mono text-[13px] text-white/90 leading-[1.7]">
                {formatJson(policy)}
              </pre>
           </div>
        </div>
      </div>
      
      <style>{`
        .json-key { color: rgba(var(--fa-live), 1); }
        .json-string { color: rgba(var(--fa-brand), 1); }
        .json-number { color: #F59E0B; }
        .json-boolean { color: #EC4899; }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </FADrawer>
  );
};

const formatJson = (obj: any) => {
  if (!obj) return null;
  const json = JSON.stringify(obj, null, 2);
  return json.split('\n').map((line, i) => {
    const parts = line.match(/^(\s*)(".*")(: )(.*)$/);
    if (parts) {
      const val = parts[4].trim();
      const isString = val.startsWith('"');
      const isBoolean = val.includes('true') || val.includes('false');
      
      return (
        <div key={i} className="flex">
          <span className="whitespace-pre text-white/20">{parts[1]}</span>
          <span className="json-key">{parts[2]}</span>
          <span className="text-white/40">{parts[3]}</span>
          <span className={isString ? 'json-string' : isBoolean ? 'json-boolean' : 'json-number'}>
            {parts[4]}
          </span>
        </div>
      );
    }
    return <div key={i} className="text-white/30">{line}</div>;
  });
};

export default PolicyPreviewDrawer;