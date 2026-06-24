/**
 * AdminDashboard.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium luxury salon management dashboard for Obi Glow.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import React, { useState, useRef, useEffect } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar,
  Dimensions,
} from "react-native";
import styles, { COLORS, FONTS } from "../styles/adminDashboard.styles";

const { width } = Dimensions.get("window");

// ─── Mock Data ────────────────────────────────────────────────────────────────
const STATS = [
  {
    id: 1,
    icon: "calendar",
    iconLib: "Ionicons",
    label: "Today's Bookings",
    value: "12",
    trend: "↑ 3 from yesterday",
    variant: "gold",
    badge: "Live",
  },
  {
    id: 2,
    icon: "time-outline",
    iconLib: "Ionicons",
    label: "Pending Bookings",
    value: "5",
    trend: "Needs attention",
    variant: "blush",
    badge: null,
  },
  {
    id: 3,
    icon: "people",
    iconLib: "Ionicons",
    label: "Total Customers",
    value: "248",
    trend: "↑ 18 this month",
    variant: "default",
    badge: null,
  },
  {
    id: 4,
    icon: "sparkles",
    iconLib: "Ionicons",
    label: "Total Services",
    value: "32",
    trend: "Across 6 categories",
    variant: "dark",
    badge: null,
  },
];

const QUICK_ACTIONS = [
  { id: 1, icon: "add-circle", label: "Add Service", primary: true, onPress: () => router.push("/(admin)/services/CreateService") },
  { id: 2, icon: "calendar-outline", label: "Bookings", primary: false },
  { id: 3, icon: "cloud-upload-outline", label: "Upload Work", primary: false },
  { id: 4, icon: "people-outline", label: "Customers", primary: false },
];

const APPOINTMENTS = [
  {
    id: 1,
    name: "Priya Sharma",
    initials: "PS",
    service: "Bridal Makeup Package",
    time: "10:00 AM",
    duration: "3 hrs",
    price: "₹4,500",
    status: "confirmed",
  },
  {
    id: 2,
    name: "Ananya Gupta",
    initials: "AG",
    service: "Hair Colour & Highlights",
    time: "12:30 PM",
    duration: "2 hrs",
    price: "₹3,200",
    status: "confirmed",
  },
  {
    id: 3,
    name: "Neha Verma",
    initials: "NV",
    service: "Facial & Glow Treatment",
    time: "3:00 PM",
    duration: "1.5 hrs",
    price: "₹1,800",
    status: "pending",
  },
];

const RECENT_BOOKINGS = [
  {
    id: 1,
    name: "Ritika Malhotra",
    initials: "RM",
    service: "Nail Art & Manicure",
    date: "Tomorrow, 11:00 AM",
  },
  {
    id: 2,
    name: "Simran Kaur",
    initials: "SK",
    service: "Party Makeup & Hair",
    date: "Jun 25, 2:00 PM",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getStatusColors = (status) => {
  switch (status) {
    case "confirmed":
      return {
        bg: COLORS.statusConfirmedBg,
        text: COLORS.statusConfirmed,
        label: "Confirmed",
      };
    case "pending":
      return {
        bg: COLORS.statusPendingBg,
        text: COLORS.statusPending,
        label: "Pending",
      };
    case "cancelled":
      return {
        bg: COLORS.statusCancelledBg,
        text: COLORS.statusCancelled,
        label: "Cancelled",
      };
    default:
      return {
        bg: COLORS.statusPendingBg,
        text: COLORS.statusPending,
        label: "Pending",
      };
  }
};

const getDateString = () => {
  const d = new Date();
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatCard = ({ stat, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay: index * 100,
        useNativeDriver: true,
        bounciness: 5,
      }),
    ]).start();
  }, []);

  const cardStyle = [
    styles.statCard,
    stat.variant === "gold" && styles.statCardGold,
    stat.variant === "blush" && styles.statCardBlush,
    stat.variant === "dark" && styles.statCardDark,
  ];

  const isDark = stat.variant === "dark";

  return (
    <Animated.View
      style={[
        cardStyle,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <View style={styles.statIconRow}>
        <View
          style={[styles.statIconBubble, isDark && styles.statIconBubbleDark]}
        >
          <Ionicons
            name={stat.icon}
            size={22}
            color={
              isDark
                ? "#C9A96E"
                : stat.variant === "gold"
                  ? "#8B6914"
                  : stat.variant === "blush"
                    ? "#9E4E6A"
                    : "#7C6A8D"
            }
          />
        </View>
        {stat.badge && (
          <View style={styles.statBadge}>
            <Text style={styles.statBadgeText}>{stat.badge}</Text>
          </View>
        )}
      </View>
      <Text style={[styles.statValue, isDark && styles.statValueLight]}>
        {stat.value}
      </Text>
      <Text style={[styles.statLabel, isDark && styles.statLabelLight]}>
        {stat.label}
      </Text>
      <Text
        style={[styles.statTrend, isDark && { color: "rgba(201,169,110,0.8)" }]}
      >
        {stat.trend}
      </Text>
    </Animated.View>
  );
};

const AppointmentCard = ({ appt }) => {
  const status = getStatusColors(appt.status);
  return (
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentCardTop}>
        <View style={styles.appointmentAvatar}>
          <Text style={styles.appointmentAvatarText}>{appt.initials}</Text>
        </View>
        <View style={styles.appointmentInfo}>
          <Text style={styles.appointmentName}>{appt.name}</Text>
          <Text style={styles.appointmentService}>{appt.service}</Text>
        </View>
        <View>
          <Text style={styles.appointmentTime}>{appt.time}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: status.bg, marginTop: 4 },
            ]}
          >
            <Text style={[styles.statusText, { color: status.text }]}>
              {status.label}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.appointmentDivider} />
      <View style={styles.appointmentMeta}>
        <View style={styles.appointmentMetaItem}>
          <Ionicons
            name="timer-outline"
            size={14}
            color="#9E8FB0"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.appointmentMetaText}>{appt.duration}</Text>
        </View>
        <View style={styles.appointmentMetaItem}>
          <Ionicons
            name="cash-outline"
            size={14}
            color="#9E8FB0"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.appointmentMetaText}>{appt.price}</Text>
        </View>
      </View>
    </View>
  );
};

const BookingCard = ({ booking }) => {
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);

  if (accepted || rejected) {
    const status = getStatusColors(accepted ? "confirmed" : "cancelled");
    return (
      <View style={[styles.bookingCard, { borderColor: status.bg }]}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View style={[styles.bookingAvatar, { backgroundColor: status.bg }]}>
            <Text style={styles.bookingAvatarText}>{booking.initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.bookingName}>{booking.name}</Text>
            <Text style={styles.bookingService}>{booking.service}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
            <Text style={[styles.statusText, { color: status.text }]}>
              {accepted ? "Accepted ✓" : "Declined ✕"}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.bookingCard}>
      <View style={styles.bookingCardHeader}>
        <View style={styles.bookingAvatar}>
          <Text style={styles.bookingAvatarText}>{booking.initials}</Text>
        </View>
        <View style={styles.bookingInfo}>
          <Text style={styles.bookingName}>{booking.name}</Text>
          <Text style={styles.bookingService}>{booking.service}</Text>
          <Text style={styles.bookingDateTime}>{booking.date}</Text>
        </View>
      </View>
      <View style={styles.bookingActions}>
        <TouchableOpacity
          style={styles.acceptBtn}
          onPress={() => setAccepted(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.acceptBtnText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rejectBtn}
          onPress={() => setRejected(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.rejectBtnText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={[styles.safeArea, { flex: 1 }]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <Animated.View style={[styles.header, { opacity: headerAnim }]}>
        <View style={styles.headerLeft}>
          <Text style={styles.greetingLabel}>Good Morning</Text>
          <Text style={styles.greetingName}>
            Obi <Text style={styles.greetingNameAccent}>Studio ✦</Text>
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationBtn} activeOpacity={0.8}>
            <Ionicons name="notifications-outline" size={22} color="#4A3F6B" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarWrapper} activeOpacity={0.8}>
            <Text style={styles.avatarInitials}>OG</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Date Banner ──────────────────────────────────────────────────── */}
        <View style={styles.dateBanner}>
          <Text style={styles.dateBannerText}>Today</Text>
          <View style={styles.dateBannerDot} />
          <Text style={styles.dateBannerDate}>{getDateString()}</Text>
        </View>

        {/* ── Stats Grid ───────────────────────────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Overview <Text style={styles.sectionTitleAccent}>Today</Text>
          </Text>
        </View>
        <View style={styles.statsGrid}>
          {STATS.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </View>

        {/* ── Quick Actions ────────────────────────────────────────────────── */}
        <View style={styles.quickActionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Quick <Text style={styles.sectionTitleAccent}>Actions</Text>
            </Text>
          </View>
          <View style={styles.quickActionsRow}>
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[
                  styles.quickActionBtn,
                  action.primary && styles.quickActionBtnPrimary,
                ]}
                activeOpacity={0.8}
                onPress={() => {
                  if (action.onPress) {
                    action.onPress();
                  }
                }}
              >
                <Ionicons
                  name={action.icon}
                  size={24}
                  color={action.primary ? "#FFFFFF" : "#5C4F8A"}
                  style={{ marginBottom: 6 }}
                />
                <Text
                  style={[
                    styles.quickActionLabel,
                    action.primary && styles.quickActionLabelPrimary,
                  ]}
                >
                  {action.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Upcoming Appointments ────────────────────────────────────────── */}
        <View style={styles.appointmentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Upcoming{" "}
              <Text style={styles.sectionTitleAccent}>Appointments</Text>
            </Text>
            <TouchableOpacity>
              <Text style={styles.seeAllBtn}>See All</Text>
            </TouchableOpacity>
          </View>
          {APPOINTMENTS.map((appt) => (
            <AppointmentCard key={appt.id} appt={appt} />
          ))}
        </View>

        {/* ── Recent Bookings ──────────────────────────────────────────────── */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              New <Text style={styles.sectionTitleAccent}>Requests</Text>
            </Text>
            <TouchableOpacity>
              <Text style={styles.seeAllBtn}>See All</Text>
            </TouchableOpacity>
          </View>
          {RECENT_BOOKINGS.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminDashboard;
