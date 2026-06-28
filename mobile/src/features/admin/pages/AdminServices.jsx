/**
 * AdminServices.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium luxury Admin Services page for Obi Glow — Female Beauty Salon.
 * Fetches actual data from Redux state.
 * Showcases a pulsing skeleton grid loader during API loading.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import usePageRefresh from "../../../hooks/usePageRefresh";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Animated,
  Dimensions,
  ScrollView,
  Modal,
  Alert,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAdmin } from "../hooks/useAdmin";
import styles, { COLORS, FONTS } from "../styles/AdminServices.styles";


const { width } = Dimensions.get("window");

// ─── Category Meta ─────────────────────────────────────────────────────────
const CATEGORY_META = {
  Bridal: {
    icon: "rose-outline",
    emoji: "👑",
    color: "#F5A7C8",
    bgColor: "#FDF0F7",
    accent: "#C4507A",
  },
  "Skin & Facial": {
    icon: "sparkles-outline",
    emoji: "✨",
    color: "#F5A7B8",
    bgColor: "#FDF0F3",
    accent: "#D4698A",
  },
  Makeup: {
    icon: "brush-outline",
    emoji: "💄",
    color: "#F5B8D0",
    bgColor: "#FDF0F6",
    accent: "#C4507A",
  },
  "Hair Care": {
    icon: "cut-outline",
    emoji: "💇",
    color: "#B8A9E0",
    bgColor: "#F3F0FB",
    accent: "#7B68C8",
  },
  "Body & Spa": {
    icon: "leaf-outline",
    emoji: "🌿",
    color: "#A7D4C0",
    bgColor: "#F0FAF5",
    accent: "#4D9E7A",
  },
  "Nail Art": {
    icon: "color-palette-outline",
    emoji: "💅",
    color: "#F5C6A7",
    bgColor: "#FDF5F0",
    accent: "#D4804D",
  },
  Waxing: {
    icon: "flame-outline",
    emoji: "🕯️",
    color: "#F5D4A7",
    bgColor: "#FDF8F0",
    accent: "#C4924D",
  },
  Threading: {
    icon: "git-branch-outline",
    emoji: "🧵",
    color: "#C8D4A7",
    bgColor: "#F5F8F0",
    accent: "#7A9E4D",
  },
};

const CATEGORY_ORDER = [
  "Bridal",
  "Skin & Facial",
  "Makeup",
  "Hair Care",
  "Body & Spa",
  "Nail Art",
  "Waxing",
  "Threading",
];

// ─── Helpers ───────────────────────────────────────────────────────────────
const formatPrice = (p) => `₹${Number(p).toLocaleString("en-IN")}`;
const formatDuration = (m) => {
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60),
    r = m % 60;
  return r > 0 ? `${h}h ${r}m` : `${h}h`;
};

// ─── Toggle Switch ──────────────────────────────────────────────────────────
const ToggleSwitch = ({ isOn, onToggle }) => {
  const anim = useRef(new Animated.Value(isOn ? 1 : 0)).current;
  const prevIsOn = useRef(isOn);

  useEffect(() => {
    if (prevIsOn.current !== isOn) {
      prevIsOn.current = isOn;
      Animated.spring(anim, {
        toValue: isOn ? 1 : 0,
        useNativeDriver: true,
        bounciness: 8,
      }).start();
    }
  }, [isOn]);

  const thumbX = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 16] });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggle}
      style={[
        styles.toggleTrack,
        isOn ? styles.toggleTrackOn : styles.toggleTrackOff,
      ]}
    >
      <Animated.View
        style={[styles.toggleThumb, { transform: [{ translateX: thumbX }] }]}
      />
    </TouchableOpacity>
  );
};

// ─── Pulsing Skeleton Card ──────────────────────────────────────────────────
const SkeletonCard = () => {
  const pulseAnim = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.85,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.35,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.skeletonCard, { opacity: pulseAnim }]}>
      <View style={styles.skeletonHeader}>
        <View style={styles.skeletonIcon} />
        <View style={styles.skeletonMenu} />
      </View>
      <View style={styles.skeletonLineLarge} />
      <View style={styles.skeletonLineSmall} />
      <View style={styles.skeletonBadge} />
      <View style={styles.skeletonFooter}>
        <View style={styles.skeletonTextPill} />
        <View style={styles.skeletonToggle} />
      </View>
    </Animated.View>
  );
};

// ─── Service Card (Grid Cell) ───────────────────────────────────────────────
const ServiceCard = React.memo(({ service, onToggle, onPressMenu, meta, animDelay }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const isServiceActive =
    service.isAvailable !== undefined ? service.isAvailable : service.isActive;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 320,
        delay: animDelay,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay: animDelay,
        useNativeDriver: true,
        bounciness: 5,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.serviceCard,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        !isServiceActive && styles.serviceCardInactive,
      ]}
    >
      {/* Top: icon + menu */}
      <View style={styles.serviceCardTop}>
        <View
          style={[styles.serviceIconWrap, { backgroundColor: meta.bgColor }]}
        >
          <Ionicons name={meta.icon} size={20} color={meta.accent} />
        </View>
        <TouchableOpacity
          style={styles.serviceMenuBtn}
          activeOpacity={0.7}
          onPress={() => onPressMenu(service)}
        >
          <Ionicons
            name="ellipsis-horizontal"
            size={14}
            color={COLORS.textMuted}
          />
        </TouchableOpacity>
      </View>

      {/* Service name */}
      <Text style={styles.serviceName} numberOfLines={2}>
        {service.name}
      </Text>

      {/* Price badge */}
      <View
        style={[styles.servicePriceBadge, { backgroundColor: meta.bgColor }]}
      >
        <Text style={[styles.servicePriceText, { color: meta.accent }]}>
          {formatPrice(service.price)}
        </Text>
      </View>

      {/* Duration */}
      <View style={styles.serviceDurationRow}>
        <Ionicons name="time-outline" size={11} color={COLORS.textMuted} />
        <Text style={styles.serviceDurationText}>
          {formatDuration(service.duration)}
        </Text>
      </View>

      {/* Divider */}
      <View style={styles.serviceCardDivider} />

      {/* Toggle row */}
      <View style={styles.serviceCardFooter}>
        <Text
          style={[
            styles.serviceActiveLabel,
            !isServiceActive && styles.serviceInactiveLabel,
          ]}
        >
          {isServiceActive ? "Active" : "Inactive"}
        </Text>
        <ToggleSwitch
          isOn={isServiceActive}
          onToggle={() => onToggle(service._id || service.id)}
        />
      </View>
    </Animated.View>
  );
});

