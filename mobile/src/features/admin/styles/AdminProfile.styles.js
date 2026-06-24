/**
 * AdminProfile.styles.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Styles for the Obi Glow Admin Profile screen.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../../theme/theme';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

  // ── Root ───────────────────────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // ── Hero Header ────────────────────────────────────────────────────────────
  heroContainer: {
    backgroundColor: COLORS.charcoal,
    paddingTop: 20,
    paddingBottom: 56,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  heroBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 24,
  },
  heroBrandText: {
    fontSize: 11,
    fontFamily: FONTS.ralewaySemiBold,
    color: COLORS.gold,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  heroDivider: {
    width: 24,
    height: 1,
    backgroundColor: 'rgba(201,169,110,0.4)',
  },

  // Avatar
  avatarRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    padding: 3,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.stat,
  },
  avatarImage: {
    width: 86,
    height: 86,
    borderRadius: 43,
  },
  avatarFallback: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: COLORS.goldLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarFallbackText: {
    fontSize: 32,
    fontFamily: FONTS.cormorantBold,
    color: COLORS.charcoal,
    letterSpacing: 1,
  },

  // Name block
  heroName: {
    fontSize: 28,
    fontFamily: FONTS.cormorantBold,
    color: COLORS.white,
    letterSpacing: 0.5,
    marginTop: 14,
    marginBottom: 2,
  },
  heroEmail: {
    fontSize: 12,
    fontFamily: FONTS.ralewayRegular,
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: 0.5,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(201,169,110,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(201,169,110,0.35)',
  },
  heroBadgeText: {
    fontSize: 10,
    fontFamily: FONTS.ralewaySemiBold,
    color: COLORS.gold,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  // ── Content Card (lifted over hero) ────────────────────────────────────────
  contentWrapper: {
    marginTop: -36,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  // ── Stats Row ──────────────────────────────────────────────────────────────
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 20,
    gap: 0,
    marginBottom: 18,
    ...SHADOW.soft,
    borderWidth: 1,
    borderColor: 'rgba(200,161,156,0.15)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.divider,
    marginVertical: 4,
  },
  statValue: {
    fontSize: 26,
    fontFamily: FONTS.cormorantBold,
    color: COLORS.charcoal,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 10,
    fontFamily: FONTS.ralewaySemiBold,
    color: COLORS.textMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginTop: 2,
  },

  // ── Section header ─────────────────────────────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.cormorantBold,
    color: COLORS.charcoal,
    letterSpacing: 0.3,
  },
  sectionAccent: {
    fontFamily: FONTS.cormorantSemiBold,
    color: COLORS.cardBg,
  },

  // ── Quick Action Card ─────────────────────────────────────────────────────
  quickCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    marginBottom: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(200,161,156,0.15)',
    ...SHADOW.soft,
  },
  quickItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 15,
    gap: 14,
  },
  quickItemDivider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginHorizontal: 18,
  },
  quickIconBubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.goldLight,
  },
  quickIconBubbleDanger: {
    backgroundColor: 'rgba(181,96,96,0.1)',
  },
  quickItemText: {
    flex: 1,
  },
  quickItemLabel: {
    fontSize: 14,
    fontFamily: FONTS.ralewaySemiBold,
    color: COLORS.charcoal,
    letterSpacing: 0.2,
  },
  quickItemLabelDanger: {
    color: COLORS.statusCancelled,
  },
  quickItemSub: {
    fontSize: 11,
    fontFamily: FONTS.ralewayRegular,
    color: COLORS.textMuted,
    marginTop: 1,
    letterSpacing: 0.2,
  },

  // ── Create Service Card ────────────────────────────────────────────────────
  createServiceCard: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginBottom: 18,
    ...SHADOW.stat,
  },
  createServiceGradientBg: {
    backgroundColor: COLORS.charcoal,
    padding: 20,
  },
  createServiceTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  createServiceBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(201,169,110,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(201,169,110,0.4)',
  },
  createServiceBadgeText: {
    fontSize: 9,
    fontFamily: FONTS.ralewaySemiBold,
    color: COLORS.gold,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  createServiceTitle: {
    fontSize: 22,
    fontFamily: FONTS.cormorantBold,
    color: COLORS.white,
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  createServiceSub: {
    fontSize: 11,
    fontFamily: FONTS.ralewayRegular,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.4,
    marginBottom: 18,
  },
  createServiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.gold,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: RADIUS.full,
  },
  createServiceBtnText: {
    fontSize: 12,
    fontFamily: FONTS.ralewayBold,
    color: COLORS.charcoal,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  // ── Logout button ──────────────────────────────────────────────────────────
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
    marginBottom: 16,
    paddingVertical: 14,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
    borderColor: 'rgba(181,96,96,0.4)',
  },
  logoutBtnText: {
    fontSize: 13,
    fontFamily: FONTS.ralewayBold,
    color: COLORS.statusCancelled,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  // ── Footer ─────────────────────────────────────────────────────────────────
  footerText: {
    textAlign: 'center',
    fontSize: 10,
    fontFamily: FONTS.ralewayRegular,
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    marginTop: 8,
  },
});

export default styles;
