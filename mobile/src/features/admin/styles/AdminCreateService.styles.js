/**
 * AdminCreateService.styles.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium luxury style design for Obi Glow Admin Create Service Page.
 * Beautiful salon aesthetic with rich inputs, custom dropdowns, image pickers,
 * dynamic tag fields, and premium button styling.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS, RADIUS, SHADOW } from '@/theme/theme';

const { width } = Dimensions.get('window');

export { COLORS, FONTS };

export default StyleSheet.create({
  // ── Root & Scroll ────────────────────────────────────────────────────────
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    paddingTop: 20,
    paddingHorizontal: 22,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.divider,
    ...SHADOW.pill,
  },
  headerTitle: {
    fontFamily: FONTS.cormorantBold,
    fontSize: 24,
    color: COLORS.charcoal,
    letterSpacing: 0.3,
  },
  headerTitleAccent: {
    fontFamily: FONTS.cormorantSemiBoldItalic,
    color: COLORS.gold,
  },
  resetBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },
  resetBtnText: {
    fontFamily: FONTS.ralewaySemiBold,
    fontSize: 12,
    color: COLORS.cardBgDark,
    letterSpacing: 0.5,
  },

  // ── Form Container & Cards ────────────────────────────────────────────────
  formContainer: {
    paddingHorizontal: 22,
    gap: 18,
  },
  sectionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.divider,
    ...SHADOW.soft,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: FONTS.cormorantSemiBold,
    fontSize: 18,
    color: COLORS.charcoal,
    letterSpacing: 0.2,
  },

  // ── Input Fields ──────────────────────────────────────────────────────────
  fieldGroup: {
    marginBottom: 14,
  },
  fieldRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  flex1: {
    flex: 1,
  },
  fieldLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  fieldLabel: {
    fontFamily: FONTS.ralewaySemiBold,
    fontSize: 12,
    color: COLORS.charcoal,
    letterSpacing: 0.4,
  },
  optionalLabel: {
    fontFamily: FONTS.ralewayLight,
    fontSize: 10,
    color: COLORS.textMuted,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.divider,
    paddingHorizontal: 14,
  },
  inputWrapperActive: {
    borderColor: COLORS.gold,
  },
  inputPrefix: {
    fontFamily: FONTS.ralewaySemiBold,
    fontSize: 14,
    color: COLORS.charcoal,
    marginRight: 6,
  },
  textInput: {
    flex: 1,
    fontFamily: FONTS.ralewayRegular,
    fontSize: 14,
    color: COLORS.charcoal,
    paddingVertical: 11,
    paddingHorizontal: 0,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },

  // ── Custom Dropdown Selector ──────────────────────────────────────────────
  selectorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.divider,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  selectorBtnActive: {
    borderColor: COLORS.gold,
  },
  selectorValue: {
    fontFamily: FONTS.ralewayRegular,
    fontSize: 14,
    color: COLORS.charcoal,
  },
  selectorPlaceholder: {
    fontFamily: FONTS.ralewayRegular,
    fontSize: 14,
    color: COLORS.textMuted,
  },
  dropdownList: {
    marginTop: 6,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.divider,
    padding: 6,
    maxHeight: 180,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: RADIUS.sm,
  },
  dropdownItemActive: {
    backgroundColor: COLORS.goldLight,
  },
  dropdownItemText: {
    fontFamily: FONTS.ralewayRegular,
    fontSize: 13,
    color: COLORS.charcoal,
  },
  dropdownItemTextActive: {
    fontFamily: FONTS.ralewaySemiBold,
    color: '#8B6914',
  },

  // ── Image Upload Grid ─────────────────────────────────────────────────────
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 6,
  },
  imageSlot: {
    width: (width - 22 * 2 - 18 * 2 - 10 * 3) / 4, // Fits exactly 4 per row
    aspectRatio: 1,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.divider,
    borderStyle: 'dashed',
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imageSlotFilled: {
    borderStyle: 'solid',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  removeImageBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadPlaceholderText: {
    fontFamily: FONTS.ralewayMedium,
    fontSize: 9,
    color: COLORS.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  imageLimitText: {
    fontFamily: FONTS.ralewayMedium,
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 8,
  },

  // ── Stepper Input (Duration) ──────────────────────────────────────────────
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.divider,
    height: 44,
  },
  stepperBtn: {
    width: 44,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperDivider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.divider,
  },
  stepperValueText: {
    flex: 1,
    fontFamily: FONTS.ralewaySemiBold,
    fontSize: 14,
    color: COLORS.charcoal,
    textAlign: 'center',
  },

  // ── Slider Indicator (Discount) ───────────────────────────────────────────
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sliderContainer: {
    height: 38,
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.divider,
    position: 'relative',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: COLORS.gold,
  },
  sliderThumb: {
    position: 'absolute',
    top: -5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.charcoal,
    borderWidth: 2,
    borderColor: COLORS.white,
    ...SHADOW.pill,
  },

  // ── Tags Management ───────────────────────────────────────────────────────
  tagInputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  addTagBtn: {
    backgroundColor: COLORS.charcoal,
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  addTagBtnText: {
    fontFamily: FONTS.ralewaySemiBold,
    fontSize: 12,
    color: COLORS.white,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.goldLight,
    borderColor: COLORS.divider,
    borderWidth: 1,
    borderRadius: RADIUS.full,
    paddingLeft: 10,
    paddingRight: 6,
    paddingVertical: 5,
    gap: 4,
  },
  tagBadgeText: {
    fontFamily: FONTS.ralewayMedium,
    fontSize: 11,
    color: '#8B6914',
  },

  // ── Toggle Switch (Availability) ──────────────────────────────────────────
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleInfo: {
    flex: 1,
    marginRight: 16,
  },
  toggleTitle: {
    fontFamily: FONTS.ralewaySemiBold,
    fontSize: 13,
    color: COLORS.charcoal,
    marginBottom: 2,
  },
  toggleSub: {
    fontFamily: FONTS.ralewayRegular,
    fontSize: 11,
    color: COLORS.textMuted,
  },

  // ── Bottom Action Button ──────────────────────────────────────────────────
  submitBtn: {
    backgroundColor: COLORS.charcoal,
    borderRadius: RADIUS.full,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    ...SHADOW.button,
  },
  submitBtnText: {
    fontFamily: FONTS.ralewayBold,
    fontSize: 14,
    color: COLORS.white,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
