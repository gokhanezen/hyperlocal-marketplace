import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useCartStore } from '../../stores/cartStore';

const { width } = Dimensions.get('window');

export default function ProducerDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addItem, getItemQuantity } = useCartStore();

  // Mock producer data
  const producer = {
    id: 1,
    name: "Green Valley Farm",
    rating: 4.8,
    reviews: 127,
    distance: "0.8 km",
    deliveryTime: "30-45 min",
    coverImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=250&fit=crop",
    description: "Family-owned organic farm providing fresh, sustainable produce to local communities for over 30 years.",
    specialty: "Organic Vegetables",
    openHours: "6:00 AM - 8:00 PM",
    phone: "+44 20 8520 1234"
  };

  const categories = ['All', 'Vegetables', 'Fruits', 'Herbs', 'Seasonal'];

  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      price: "£3.50",
      unit: "per kg",
      image: "https://images.unsplash.com/photo-1546094096-0ec4ea203f13?w=200&h=200&fit=crop",
      category: "Vegetables",
      inStock: true,
      description: "Fresh, juicy organic tomatoes",
      priceNumber: 3.50
    },
    {
      id: 2,
      name: "Fresh Carrots",
      price: "£2.20",
      unit: "per kg",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&h=200&fit=crop",
      category: "Vegetables",
      inStock: true,
      description: "Crisp and sweet organic carrots",
      priceNumber: 2.20
    },
    {
      id: 3,
      name: "Organic Apples",
      price: "£4.00",
      unit: "per kg",
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&h=200&fit=crop",
      category: "Fruits",
      inStock: true,
      description: "Sweet and crunchy organic apples"
    },
    {
      id: 4,
      name: "Fresh Basil",
      price: "£1.50",
      unit: "per bunch",
      image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=200&h=200&fit=crop",
      category: "Herbs",
      inStock: true,
      description: "Aromatic fresh basil leaves"
    },
    {
      id: 5,
      name: "Seasonal Lettuce",
      price: "£2.80",
      unit: "per head",
      image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=200&h=200&fit=crop",
      category: "Seasonal",
      inStock: false,
      description: "Crispy seasonal lettuce"
    },
    {
      id: 6,
      name: "Organic Broccoli",
      price: "£3.20",
      unit: "per kg",
      image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=200&h=200&fit=crop",
      category: "Vegetables",
      inStock: true,
      description: "Fresh organic broccoli crowns"
    }
  ];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      image: product.image,
      producerId: producer.id,
      producerName: producer.name,
      priceNumber: product.priceNumber,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Producer Details</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <Image source={{ uri: producer.coverImage }} style={styles.coverImage} />

        {/* Producer Info */}
        <View style={styles.producerInfo}>
          <View style={styles.producerHeader}>
            <View style={styles.producerTitleSection}>
              <Text style={styles.producerName}>{producer.name}</Text>
              <Text style={styles.specialty}>{producer.specialty}</Text>
            </View>
            <View style={styles.ratingSection}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>{producer.rating}</Text>
              </View>
              <Text style={styles.reviewCount}>({producer.reviews} reviews)</Text>
            </View>
          </View>

          <Text style={styles.description}>{producer.description}</Text>

          {/* Quick Info */}
          <View style={styles.quickInfo}>
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={20} color="#4CAF50" />
              <Text style={styles.infoText}>{producer.distance} away</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={20} color="#4CAF50" />
              <Text style={styles.infoText}>{producer.deliveryTime}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="call-outline" size={20} color="#4CAF50" />
              <Text style={styles.infoText}>Call now</Text>
            </View>
          </View>
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.activeCategoryButton
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.activeCategoryText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products Grid */}
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>
            Products ({filteredProducts.length})
          </Text>
          <View style={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productImageContainer}>
                  <Image source={{ uri: product.image }} style={styles.productImage} />
                  {!product.inStock && (
                    <View style={styles.outOfStockOverlay}>
                      <Text style={styles.outOfStockText}>Out of Stock</Text>
                    </View>
                  )}
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <Text style={styles.productDescription} numberOfLines={1}>
                    {product.description}
                  </Text>
                  <View style={styles.productFooter}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>{product.price}</Text>
                      <Text style={styles.unit}>{product.unit}</Text>
                    </View>
                    <TouchableOpacity 
                      style={[
                        styles.addButton,
                        !product.inStock && styles.disabledButton
                      ]}
                      disabled={!product.inStock}
                      onPress={() => handleAddToCart(product)}
                    >
                      {getItemQuantity(product.id) > 0 ? (
                        <Text style={styles.quantityText}>
                          {getItemQuantity(product.id)}
                        </Text>
                      ) : (
                        <Ionicons 
                          name="add" 
                          size={20} 
                          color={product.inStock ? "#fff" : "#ccc"} 
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
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
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  shareButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  coverImage: {
    width: width,
    height: 200,
  },
  producerInfo: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  producerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  producerTitleSection: {
    flex: 1,
  },
  producerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  ratingSection: {
    alignItems: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  quickInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  categoriesContainer: {
    marginBottom: 10,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeCategoryButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  activeCategoryText: {
    color: '#fff',
  },
  productsSection: {
    backgroundColor: '#fff',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - 60) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  outOfStockText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  unit: {
    fontSize: 10,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#f0f0f0',
  },
  quantityText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});