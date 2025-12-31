
import React, { useState } from 'react';
import { COLORS, TYPOGRAPHY } from '../constants';
import Sidebar from './Sidebar';
import { Search, User, Bell, X, Globe, Check } from 'lucide-react';
import { useI18n } from '../i18n';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { lang, setLang, t } = useI18n();

  return (
    <div className="h-screen flex flex-col bg-[#F3F4F6] overflow-hidden relative">
      {/* Top Header */}
      <header 
        className="h-14 flex items-center justify-between px-6 z-50 shrink-0 border-b border-white/5 shadow-lg"
        style={{ backgroundColor: COLORS.topbar, color: 'white' }}
      >
        {/* Left: Logo Section */}
        <div className="flex items-center gap-4 min-w-[180px]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2664FF] rounded flex items-center justify-center font-bold text-white shrink-0 shadow-inner">F</div>
            <span className={`${TYPOGRAPHY.bodyStrong} text-white hidden sm:block tracking-tight`}>FlyAIOS</span>
          </div>
        </div>

        {/* Center: Optimized Search Bar */}
        <div className="flex-1 flex justify-center px-4 hidden md:flex">
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#2664FF] transition-colors" size={14} />
            <input 
              type="text" 
              placeholder={t('nav.searchPlaceholder')}
              className="w-full bg-white/5 border border-white/10 rounded-md py-1.5 pl-9 pr-4 text-sm focus:ring-1 focus:ring-[#2664FF] focus:bg-white/10 transition-all placeholder:text-gray-600 text-white outline-none"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 min-w-[180px] justify-end">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative text-gray-400 hover:text-white">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#111827]"></span>
          </button>
          
          <div className="h-6 w-[1px] bg-white/10 mx-1"></div>
          
          <div className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-2 py-1.5 rounded-md cursor-pointer transition-colors border border-white/5 group">
            <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 group-hover:bg-[#2664FF] group-hover:text-white transition-colors">
              <User size={14} />
            </div>
            <span className={TYPOGRAPHY.caption + " text-gray-300 hidden lg:inline font-medium"}>{t('nav.role')}</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Persistent Sidebar with injected onSettingsClick */}
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
          onSettingsClick={() => setIsSettingsOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {children}
        </main>
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
            onClick={() => setIsSettingsOpen(false)}
          ></div>
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden relative z-10 animate-in zoom-in-95 fade-in duration-200 border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-gray-600">{t('settings.modalTitle')}</h2>
              <button onClick={() => setIsSettingsOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              {/* Language Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Globe size={15} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em]">{t('settings.regionSection')}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setLang('zh')}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${lang === 'zh' ? 'border-[#2664FF] bg-blue-50/50 ring-1 ring-[#2664FF]' : 'border-gray-200 hover:border-gray-300 bg-white shadow-sm'}`}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-[13px] font-semibold text-gray-900">简体中文</span>
                      <span className="text-[11px] text-gray-500 mt-0.5">{t('settings.langZhDesc')}</span>
                    </div>
                    {lang === 'zh' && <Check size={16} className="text-[#2664FF]" />}
                  </button>
                  <button 
                    onClick={() => setLang('en')}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${lang === 'en' ? 'border-[#2664FF] bg-blue-50/50 ring-1 ring-[#2664FF]' : 'border-gray-200 hover:border-gray-300 bg-white shadow-sm'}`}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-[13px] font-semibold text-gray-900">English</span>
                      <span className="text-[11px] text-gray-500 mt-0.5">{t('settings.langEnDesc')}</span>
                    </div>
                    {lang === 'en' && <Check size={16} className="text-[#2664FF]" />}
                  </button>
                </div>
              </section>
            </div>

            <div className="px-6 py-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="px-6 h-10 bg-white border border-gray-200 text-gray-600 rounded text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-gray-100 transition-all active:scale-95 shadow-sm"
              >
                {t('common.cancel')}
              </button>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="px-8 h-10 bg-[#2664FF] text-white rounded text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-blue-700 transition-all shadow-lg active:scale-95"
              >
                {t('settings.saveBtn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppShell;
