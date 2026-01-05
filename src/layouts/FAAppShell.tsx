
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Bell, User, Menu as MenuIcon, Languages, CheckCircle2, 
  Settings, HelpCircle, LogOut 
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Drawer, Button, ConfigProvider, Modal, Dropdown, Tooltip, Divider } from 'antd';
import type { MenuProps } from 'antd';
import { useI18n } from '../i18n';
import FACollapseHandle from '../ui/FACollapseHandle';
import FASidebar from './FASidebar';
import { getAntdTheme } from '../design-system/antdTheme';

const FAAppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
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

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <div className="py-1 px-1">
          <p className="text-fa-t5 font-fa-semibold text-text-primary m-0">Administrator</p>
          <p className="text-fa-t7 text-text-tertiary m-0 uppercase tracking-tighter tabular-nums">admin@flyaios.com</p>
        </div>
      ),
    },
    { type: 'divider' },
    {
      key: 'logout',
      label: t('nav.logout'),
      icon: <LogOut size={14} />,
      danger: true,
      onClick: () => navigate('/logout'),
    },
  ];

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

          <div className="flex items-center gap-1.5 md:gap-3">
            <div className="flex items-center gap-1">
              <Tooltip title={t('nav.help')}>
                <button className="w-9 h-9 flex items-center justify-center text-text-inverse/60 hover:text-text-inverse hover:bg-white/5 rounded-lg transition-all border-none bg-transparent cursor-pointer">
                  <HelpCircle size={18} />
                </button>
              </Tooltip>
              
              <Tooltip title={t('nav.settings')}>
                <button 
                  onClick={() => setSettingsOpen(true)}
                  className="w-9 h-9 flex items-center justify-center text-text-inverse/60 hover:text-text-inverse hover:bg-white/5 rounded-lg transition-all border-none bg-transparent cursor-pointer"
                >
                  <Settings size={18} />
                </button>
              </Tooltip>

              <Tooltip title={t('common.notifications')}>
                <button className="w-9 h-9 flex items-center justify-center text-text-inverse/60 hover:text-text-inverse hover:bg-white/5 rounded-lg transition-all relative border-none bg-transparent cursor-pointer">
                  <Bell size={18} />
                  <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-error rounded-full border border-bg-topbar" />
                </button>
              </Tooltip>
            </div>

            {/* 弱化分割线颜色 bg-white/5 */}
            <Divider type="vertical" className="bg-white/5 h-6 mx-1 md:mx-2" />

            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
              <div className="h-9 px-1.5 rounded-lg hover:bg-white/5 flex items-center gap-2.5 cursor-pointer transition-all border border-transparent hover:border-white/5 group">
                <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-text-inverse font-fa-semibold text-[11px] shadow-inner group-hover:scale-105 transition-transform">
                  AD
                </div>
                <span className="text-fa-t6 font-fa-semibold text-text-inverse/80 hidden lg:inline tracking-tight pt-0.5">Admin</span>
              </div>
            </Dropdown>
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
              <div className="flex items-center gap-2.5 text-text-tertiary mb-6">
                <Languages size={16} strokeWidth={2.5} className="text-text-disabled" />
                <span className="text-fa-t6 font-fa-semibold uppercase tracking-[0.15em]">{t('settings.regionSection')}</span>
              </div>
              
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
                        <span className={`text-fa-t5 font-fa-semibold mb-1 leading-tight ${isSelected ? 'text-brand' : 'text-text-primary'}`}>
                          {l === 'zh' ? '简体中文' : 'English'}
                        </span>
                        <span className="text-fa-t6 text-text-tertiary truncate opacity-80">
                          {t(`settings.lang${l === 'zh' ? 'Zh' : 'En'}Desc`)}
                        </span>
                      </div>
                      
                      <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                        ${isSelected ? 'bg-brand text-text-inverse scale-110 shadow-lg' : 'bg-bg-page border border-border text-transparent group-hover:border-brand/30'}
                      `}>
                        <CheckCircle2 size={16} strokeWidth={3} />
                      </div>

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
