module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: 'rgba(var(--fa-brand), 1)',
        'brand-hover': 'rgba(var(--fa-brand-hover), 1)',
        'brand-active': 'rgba(var(--fa-brand-active), 1)',
        'brand-bg': 'rgba(var(--fa-brand-bg), var(--fa-brand-bg-alpha))',
        info: 'rgba(var(--fa-info), 1)',
        success: 'rgba(var(--fa-success), 1)',
        warning: 'rgba(var(--fa-warning), 1)',
        error: 'rgba(var(--fa-error), 1)',
        live: 'rgba(var(--fa-live), 1)',
        bg: {
          page: 'rgba(var(--fa-bg-page), 1)',
          card: 'rgba(var(--fa-bg-card), 1)',
          raised: 'rgba(var(--fa-bg-raised), 1)',
          overlay: 'rgba(var(--fa-bg-overlay), 1)',
          input: 'rgba(var(--fa-bg-input), var(--fa-bg-input-alpha))',
          topbar: 'rgba(var(--fa-bg-topbar), 1)',
          panel: 'rgba(var(--fa-bg-panel), 1)',
        },
        text: {
          primary: 'rgba(var(--fa-text-primary), 1)',
          secondary: 'rgba(var(--fa-text-secondary), 1)',
          tertiary: 'rgba(var(--fa-text-tertiary), 1)',
          disabled: 'rgba(var(--fa-text-disabled), 1)',
          inverse: 'rgba(var(--fa-text-inverse), 1)',
        },
        border: {
          DEFAULT: 'rgba(var(--fa-border), var(--fa-border-alpha))',
          strong: 'rgba(var(--fa-border-strong), var(--fa-border-strong-alpha))',
          divider: 'rgba(var(--fa-divider), var(--fa-divider-alpha))',
        },
        action: {
          hover: 'rgba(var(--fa-hover), var(--fa-hover-alpha))',
          active: 'rgba(var(--fa-active), var(--fa-active-alpha))',
        },
      },
      fontSize: {
        'fa-t1': ['var(--fa-fs-t1)', 'var(--fa-lh-t1)'],
        'fa-t2': ['var(--fa-fs-t2)', 'var(--fa-lh-t2)'],
        'fa-t3': ['var(--fa-fs-t3)', 'var(--fa-lh-t3)'],
        'fa-t4': ['var(--fa-fs-t4)', 'var(--fa-lh-t4)'],
        'fa-t5': ['var(--fa-fs-t5)', 'var(--fa-lh-t5)'],
        'fa-t6': ['var(--fa-fs-t6)', 'var(--fa-lh-t6)'],
        'fa-t7': ['var(--fa-fs-t7)', 'var(--fa-lh-t7)'],
      },
      fontWeight: {
        'fa-regular': 'var(--fa-fw-regular)',
        'fa-medium': 'var(--fa-fw-medium)',
        'fa-semibold': 'var(--fa-fw-semibold)',
      },
      fontFamily: {
        sans: ['var(--fa-font-sans)'],
        mono: ['var(--fa-font-mono)'],
      },
      borderRadius: {
        control: 'var(--fa-radius-control)',
        card: 'var(--fa-radius-card)',
        tag: 'var(--fa-radius-tag)',
      },
      boxShadow: {
        card: 'var(--fa-shadow-card)',
        overlay: 'var(--fa-shadow-overlay)',
      },
      spacing: {
        header: '56px',
        'sidebar-expanded': '240px',
        'sidebar-collapsed': '72px',
        'content-padding': '24px',
      },
    },
  },
};
