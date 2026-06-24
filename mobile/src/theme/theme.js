/**
 * theme.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Global design tokens for Obi Glow.
 * Import from any feature/component — do NOT redefine these locally.
 *
 * Usage:
 *   import { COLORS, FONT, RADIUS, SHADOW, FONTS } from '@/theme/theme';
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Brand Palette ────────────────────────────────────────────────────────────
export const COLORS = {
  /** Warm cream — primary app background */
  background: '#f3ece3',
  /** Ivory — card surfaces */
  surface: '#faf7f4',
  /** Dusty rose — card accents, borders, dividers */
  cardBg: '#c8a19c',
  /** Deep mocha — labels, links, accent text */
  cardBgDark: '#91766e',
  /** Champagne gold — premium accent */
  gold: '#c9a96e',
  /** Light gold tint — stat card backgrounds */
  goldLight: '#f5edd8',
  /** Soft blush — highlight backgrounds */
  blush: '#f7ebe8',
  /** Deep blush — darker accent */
  blushDark: '#e8b4aa',
  /** Pure black — primary text, buttons */
  black: '#000000',
  /** Deep espresso — warm rich dark for headers, buttons, dark cards */
  charcoal: '#272727',
  /** Muted text */
  textMuted: 'rgba(0,0,0,0.42)',
  /** Pure white — borders, button text */
  white: '#ffffff',
  /** Subtle divider line */
  divider: 'rgba(0,0,0,0.08)',
  /** Status: confirmed */
  statusConfirmed: '#6b9e78',
  statusConfirmedBg: 'rgba(107,158,120,0.14)',
  /** Status: pending */
  statusPending: '#c9953a',
  statusPendingBg: 'rgba(201,149,58,0.14)',
  /** Status: cancelled */
  statusCancelled: '#b56060',
  statusCancelledBg: 'rgba(181,96,96,0.14)',
};

// ─── Font Weight Scale ────────────────────────────────────────────────────────
/** Raw fontWeight values — prefer named fontFamily (FONTS) when possible */
export const FONT = {
  thin: '100',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  heavy: '800',
  black: '900',
};

// ─── Font Family Names ────────────────────────────────────────────────────────
/**
 * All font variants loaded in _layout.jsx via useFonts().
 * Fonts:
 *   • CormorantGaramond — luxury serif, headings & display
 *   • Raleway           — elegant sans-serif, body & UI
 */
export const FONTS = {
  // Cormorant Garamond (display / headings)
  cormorantLight: 'CormorantGaramond_300Light',
  cormorantLightItalic: 'CormorantGaramond_300Light_Italic',
  cormorantRegular: 'CormorantGaramond_400Regular',
  cormorantItalic: 'CormorantGaramond_400Regular_Italic',
  cormorantMedium: 'CormorantGaramond_500Medium',
  cormorantSemiBold: 'CormorantGaramond_600SemiBold',
  cormorantSemiBoldItalic: 'CormorantGaramond_600SemiBold_Italic',
  cormorantBold: 'CormorantGaramond_700Bold',

  // Raleway (body / UI)
  ralewaExtraLight: 'Raleway_200ExtraLight',
  ralewayLight: 'Raleway_300Light',
  ralewayRegular: 'Raleway_400Regular',
  ralewayMedium: 'Raleway_500Medium',
  ralewaySemiBold: 'Raleway_600SemiBold',
  ralewayBold: 'Raleway_700Bold',
  ralewayExtraBold: 'Raleway_800ExtraBold',
};

// ─── Border Radius ────────────────────────────────────────────────────────────
export const RADIUS = {
  sm: 8,
  md: 14,
  lg: 22,
  xl: 36,
  full: 999,
};

// ─── Shadows ──────────────────────────────────────────────────────────────────
export const SHADOW = {
  /** Heavy shadow for primary action buttons */
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 9,
  },
  /** Upward shadow for floating bottom sheets / cards */
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 20,
  },
  /** Soft shadow for pills and small elements */
  pill: {
    shadowColor: '#91766e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 3,
  },
  /** Gentle shadow for stat cards */
  stat: {
    shadowColor: '#c9a96e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 5,
  },
  /** Ultra-soft for list items */
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
};
