import { create } from 'zustand';

export interface Producer {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  distance: string;
  deliveryTime: string;
  image: string;
  category: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  unit: string;
  image: string;
  category: string;
  producerId: number;
  producerName: string;
  description: string;
  priceNumber: number;
}

interface SearchStore {
  searchQuery: string;
  searchResults: {
    producers: Producer[];
    products: Product[];
  };
  isSearching: boolean;
  recentSearches: string[];
  setSearchQuery: (query: string) => void;
  performSearch: (query: string) => void;
  clearSearch: () => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

// Mock data
const mockProducers: Producer[] = [
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

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Organic Tomatoes",
    price: "£3.50",
    unit: "per kg",
    image: "https://images.unsplash.com/photo-1546094096-0ec4ea203f13?w=200&h=200&fit=crop",
    category: "Vegetables",
    producerId: 1,
    producerName: "Green Valley Farm",
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
    producerId: 1,
    producerName: "Green Valley Farm",
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
    producerId: 2,
    producerName: "Sunny Orchard",
    description: "Sweet and crunchy organic apples",
    priceNumber: 4.00
  },
  {
    id: 4,
    name: "Fresh Basil",
    price: "£1.50",
    unit: "per bunch",
    image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=200&h=200&fit=crop",
    category: "Herbs",
    producerId: 1,
    producerName: "Green Valley Farm",
    description: "Aromatic fresh basil leaves",
    priceNumber: 1.50
  },
  {
    id: 5,
    name: "Cheddar Cheese",
    price: "£6.80",
    unit: "per 500g",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200&h=200&fit=crop",
    category: "Dairy",
    producerId: 3,
    producerName: "Heritage Dairy",
    description: "Aged cheddar cheese",
    priceNumber: 6.80
  }
];

export const useSearchStore = create<SearchStore>((set, get) => ({
  searchQuery: '',
  searchResults: {
    producers: [],
    products: [],
  },
  isSearching: false,
  recentSearches: [],

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  performSearch: (query) => {
    set({ isSearching: true });
    
    // Simulate API delay
    setTimeout(() => {
      if (query.trim() === '') {
        set({
          searchResults: { producers: [], products: [] },
          isSearching: false,
        });
        return;
      }

      const lowerQuery = query.toLowerCase();
      
      const filteredProducers = mockProducers.filter(producer =>
        producer.name.toLowerCase().includes(lowerQuery) ||
        producer.specialty.toLowerCase().includes(lowerQuery) ||
        producer.category.toLowerCase().includes(lowerQuery)
      );

      const filteredProducts = mockProducts.filter(product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery) ||
        product.producerName.toLowerCase().includes(lowerQuery)
      );

      set({
        searchResults: {
          producers: filteredProducers,
          products: filteredProducts,
        },
        isSearching: false,
      });

      // Add to recent searches if not empty and not already exists
      if (query.trim() && !get().recentSearches.includes(query)) {
        get().addRecentSearch(query);
      }
    }, 300);
  },

  clearSearch: () => {
    set({
      searchQuery: '',
      searchResults: { producers: [], products: [] },
      isSearching: false,
    });
  },

  addRecentSearch: (query) => {
    set((state) => ({
      recentSearches: [query, ...state.recentSearches.slice(0, 4)], // Keep last 5
    }));
  },

  clearRecentSearches: () => {
    set({ recentSearches: [] });
  },
}));