/**
 * AdminCreateService.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium luxury Service Creation Page UI for Obi Glow.
 * Match service.model.js (name, price, description, images, category, subCategory, duration, discount, tags, isAvailable)
 * Custom luxurious drop-down selector, dynamic tags picker, stepper inputs, etc.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useAdmin } from '../hooks/useAdmin';
import styles, { COLORS, FONTS } from '../styles/AdminCreateService.styles';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  'Bridal',
  'Skin & Facial',
  'Makeup',
  'Hair Care',
  'Body & Spa',
  'Nail Art',
  'Waxing',
  'Threading',
];

const AdminCreateService = () => {
  const { id } = useLocalSearchParams();
  const {
    handleCreateService,
    handleEditService,
    handleGetSingleService,
    isLoading,
  } = useAdmin();

  // ─── State Variables ─────────────────────────────────────────────────────
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [duration, setDuration] = useState(30); // in minutes
  const [discount, setDiscount] = useState(0); // percentage (0-100)
  const [isAvailable, setIsAvailable] = useState(true);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);

  // Store initial images list to calculate remaining images when editing
  const [initialImages, setInitialImages] = useState([]);

  // UI States
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);

  // Load existing details if in Editing mode
  React.useEffect(() => {
    if (id) {
      loadServiceDetails(id);
    }
  }, [id]);

  const loadServiceDetails = async (srvId) => {
    const res = await handleGetSingleService(srvId);
    if (res.success && res.service) {
      const s = res.service;
      setName(s.name || '');
      setDescription(s.description || '');
      setCategory(s.category || '');
      setSubCategory(s.subCategory || '');
      setPrice(srvId ? s.price.toString() : '');
      setDuration(s.duration || 30);
      setDiscount(s.discount || 0);
      setIsAvailable(s.isAvailable !== undefined ? s.isAvailable : true);
      setTags(s.tags || []);
      setImages(s.image || []);
      setInitialImages(s.image || []);
    } else {
      alert('Failed to load service details.');
    }
  };

  // ─── Handlers ────────────────────────────────────────────────────────────
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim().toLowerCase())) {
      setTags([...tags, tagInput.trim().toLowerCase()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (targetTag) => {
    setTags(tags.filter((t) => t !== targetTag));
  };

  const handlePickImage = async () => {
    if (images.length >= 5) {
      alert('You can select a maximum of 5 images');
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: 5 - images.length,
      quality: 0.8,
    });

    if (!result.canceled && result.assets) {
      const selectedUris = result.assets.map((asset) => asset.uri);
      setImages([...images, ...selectedUris].slice(0, 5));
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  const handleReset = () => {
    setName('');
    setPrice('');
    setDescription('');
    setCategory('');
    setSubCategory('');
    setDuration(30);
    setDiscount(0);
    setIsAvailable(true);
    setTags([]);
    setImages([]);
    setCategoryOpen(false);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      alert('Please enter a service name.');
      return;
    }
    if (!description.trim()) {
      alert('Please enter a description.');
      return;
    }
    if (!category) {
      alert('Please select a category.');
      return;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      alert('Please enter a valid price.');
      return;
    }
    if (images.length === 0) {
      alert('Please select at least one image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('price', Number(price));
    formData.append('description', description.trim());
    formData.append('category', category);
    if (subCategory.trim()) {
      formData.append('subCategory', subCategory.trim());
    }
    formData.append('duration', Number(duration));
    formData.append('discount', Number(discount));
    formData.append('isAvailable', isAvailable);
    
    tags.forEach((tag) => formData.append('tags', tag));

    // Separate existing Cloudinary URLs from local image URIs
    const localImages = images.filter(img => !img.startsWith('http://') && !img.startsWith('https://'));
    const remainingImages = images.filter(img => img.startsWith('http://') || img.startsWith('https://'));

    if (id) {
      formData.append('remainingImages', JSON.stringify(remainingImages));
    }

    localImages.forEach((uri, idx) => {
      const filename = uri.split('/').pop() || `image_${idx}.jpg`;
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';
      formData.append('images', {
        uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
        name: filename,
        type,
      });
    });

    let res;
    if (id) {
      res = await handleEditService(id, formData);
    } else {
      res = await handleCreateService(formData);
    }

    if (res.success) {
      alert(id ? 'Service updated successfully!' : 'Service created successfully!');
      handleReset();
      router.back();
    } else {
      alert(`Error: ${res.error}`);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.safeArea}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backBtn}
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={20} color={COLORS.charcoal} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {id ? 'Edit' : 'New'} <Text style={styles.headerTitleAccent}>Service</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset} activeOpacity={0.7}>
          <Text style={styles.resetBtnText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          {/* ── Section 1: Basic Information ── */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="information-circle-outline" size={18} color={COLORS.gold} />
              <Text style={styles.sectionTitle}>Basic Information</Text>
            </View>

            {/* Service Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Service Name *</Text>
              <View
                style={[
                  styles.inputWrapper,
                  activeField === 'name' && styles.inputWrapperActive,
                ]}
              >
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. Bridal Glow Facial"
                  placeholderTextColor={COLORS.textMuted}
                  value={name}
                  onChangeText={setName}
                  onFocus={() => setActiveField('name')}
                  onBlur={() => setActiveField(null)}
                />
              </View>
            </View>

            {/* Description */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Description *</Text>
              <View
                style={[
                  styles.inputWrapper,
                  activeField === 'description' && styles.inputWrapperActive,
                ]}
              >
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  placeholder="Describe the treatment, benefits, and steps involved…"
                  placeholderTextColor={COLORS.textMuted}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                  onFocus={() => setActiveField('description')}
                  onBlur={() => setActiveField(null)}
                />
              </View>
            </View>
          </View>

          {/* ── Section 2: Pricing & Category ── */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="pricetags-outline" size={18} color={COLORS.gold} />
              <Text style={styles.sectionTitle}>Pricing & Category</Text>
            </View>

            {/* Category Dropdown */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Category *</Text>
              <TouchableOpacity
                style={[styles.selectorBtn, categoryOpen && styles.selectorBtnActive]}
                onPress={() => setCategoryOpen(!categoryOpen)}
                activeOpacity={0.8}
              >
                <Text style={category ? styles.selectorValue : styles.selectorPlaceholder}>
                  {category || 'Select a Category'}
                </Text>
                <Ionicons
                  name={categoryOpen ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={COLORS.textMuted}
                />
              </TouchableOpacity>

              {categoryOpen && (
                <View style={styles.dropdownList}>
                  <ScrollView nestedScrollEnabled>
                    {CATEGORIES.map((cat) => (
                      <TouchableOpacity
                        key={cat}
                        style={[
                          styles.dropdownItem,
                          category === cat && styles.dropdownItemActive,
                        ]}
                        onPress={() => {
                          setCategory(cat);
                          setCategoryOpen(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.dropdownItemText,
                            category === cat && styles.dropdownItemTextActive,
                          ]}
                        >
                          {cat}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            <View style={styles.fieldRow}>
              {/* Sub-Category */}
              <View style={[styles.fieldGroup, styles.flex1]}>
                <View style={styles.fieldLabelRow}>
                  <Text style={styles.fieldLabel}>Sub-Category</Text>
                  <Text style={styles.optionalLabel}>Optional</Text>
                </View>
                <View
                  style={[
                    styles.inputWrapper,
                    activeField === 'subCategory' && styles.inputWrapperActive,
                  ]}
                >
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g. Anti-Ageing"
                    placeholderTextColor={COLORS.textMuted}
                    value={subCategory}
                    onChangeText={setSubCategory}
                    onFocus={() => setActiveField('subCategory')}
                    onBlur={() => setActiveField(null)}
                  />
                </View>
              </View>

              {/* Price */}
              <View style={[styles.fieldGroup, styles.flex1]}>
                <Text style={styles.fieldLabel}>Base Price *</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    activeField === 'price' && styles.inputWrapperActive,
                  ]}
                >
                  <Text style={styles.inputPrefix}>₹</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="2500"
                    placeholderTextColor={COLORS.textMuted}
                    keyboardType="numeric"
                    value={price}
                    onChangeText={setPrice}
                    onFocus={() => setActiveField('price')}
                    onBlur={() => setActiveField(null)}
                  />
                </View>
              </View>
            </View>

            {/* Discount (Percentage) */}
            <View style={styles.fieldGroup}>
              <View style={styles.sliderHeader}>
                <Text style={styles.fieldLabel}>Discount Offer</Text>
                <Text style={[styles.fieldLabel, { color: COLORS.gold }]}>{discount}% Off</Text>
              </View>
              <TouchableOpacity
                style={styles.sliderContainer}
                activeOpacity={1}
                onPress={(e) => {
                  // Basic mock slide behavior on click/tap
                  const clickX = e.nativeEvent.locationX;
                  const ratio = Math.max(0, Math.min(1, clickX / (width - 80)));
                  setDiscount(Math.round(ratio * 10) * 10);
                }}
              >
                <View style={styles.sliderTrack}>
                  <View style={[styles.sliderFill, { width: `${discount}%` }]} />
                  <View style={[styles.sliderThumb, { left: `${discount}%`, marginLeft: -8 }]} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* ── Section 3: Duration & Gallery ── */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="images-outline" size={18} color={COLORS.gold} />
              <Text style={styles.sectionTitle}>Duration & Media</Text>
            </View>

            {/* Duration Stepper */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Service Duration *</Text>
              <View style={styles.stepperContainer}>
                <TouchableOpacity
                  style={styles.stepperBtn}
                  onPress={() => setDuration(Math.max(15, duration - 15))}
                  activeOpacity={0.7}
                >
                  <Ionicons name="remove" size={18} color={COLORS.charcoal} />
                </TouchableOpacity>
                <View style={styles.stepperDivider} />
                <Text style={styles.stepperValueText}>{duration} minutes</Text>
                <View style={styles.stepperDivider} />
                <TouchableOpacity
                  style={styles.stepperBtn}
                  onPress={() => setDuration(Math.min(360, duration + 15))}
                  activeOpacity={0.7}
                >
                  <Ionicons name="add" size={18} color={COLORS.charcoal} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Media Gallery (Image Upload) */}
            <View style={styles.fieldGroup}>
              <View style={styles.fieldLabelRow}>
                <Text style={styles.fieldLabel}>Gallery Images *</Text>
                <Text style={styles.optionalLabel}>Min 1, Max 5</Text>
              </View>
              
              <View style={styles.imageGrid}>
                {images.map((img, idx) => (
                  <View key={idx} style={[styles.imageSlot, styles.imageSlotFilled]}>
                    <Image source={{ uri: img }} style={styles.previewImage} />
                    <TouchableOpacity
                      style={styles.removeImageBtn}
                      onPress={() => handleRemoveImage(idx)}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="close" size={12} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ))}

                {images.length < 5 && (
                  <TouchableOpacity
                    style={styles.imageSlot}
                    onPress={handlePickImage}
                    activeOpacity={0.75}
                  >
                    <Ionicons name="camera-outline" size={20} color={COLORS.textMuted} />
                    <Text style={styles.uploadPlaceholderText}>Upload</Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.imageLimitText}>
                {images.length} of 5 images selected
              </Text>
            </View>
          </View>

          {/* ── Section 4: Tags & Availability ── */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="settings-outline" size={18} color={COLORS.gold} />
              <Text style={styles.sectionTitle}>Preferences</Text>
            </View>

            {/* Dynamic Tags Input */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Tags</Text>
              <View style={styles.tagInputRow}>
                <View
                  style={[
                    styles.inputWrapper,
                    styles.flex1,
                    activeField === 'tags' && styles.inputWrapperActive,
                  ]}
                >
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g. organic, bridal, new"
                    placeholderTextColor={COLORS.textMuted}
                    value={tagInput}
                    onChangeText={setTagInput}
                    onSubmitEditing={handleAddTag}
                    onFocus={() => setActiveField('tags')}
                    onBlur={() => setActiveField(null)}
                  />
                </View>
                <TouchableOpacity
                  style={styles.addTagBtn}
                  onPress={handleAddTag}
                  activeOpacity={0.8}
                >
                  <Text style={styles.addTagBtnText}>Add</Text>
                </TouchableOpacity>
              </View>

              {tags.length > 0 && (
                <View style={styles.tagsList}>
                  {tags.map((tag) => (
                    <View key={tag} style={styles.tagBadge}>
                      <Text style={styles.tagBadgeText}>#{tag}</Text>
                      <TouchableOpacity onPress={() => handleRemoveTag(tag)} activeOpacity={0.7}>
                        <Ionicons name="close-circle" size={14} color="#8B6914" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Divider */}
            <View style={[styles.stepperDivider, { width: '100%', height: 1, marginVertical: 14 }]} />

            {/* Availability Toggle */}
            <View style={styles.toggleRow}>
              <View style={styles.toggleInfo}>
                <Text style={styles.toggleTitle}>Available for Booking</Text>
                <Text style={styles.toggleSub}>
                  Disable this if you want to temporarily hide the service from customers.
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsAvailable(!isAvailable)}
                style={[
                  styles.stepperBtn,
                  {
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: isAvailable ? COLORS.statusConfirmed : 'rgba(0,0,0,0.15)',
                    padding: 2,
                    justifyContent: 'center',
                  },
                ]}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: COLORS.white,
                    alignSelf: isAvailable ? 'flex-end' : 'flex-start',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 1,
                    elevation: 1,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* ── Submit Button ── */}
          <TouchableOpacity
            style={[styles.submitBtn, isLoading && { opacity: 0.7 }]}
            onPress={handleSave}
            activeOpacity={0.85}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.submitBtnText}>{id ? 'Update Service' : 'Create Service'}</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AdminCreateService;