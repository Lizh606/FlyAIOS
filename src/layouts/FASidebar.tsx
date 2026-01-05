
import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { ChevronDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n';
import { NAV_GROUPS } from '../config/menu';

interface FASidebarProps {
  isCollapsed: boolean;
  onSettingsClick: () => void;
  isMobile?: boolean;
}

const FASidebar: React.FC<FASidebarProps> = ({ isCollapsed, onSettingsClick, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useI18n();

  const groups = NAV_GROUPS(t);

  // 映射主菜单
  const menuItems: MenuProps['items'] = groups.map((group, gIdx) => ({
    key: `sub-${gIdx}`,
    icon: group.icon ? <group.icon size={18} /> : null,
    label: group.title,
    children: group.items.map(item => ({
      key: item.path,
      icon: <item.icon size={16} />,
      label: item.label,
      onClick: () => navigate(item.path),
    }))
  }));

  return (
    <div className="h-full flex flex-col bg-bg-panel transition-all duration-300">
      <div className="flex-1 py-4 overflow-y-auto custom-scrollbar overflow-x-hidden">
        <Menu
          mode="inline"
          inlineCollapsed={isMobile ? false : isCollapsed}
          selectedKeys={[location.pathname]}
          defaultOpenKeys={isCollapsed ? [] : ['sub-0', 'sub-1', 'sub-2', 'sub-3', 'sub-4']}
          items={menuItems}
          className="fa-sidebar-menu"
          expandIcon={<ChevronDown size={14} className="text-text-tertiary" />}
        />
      </div>

      <style>{`
        .fa-sidebar-menu.ant-menu {
          background: transparent !important;
          border-inline-end: none !important;
        }

        .fa-sidebar-menu .ant-menu-item, 
        .fa-sidebar-menu .ant-menu-submenu-title {
          border-radius: var(--fa-radius-control) !important;
          margin-block: 4px !important;
          transition: all 0.2s ease !important;
        }

        .fa-sidebar-menu .ant-menu-submenu-selected > .ant-menu-submenu-title {
          color: rgba(var(--fa-brand), 1) !important;
          background-color: transparent !important;
        }
        
        .fa-sidebar-menu .ant-menu-submenu-selected > .ant-menu-submenu-title .ant-menu-item-icon,
        .fa-sidebar-menu .ant-menu-submenu-selected > .ant-menu-submenu-title .ant-menu-submenu-arrow {
          color: rgba(var(--fa-brand), 1) !important;
        }

        .fa-sidebar-menu .ant-menu-item-selected {
          background-color: rgba(var(--fa-brand-bg), var(--fa-brand-bg-alpha)) !important;
          color: rgba(var(--fa-brand), 1) !important;
        }

        .fa-sidebar-menu .ant-menu-item:hover,
        .fa-sidebar-menu .ant-menu-submenu-title:hover {
          background-color: rgba(var(--fa-hover), var(--fa-hover-alpha)) !important;
        }

        .ant-menu-inline-collapsed {
          width: 72px !important;
        }

        .ant-menu-item-selected::after {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default FASidebar;
