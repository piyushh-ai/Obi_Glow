/**
 * adminDashboard.styles.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Styles for the Obi Glow Admin Dashboard screen.
 * All global tokens imported from src/theme/theme.js
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../../theme/theme';

export { COLORS, FONTS, RADIUS, SHADOW };

const { width } = Dimensions.get('window');
const CARD_GAP = 12;
const STAT_CARD_WIDTH = (width - 32 - CARD_GAP) / 2;

const styles = StyleSheet.create({

  // ── Root ──────────────────────────────────────────────────────────────────
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  greetingLabel: {
    fontSize: 12,
    fontFamily: FONTS.ralewaySemiBold,
    color: COLORS.textMuted,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  greetingName: {
    fontSize: 26,
    fontFamily: FONTS.cormorantBold,
    color: COLORS.charcoal,
    letterSpacing: 0.5,
  },
  greetingNameAccent: {
    fontFamily: FONTS.cormorantSemiBoldItalic,
    color: COLORS.cardBgDark,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  notificationBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(200,161,156,0.25)',
    ...SHADOW.soft,
  },
  notificationDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.statusCancelled,
    borderWidth: 1.5,
    borderColor: COLORS.surface,
  },
  avatarWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.goldLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.gold,
    ...SHADOW.soft,
  },
  avatarInitials: {
    fontSize: 16,
    fontFamily: FONTS.cormorantBold,
    color: COLORS.cardBgDark,
    letterSpacing: 0.5,
  },

  // ── Gold accent banner ────────────────────────────────────────────────────
  dateBanner: {
    marginHorizontal: 16,
    marginBottom: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: COLORS.charcoal,
    borderRadius: RADIUS.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...SHADOW.soft,
  },
  dateBannerText: {
    fontSize: 13,
    fontFamily: FONTS.ralewayMedium,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1,
  },
  dateBannerDate: {
    fontSize: 14,
    fontFamily: FONTS.ralewaySemiBold,
    color: COLORS.gold,
    letterSpacing: 0.5,
  },
  dateBannerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.gold,
  },

  // ── Section header ─────────────────────────────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: FONTS.cormorantBold,
    color: COLORS.charcoal,
    letterSpacing: 0.3,
  },
  sectionTitleAccent: {
    fontFamily: FONTS.cormorantSemiBoldItalic,
    color: COLORS.cardBg,
  },
  seeAllBtn: {
    fontSize: 11,
    fontFamily: FONTS.ralewaySemiBold,
    color: COLORS.cardBgDark,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
  },

  // ── Stat Cards Grid ───────────────────────────────────────────────────────
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: CARD_GAP,
    marginBottom: 24,
  },
  statCard: {
    width: STAT_CARD_WIDTH,
    borderRadius: RADIUS.lg,
    padding: 18,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: 'rgba(200,161,156,0.2)',
    ...SHADOW.stat,
  },
  statCardGold: {
    backgroundColor: COLORS.goldLight,
    borderColor: 'rgba(201,169,110,0.35)',
  },
  statCardBlush: {
    backgroundColor: COLORS.blush,
    borderColor: 'rgba(200,161,156,0.3)',
  },
  statCardDark: {
    backgroundColor: COLORS.charcoal,
    borderColor: 'transparent',
  },
  statIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  statIconBubble: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  statIconBubbleDark: {
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  statIcon: {
    fontSize: 18,
  },
  statBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.statusConfirmedBg,
  },
  statBadgeText: {
    fontSize: 9,
    fontFamily: FONTS.ralewaySemiBold,
    color: COLORS.statusConfirmed,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 34,
    fontFamily: FONTS.cormorantBold,
    color: COLORS.charcoal,
    letterSpacing: -0.5,
    lineHeight: 38,
  },
  statValueLight: {
    color: COLORS.white,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: FONTS.ralewayMedium,
    color: COLORS.textMuted,
    letterSpacing: 0.8,
    marginTop: 2,
  },
  statLabelLight: {
    color: 'rgba(255,255,255,0.6)',
  },
  statTrend: {
    fontSize: 10,
    fontFamily: FONTS.ralewaySemiBold,
    color: COLORS.statusConfirmed,
    marginTop: 6,
    letterSpacing: 0.5,
  },

  // ── Quick Actions ─────────────────────────────────────────────────────────
  quickActionsSection: {
    marginBottom: 24,
  },
  quickActionsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
  },
  quickActionBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: 'rgba(200,161,156,0.2)',
    ...SHADOW.soft,
  },
  quickActionBtnPrimary: {
    backgroundColor: COLORS.charcoal,
    borderColor: 'transparent',
  },
  quickActionIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  quickActionLabel: {
    fontSize: 10,
    fontFamily: FONTS.ralewaySemiBold,
    color: COLORS.cardBgDark,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  quickActionLabelPrimary: {
    color: COLORS.gold,
  },

  // ── Appointment Item ───────────────────────────────────────────────────────
  appointmentSection: {
    marginBottom: 24,
  },
  appointmentCard: {
    marginHorizontal: 16,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(200,161,156,0.18)',
    marginBottom: 10,
    ...SHADOW.soft,
  },
  appointmentCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  appointmentAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.goldLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(201,169,110,0.4)',
  },
  appointmentAvatarText: {
    fontSize: 15,
    fontFamily: FONTS.cormorantBold,
    color: COLORS.cardBgDark,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentName: {
    fontSize: 16,
    fontFamily: FONTS.cormorantBold,
    color: COLORS.charcoal,
    letterSpacing: 0.3,
    marginBottom: 1,
  },
  appointmentService: {
    fontSize: 12,
    fontFamily: FONTS.ralewayMedium,
    color: COLORS.textMuted,
    letterSpacing: 0.3,
  },
  appointmentTime: {
    fontSize: 13,
    fontFamily: FONTS.ralewaySemiBold,
    color: COLORS.charcoal,
    letterSpacing: 0.3,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 10,
    fontFamily: FONTS.ralewaySemiBold,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  appointmentDivider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: 10,
  },
  appointmentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  appointmentMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  appointmentMetaIcon: {
    fontSize: 12,
  },
  appointmentMetaText: {
    fontSize: 11,
    fontFamily: FONTS.ralewayRegular,
    color: COLORS.textMuted,
  },

  // ── Recent Bookings (Accept/Reject) ──────────────────────────────────────
  recentSection: {
    marginBottom: 24,
  },
  bookingCard: {
    marginHorizontal: 16,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(200,161,156,0.18)',
    marginBottom: 10,
    ...SHADOW.soft,
  },
  bookingCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bookingAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.blush,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(200,161,156,0.3)',
  },
  bookingAvatarText: {
    fontSize: 14,
    fontFamily: FONTS.cormorantBold,
    color: COLORS.cardBgDark,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingName: {
    fontSize: 15,
    fontFamily: FONTS.cormorantBold,
    color: COLORS.charcoal,
    letterSpacing: 0.3,
  },
  bookingService: {
    fontSize: 11,
    fontFamily: FONTS.ralewayMedium,
    color: COLORS.textMuted,
    marginTop: 1,
  },
  bookingDateTime: {
    fontSize: 11,
    fontFamily: FONTS.ralewaySemiBold,
    color: COLORS.cardBgDark,
    marginTop: 2,
  },
  bookingActions: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptBtn: {
    flex: 1,
    height: 38,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.charcoal,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.charcoal,
  },
  acceptBtnText: {
    fontSize: 12,
    fontFamily: FONTS.ralewayBold,
    color: COLORS.white,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  rejectBtn: {
    flex: 1,
    height: 38,
    borderRadius: RADIUS.full,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(181,96,96,0.5)',
  },
  rejectBtnText: {
    fontSize: 12,
    fontFamily: FONTS.ralewayBold,
    color: COLORS.statusCancelled,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  // ── Bottom Navigation ─────────────────────────────────────────────────────
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: COLORS.charcoal,
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 8,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    ...SHADOW.card,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconWrapper: {
    width: 40,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RADIUS.md,
    marginBottom: 2,
  },
  navIconWrapperActive: {
    backgroundColor: 'rgba(201,169,110,0.2)',
  },
  navIcon: {
    fontSize: 20,
  },
  navLabel: {
    fontSize: 9,
    fontFamily: FONTS.ralewaySemiBold,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  navLabelActive: {
    color: COLORS.gold,
  },
  navActiveBar: {
    position: 'absolute',
    top: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: COLORS.gold,
    borderRadius: 1,
  },
});

export default styles;
