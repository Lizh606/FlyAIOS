
import React from 'react';
import FADrawer from '../../../ui/FADrawer';
import { FileCode } from 'lucide-react';

interface PolicyPreviewDrawerProps {
  open: boolean;
  onClose: () => void;
  policy: any;
}

const PolicyPreviewDrawer: React.FC<PolicyPreviewDrawerProps> = ({ open, onClose, policy }) => {
  return (
    <FADrawer
      title="Deployment Policy (DSL)"
      open={open}
      onClose={onClose}
      width={640}
    >
      <div className="bg-gray-900 rounded-xl p-6 h-full font-mono overflow-auto custom-scrollbar shadow-inner">
         <div className="flex items-center gap-2 mb-6 text-brand">
            <FileCode size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">flyai-dsl-manifest-v1.json</span>
         </div>
         <pre className="text-teal-400 text-[12px] leading-relaxed">
           {JSON.stringify(policy, null, 2)}
         </pre>
      </div>
    </FADrawer>
  );
};

export default PolicyPreviewDrawer;
