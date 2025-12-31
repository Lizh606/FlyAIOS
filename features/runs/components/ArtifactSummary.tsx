import React from 'react';
import { FileText, Image as ImageIcon, Link, FileJson } from 'lucide-react';
import { Popover, Tooltip } from 'antd';
import { useI18n } from '../../../i18n/index';
import { RunArtifact } from '../../../shared/mocks/runs';

interface ArtifactSummaryProps {
  artifacts: RunArtifact[];
  hasReceipt?: boolean;
}

interface ActiveTypeItem {
  type: string;
  icon: any;
  label: string;
  count: number;
}

const ArtifactSummary: React.FC<ArtifactSummaryProps> = ({ artifacts, hasReceipt }) => {
  const { t } = useI18n();

  const counts = {
    pdf: artifacts.filter(a => a.type === 'pdf').length,
    image: artifacts.filter(a => a.type === 'image').length,
    json: artifacts.filter(a => a.type === 'json').length,
    receipt: hasReceipt ? 1 : 0
  };

  const activeTypes: ActiveTypeItem[] = [];
  if (counts.pdf > 0) activeTypes.push({ type: 'pdf', icon: FileText, label: t('runs.artifact.pdf'), count: counts.pdf });
  if (counts.image > 0) activeTypes.push({ type: 'image', icon: ImageIcon, label: t('runs.artifact.image'), count: counts.image });
  if (counts.json > 0) activeTypes.push({ type: 'json', icon: FileJson, label: t('runs.artifact.log'), count: counts.json });
  if (counts.receipt > 0) activeTypes.push({ type: 'receipt', icon: Link, label: t('runs.artifact.receipt'), count: counts.receipt });

  if (activeTypes.length === 0) {
    return <span className="text-fa-t7 font-fa-semibold font-mono text-text-tertiary">—</span>;
  }

  const renderBadge = (item: ActiveTypeItem) => (
    <Tooltip key={item.type} title={`${item.label}: ${item.count}`} mouseEnterDelay={0.5}>
      <div className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-bg-page border border-border rounded-tag text-fa-t7 font-fa-semibold font-mono text-[10px] text-text-secondary transition-colors cursor-help">
        <item.icon size={11} className="text-text-tertiary" />
        <span className="tabular-nums leading-none pt-0.5">{item.count}</span>
      </div>
    </Tooltip>
  );

  const popoverContent = (
    <div className="w-[180px] p-1" onClick={e => e.stopPropagation()}>
      <div className="text-fa-t7 font-fa-semibold font-mono text-[10px] text-text-tertiary uppercase tracking-[0.15em] border-b border-border-divider pb-2 mb-2">
        {t('runs.artifact.detailsTitle')}
      </div>
      <div className="space-y-2">
        {activeTypes.map(item => (
          <div key={item.type} className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-text-secondary">
              <item.icon size={12} className="text-brand/60" />
              <span className="text-fa-t6 font-fa-medium">{item.label}</span>
            </div>
            <span className="text-fa-t7 font-fa-semibold font-mono text-text-primary tabular-nums">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const displayLimit = 2;
  const visible = activeTypes.slice(0, displayLimit);
  const remaining = activeTypes.length - displayLimit;

  return (
    <div className="flex items-center justify-center lg:justify-end gap-1" onClick={e => e.stopPropagation()}>
      <Popover content={popoverContent} trigger="hover" placement="topRight" overlayClassName="fa-popover-v2">
        <div className="flex items-center gap-1 cursor-help">
          {visible.map(renderBadge)}
          {remaining > 0 && (
            <div className="w-5 h-5 flex items-center justify-center bg-brand-bg border border-brand/20 text-brand rounded-tag text-fa-t7 font-fa-semibold font-mono text-[10px]">
              +{remaining}
            </div>
          )}
        </div>
      </Popover>
    </div>
  );
};

export default ArtifactSummary;