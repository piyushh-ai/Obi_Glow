/**
 * AdminServices.styles.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium luxury styles — 2-column grid + category filter tabs.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS, RADIUS, SHADOW } from '@/theme/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 22 * 2 - 10) / 2; // 2 cols, 22px side margin, 10px gap

export { COLORS, FONTS };

export default StyleSheet.create({
  // ── Root ─────────────────────────────────────────────────────────────────
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    paddingTop: 20,
    paddingHorizontal: 22,
    paddingBottom: 10,
    backgroundColor: COLORS.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: { flex: 1 },
  headerLabel: {
    fontFamily: FONTS.ralewayMedium,
    fontSize: 11,
    color: COLORS.textMuted,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
    marginBottom: 1,
  },
  headerTitle: {
    fontFamily: FONTS.cormorantBold,
    fontSize: 28,
    color: COLORS.charcoal,
    letterSpacing: 0.2,
  },
  headerTitleAccent: {
    fontFamily: FONTS.cormorantSemiBoldItalic,
    color: COLORS.gold,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.charcoal,
    borderRadius: RADIUS.full,
    paddingHorizontal: 16,
    paddingVertical: 9,
    gap: 5,
    ...SHADOW.button,
  },
  addBtnText: {
    fontFamily: FONTS.ralewaySemiBold,
    fontSize: 13,
    color: COLORS.white,
    letterSpacing: 0.3,
  },

  // ── Search Bar ────────────────────────────────────────────────────────────
  searchContainer: {
    marginHorizontal: 22,
    marginTop: 8,
    marginBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.full,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: COLORS.divider,
    ...SHADOW.soft,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.ralewayRegular,
    fontSize: 13,
    color: COLORS.charcoal,
    padding: 0,
  },

  // ── Stats Row ─────────────────────────────────────────────────────────────
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 22,
    marginTop: 12,
    marginBottom: 4,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.divider,
    ...SHADOW.soft,
  },
  statChip: {
    flex: 1,
    alignItems: 'center',
  },
  statChipNum: {
    fontFamily: FONTS.cormorantBold,
    fontSize: 20,
    color: COLORS.charcoal,
    lineHeight: 22,
  },
  statChipLabel: {
    fontFamily: FONTS.ralewayMedium,
    fontSize: 9,
    color: COLORS.textMuted,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginTop: 1,
  },
  statDot: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.divider,
    marginHorizontal: 4,
  },

  // ── Category Pills ────────────────────────────────────────────────────────
  catPillsWrapper: {
    marginTop: 8,
    marginBottom: 4,
  },
  catPillsContent: {
    paddingHorizontal: 22,
    paddingVertical: 6,
    gap: 8,
    alignItems: 'center',
  },
  catPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.divider,
    ...SHADOW.pill,
  },
  catPillActive: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
  },
  catPillEmoji: {
    fontSize: 13,
    lineHeight: 16,
  },
  catPillText: {
    fontFamily: FONTS.ralewayMedium,
    fontSize: 12,
    color: COLORS.textMuted,
    letterSpacing: 0.2,
  },
  catPillCount: {
    minWidth: 17,
    height: 17,
    borderRadius: 8.5,
    backgroundColor: COLORS.divider,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  catPillCountText: {
    fontFamily: FONTS.ralewayBold,
    fontSize: 9,
    color: COLORS.charcoal,
  },

  // ── Category Banner ───────────────────────────────────────────────────────
  categoryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 22,
    marginTop: 12,
    marginBottom: 0,
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
  },
  categoryBannerEmoji: {
    fontSize: 18,
  },
  categoryBannerTitle: {
    fontFamily: FONTS.cormorantSemiBold,
    fontSize: 17,
    flex: 1,
    letterSpacing: 0.2,
  },
  categoryBannerCount: {
    fontFamily: FONTS.ralewayMedium,
    fontSize: 11,
    opacity: 0.7,
  },

  // ── Grid ──────────────────────────────────────────────────────────────────
  gridContent: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 100,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  gridSectionLabel: {
    fontFamily: FONTS.ralewayMedium,
    fontSize: 11,
    color: COLORS.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 10,
  },

  // ── Service Card ──────────────────────────────────────────────────────────
  serviceCard: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.divider,
    ...SHADOW.soft,
  },
  serviceCardInactive: {
    opacity: 0.55,
  },
  serviceCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  serviceIconWrap: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceMenuBtn: {
    width: 26,
    height: 26,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.blush,
  },
  serviceName: {
    fontFamily: FONTS.cormorantSemiBold,
    fontSize: 15,
    color: COLORS.charcoal,
    letterSpacing: 0.1,
    lineHeight: 20,
    marginBottom: 8,
    minHeight: 40,
  },
  servicePriceBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    marginBottom: 6,
  },
  servicePriceText: {
    fontFamily: FONTS.ralewaySemiBold,
    fontSize: 12,
  },
  serviceDurationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 10,
  },
  serviceDurationText: {
    fontFamily: FONTS.ralewayMedium,
    fontSize: 11,
    color: COLORS.textMuted,
  },
  serviceCardDivider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginBottom: 10,
  },
  serviceCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceActiveLabel: {
    fontFamily: FONTS.ralewaySemiBold,
    fontSize: 10,
    color: COLORS.statusConfirmed,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  serviceInactiveLabel: {
    color: COLORS.textMuted,
  },

  // ── Toggle ────────────────────────────────────────────────────────────────
  toggleTrack: {
    width: 36,
    height: 20,
    borderRadius: 10,
    padding: 2,
    justifyContent: 'center',
  },
  toggleTrackOn: {
    backgroundColor: COLORS.statusConfirmed,
  },
  toggleTrackOff: {
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  toggleThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    ...SHADOW.pill,
  },

  // ── Empty State ───────────────────────────────────────────────────────────
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIconWrap: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.blush,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyTitle: {
    fontFamily: FONTS.cormorantSemiBold,
    fontSize: 20,
    color: COLORS.charcoal,
    marginBottom: 6,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontFamily: FONTS.ralewayRegular,
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 19,
  },

  // ── Skeleton Loader ───────────────────────────────────────────────────────
  skeletonCard: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.divider,
    marginBottom: 10,
  },
  skeletonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  skeletonIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.divider,
  },
  skeletonMenu: {
    width: 26,
    height: 26,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.divider,
  },
  skeletonLineLarge: {
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.divider,
    marginBottom: 6,
    width: '85%',
  },
  skeletonLineSmall: {
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.divider,
    marginBottom: 14,
    width: '55%',
  },
  skeletonBadge: {
    width: 60,
    height: 20,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.divider,
    marginBottom: 14,
  },
  skeletonFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    paddingTop: 10,
  },
  skeletonTextPill: {
    width: 40,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.divider,
  },
  skeletonToggle: {
    width: 36,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.divider,
  },

  // ── Action Sheet Modal ────────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 38,
    borderWidth: 1,
    borderColor: COLORS.divider,
    ...SHADOW.card,
  },
  modalIndicator: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.divider,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalServiceTitle: {
    fontFamily: FONTS.cormorantSemiBold,
    fontSize: 20,
    color: COLORS.charcoal,
    letterSpacing: 0.2,
    textAlign: 'center',
    marginBottom: 18,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  modalOptionDelete: {
    borderBottomWidth: 0,
    marginBottom: 14,
  },
  modalOptionText: {
    fontFamily: FONTS.ralewaySemiBold,
    fontSize: 14,
    color: COLORS.charcoal,
  },
  modalOptionTextDelete: {
    fontFamily: FONTS.ralewaySemiBold,
    fontSize: 14,
    color: COLORS.statusCancelled,
  },
  modalCancelBtn: {
    backgroundColor: COLORS.blush,
    borderRadius: RADIUS.full,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  modalCancelText: {
    fontFamily: FONTS.ralewayBold,
    fontSize: 13,
    color: COLORS.cardBgDark,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});
