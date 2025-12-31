import { ThemeConfig } from 'antd';

export const getAntdTheme = (): ThemeConfig => ({
  token: {
    colorPrimary: '#2664FF',
    borderRadius: 8,
    fontFamily: 'Inter, -apple-system, sans-serif',
    colorBgContainer: '#FFFFFF',
    colorTextBase: '#111827',
    colorBorder: '#E2E8F0',
    colorTextSecondary: '#4B5563',
    colorTextTertiary: '#9CA3AF',
  },
  components: {
    Button: {
      controlHeight: 36,
      paddingContentHorizontal: 16,
      fontWeight: 500,
      borderRadius: 8,
    },
    Menu: {
      itemHeight: 40,
      itemMarginInline: 8,
      itemMarginBlock: 4,
      itemBorderRadius: 8,
      itemSelectedBg: 'rgba(38, 100, 255, 0.08)',
      itemSelectedColor: '#2664FF',
      itemHoverBg: 'rgba(0, 0, 0, 0.04)',
      itemColor: '#4B5563',
      itemHoverColor: '#111827',
      fontSize: 14,
      // 关键：强制 72px 宽度，解决 80px 导致的居中偏移
      collapsedWidth: 72,
      collapsedIconSize: 18,
      // 子菜单样式
      subMenuItemBg: 'transparent',
      itemPaddingInline: 16,
      // Fix: itemSelectedActiveBg is not a valid property in Ant Design 5 Menu component tokens
    },
    Layout: {
      headerBg: 'rgb(31, 31, 31)',
      siderBg: '#FFFFFF',
    },
    Tooltip: {
      colorBgSpotlight: 'rgb(31, 31, 31)',
      colorTextLightSolid: '#FFFFFF',
    }
  }
});