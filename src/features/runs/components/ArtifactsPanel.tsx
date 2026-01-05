import React, { useState } from 'react';
import { useI18n } from '../../../i18n/index';
import { RunInstance } from '../../../shared/mocks/runs';
import FACard from '../../../ui/FACard';
import { Button, Image, Drawer, Divider, Tooltip } from 'antd';
import { Image as ImageIcon, FileText, Download, Maximize2, AlertCircle, ChevronRight } from 'lucide-react';

const ArtifactsPanel: React.FC<{ run: RunInstance }> = ({ run }) => {
  const { t } = useI18n();
  const [reportPreviewOpen, setReportPreviewOpen] = useState(false);
  
  const isFailed = run.status === 'failed';

  if (isFailed) return (
    <FACard title={t('runs.detail.artifacts')} density="comfort" className="bg-bg-card border-border shadow-card">
      <div className="py-12 flex flex-col items-center justify-center text-center">
         <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mb-6 text-error">
           <AlertCircle size={32} />
         </div>
         <h3 className="text-fa-t4 font-fa-semibold text-text-primary mb-2">执行中断</h3>
         <p className="text-fa-t5 text-error max-w-md mb-8">证据链逻辑执行中断，未能成功生成任何业务产物。</p>
      </div>
    </FACard>
  );

  const images = run.artifacts.filter(a => a.type === 'image');
  const pdfs = run.artifacts.filter(a => a.type === 'pdf');

  return (
    <FACard title={t('runs.detail.artifacts')} density="comfort" className="bg-bg-card border-border shadow-card overflow-hidden">
      <div className="space-y-12">
        
        {/* 1. Keyframes Grid */}
        <section>
           <div className="flex items-center justify-between mb-5 px-1 min-h-[32px]">
             <div className="flex items-center gap-3">
               <div className="flex items-center gap-2 text-text-tertiary">
                 <ImageIcon size={14} />
                 <h4 className="text-fa-t6 font-fa-semibold uppercase tracking-widest leading-none m-0">
                   {t('runs.artifacts.keyframes')}
                 </h4>
               </div>
               <span className="text-fa-t7 font-fa-semibold font-mono text-[10px] text-brand bg-brand-bg px-1.5 py-0.5 rounded tabular-nums leading-none flex items-center h-[18px]">
                 {images.length}/12
               </span>
             </div>
             <Button 
                type="link" 
                size="small" 
                className="text-fa-t6 font-fa-semibold uppercase tracking-widest text-brand p-0 h-auto flex items-center"
             >
               {t('runs.artifacts.viewAll')}
             </Button>
           </div>
           
           <Image.PreviewGroup>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map(img => (
                  <div key={img.id} className="group aspect-video bg-bg-page rounded-card overflow-hidden relative border border-border shadow-sm cursor-zoom-in">
                     <Image 
                       src={img.thumbnail} 
                       wrapperClassName="w-full h-full block"
                       className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                       preview={{ mask: <div className="flex items-center gap-2 text-fa-t6 font-fa-semibold"><Maximize2 size={16} /> 预览</div> }}
                     />
                     <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <p className="text-fa-t7 font-fa-semibold font-mono text-[9px] text-text-inverse truncate m-0 uppercase tracking-tighter">{img.name}</p>
                     </div>
                  </div>
                ))}
             </div>
           </Image.PreviewGroup>
        </section>

        {/* 2. Documentation & Analysis */}
        <section>
           <div className="flex items-center justify-between mb-5 px-1 min-h-[32px]">
             <div className="flex items-center gap-3">
               <div className="flex items-center gap-2 text-text-tertiary">
                 <FileText size={14} />
                 <h4 className="text-fa-t6 font-fa-semibold uppercase tracking-widest leading-none m-0">
                   {t('runs.artifacts.reports')}
                 </h4>
               </div>
               <span className="text-fa-t7 font-fa-semibold font-mono text-[10px] text-text-tertiary bg-bg-page px-1.5 py-0.5 rounded tabular-nums leading-none flex items-center h-[18px]">
                 {pdfs.length}
               </span>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pdfs.map(doc => (
                <div 
                  key={doc.id} 
                  onClick={() => setReportPreviewOpen(true)}
                  className="flex items-center justify-between p-4 bg-bg-page border border-border rounded-card hover:bg-bg-card hover:border-brand/40 transition-all group shadow-sm cursor-pointer"
                >
                   <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-control bg-bg-card border border-border flex items-center justify-center text-brand shrink-0 group-hover:bg-brand-bg group-hover:border-brand/10 transition-colors shadow-sm">
                         <FileText size={20} />
                      </div>
                      <div className="min-w-0">
                         <h5 className="text-fa-t5 font-fa-semibold text-text-primary truncate leading-tight mb-1 group-hover:text-brand transition-colors">{doc.name}</h5>
                         <div className="flex items-center gap-2">
                           <span className="text-fa-t7 font-fa-semibold font-mono text-[10px] text-text-tertiary uppercase">PDF • 2.4 MB</span>
                           <Divider type="vertical" className="bg-border-divider h-3" />
                           <span className="text-fa-t7 font-fa-semibold font-mono text-[9px] text-text-tertiary">14:26:10</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                      <Tooltip title={t('runs.artifacts.download')}>
                        <Button 
                          type="text" 
                          size="small" 
                          icon={<Download size={16} />} 
                          className="text-text-tertiary hover:text-brand h-8 w-8 flex items-center justify-center p-0" 
                        />
                      </Tooltip>
                      <ChevronRight size={14} className="text-text-disabled opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>

      <Drawer
        title={<span className="text-fa-t3 font-fa-semibold text-text-primary">报告预览</span>}
        placement="right"
        width={720}
        onClose={() => setReportPreviewOpen(false)}
        open={reportPreviewOpen}
        extra={<Button icon={<Download size={14} />} className="font-fa-semibold uppercase tracking-widest">下载 PDF</Button>}
        styles={{ body: { padding: '24px', backgroundColor: 'rgba(var(--fa-bg-page), 1)' } }}
      >
        <div className="h-full bg-bg-page rounded-card flex items-center justify-center border border-border p-12 text-center text-text-disabled">
           <div>
             <FileText size={48} className="mx-auto mb-4 opacity-20" />
             <p className="text-fa-t5 font-fa-medium">PDF 渲染引擎加载中...</p>
           </div>
        </div>
      </Drawer>
    </FACard>
  );
};

export default ArtifactsPanel;