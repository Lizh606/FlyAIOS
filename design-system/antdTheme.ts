import { theme, ThemeConfig } from 'antd';

export const getAntdTheme = (mode: 'light' | 'dark' = 'light'): ThemeConfig => {
  const isDark = mode === 'dark';

  return {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: 'rgba(var(--fa-brand), 1)',
      colorInfo: 'rgba(var(--fa-brand), 1)',
      colorBgLayout: 'rgba(var(--fa-bg-page), 1)',
      colorBgContainer: 'rgba(var(--fa-bg-card), 1)',
      colorBgElevated: 'rgba(var(--fa-bg-overlay), 1)',
      
      colorText: 'rgba(var(--fa-text-primary), 1)',
      colorTextSecondary: `rgba(var(--fa-text-secondary), ${isDark ? 0.85 : 1})`,
      colorTextTertiary: 'rgba(var(--fa-text-tertiary), 0.65)',
      
      colorBorder: 'rgba(var(--fa-border), var(--fa-border-alpha))',
      colorSplit: 'rgba(var(--fa-divider), var(--fa-divider-alpha))',
      
      borderRadius: 8,
      borderRadiusLG: 12, // 对应 v0.8 容器圆角规范
      controlHeight: 40,
      fontFamily: 'var(--fa-font-sans)',
    },
    components: {
      Modal: {
        titleFontSize: 24, // T2 Page Title
        titleLineHeight: 1.33,
        paddingMD: 24,
        paddingContentHorizontalLG: 24,
        borderRadiusLG: 12,
        headerBg: 'transparent',
        footerBg: 'transparent',
      },
      Layout: {
        headerBg: 'rgba(var(--fa-bg-topbar), 1)',
        siderBg: 'rgba(var(--fa-bg-panel), 1)',
        bodyBg: 'rgba(var(--fa-bg-page), 1)',
      },
      Menu: {
        itemBg: "transparent",
        subMenuItemBg: "transparent",
        itemColor: 'rgba(var(--fa-text-secondary), 0.85)',
        itemHoverBg: 'rgba(var(--fa-hover), var(--fa-hover-alpha))',
        itemSelectedBg: 'rgba(var(--fa-brand-bg), var(--fa-brand-bg-alpha))',
        itemSelectedColor: 'rgba(var(--fa-brand), 1)',
        itemMarginInline: 8,
        itemMarginBlock: 4,
        itemBorderRadius: 8,
        collapsedWidth: 72,
      },
      Steps: {
        colorPrimary: 'rgba(var(--fa-brand), 1)',
        navArrowColor: 'rgba(var(--fa-text-disabled), 1)',
      },
      Checkbox: {
        colorPrimary: 'rgba(var(--fa-brand), 1)',
        colorPrimaryHover: 'rgba(var(--fa-brand-hover), 1)',
        borderRadiusSM: 4,
      },
      Table: {
        headerBg: 'rgba(var(--fa-bg-card), 1)',
        headerColor: 'rgba(var(--fa-text-secondary), 1)',
        headerSplitColor: 'rgba(var(--fa-divider), var(--fa-divider-alpha))',
        borderColor: 'rgba(var(--fa-border), var(--fa-border-alpha))',
        rowHoverBg: 'rgba(var(--fa-hover), var(--fa-hover-alpha))',
        selectedRowBg: 'rgba(var(--fa-brand-bg), var(--fa-brand-bg-alpha))',
      },
      Input: {
        hoverBorderColor: 'rgba(var(--fa-brand-hover), 1)',
        activeBorderColor: 'rgba(var(--fa-brand), 1)',
        activeShadow: '0 0 0 2px rgba(var(--fa-brand), 0.1)',
      },
      Select: {
        hoverBorderColor: 'rgba(var(--fa-brand-hover), 1)',
        activeBorderColor: 'rgba(var(--fa-brand), 1)',
        colorPrimary: 'rgba(var(--fa-brand), 1)',
        colorPrimaryHover: 'rgba(var(--fa-brand-hover), 1)',
        controlItemBgActive: 'rgba(var(--fa-brand-bg), var(--fa-brand-bg-alpha))',
      },
      Switch: {
        colorPrimary: 'rgba(var(--fa-brand), 1)',
        colorPrimaryHover: 'rgba(var(--fa-brand-hover), 1)',
        handleShadow: '0 2px 4px rgba(var(--fa-brand), 0.2)',
      },
      Slider: {
        colorPrimary: 'rgba(var(--fa-brand), 1)',
        colorPrimaryBorder: 'rgba(var(--fa-brand), 1)',
        colorPrimaryBorderHover: 'rgba(var(--fa-brand-hover), 1)',
        dotActiveBorderColor: 'rgba(var(--fa-brand), 1)',
        handleActiveColor: 'rgba(var(--fa-brand), 1)',
        handleColor: 'rgba(var(--fa-brand), 1)',
        trackBg: 'rgba(var(--fa-brand), 1)',
        trackHoverBg: 'rgba(var(--fa-brand-hover), 1)',
        railBg: 'rgba(var(--fa-border), 1)',
        railHoverBg: 'rgba(var(--fa-border-strong), 1)',
      },
      Button: {
        fontWeight: 600,
        primaryShadow: "none",
        controlHeight: 40,
      },
      Tabs: {
        titleFontSize: 14,
        fontWeightStrong: 600,
        horizontalItemPadding: '12px 0',
        itemSelectedColor: 'rgba(var(--fa-brand), 1)',
        itemActiveColor: 'rgba(var(--fa-brand), 1)',
        itemHoverColor: 'rgba(var(--fa-brand-hover), 1)',
        inkBarColor: 'rgba(var(--fa-brand), 1)',
      },
      Tooltip: {
        colorBgSpotlight: 'rgba(var(--fa-bg-topbar), 1)',
      }
    }
  };
};