import { tokens } from './tokens';

/**
 * Theme helper functions for consistent styling
 */

// Color helpers
export const colors = {
  primary: (variant: keyof typeof tokens.colors.primary = 'blue') => tokens.colors.primary[variant],
  neutral: (variant: keyof typeof tokens.colors.neutrals = 'gray600') => tokens.colors.neutrals[variant],
  status: (variant: keyof typeof tokens.colors.status = 'info') => tokens.colors.status[variant],
  gradient: () => tokens.colors.primary.gradient,
};

// Typography helpers
export const typography = {
  fontSize: (size: keyof typeof tokens.typography.fontSize = 'base') => tokens.typography.fontSize[size],
  fontWeight: (weight: keyof typeof tokens.typography.fontWeight = 'normal') => tokens.typography.fontWeight[weight],
  lineHeight: (height: keyof typeof tokens.typography.lineHeight = 'normal') => tokens.typography.lineHeight[height],
  fontFamily: (family: keyof typeof tokens.typography.fontFamily = 'base') => tokens.typography.fontFamily[family],
};

// Spacing helpers
export const spacing = (size: keyof typeof tokens.spacing = 4) => tokens.spacing[size];

// Border radius helper
export const radius = (size: keyof typeof tokens.borderRadius = 'DEFAULT') => tokens.borderRadius[size];

// Shadow helper
export const shadow = (size: keyof typeof tokens.shadows = 'DEFAULT') => tokens.shadows[size];

// Breakpoint helper
export const breakpoint = (size: keyof typeof tokens.breakpoints = 'md') => tokens.breakpoints[size];

// Z-index helper
export const zIndex = (level: keyof typeof tokens.zIndex = 'auto') => tokens.zIndex[level];

// Animation helpers
export const animation = {
  duration: (speed: keyof typeof tokens.animation.duration = 'normal') => tokens.animation.duration[speed],
  easing: (curve: keyof typeof tokens.animation.easing = 'ease') => tokens.animation.easing[curve],
};

// CSS class for primary gradient
export const primaryGradientClass = 'bg-gradient-to-r from-blue-600 to-teal-500';

// CSS class for primary gradient text
export const primaryGradientTextClass = 'bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent';

// Helper for responsive styles
export const responsive = {
  below: (breakpointKey: keyof typeof tokens.breakpoints) => `@media (max-width: ${parseInt(tokens.breakpoints[breakpointKey]) - 1}px)`,
  above: (breakpointKey: keyof typeof tokens.breakpoints) => `@media (min-width: ${tokens.breakpoints[breakpointKey]})`,
  between: (minBreakpoint: keyof typeof tokens.breakpoints, maxBreakpoint: keyof typeof tokens.breakpoints) => 
    `@media (min-width: ${tokens.breakpoints[minBreakpoint]}) and (max-width: ${parseInt(tokens.breakpoints[maxBreakpoint]) - 1}px)`,
}; 