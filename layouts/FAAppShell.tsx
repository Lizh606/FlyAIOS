import React, { useState, useMemo, useEffect } from 'react';
import { Bell, User, Menu as MenuIcon, Languages, CheckCircle2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, Button, ConfigProvider, Modal } from 'antd';
import { useI18n } from '../i18n';
import FACollapseHandle from '../ui/FACollapseHandle';
import FASidebar from './FASidebar';
import { getAntdTheme } from '../design-system/antdTheme';

const FAAppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { t, lang, setLang } = useI18n();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 768;
  
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

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
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const theme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
          setThemeMode(theme || 'light');
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    const initialTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
    if (initialTheme) setThemeMode(initialTheme);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isImmersivePage) setIsCollapsed(true);
  }, [isImmersivePage]);

  return (
    <ConfigProvider theme={getAntdTheme(themeMode)}>
      <div className="h-screen flex flex-col overflow-hidden bg-bg-page text-text-primary selection:bg-brand/30">
        <header className="h-header bg-bg-topbar flex items-center justify-between px-5 z-[60] border-b border-white/5 shrink-0 shadow-lg">
          <div className="flex items-center gap-4">
            {isMobile && (
              <Button 
                type="text" 
                icon={<MenuIcon className="text-text-inverse" size={20} />} 
                onClick={() => setMobileMenuOpen(true)}
              />
            )}
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-brand rounded-md flex items-center justify-center font-bold text-text-inverse shadow-inner">F</div>
              <span className="text-fa-t4 text-text-inverse tracking-tight hidden sm:block">FlyAIOS</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-text-inverse/60 hover:text-text-inverse rounded-full transition-all relative">
              <Bell size={18} />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-error rounded-full border border-bg-topbar" />
            </button>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-text-inverse/60 cursor-pointer hover:bg-brand hover:text-text-inverse transition-all">
              <User size={16} />
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <Drawer
            placement="left"
            onClose={() => setMobileMenuOpen(false)}
            open={mobileMenuOpen}
            width={320}
            closable={false}
            styles={{ body: { padding: 0 } }}
          >
            <FASidebar isCollapsed={false} onSettingsClick={() => setSettingsOpen(true)} isMobile />
          </Drawer>

          {!isMobile && (
            <aside className={`h-full bg-bg-panel border-r border-border transition-all duration-300 flex flex-col relative z-40 ${isCollapsed ? 'w-sidebar-collapsed' : 'w-sidebar-expanded'}`}>
              <div className="absolute top-1/2 -translate-y-1/2 left-full">
                <FACollapseHandle side="right" isCollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)} />
              </div>
              <FASidebar isCollapsed={isCollapsed} onSettingsClick={() => setSettingsOpen(true)} />
            </aside>
          )}

          <main className="flex-1 overflow-y-auto relative custom-scrollbar z-10">
            {children}
          </main>
        </div>

        {/* --- 直接使用 antd Modal 并在内容区应用 FA Token --- */}
        <Modal
          title={t('settings.modalTitle')}
          open={settingsOpen}
          onCancel={() => setSettingsOpen(false)}
          onOk={() => setSettingsOpen(false)}
          okText={t('settings.saveBtn')}
          cancelText={t('common.cancel')}
          centered
          width={600}
          styles={{
            mask: { backdropFilter: 'blur(4px)' }
          }}
        >
          <div className="py-2">
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* 分节标题: T6 Bold + Uppercase + Tertiary Text */}
              <div className="flex items-center gap-2.5 text-text-tertiary mb-6">
                <Languages size={16} strokeWidth={2.5} className="text-text-disabled" />
                <span className="text-fa-t6 font-fa-semibold uppercase tracking-[0.15em]">{t('settings.regionSection')}</span>
              </div>
              
              {/* 语言选项网格: 2列 */}
              <div className="grid grid-cols-2 gap-5">
                {['zh', 'en'].map((l) => {
                  const isSelected = lang === l;
                  return (
                    <button 
                      key={l}
                      onClick={() => setLang(l as any)}
                      className={`
                        group relative flex items-center justify-between p-5 rounded-xl border transition-all text-left min-h-[96px]
                        ${isSelected 
                          ? 'border-brand bg-brand-bg shadow-sm ring-1 ring-brand' 
                          : 'border-border hover:border-border-strong bg-bg-card shadow-sm hover:shadow-md'
                        }
                      `}
                    >
                      <div className="flex flex-col min-w-0 pr-4">
                        {/* 选项标题: T5 Body Strong */}
                        <span className={`text-fa-t5 font-fa-semibold mb-1 leading-tight ${isSelected ? 'text-brand' : 'text-text-primary'}`}>
                          {l === 'zh' ? '简体中文' : 'English'}
                        </span>
                        {/* 选项描述: T6 Caption + Tertiary Text */}
                        <span className="text-fa-t6 text-text-tertiary truncate opacity-80">
                          {t(`settings.lang${l === 'zh' ? 'Zh' : 'En'}Desc`)}
                        </span>
                      </div>
                      
                      {/* 选中指示器 */}
                      <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                        ${isSelected ? 'bg-brand text-text-inverse scale-110 shadow-lg' : 'bg-bg-page border border-border text-transparent group-hover:border-brand/30'}
                      `}>
                        <CheckCircle2 size={16} strokeWidth={3} />
                      </div>

                      {/* 底部悬浮指示条 */}
                      {!isSelected && (
                        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-brand scale-x-0 group-hover:scale-x-100 transition-transform origin-center rounded-b-xl" />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default FAAppShell;