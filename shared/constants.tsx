
import { TOKENS } from './themeTokens';

export const COLORS = {
  primary: TOKENS.color.brand.primary,
  primaryHover: TOKENS.color.brand.primaryHover,
  topbar: TOKENS.color.surface.dark,
  page: TOKENS.color.surface.page,
  surfaceCard: TOKENS.color.surface.card,
  success: TOKENS.color.status.success,
  warning: TOKENS.color.status.warning,
  danger: TOKENS.color.status.danger,
  borderDefault: TOKENS.color.border.default,
};

export const SPACE = TOKENS.space;

export const TYPOGRAPHY = {
  t2: `text-[${TOKENS.font.size['2xl']}] leading-[32px] font-${TOKENS.font.weight.semibold}`,
  t4: `text-[${TOKENS.font.size.lg}] leading-[24px] font-${TOKENS.font.weight.semibold}`,
  t5: `text-[${TOKENS.font.size.base}] leading-[22px] font-${TOKENS.font.weight.normal}`,
  t5Strong: `text-[${TOKENS.font.size.base}] leading-[22px] font-${TOKENS.font.weight.medium}`,
  t6: `text-[${TOKENS.font.size.sm}] leading-[18px] font-${TOKENS.font.weight.normal}`,
  
  pageTitle: `text-[${TOKENS.font.size['2xl']}] leading-[32px] font-${TOKENS.font.weight.semibold}`,
  bodyStrong: `text-[${TOKENS.font.size.base}] leading-[22px] font-${TOKENS.font.weight.medium}`,
  caption: `text-[${TOKENS.font.size.sm}] leading-[18px] font-${TOKENS.font.weight.normal}`,
};
