
import { theme } from "antd";
import type { ThemeConfig } from "antd";

// FlyAIOS UI Design Tokens Mapping
// 颜色值来源于 tokens.css 的变量定义
const faColors = {
  light: {
    brand: '#2563EB',        // --fa-brand (Aviation Blue)
    brandHover: '#3B82F6',   // --fa-brand-hover
    brandActive: '#1D4ED8',  // --fa-brand-active
    brandSoft: 'rgba(37, 99, 235, 0.10)', 
    info: '#818CF8',         // --fa-info
    success: '#16A34A',      // --fa-success
    warning: '#F59E0B',      // --fa-warning
    error: '#EF4444',        // --fa-error
    bgPage: '#FFFFFF',       // --fa-bg-page (修正为规范要求的纯白画布)
    bgCard: '#FFFFFF',       // --fa-bg-card
    bgOverlay: '#FFFFFF',    // --fa-bg-overlay
    textPrimary: '#0F172A',   // --fa-text-primary
    textSecondary: '#475569', // --fa-text-secondary
    textTertiary: '#64748B',  // --fa-text-tertiary
    textDisabled: '#94A3B8',  // --fa-text-disabled
    border: '#E2E8F0',        // --fa-border
    divider: '#E2E8F0',       // --fa-divider
  },
  dark: {
    brand: '#3B82F6',        // 适配深色模式的品牌色
    brandHover: '#60A5FA',
    brandActive: '#2563EB',
    brandSoft: 'rgba(59, 130, 246, 0.15)',
    info: '#A5B4FC',
    success: '#22C55E',
    warning: '#FBBF24',
    error: '#F87171',
    bgPage: '#0B0F1A',       // --fa-bg-page (Dark)
    bgCard: '#111522',       // --fa-bg-card (Dark)
    bgOverlay: '#1E2330',    // --fa-bg-overlay (Dark)
    textPrimary: 'rgba(255, 255, 255, 1)',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    textTertiary: 'rgba(255, 255, 255, 0.65)',
    textDisabled: 'rgba(255, 255, 255, 0.35)',
    border: 'rgba(255, 255, 255, 0.14)',
    divider: 'rgba(255, 255, 255, 0.12)',
  }
};

/**
 * getAntdTheme - FlyAIOS 标准 Ant Design 主题工厂
 * 严格遵守 v0.8 规范中的 4px 网格、T5 默认字号、12px 容器圆角
 */
export function getAntdTheme(mode: 'light' | 'dark' = 'light'): ThemeConfig {
  const isDark = mode === 'dark';
  const colors = isDark ? faColors.dark : faColors.light;

  return {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: colors.brand,
      colorPrimaryHover: colors.brandHover,
      colorPrimaryActive: colors.brandActive,
      colorInfo: colors.info,
      colorSuccess: colors.success,
      colorWarning: colors.warning,
      colorError: colors.error,
      colorBgLayout: colors.bgPage,
      colorBgContainer: colors.bgCard,
      colorBgElevated: colors.bgOverlay,
      colorText: colors.textPrimary,
      colorTextSecondary: colors.textSecondary,
      colorTextTertiary: colors.textTertiary,
      colorTextDisabled: colors.textDisabled,
      colorBorder: colors.border,
      colorSplit: colors.divider,
      // 全局链接颜色
      colorLink: colors.brand,
      colorLinkHover: colors.brandHover,
      colorLinkActive: colors.brandActive,
      
      borderRadius: 8,       // 控件圆角 (radius-control)
      controlHeight: 40,     // 40px 标准高度
      fontFamily: `var(--fa-font-sans)`,
      fontSize: 14,          // T5 Body (14/22)
      lineHeight: 1.5714,    // 对应 22px 行高
      fontWeightStrong: 600, // T1-T4 统一 Semibold
    },

    components: {
      Typography: {
        fontWeightStrong: 600,
        colorTextHeading: colors.textPrimary,
      },
      Button: {
        borderRadius: 8,
        primaryShadow: 'none',
        fontWeight: 600,
        defaultColor: colors.textSecondary,
        defaultHoverColor: colors.brand,
        defaultHoverBorderColor: colors.brand,
        defaultActiveColor: colors.brandActive,
        defaultActiveBorderColor: colors.brandActive,
        ghostBg: 'transparent',
        colorLink: colors.brand,
        colorLinkHover: colors.brandHover,
        colorLinkActive: colors.brandActive,
      },
      Card: {
        borderRadiusLG: 12,    // 容器圆角 (radius-card)
        headerBg: 'transparent',
        paddingLG: 24,         // Desktop 内容区内边距
      },
      Layout: {
        bodyBg: colors.bgPage,
        siderBg: isDark ? colors.bgCard : '#FFFFFF',
        headerBg: '#1F1F1F',   // 深色 Shell 策略：统一 RGB(31,31,31)
      },
      Menu: {
        itemBg: 'transparent',
        subMenuItemBg: 'transparent',
        itemSelectedBg: colors.brandSoft,
        itemSelectedColor: colors.brand,
        // 使用 tokens.css 变量确保 hover 态一致
        itemHoverBg: 'rgba(var(--fa-hover), var(--fa-hover-alpha))',
        itemActiveBg: 'rgba(var(--fa-brand), 0.1)',
        itemColor: colors.textSecondary,
        itemBorderRadius: 8,
        itemMarginInline: 8, 
        iconMarginInlineEnd: 12,
        itemHeight: 44,        // 规范要求的 44px 点击面积
        fontSize: 14,
      },
      Table: {
        headerBg: colors.bgPage,
        headerColor: colors.textSecondary,
        headerSplitColor: 'transparent',
        borderColor: colors.border,
        fontSize: 14,
        padding: 12,
      },
      Modal: {
        borderRadiusLG: 12,
        titleFontSize: 24,     // T2 Page Title
        titleLineHeight: 1.33,
        paddingMD: 24,
      },
      Tabs: {
        titleFontSize: 14,
        fontWeightStrong: 600,
        horizontalItemPadding: '12px 0',
        itemSelectedColor: colors.brand,
        itemActiveColor: colors.brand,
        itemHoverColor: colors.brandHover,
        inkBarColor: colors.brand,
      },
    },
  };
}
