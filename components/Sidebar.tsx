
import React from 'react';
import { 
  Layout, Map as MapIcon, FileText, Settings, 
  Database, Users, HelpCircle, LogOut,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { TYPOGRAPHY } from '../constants';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onSettingsClick?: () => void;
}

// Sidebar component with fixed react-router-dom imports
const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle, onSettingsClick }) => {
  const location = useLocation();
  const { t } = useI18n();

  const navItems = [
    { icon: Layout, label: t('nav.projects'), path: '/' },
    { icon: MapIcon, label: t('nav.map'), path: '/map' },
    { icon: FileText, label: t('nav.logs'), path: '/logs' },
    { icon: Database, label: t('nav.equipment'), path: '/equipment' },
    { icon: Users, label: t('nav.pilots'), path: '/pilots' },
  ];

  const bottomItems = [
    { icon: Settings, label: t('nav.settings'), path: '/settings', isAction: true },
    { icon: HelpCircle, label: t('nav.help'), path: '/help' },
    { icon: LogOut, label: t('nav.logout'), path: '/logout' },
  ];

  return (
    <aside 
      className={`h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col shrink-0 relative z-40 group/sidebar ${
        isCollapsed ? 'w-[56px]' : 'w-[240px]'
      }`}
    >
      {/* Integrated handle for collapse */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-[12px] z-50">
        <button 
          onClick={onToggle}
          className="w-3 h-12 bg-white border border-gray-200 border-l-0 rounded-r-md flex items-center justify-center text-gray-400 hover:text-[#2664FF] transition-all hover:w-4 group/handle shadow-sm active:scale-95"
        >
          {isCollapsed ? (
            <ChevronRight size={10} className="group-hover/handle:translate-x-0.5 transition-transform" />
          ) : (
            <ChevronLeft size={10} className="group-hover/handle:-translate-x-0.5 transition-transform" />
          )}
        </button>
      </div>

      <div className="flex-1 py-4 pt-2 overflow-y-auto px-2 space-y-1 custom-scrollbar overflow-x-hidden">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center rounded-md transition-all group/item relative h-10 ${
                isCollapsed ? 'justify-center' : 'px-3 gap-3'
              } ${
                isActive 
                  ? 'bg-blue-50 text-[#2664FF]' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon 
                size={18} 
                className={`shrink-0 transition-colors ${isActive ? 'text-[#2664FF]' : 'text-gray-400 group-hover/item:text-gray-600'}`} 
              />
              
              <span className={`transition-all duration-300 ${TYPOGRAPHY.bodyStrong} truncate whitespace-nowrap ${
                isCollapsed ? 'w-0 opacity-0 pointer-events-none absolute translate-x-4' : 'w-auto opacity-100'
              }`}>
                {item.label}
              </span>

              {isCollapsed && (
                <div className="fixed left-[64px] bg-[#111827] text-white text-[11px] px-2.5 py-1.5 rounded shadow-xl opacity-0 group-hover/item:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-[100] translate-x-[-8px] group-hover/item:translate-x-0">
                  {item.label}
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#111827] rotate-45 -z-10"></div>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-2 border-t border-gray-100 shrink-0 space-y-0.5 overflow-hidden">
        {bottomItems.map((item) => {
          const content = (
            <>
              <item.icon size={16} className="shrink-0 transition-colors" />
              <span className={`transition-all duration-300 text-[13px] truncate whitespace-nowrap ${
                isCollapsed ? 'w-0 opacity-0 pointer-events-none absolute translate-x-4' : 'w-auto opacity-100'
              }`}>
                {item.label}
              </span>
              {isCollapsed && (
                <div className="fixed left-[64px] bg-[#111827] text-white text-[11px] px-2.5 py-1.5 rounded shadow-xl opacity-0 group-hover/item:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-[100] translate-x-[-8px] group-hover/item:translate-x-0">
                  {item.label}
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#111827] rotate-45 -z-10"></div>
                </div>
              )}
            </>
          );

          if (item.isAction && onSettingsClick) {
            return (
              <button
                key={item.label}
                onClick={onSettingsClick}
                className={`w-full flex items-center rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-all group/item relative h-9 ${
                  isCollapsed ? 'justify-center' : 'px-3 gap-3'
                }`}
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-all group/item relative h-9 ${
                isCollapsed ? 'justify-center' : 'px-3 gap-3'
              }`}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
