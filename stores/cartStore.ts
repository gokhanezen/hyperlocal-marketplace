import { create } from 'zustand';

export interface CartItem {
  id: number;
  name: string;
  price: string;
  unit: string;
  image: string;
  producerId: number;
  producerName: string;
  quantity: number;
  priceNumber: number; // For calculations
}

interface CartStore {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (id: number) => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  itemCount: 0,
  totalPrice: 0,

  addItem: (item) => {
    const { items } = get();
    const existingItem = items.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      // If item exists, increase quantity
      set((state) => ({
        items: state.items.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
      }));
    } else {
      // If new item, add to cart
      set((state) => ({
        items: [...state.items, { ...item, quantity: 1 }],
      }));
    }
    
    // Update totals
    const updatedState = get();
    const newItemCount = updatedState.items.reduce((total, item) => total + item.quantity, 0);
    const newTotalPrice = updatedState.items.reduce((total, item) => total + (item.priceNumber * item.quantity), 0);
    
    set({
      itemCount: newItemCount,
      totalPrice: newTotalPrice,
    });
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter(item => item.id !== id),
    }));
    
    // Update totals
    const { items } = get();
    const newItemCount = items.reduce((total, item) => total + item.quantity, 0);
    const newTotalPrice = items.reduce((total, item) => total + (item.priceNumber * item.quantity), 0);
    
    set({
      itemCount: newItemCount,
      totalPrice: newTotalPrice,
    });
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    
    set((state) => ({
      items: state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
    
    // Update totals
    const { items } = get();
    const newItemCount = items.reduce((total, item) => total + item.quantity, 0);
    const newTotalPrice = items.reduce((total, item) => total + (item.priceNumber * item.quantity), 0);
    
    set({
      itemCount: newItemCount,
      totalPrice: newTotalPrice,
    });
  },

  clearCart: () => {
    set({
      items: [],
      itemCount: 0,
      totalPrice: 0,
    });
  },

  getItemQuantity: (id) => {
    const item = get().items.find(cartItem => cartItem.id === id);
    return item ? item.quantity : 0;
  },
}));