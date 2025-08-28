import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ExploreScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');

  const producers = [
    {
      id: 1,
      name: "Green Valley Farm",
      specialty: "Organic Vegetables",
      rating: 4.8,
      distance: "0.8 km",
      deliveryTime: "30-45 min",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=300&h=200&fit=crop",
      category: "Vegetables"
    },
    {
      id: 2,
      name: "Sunny Orchard",
      specialty: "Fresh Fruits", 
      rating: 4.9,
      distance: "1.2 km",
      deliveryTime: "20-30 min",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300&h=200&fit=crop",
      category: "Fruits"
    },
    {
      id: 3,
      name: "Heritage Dairy",
      specialty: "Dairy Products",
      rating: 4.7,
      distance: "2.1 km",
      deliveryTime: "45-60 min",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop",
      category: "Dairy"
    },
    {
      id: 4,
      name: "Organic Butcher",
      specialty: "Fresh Meat",
      rating: 4.6,
      distance: "1.8 km",
      deliveryTime: "40-55 min",
      image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=300&h=200&fit=crop",
      category: "Meat"
    },
    {
      id: 5,
      name: "Artisan Bakery",
      specialty: "Fresh Bread & Pastries",
      rating: 4.9,
      distance: "0.5 km",
      deliveryTime: "15-25 min",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop",
      category: "Bakery"
    }
  ];

  const categories = [
    { id: 'All', name: 'All', icon: '🌿', color: '#4CAF50', bgColor: '#e8f5e9' },
    { id: 'Vegetables', name: 'Vegetables', icon: '🥕', color: '#388E3C', bgColor: '#f1f8e9' },
    { id: 'Fruits', name: 'Fruits', icon: '🍎', color: '#FF9800', bgColor: '#fff3e0' },
    { id: 'Dairy', name: 'Dairy', icon: '🥛', color: '#2196F3', bgColor: '#e3f2fd' },
    { id: 'Meat', name: 'Meat', icon: '🥩', color: '#F44336', bgColor: '#ffebee' },
    { id: 'Bakery', name: 'Bakery', icon: '🍞', color: '#795548', bgColor: '#efebe9' }
  ];

  const filteredProducers = activeFilter === 'All' 
    ? producers 
    : producers.filter(p => p.category === activeFilter);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Producers</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.locationButton}>
            <Ionicons name="location" size={20} color="#4CAF50" />
            <Text style={styles.locationText}>Walthamstow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapButton}>
            <Ionicons name="map" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <Text style={styles.searchPlaceholder}>Search producers nearby...</Text>
        <TouchableOpacity>
          <Ionicons name="options" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => router.push('/register')}
        activeOpacity={0.9}
      >
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Categories Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.filterButton,
              activeFilter === category.id && [
                styles.activeFilter,
                { backgroundColor: category.color }
              ],
              !activeFilter || activeFilter !== category.id ? { 
                backgroundColor: category.bgColor,
                borderColor: category.color 
              } : {}
            ]}
            onPress={() => setActiveFilter(category.id)}
          >
            <View style={styles.categoryContent}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text
                style={[
                  styles.filterText,
                  activeFilter === category.id ? styles.activeFilterText : { color: category.color }
                ]}
              >
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Producers List */}
      <ScrollView style={styles.producersList} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {filteredProducers.length} producers found near you
          </Text>
        </View>

        {filteredProducers.map((producer) => (
          <TouchableOpacity key={producer.id} style={styles.producerCard}>
            <Image source={{ uri: producer.image }} style={styles.producerImage} />
            <View style={styles.producerInfo}>
              <View style={styles.producerHeader}>
                <Text style={styles.producerName}>{producer.name}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.rating}>{producer.rating}</Text>
                </View>
              </View>
              <Text style={styles.specialty}>{producer.specialty}</Text>
              <View style={styles.producerDetails}>
                <View style={styles.detailItem}>
                  <Ionicons name="location-outline" size={14} color="#666" />
                  <Text style={styles.detailText}>{producer.distance}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="time-outline" size={14} color="#666" />
                  <Text style={styles.detailText}>{producer.deliveryTime}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Ionicons name="heart-outline" size={20} color="#ccc" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    paddingHorizontal:12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 10,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  mapButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },

  /* Sign Up button */
  signUpButton: {
    marginHorizontal: 20,
    marginTop: -5,
    marginBottom: 12,
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  /* Filters */
  filterContainer: {
    marginBottom: -50,          // NEGATİF margin kaldırıldı → boşluk sorunu çözüldü
  },
  filterContent: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 12,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeFilter: {
    borderColor: 'transparent',
    shadowColor: '#4CAF50',
    shadowOpacity: 0.3,
    elevation: 5,
  },
  categoryContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    textAlign: 'center',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  /* List */
  producersList: {
    flex: 1,
    paddingTop: 0,
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  statsText: {
    fontSize: 14,
    color: '#666',
  },
  producerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  producerImage: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  producerInfo: {
    flex: 1,
    padding: 12,
  },
  producerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  producerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  specialty: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    marginBottom: 8,
  },
  producerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  favoriteButton: {
    padding: 15,
    justifyContent: 'center',
  },
});
