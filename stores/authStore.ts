import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoggedIn: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock validation
        if (email === 'demo@test.com' && password === 'demo123') {
          const mockUser: User = {
            id: '1',
            name: 'Sarah Johnson',
            email: email,
            phone: '+44 7700 900123',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b9b3?w=150&h=150&fit=crop&crop=face'
          };
          
          set({
            user: mockUser,
            isLoggedIn: true,
            isLoading: false,
          });
          resolve(true);
        } else {
          set({ isLoading: false });
          resolve(false);
        }
      }, 1500);
    });
  },

  register: async (name: string, email: string, password: string) => {
    set({ isLoading: true });
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: Date.now().toString(),
          name: name,
          email: email,
          avatar: `https://ui-avatars.com/api/?name=${name}&background=4CAF50&color=fff&size=150`
        };
        
        set({
          user: mockUser,
          isLoggedIn: true,
          isLoading: false,
        });
        resolve(true);
      }, 1500);
    });
  },

  logout: () => {
    set({
      user: null,
      isLoggedIn: false,
    });
  },

  updateProfile: (userData: Partial<User>) => {
    const currentUser = get().user;
    if (currentUser) {
      set({
        user: { ...currentUser, ...userData }
      });
    }
  },
}));