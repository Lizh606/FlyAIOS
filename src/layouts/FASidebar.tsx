
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

/**
 * FASidebar - FlyAIOS 标准侧边栏导航
 * 严格遵循 v0.8 3.2 章节规范：浅色面板策略，品牌色选中态
 */
const FASidebar: React.FC<FASidebarProps> = ({ isCollapsed, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useI18n();

  const groups = NAV_GROUPS(t);

  // 映射导航分组
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
          // 默认展开所有分组以提高效率 (原则 1.2)
          defaultOpenKeys={isCollapsed ? [] : ['sub-0', 'sub-1', 'sub-2', 'sub-3', 'sub-4']}
          items={menuItems}
          className="fa-sidebar-menu border-none"
          expandIcon={<ChevronDown size={14} className="text-text-tertiary" />}
        />
      </div>
    </div>
  );
};

export default FASidebar;
