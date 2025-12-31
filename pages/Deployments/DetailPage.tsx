
import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message, Divider } from 'antd';
import { useI18n } from '../../i18n';
import { MOCK_DEPLOYMENTS } from '../../shared/mocks/deployments';
import FACard from '../../ui/FACard';
import FAModal from '../../ui/FAModal';
import ProcessingModesPanel from '../../features/deployments/components/ProcessingModesPanel';
import EdgeNodesTable from '../../features/deployments/components/EdgeNodesTable';
import PolicyPreviewDrawer from '../../features/deployments/components/PolicyPreviewDrawer';
import DeploymentHeader from '../../features/deployments/components/DeploymentHeader';
import LiveBindingCard from '../../features/deployments/components/LiveBindingCard';
import DeploymentHistoryCard from '../../features/deployments/components/DeploymentHistoryCard';
import { RefreshCcw, AlertTriangle, ShieldCheck } from 'lucide-react';

const DeploymentDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [showDSL, setShowDSL] = useState(false);
  const [rollbackModalVisible, setRollbackModalVisible] = useState(false);

  const deployment = useMemo(() => 
    MOCK_DEPLOYMENTS.find(d => d.id === id) || MOCK_DEPLOYMENTS[0]
  , [id]);

  const handleRollbackConfirm = () => {
    message.loading({ content: "Reverting deployment manifest...", key: 'rollback' });
    setRollbackModalVisible(false);
    setTimeout(() => {
      message.success({ content: "Rollback to v1.2.9 successful. Nodes are syncing.", key: 'rollback', duration: 3 });
      navigate('/deployments');
    }, 2000);
  };

  return (
    <div className="min-h-full bg-[#F8FAFC]">
      <div className="px-6 py-8 max-w-[1440px] mx-auto w-full animate-in fade-in duration-500">
        
        {/* 1. Refined Header */}
        <DeploymentHeader 
          deployment={deployment} 
          onPreview={() => setShowDSL(true)}
          onRollback={() => setRollbackModalVisible(true)}
        />

        {/* 2. Main Content & Inspector (Two-Column per v0.8) */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content (Left, span 8 equivalent) */}
          <div className="flex-1 min-w-0 space-y-8">
             {/* Processing Modes Summary */}
             <ProcessingModesPanel />

             {/* Deployment Targets Matrix */}
             <FACard title={t('deployments.detail.nodes')} density="comfort" className="bg-white">
                <EdgeNodesTable />
             </FACard>
          </div>

          {/* Inspector (Right, span 4 equivalent) */}
          <aside className="w-full lg:w-[360px] space-y-8 shrink-0">
             {/* Live Strategy Inspector */}
             <LiveBindingCard 
              deployment={deployment} 
              onPreviewManifest={() => setShowDSL(true)} 
             />

             {/* History & Event Chain */}
             <DeploymentHistoryCard deployment={deployment} />
          </aside>
        </div>
      </div>

      {/* Refined Rollback Confirmation per v0.8 (Impact Highlights) */}
      <FAModal
        title={
          <div className="flex items-center gap-2 text-red-600">
            <RefreshCcw size={20} />
            {t('deployments.rollback.confirm')}
          </div>
        }
        open={rollbackModalVisible}
        onCancel={() => setRollbackModalVisible(false)}
        onOk={handleRollbackConfirm}
        isDanger
        okText={t('deployments.detail.rollback')}
        size="S"
      >
        <div className="space-y-6">
           <p className="fa-t5 text-gray-600 leading-relaxed">
             {t('deployments.rollback.desc', { version: 'v1.2.9' })}
           </p>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="fa-t7-mono text-[9px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Current Version</span>
                <span className="fa-t5-strong text-gray-900 font-mono">{deployment.version}</span>
              </div>
              <div className="p-3 bg-blue-50/30 rounded-lg border border-blue-100">
                <span className="fa-t7-mono text-[9px] text-brand font-bold uppercase tracking-widest block mb-1">Target Version</span>
                <span className="fa-t5-strong text-brand font-mono">v1.2.9</span>
              </div>
           </div>

           <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
              <div className="flex items-center gap-2 mb-2 text-red-700">
                <AlertTriangle size={16} />
                <span className="fa-t6 font-bold uppercase tracking-widest">{t('deployments.status.impact')}</span>
              </div>
              <p className="fa-t6 text-red-600 leading-relaxed">
                {t('deployments.rollback.impact', { count: deployment.appliedNodes.length })} 正在执行的任务将被强制终止并重启以加载旧版本策略。
              </p>
           </div>
        </div>
      </FAModal>

      {/* DSL Inspector */}
      <PolicyPreviewDrawer 
        open={showDSL} 
        onClose={() => setShowDSL(false)} 
        policy={deployment} 
      />
    </div>
  );
};

export default DeploymentDetailPage;
