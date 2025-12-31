import React from 'react';
import { Menu } from 'antd';
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

  // 映射底部功能菜单
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
    <div className="h-full flex flex-col bg-bg-panel transition-all duration-300">
      <div className="flex-1 py-4 overflow-y-auto custom-scrollbar overflow-x-hidden">
        <Menu
          mode="inline"
          inlineCollapsed={isMobile ? false : isCollapsed}
          selectedKeys={[location.pathname]}
          // 默认展开所有分组以匹配官网风格
          defaultOpenKeys={isCollapsed ? [] : ['sub-0', 'sub-1', 'sub-2', 'sub-3']}
          items={menuItems}
          className="fa-sidebar-menu"
          expandIcon={<ChevronDown size={14} className="text-text-tertiary" />}
        />
      </div>
      
      <div className="py-2 border-t border-divider shrink-0">
        <Menu
          mode="inline"
          inlineCollapsed={isMobile ? false : isCollapsed}
          selectable={false}
          items={bottomMenuItems}
          className="fa-sidebar-menu bottom-menu"
        />
      </div>

      <style>{`
        /* 1. 基础容器：移除边框，设为透明背景 */
        .fa-sidebar-menu.ant-menu {
          background: transparent !important;
          border-inline-end: none !important;
        }

        /* 2. 通用菜单项样式 */
        .fa-sidebar-menu .ant-menu-item, 
        .fa-sidebar-menu .ant-menu-submenu-title {
          border-radius: var(--fa-radius-control) !important;
          margin-block: 4px !important;
          transition: all 0.2s ease !important;
        }

        /* 3. 父级菜单 (SubMenu) 选中态：仅改颜色，背景保持透明 */
        .fa-sidebar-menu .ant-menu-submenu-selected > .ant-menu-submenu-title {
          color: rgba(var(--fa-brand), 1) !important;
          background-color: transparent !important;
        }
        
        /* 确保选中时父级的图标和箭头同步变色 */
        .fa-sidebar-menu .ant-menu-submenu-selected > .ant-menu-submenu-title .ant-menu-item-icon,
        .fa-sidebar-menu .ant-menu-submenu-selected > .ant-menu-submenu-title .ant-menu-submenu-arrow {
          color: rgba(var(--fa-brand), 1) !important;
        }

        /* 4. 子项 (Item) 选中态：修改文字颜色并增加品牌背景 */
        .fa-sidebar-menu .ant-menu-item-selected {
          background-color: rgba(var(--fa-brand-bg), var(--fa-brand-bg-alpha)) !important;
          color: rgba(var(--fa-brand), 1) !important;
        }

        /* 5. 悬浮态优化 */
        .fa-sidebar-menu .ant-menu-item:hover,
        .fa-sidebar-menu .ant-menu-submenu-title:hover {
          background-color: rgba(var(--fa-hover), var(--fa-hover-alpha)) !important;
        }

        /* 6. 折叠态补丁：移除多余 padding，信任 AntD 原生渲染确保图标居中 */
        .ant-menu-inline-collapsed {
          width: 72px !important;
        }

        /* 移除 AntD 默认的右侧高亮竖条 */
        .ant-menu-item-selected::after {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default FASidebar;