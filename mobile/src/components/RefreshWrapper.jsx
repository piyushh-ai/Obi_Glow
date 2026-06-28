/**
 * RefreshWrapper.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Global reusable pull-to-refresh wrapper for Obi Glow.
 *
 * Supports two modes:
 *   1. `type="scroll"`   → wraps children in a <ScrollView> with RefreshControl
 *   2. `type="flatlist"` → renders a <FlatList> with RefreshControl built in
 *
 * Usage (ScrollView mode):
 *   <RefreshWrapper refreshing={refreshing} onRefresh={onRefresh}>
 *     <YourContent />
 *   </RefreshWrapper>
 *
 * Usage (FlatList mode):
 *   <RefreshWrapper
 *     type="flatlist"
 *     refreshing={refreshing}
 *     onRefresh={onRefresh}
 *     data={items}
 *     renderItem={renderItem}
 *     keyExtractor={(item) => item._id}
 *     numColumns={2}
 *     // ...any other FlatList props
 *   />
 * ─────────────────────────────────────────────────────────────────────────────
 */
import React from "react";
import { ScrollView, FlatList, RefreshControl } from "react-native";

// Brand color — Obi Glow gold
const BRAND_COLOR = "#C9A84C";

const RefreshWrapper = ({
  type = "scroll",
  refreshing = false,
  onRefresh,
  tintColor = BRAND_COLOR,
  colors = [BRAND_COLOR],
  // ScrollView props
  children,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  // FlatList props (only used when type="flatlist")
  data,
  renderItem,
  keyExtractor,
  ...rest
}) => {
  const refreshControl = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={tintColor}
      colors={colors}
    />
  );

  if (type === "flatlist") {
    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        contentContainerStyle={contentContainerStyle}
        refreshControl={refreshControl}
        {...rest}
      />
    );
  }

  // Default: ScrollView mode
  return (
    <ScrollView
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      contentContainerStyle={contentContainerStyle}
      refreshControl={refreshControl}
      {...rest}
    >
      {children}
    </ScrollView>
  );
};

export default RefreshWrapper;
