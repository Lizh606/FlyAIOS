
import React from 'react';
import { Menu, Divider } from 'antd';
import type { MenuProps } from 'antd';
import { ChevronDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n';
import { NAV_GROUPS, BOTTOM_ITEMS } from '../config/menu';

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
  const bottom = BOTTOM_ITEMS(t, onSettingsClick);

  // 构建主菜单项
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

  // 构建底部功能项
  const bottomMenuItems: MenuProps['items'] = bottom.map(item => ({
    key: item.path || item.label,
    icon: <item.icon size={18} />,
    label: item.label,
    onClick: () => {
      if (item.action) item.action();
      else if (item.path) navigate(item.path);
    }
  }));

  return (
    <div className="h-full flex flex-col bg-white border-r border-[var(--fa-border-default)]">
      <div className="flex-1 py-4 overflow-y-auto custom-scrollbar overflow-x-hidden">
        <Menu
          mode="inline"
          theme="light"
          inlineCollapsed={isMobile ? false : isCollapsed}
          selectedKeys={[location.pathname]}
          defaultOpenKeys={isCollapsed ? [] : ['sub-0', 'sub-1', 'sub-2', 'sub-3']}
          items={menuItems}
          className="fa-sidebar-menu"
          expandIcon={<ChevronDown size={14} className="text-gray-400" />}
        />
      </div>
      <div className="py-2 border-t border-gray-100 shrink-0">
        <Menu
          mode="inline"
          theme="light"
          inlineCollapsed={isMobile ? false : isCollapsed}
          selectable={false}
          items={bottomMenuItems}
          className="fa-sidebar-menu bottom-menu"
        />
      </div>

      <style>{`
        /* FlyAIOS Sidebar 核心样式规约 */
        .fa-sidebar-menu { border-inline-end: none !important; }
        
        .fa-sidebar-menu .ant-menu-item, 
        .fa-sidebar-menu .ant-menu-submenu-title {
          height: 40px !important; 
          line-height: 40px !important;
          margin-inline: 8px !important; 
          margin-block: 4px !important;
          border-radius: 8px !important; 
          color: var(--fa-text-secondary) !important;
          transition: all 0.2s ease !important;
        }

        /* Hover 态：4% 覆盖 */
        .fa-sidebar-menu .ant-menu-item:hover,
        .fa-sidebar-menu .ant-menu-submenu-title:hover {
          background-color: var(--fa-sidebar-hover-bg) !important;
          color: var(--fa-text-primary) !important;
        }

        /* Selected 态：左侧 2px 指示条 + 8% 航空蓝底 */
        .fa-sidebar-menu .ant-menu-item-selected {
          background-color: var(--fa-sidebar-selected-bg) !important;
          color: var(--fa-brand-primary) !important;
          font-weight: 600 !important;
          position: relative;
        }
        
        .fa-sidebar-menu .ant-menu-item-selected::after {
          content: "";
          position: absolute;
          left: -8px; /* 对齐到外层 padding 边缘 */
          top: 10px;
          bottom: 10px;
          width: 2px;
          background-color: var(--fa-brand-primary);
          border-radius: 0 2px 2px 0;
          border-inline-end: none !important;
          transform: none !important;
        }

        /* 折叠模式适配 */
        .ant-menu-inline-collapsed .ant-menu-item { 
          padding-inline: calc(50% - 13px) !important; 
        }
        .ant-menu-inline-collapsed .ant-menu-item-selected::after {
          left: 0;
        }
      `}</style>
    </div>
  );
};

export default FASidebar;
