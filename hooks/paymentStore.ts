import { create } from 'zustand';
import { PaymentStatus as PaymentStatusType } from '@/types/payment';

interface PaymentMethod {
  id: string;
  type: 'google-pay' | 'debit-card';
  name: string;
  details?: string;
  bank?: string;
  last4?: string;
}

interface PaymentState {
  // Payment status
  paymentStatus: PaymentStatusType;
  paymentReference: string;
  paymentReason: string;
  
  // Payment method
  selectedPaymentMethod: PaymentMethod | null;
  
  // WebSocket connection
  isConnected: boolean;
  connectionError: string | null;
  
  // Actions
  setPaymentStatus: (status: PaymentStatusType) => void;
  setPaymentReference: (reference: string) => void;
  setPaymentReason: (reason: string) => void;
  setSelectedPaymentMethod: (method: PaymentMethod | null) => void;
  setConnectionStatus: (connected: boolean) => void;
  setConnectionError: (error: string | null) => void;
  resetPayment: () => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  // Initial state
  paymentStatus: 'IDLE',
  paymentReference: '',
  paymentReason: '',
  selectedPaymentMethod: null,
  isConnected: false,
  connectionError: null,
  
  // Actions
  setPaymentStatus: (status) => set({ paymentStatus: status }),
  setPaymentReference: (reference) => set({ paymentReference: reference }),
  setPaymentReason: (reason) => set({ paymentReason: reason }),
  setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),
  setConnectionStatus: (connected) => set({ isConnected: connected }),
  setConnectionError: (error) => set({ connectionError: error }),
  resetPayment: () => set({
    paymentStatus: 'IDLE',
    paymentReference: '',
    paymentReason: '',
  }),
}));