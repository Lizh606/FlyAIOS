
import React from 'react';
import { Copy, Check } from 'lucide-react';
import { Tooltip, message } from 'antd';

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
      <span className="fa-t7-mono text-gray-400 font-bold uppercase tracking-tighter tabular-nums truncate max-w-[120px]">
        {uid.startsWith('#') ? uid : `#${uid}`}
      </span>
      <div className="w-5 h-5 flex items-center justify-center rounded-md bg-gray-50 border border-gray-100 opacity-0 group-hover/uid:opacity-100 transition-all text-gray-400 hover:text-brand hover:border-brand/20 shadow-sm shrink-0">
        {copied ? <Check size={10} className="text-green-500" /> : <Copy size={10} />}
      </div>
    </div>
  );
};

export default UIDChip;
