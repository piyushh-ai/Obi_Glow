/**
 * AdminProfile.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium Admin Profile screen for Obi Glow.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../auth/hooks/useAuth';
import styles from '../styles/AdminProfile.styles';
import { COLORS } from '../../../theme/theme';

// ─── Menu Items ───────────────────────────────────────────────────────────────
const MENU_ITEMS = [
  {
    id: 'services',
    icon: 'sparkles-outline',
    label: 'Manage Services',
    sub: 'Add, edit or remove services',
    danger: false,
  },
  {
    id: 'bookings',
    icon: 'calendar-outline',
    label: 'All Bookings',
    sub: 'View and manage appointments',
    danger: false,
  },
  {
    id: 'gallery',
    icon: 'images-outline',
    label: 'Gallery / Portfolio',
    sub: 'Upload and manage work photos',
    danger: false,
  },
  {
    id: 'customers',
    icon: 'people-outline',
    label: 'Customer List',
    sub: 'Browse your client base',
    danger: false,
  },
  {
    id: 'settings',
    icon: 'settings-outline',
    label: 'Salon Settings',
    sub: 'Hours, location & preferences',
    danger: false,
  },
];

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ user }) => {
  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : 'OG';

  if (user?.profilePicture) {
    return (
      <View style={styles.avatarRing}>
        <Image source={{ uri: user.profilePicture }} style={styles.avatarImage} />
      </View>
    );
  }
  return (
    <View style={styles.avatarRing}>
      <View style={styles.avatarFallback}>
        <Text style={styles.avatarFallbackText}>{initials}</Text>
      </View>
    </View>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const AdminProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const { handleLogout } = useAuth();

  const handleLogoutPress = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => handleLogout(), // useAuth handleLogout already redirects
        },
      ]
    );
  };

  const handleMenuPress = (id) => {
    // Navigation placeholders — connect to your routes
    console.log('Menu pressed:', id);
  };

  const handleCreateService = () => {
    console.log('Create service pressed');
    // router.push('/(admin)/CreateService');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.charcoal} />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Hero Header ────────────────────────────────────────────────── */}
        <View style={styles.heroContainer}>
          {/* Brand label */}
          <View style={styles.heroBrandRow}>
            <View style={styles.heroDivider} />
            <Text style={styles.heroBrandText}>Obi Glow Studio</Text>
            <View style={styles.heroDivider} />
          </View>

          {/* Avatar */}
          <Avatar user={user} />

          {/* Name + email */}
          <Text style={styles.heroName}>{user?.name ?? 'Studio Admin'}</Text>
          <Text style={styles.heroEmail}>{user?.email ?? ''}</Text>

          {/* Role badge */}
          <View style={styles.heroBadgeRow}>
            <View style={styles.heroBadge}>
              <Ionicons name="shield-checkmark" size={11} color={COLORS.gold} />
              <Text style={styles.heroBadgeText}>Admin</Text>
            </View>
            <View style={styles.heroBadge}>
              <Ionicons name="ellipse" size={7} color={COLORS.statusConfirmed} />
              <Text style={[styles.heroBadgeText, { color: COLORS.statusConfirmed }]}>Active</Text>
            </View>
          </View>
        </View>

        {/* ── Content ────────────────────────────────────────────────────── */}
        <View style={styles.contentWrapper}>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>32</Text>
              <Text style={styles.statLabel}>Services</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>248</Text>
              <Text style={styles.statLabel}>Clients</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Today</Text>
            </View>
          </View>

          {/* ── Create Service CTA ──────────────────────────────────────── */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              New{' '}
              <Text style={styles.sectionAccent}>Service</Text>
            </Text>
          </View>
          <View style={styles.createServiceCard}>
            <View style={styles.createServiceGradientBg}>
              <View style={styles.createServiceTopRow}>
                <Ionicons name="sparkles" size={28} color={COLORS.gold} />
                <View style={styles.createServiceBadge}>
                  <Text style={styles.createServiceBadgeText}>Quick Add</Text>
                </View>
              </View>
              <Text style={styles.createServiceTitle}>Create a Service</Text>
              <Text style={styles.createServiceSub}>
                Add a new beauty service to your salon menu with pricing, duration & category.
              </Text>
              <TouchableOpacity
                style={styles.createServiceBtn}
                onPress={handleCreateService}
                activeOpacity={0.85}
              >
                <Ionicons name="add" size={16} color={COLORS.charcoal} />
                <Text style={styles.createServiceBtnText}>Add Service</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ── Menu Items ──────────────────────────────────────────────── */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Quick{' '}
              <Text style={styles.sectionAccent}>Actions</Text>
            </Text>
          </View>
          <View style={styles.quickCard}>
            {MENU_ITEMS.map((item, index) => (
              <React.Fragment key={item.id}>
                <TouchableOpacity
                  style={styles.quickItem}
                  onPress={() => handleMenuPress(item.id)}
                  activeOpacity={0.75}
                >
                  <View style={[styles.quickIconBubble, item.danger && styles.quickIconBubbleDanger]}>
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={item.danger ? COLORS.statusCancelled : COLORS.cardBgDark}
                    />
                  </View>
                  <View style={styles.quickItemText}>
                    <Text style={[styles.quickItemLabel, item.danger && styles.quickItemLabelDanger]}>
                      {item.label}
                    </Text>
                    <Text style={styles.quickItemSub}>{item.sub}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
                </TouchableOpacity>
                {index < MENU_ITEMS.length - 1 && <View style={styles.quickItemDivider} />}
              </React.Fragment>
            ))}
          </View>

          {/* ── Logout ─────────────────────────────────────────────────── */}
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={handleLogoutPress}
            activeOpacity={0.8}
          >
            <Ionicons name="log-out-outline" size={18} color={COLORS.statusCancelled} />
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>Obi Glow v1.0  ·  Admin Panel</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminProfile;