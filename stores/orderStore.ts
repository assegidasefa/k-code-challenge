import { create } from 'zustand';
import { Order } from '@/types/payment';

interface OrderState {
  currentOrder: Order;
  orderHistory: Order[];
  
  // Actions
  setCurrentOrder: (order: Order) => void;
  addToHistory: (order: Order) => void;
  clearHistory: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  // Initial state
  currentOrder: {
    id: 'ORDER-123456',
    amount: 66.00,
    currency: 'USD'
  },
  orderHistory: [],
  
  // Actions
  setCurrentOrder: (order) => set((state) => ({
    currentOrder: order,
    orderHistory: [...state.orderHistory, order]
  })),
  addToHistory: (order) => set((state) => ({
    orderHistory: [...state.orderHistory, order]
  })),
  clearHistory: () => set({ orderHistory: [] }),
}));