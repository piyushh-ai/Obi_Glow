import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles, { COLORS, FONTS, RADIUS, SHADOW } from '../styles/login.style';

const { width, height } = Dimensions.get('window');

// ─── Google "G" Icon ──────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <View style={styles.googleIconWrapper}>
    <Text style={styles.googleIconText}>G</Text>
  </View>
);

// ─── Animated Google Button ───────────────────────────────────────────────────
const GoogleButton = ({ onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true, bounciness: 6 }).start();
  const handlePressOut = () =>
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Animated.View style={[styles.primaryButton, { transform: [{ scale: scaleAnim }] }]}>
        <GoogleIcon />
        <Text style={styles.primaryButtonText}>Continue with Google</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

// ─── Ornamental Divider ───────────────────────────────────────────────────────
const OrnamentDivider = () => (
  <View style={styles.ornamentRow}>
    <View style={styles.ornamentLine} />
    <Text style={styles.ornamentSymbol}>✦</Text>
    <View style={styles.ornamentLine} />
  </View>
);

// ─── Feature Pills ────────────────────────────────────────────────────────────
const FeaturePill = ({ icon, label }) => (
  <View style={styles.featurePill}>
    <Text style={styles.featurePillIcon}>{icon}</Text>
    <Text style={styles.featurePillText}>{label}</Text>
  </View>
);

// ─── Main Login Screen ────────────────────────────────────────────────────────
const LoginPage = ({ signIn }) => {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const badgeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(150),
      Animated.timing(badgeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 450, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, bounciness: 7 }),
      ]),
    ]).start();
  }, []);

  const handleGoogleLogin = () => {
    console.log('Google login');
    signIn();
  };

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* ── Full Screen Background Image ─────────────────────────────────── */}
      <Image
        source={require('../../../../assets/images/LoginPageImage.webp')}
        style={styles.fullScreenImage}
        resizeMode="cover"
      />

      {/* ── Dark scrim overlay (bottom 60%) ──────────────────────────────── */}
      {/* <View style={styles.scrimOverlay} /> */}

      {/* ── Brand badge (centre of screen) ───────────────────────────────── */}
      <Animated.View
        style={[
          styles.heroBrandOverlay,
          { top: insets.top + 32, opacity: badgeAnim },
        ]}
      >
        <View style={styles.brandPillTop}>
          <Text style={styles.brandPillTopText}>✦  BEAUTY & SALON  ✦</Text>
        </View>
        <Text style={styles.heroTitle}>OBI GLOW</Text>
        <Text style={styles.heroSubtitle}>Your Glow, Our Craft</Text>
      </Animated.View>

      {/* ── Floating Bottom Card ──────────────────────────────────────────── */}
      <Animated.View
        style={[
          styles.floatingCard,
          {
            paddingBottom: Math.max(insets.bottom + 8, 24),
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Drag handle */}
        <View style={styles.dragHandle} />

        {/* Card Brand Header */}
        <View style={styles.cardBrandRow}>
          <View style={styles.cardBrandAccentBar} />
          <View style={styles.cardBrandCenter}>
            <Text style={styles.cardPreTitle}>Welcome to</Text>
            <Text style={styles.cardMainTitle}>
              Obi <Text style={styles.cardMainTitleLight}>Glow</Text>
            </Text>
          </View>
          <View style={styles.cardBrandAccentBar} />
        </View>

        <OrnamentDivider />

        {/* Tagline */}
        <Text style={styles.cardTagline}>
          Your personal skin & wellness companion{'\n'}
          <Text style={styles.cardTaglineAccent}>for the radiant you ✨</Text>
        </Text>

        {/* Feature pills */}
        <View style={styles.featureRow}>
          <FeaturePill icon="🌸" label="Skincare" />
          <FeaturePill icon="✨" label="Glow" />
          <FeaturePill icon="💆🏽‍♀️" label="Wellness" />
        </View>

        {/* Google button */}
        <GoogleButton onPress={handleGoogleLogin} />

        {/* Terms */}
        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text>
          {' '}&{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </Animated.View>
    </View>
  );
};

export default LoginPage;