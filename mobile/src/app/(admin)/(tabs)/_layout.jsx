import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SHADOW } from "../../../features/admin/styles/adminDashboard.styles";

// ─── Tab config ───────────────────────────────────────────────────────────────
const TAB_ITEMS = [
  { name: "Dashboard", icon: "grid", label: "Dashboard" },
  { name: "Services",  icon: "sparkles", label: "Services"  },
  { name: "Bookings",  icon: "calendar", label: "Bookings"  },
  { name: "Gallery",   icon: "images", label: "Gallery"   },
  { name: "Profile",   icon: "person", label: "Profile"   },
];

// ─── Custom Premium Tab Bar ───────────────────────────────────────────────────
const PremiumTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[tabStyles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {/* Gold top border */}
      <View style={tabStyles.topBorder} />

      <View style={tabStyles.tabRow}>
        {(() => {
          const seen = new Set();
          return state.routes.map((route, index) => {
            const tab = TAB_ITEMS.find((t) => t.name.toLowerCase() === route.name.toLowerCase()) || TAB_ITEMS[0];

            // Deduplicate tabs if Metro is caching multiple casing versions of the same file (e.g. gallery & Gallery)
            if (seen.has(tab.name)) return null;
            seen.add(tab.name);

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                style={tabStyles.tabItem}
                onPress={onPress}
                activeOpacity={0.7}
              >
                {/* Active indicator bar */}
                {isFocused && <View style={tabStyles.activeBar} />}

                {/* Icon bubble */}
                <View style={[tabStyles.iconBubble, isFocused && tabStyles.iconBubbleActive]}>
                  <Ionicons
                    name={isFocused ? tab.icon : `${tab.icon}-outline`}
                    size={20}
                    color={isFocused ? COLORS.gold : "rgba(255,255,255,0.4)"}
                  />
                </View>

                {/* Label */}
                <Text style={[tabStyles.label, isFocused && tabStyles.labelActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          });
        })()}
      </View>
    </View>
  );
};

// ─── Tab Bar Styles ───────────────────────────────────────────────────────────
const tabStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.charcoal,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 0,
    ...SHADOW.card,
  },
  topBorder: {
    height: 1.5,
    backgroundColor: 'rgba(201,169,110,0.25)',
    marginHorizontal: 0,
  },
  tabRow: {
    flexDirection: "row",
    paddingTop: 10,
    paddingHorizontal: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 4,
    position: "relative",
  },
  activeBar: {
    position: "absolute",
    top: -10,
    left: "20%",
    right: "20%",
    height: 2.5,
    backgroundColor: COLORS.gold,
    borderRadius: 2,
  },
  iconBubble: {
    width: 38,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 3,
  },
  iconBubbleActive: {
    backgroundColor: "rgba(201,169,110,0.18)",
  },
  label: {
    fontSize: 9,
    fontFamily: FONTS.ralewaySemiBold,
    color: "rgba(255,255,255,0.38)",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  labelActive: {
    color: COLORS.gold,
  },
});

// ─── Layout ───────────────────────────────────────────────────────────────────
const AdminTabsLayout = () => {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <PremiumTabBar {...props} />}
    >
      <Tabs.Screen name="Dashboard" />
      <Tabs.Screen name="Services"  />
      <Tabs.Screen name="Bookings"  />
      <Tabs.Screen name="Gallery"   />
      <Tabs.Screen name="Profile"   />
    </Tabs>
  );
};

export default AdminTabsLayout;
