import React from 'react';
import { Copy, Check } from 'lucide-react';
import { message } from 'antd';

interface UIDChipProps {
  uid: string;
  className?: string;
}

const UIDChip: React.FC<UIDChipProps> = ({ uid, className = "" }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(uid);
    setCopied(true);
    message.success({ content: `UID 已复制: ${uid}`, key: 'uid-copy' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`inline-flex items-center gap-2 group/uid cursor-pointer ${className}`} onClick={handleCopy}>
      <span className="text-fa-t7 font-fa-semibold font-mono text-text-tertiary uppercase tracking-tighter tabular-nums truncate max-w-[120px]">
        {uid.startsWith('#') ? uid : `#${uid}`}
      </span>
      <div className="w-5 h-5 flex items-center justify-center rounded-md bg-bg-page border border-border opacity-0 group-hover/uid:opacity-100 transition-all text-text-tertiary hover:text-brand hover:border-brand/20 shadow-sm shrink-0">
        {copied ? <Check size={10} className="text-success" /> : <Copy size={10} />}
      </div>
    </div>
  );
};

export default UIDChip;