// ─── Category Pill Tab ──────────────────────────────────────────────────────
const CategoryPill = ({ cat, isActive, count, onPress }) => {
  const meta = CATEGORY_META[cat];
  return (
    <TouchableOpacity
      style={[
        styles.catPill,
        isActive && [
          styles.catPillActive,
          { borderColor: meta?.accent || COLORS.gold },
        ],
      ]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={styles.catPillEmoji}>{meta?.emoji || "✦"}</Text>
      <Text
        style={[
          styles.catPillText,
          isActive && {
            color: meta?.accent || COLORS.gold,
            fontFamily: FONTS.ralewaySemiBold,
          },
        ]}
      >
        {cat === "All" ? "All" : cat}
      </Text>
      <View
        style={[
          styles.catPillCount,
          isActive && { backgroundColor: meta?.accent || COLORS.gold },
        ]}
      >
        <Text style={[styles.catPillCountText, isActive && { color: "#fff" }]}>
          {count}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────────
const AdminServices = () => {
  const {
    services,
    isLoading,
    handleGetAllServices,
    handleToggleService,
    handleDeleteService,
  } = useAdmin();


  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  // ── Global pull-to-refresh (reusable across pages) ──────────────────────
  const { refreshing, onRefresh } = usePageRefresh(handleGetAllServices);

  const headerAnim = useRef(new Animated.Value(0)).current;
  const listKey = useRef(0);

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    handleGetAllServices();
  }, []);

  const handleToggle = useCallback(
    async (id) => {
      const res = await handleToggleService(id);
      if (!res.success) {
        Alert.alert("Error", res.error);
      }
    },
    [handleToggleService],
  );

  const confirmDelete = (id) => {
    Alert.alert(
      "Delete Service",
      "Are you sure you want to permanently delete this service? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const res = await handleDeleteService(id);
            if (res.success) {
              Alert.alert("Success", "Service deleted successfully");
            } else {
              Alert.alert("Error", res.error);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  const allCategories = useMemo(() => {
    // If services is empty or undefined, return default categories
    if (!services || services.length === 0) return [];
    return CATEGORY_ORDER.filter((c) => services.some((s) => s.category === c));
  }, [services]);

  const tabs = useMemo(() => ["All", ...allCategories], [allCategories]);

  const filteredServices = useMemo(() => {
    listKey.current += 1;
    if (!services) return [];
    return services.filter((s) => {
      const matchCat =
        activeCategory === "All" || s.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        (s.description && s.description.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [services, activeCategory, searchQuery]);

  const totalActive = useMemo(() => {
    if (!services) return 0;
    return services.filter((s) =>
      s.isAvailable !== undefined ? s.isAvailable : s.isActive,
    ).length;
  }, [services]);

  const getCatCount = (cat) => {
    if (!services) return 0;
    return cat === "All"
      ? services.length
      : services.filter((s) => s.category === cat).length;
  };

  const activeMeta =
    activeCategory !== "All" ? CATEGORY_META[activeCategory] : null;

  const renderItem = useCallback(
    ({ item, index }) => {
      const meta =
        CATEGORY_META[item.category] || CATEGORY_META["Skin & Facial"];
      return (
        <ServiceCard
          service={item}
          onToggle={handleToggle}
          onPressMenu={(srv) => {
            setSelectedService(srv);
            setMenuVisible(true);
          }}
          meta={meta}
          animDelay={Math.min(index, 8) * 50}
        />
      );
    },
    [handleToggle],
  );

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconWrap}>
        <Ionicons name="search-outline" size={32} color={COLORS.blushDark} />
      </View>
      <Text style={styles.emptyTitle}>No Services Found</Text>
      <Text style={styles.emptySubtitle}>
        Try a different search or category.
      </Text>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <Animated.View style={[styles.header, { opacity: headerAnim }]}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerLabel}>Obi Glow Studio</Text>
          <Text style={styles.headerTitle}>
            Our <Text style={styles.headerTitleAccent}>Services</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.8}
          onPress={() => router.push("/(admin)/services/CreateService")}
        >
          <Ionicons name="add" size={18} color={COLORS.white} />
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* ── Search Bar ─────────────────────────────────────────────────── */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={16}
          color={COLORS.textMuted}
          style={{ marginRight: 8 }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search services…"
          placeholderTextColor={COLORS.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={16} color={COLORS.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* ── Stats Row ──────────────────────────────────────────────────── */}
      <View style={styles.statsRow}>
        <View style={styles.statChip}>
          <Text style={[styles.statChipNum, { color: COLORS.gold }]}>
            {services?.length || 0}
          </Text>
          <Text style={styles.statChipLabel}>Total</Text>
        </View>
        <View style={styles.statDot} />
        <View style={styles.statChip}>
          <Text style={styles.statChipNum}>{totalActive}</Text>
          <Text style={styles.statChipLabel}>Active</Text>
        </View>
        <View style={styles.statDot} />
        <View style={styles.statChip}>
          <Text style={styles.statChipNum}>
            {(services?.length || 0) - totalActive}
          </Text>
          <Text style={styles.statChipLabel}>Inactive</Text>
        </View>
        <View style={styles.statDot} />
        <View style={styles.statChip}>
          <Text style={[styles.statChipNum, { color: COLORS.gold }]}>
            {allCategories.length}
          </Text>
          <Text style={styles.statChipLabel}>Categories</Text>
        </View>
      </View>

      {/* ── Category Pills ─────────────────────────────────────────────── */}
      <View style={styles.catPillsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catPillsContent}
        >
          {tabs.map((cat) => (
            <CategoryPill
              key={cat}
              cat={cat}
              isActive={activeCategory === cat}
              count={getCatCount(cat)}
              onPress={() => setActiveCategory(cat)}
            />
          ))}
        </ScrollView>
      </View>

      {/* ── Category Banner ────────────────────────────────────────────── */}
      {activeMeta && !isLoading && (
        <View
          style={[
            styles.categoryBanner,
            { backgroundColor: activeMeta.bgColor },
          ]}
        >
          <Text style={styles.categoryBannerEmoji}>{activeMeta.emoji}</Text>
          <Text
            style={[styles.categoryBannerTitle, { color: activeMeta.accent }]}
          >
            {activeCategory}
          </Text>
          <Text
            style={[styles.categoryBannerCount, { color: activeMeta.accent }]}
          >
            {filteredServices.length}{" "}
            {filteredServices.length === 1 ? "service" : "services"}
          </Text>
        </View>
      )}

      {/* ── Services Grid / Skeleton Grid ──────────────────────────────── */}
      <FlatList
        key={`grid-${activeCategory}-${isLoading}`}
        data={isLoading ? [1, 2, 3, 4, 5, 6] : filteredServices}
        renderItem={isLoading ? () => <SkeletonCard /> : renderItem}
        keyExtractor={(item, index) =>
          isLoading ? `skeleton-${index}` : String(item._id || item.id)
        }
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
        ListHeaderComponent={
          activeCategory === "All" && !searchQuery && !isLoading ? (
            <Text style={styles.gridSectionLabel}>
              All Services · {filteredServices.length}
            </Text>
          ) : null
        }
        refreshControl={
          // refreshing & onRefresh come from global usePageRefresh hook
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.gold]}
            tintColor={COLORS.gold}
          />
        }
      />

      {/* ── Action Sheet Modal ─────────────────────────────────────────── */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalIndicator} />
            <Text style={styles.modalServiceTitle} numberOfLines={1}>
              {selectedService?.name || "Service Options"}
            </Text>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setMenuVisible(false);
                if (selectedService) {
                  router.push({
                    pathname: "/(admin)/services/CreateService",
                    params: { id: selectedService._id || selectedService.id },
                  });
                }
              }}
              activeOpacity={0.7}
            >
              <Ionicons
                name="create-outline"
                size={18}
                color={COLORS.charcoal}
              />
              <Text style={styles.modalOptionText}>Edit Service</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalOption, styles.modalOptionDelete]}
              onPress={() => {
                setMenuVisible(false);
                if (selectedService) {
                  confirmDelete(selectedService._id || selectedService.id);
                }
              }}
              activeOpacity={0.7}
            >
              <Ionicons
                name="trash-outline"
                size={18}
                color={COLORS.statusCancelled}
              />
              <Text style={styles.modalOptionTextDelete}>Delete Service</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancelBtn}
              onPress={() => setMenuVisible(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default AdminServices;
