/**
 * login.style.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Styles specific to the Login / Auth screen.
 * Global tokens (COLORS, FONTS, RADIUS, SHADOW) live in src/theme/theme.js
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../../theme/theme';

export { COLORS, FONTS, RADIUS, SHADOW };

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

  // ── Root ──────────────────────────────────────────────────────────────────
  rootContainer: {
    flex: 1,
    backgroundColor: '#000',
  },

  // ── Full-screen background image ───────────────────────────────────────────
  fullScreenImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: '80%',
  },

  // ── Dark scrim overlay ────────────────────────────────────────────────────
  scrimOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.62,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  // ── Brand overlay (sits on image) ─────────────────────────────────────────
  heroBrandOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  brandPillTop: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.40)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 20,
    paddingVertical: 6,
    marginBottom: 12,
  },
  brandPillTopText: {
    fontSize: 11,
    fontFamily: FONTS.ralewaySemiBold,
    color: COLORS.white,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },

  heroTitle: {
    fontSize: 52,
    fontFamily: FONTS.cormorantBold,
    color: COLORS.white,
    letterSpacing: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    marginBottom: 8,
  },

  heroSubtitle: {
    fontSize: 13,
    fontFamily: FONTS.ralewaExtraLight,
    color: 'rgba(255,255,255,0.88)',
    letterSpacing: 6,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  // ── Floating bottom card ───────────────────────────────────────────────────
  floatingCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    paddingHorizontal: 28,
    paddingTop: 16,
    ...SHADOW.card,
  },

  // Drag handle
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignSelf: 'center',
    marginBottom: 20,
  },

  // ── Card brand header ──────────────────────────────────────────────────────
  cardBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    gap: 12,
  },
  cardBrandAccentBar: {
    flex: 1,
    height: 1.5,
    backgroundColor: COLORS.cardBg,
    opacity: 0.5,
    borderRadius: 2,
  },
  cardBrandCenter: {
    alignItems: 'center',
  },
  cardPreTitle: {
    fontSize: 11,
    fontFamily: FONTS.ralewaySemiBold,
    color: COLORS.cardBgDark,
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  cardMainTitle: {
    fontSize: 34,
    fontFamily: FONTS.cormorantBold,
    color: COLORS.black,
    letterSpacing: 1,
  },
  cardMainTitleLight: {
    fontSize: 34,
    fontFamily: FONTS.cormorantSemiBoldItalic,
    color: COLORS.cardBg,
    letterSpacing: 1,
  },

  // ── Ornament divider ───────────────────────────────────────────────────────
  ornamentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    gap: 10,
  },
  ornamentLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.divider,
  },
  ornamentSymbol: {
    fontSize: 12,
    fontFamily: FONTS.cormorantLight,
    color: COLORS.cardBg,
    lineHeight: 16,
  },

  // ── Card tagline ───────────────────────────────────────────────────────────
  cardTagline: {
    fontSize: 15,
    fontFamily: FONTS.cormorantItalic,
    color: 'rgba(0,0,0,0.52)',
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: 0.3,
    marginBottom: 14,
  },
  cardTaglineAccent: {
    fontSize: 15,
    fontFamily: FONTS.cormorantSemiBoldItalic,
    color: COLORS.cardBgDark,
    letterSpacing: 0.3,
  },

  // ── Feature pills ──────────────────────────────────────────────────────────
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(200,161,156,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(200,161,156,0.4)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 14,
    paddingVertical: 7,
    ...SHADOW.pill,
  },
  featurePillIcon: {
    fontSize: 12,
  },
  featurePillText: {
    fontSize: 11,
    fontFamily: FONTS.ralewaySemiBold,
    color: COLORS.cardBgDark,
    letterSpacing: 1,
  },

  // ── Google button ──────────────────────────────────────────────────────────
  googleIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(200,161,156,0.35)',
  },
  googleIconText: {
    fontSize: 15,
    fontFamily: FONTS.ralewayExtraBold,
    color: '#4285F4',
  },
  primaryButton: {
    height: 56,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    borderWidth: 2,
    borderColor: COLORS.white,
    marginBottom: 16,
    ...SHADOW.button,
  },
  primaryButtonText: {
    fontSize: 14,
    fontFamily: FONTS.ralewayBold,
    color: COLORS.white,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },

  // ── Terms ──────────────────────────────────────────────────────────────────
  termsText: {
    textAlign: 'center',
    fontSize: 11,
    fontFamily: FONTS.ralewayRegular,
    color: 'rgba(0,0,0,0.30)',
    letterSpacing: 0.3,
    lineHeight: 18,
  },
  termsLink: {
    fontFamily: FONTS.ralewaySemiBold,
    color: COLORS.cardBgDark,
  },
});

export default styles;
