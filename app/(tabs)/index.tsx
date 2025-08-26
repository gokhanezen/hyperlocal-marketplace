import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const nearbyProducers = [
    {
      id: 1,
      name: "Green Valley Farm",
      distance: "0.8 km",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=300&h=200&fit=crop",
      specialty: "Organic Vegetables",
      deliveryTime: "30-45 min"
    },
    {
      id: 2,
      name: "Sunny Orchard",
      distance: "1.2 km", 
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300&h=200&fit=crop",
      specialty: "Fresh Fruits",
      deliveryTime: "20-30 min"
    },
    {
      id: 3,
      name: "Heritage Dairy",
      distance: "2.1 km",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop",
      specialty: "Dairy Products",
      deliveryTime: "45-60 min"
    }
  ];

  const categories = [
    { id: 1, name: "Vegetables", icon: "leaf", color: "#4CAF50" },
    { id: 2, name: "Fruits", icon: "nutrition", color: "#FF9800" },
    { id: 3, name: "Dairy", icon: "wine", color: "#2196F3" },
    { id: 4, name: "Meat", icon: "restaurant", color: "#F44336" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello! 👋</Text>
          <Text style={styles.location}>📍 Walthamstow, London</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <Text style={styles.searchPlaceholder}>Search producers or products...</Text>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={[styles.categoryCard, { borderColor: category.color }]}>
                <Ionicons name={category.icon as any} size={30} color={category.color} />
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Nearby Producers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Producers</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {nearbyProducers.map((producer) => (
            <TouchableOpacity 
              key={producer.id} 
              style={styles.producerCard}
              onPress={() => router.push(`/producer/${producer.id}`)}
            >
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
                  <Text style={styles.distance}>📍 {producer.distance}</Text>
                  <Text style={styles.deliveryTime}>🚚 {producer.deliveryTime}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  notificationButton: {
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
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryCard: {
  alignItems: 'center',
  height: 80, // Sabit ve yarıya indirilmiş yükseklik
  backgroundColor: '#fff',
  borderRadius: 12,
  borderWidth: 2,
  width: '22%',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
  justifyContent: 'center', // İçeriği ortalamak için
  
},

  categoryName: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    
  },
  producerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  producerImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  producerInfo: {
    flex: 1,
    padding: 15,
  },
  producerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  producerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
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
    marginBottom: 10,
  },
  producerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  distance: {
    fontSize: 12,
    color: '#666',
  },
  deliveryTime: {
    fontSize: 12,
    color: '#666',
  },
});