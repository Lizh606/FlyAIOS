
import React, { useState, useMemo, useEffect } from 'react';
import { Bell, User, Menu as MenuIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, Button } from 'antd';
import { useI18n } from '../i18n';
import FACollapseHandle from '../ui/FACollapseHandle';
import FAModal from '../ui/FAModal';
import FASidebar from './FASidebar';
import { CheckCircle2, Languages } from 'lucide-react';

const FAAppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { t, lang, setLang } = useI18n();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 768;
  
  const isImmersivePage = useMemo(() => {
    return location.pathname.includes('/workflows/wf-') || location.pathname.includes('/execution/');
  }, [location.pathname]);

  const [isCollapsed, setIsCollapsed] = useState(windowWidth < 1200 || isImmersivePage);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 1200) setIsCollapsed(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isImmersivePage) setIsCollapsed(true);
  }, [isImmersivePage]);

  return (
    <div className="h-screen flex flex-col overflow-hidden selection:bg-brand/30">
      {/* 56px Topbar - rgb(31, 31, 31) */}
      <header className="h-[56px] bg-[rgb(31,31,31)] flex items-center justify-between px-6 z-[60] border-b border-white/10 shrink-0">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button 
              type="text" 
              icon={<MenuIcon className="text-white" size={20} />} 
              onClick={() => setMobileMenuOpen(true)}
              className="hover:bg-white/10"
            />
          )}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand rounded-md flex items-center justify-center font-bold text-white shadow-sm">F</div>
            <span className="fa-t4 text-white tracking-tight hidden sm:block">FlyAIOS</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-white/60 hover:text-white rounded-full transition-all relative">
            <Bell size={18} />
          </button>
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 cursor-pointer hover:bg-brand hover:text-white transition-all">
            <User size={16} />
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Sidebar */}
        <Drawer
          placement="left"
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          width={Math.min(320, windowWidth * 0.92)}
          closable={false}
          styles={{ body: { padding: 0 } }}
        >
          <FASidebar isCollapsed={false} onSettingsClick={() => setSettingsOpen(true)} isMobile />
        </Drawer>

        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside className={`h-full bg-white transition-all duration-300 flex flex-col relative z-40 ${isCollapsed ? 'w-[72px]' : 'w-[240px]'}`}>
            <div className="absolute top-1/2 -translate-y-1/2 left-full">
              <FACollapseHandle side="right" isCollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)} />
            </div>
            <FASidebar isCollapsed={isCollapsed} onSettingsClick={() => setSettingsOpen(true)} />
          </aside>
        )}

        <main className="flex-1 bg-[var(--fa-bg-page)] overflow-y-auto relative custom-scrollbar z-10">
          {children}
        </main>
      </div>

      <FAModal
        title={t('settings.modalTitle')}
        open={settingsOpen}
        onCancel={() => setSettingsOpen(false)}
        onOk={() => setSettingsOpen(false)}
        okText={t('settings.saveBtn')}
        size="M"
      >
        <div className="py-2">
          <section>
            <div className="flex items-center gap-2 text-gray-400 mb-4">
              <Languages size={15} />
              <span className="fa-t6 font-bold uppercase tracking-[0.1em]">{t('settings.regionSection')}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['zh', 'en'].map((l) => (
                <button 
                  key={l}
                  onClick={() => setLang(l as any)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left ${lang === l ? 'border-brand bg-brand/5 ring-1 ring-brand' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                >
                  <div className="flex flex-col">
                    <span className="fa-t5-strong text-gray-900">{l === 'zh' ? '简体中文' : 'English'}</span>
                    <span className="fa-t6 text-gray-400 mt-0.5">{t(`settings.lang${l === 'zh' ? 'Zh' : 'En'}Desc`)}</span>
                  </div>
                  {lang === l && <CheckCircle2 size={18} className="text-brand" />}
                </button>
              ))}
            </div>
          </section>
        </div>
      </FAModal>
    </div>
  );
};

export default FAAppShell;
