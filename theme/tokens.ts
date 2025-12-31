
/**
 * FlyAI Design System - Design Tokens
 * Follows a hierarchical structure: Global -> Semantic -> Component
 */

export const TOKENS = {
  // 1. Color Tokens
  color: {
    brand: {
      primary: '#2664FF',
      primaryHover: '#1E50CC',
      primaryActive: '#1539B0',
    },
    surface: {
      page: '#F3F4F6',
      card: '#FFFFFF',
      dark: '#111827',
      darkHover: '#000000',
    },
    status: {
      success: '#10B981',
      successBg: '#F0FDF4',
      warning: '#F59E0B',
      warningBg: '#FFFBEB',
      danger: '#EF4444',
      dangerBg: '#FEF2F2',
      info: '#3B82F6',
      infoBg: '#EFF6FF',
    },
    text: {
      primary: '#111827',
      secondary: '#4B5563',
      muted: '#9CA3AF',
      onDark: '#FFFFFF',
      onPrimary: '#FFFFFF',
    },
    border: {
      default: '#E5E7EB',
      light: '#F3F4F6',
      focus: '#2664FF',
    }
  },

  // 2. Shape Tokens
  radius: {
    none: '0px',
    sm: '4px',
    md: '6px',
    lg: '8px', // Main radius for FlyAI
    full: '9999px',
  },

  // 3. Spacing Tokens (4px Scale)
  space: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '24px',
    6: '32px',
    8: '48px',
  },

  // 4. Typography Tokens
  font: {
    family: {
      sans: "'Inter', system-ui, -apple-system, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
    },
    size: {
      xs: '10px',
      sm: '12px',
      base: '14px',
      lg: '16px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
    },
    weight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      black: '900',
    }
  }
};
