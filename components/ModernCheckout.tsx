'use client';

import { useWebSocket } from '@/hooks/useWebSocket';
import { usePaymentStore } from '@/stores/paymentStore';
import { useOrderStore } from '@/stores/orderStore';
import { CheckoutSteps } from '@/components/CheckoutSteps';
import { PaymentMethods } from '@/components/PaymentMethods';
import { OrderSummary } from '@/components/OrderSummary';
import { PaymentStatus } from '@/components/PaymentStatus';
import { PaymentInitMessage } from '@/types/payment';

export const ModernCheckout = () => {
  const { currentOrder } = useOrderStore();
  const {
    paymentStatus,
    paymentReference,
    paymentReason,
    selectedPaymentMethod,
    isConnected,
    connectionError,
    setSelectedPaymentMethod,
    resetPayment,
    setPaymentStatus,
    setPaymentReference,
    setPaymentReason,
  } = usePaymentStore();
  
  const { sendMessage } = useWebSocket('ws://localhost:8080');

  const handlePayNow = () => {
    if (!isConnected) {
      alert('WebSocket is not connected. Please try again.');
      return;
    }

    if (!selectedPaymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    const paymentMessage: PaymentInitMessage = {
      type: 'INIT_PAYMENT',
      orderId: currentOrder.id,
      amount: currentOrder.amount ,
      currency: currentOrder.currency,
    };

    setPaymentStatus('PENDING');
    setPaymentReference('');
    setPaymentReason('');
    sendMessage(paymentMessage);
  };

  return (
    <div className="min-h-screen bg-gray-50 transition-colors">
      <div className="max-w-6xl mx-auto p-6">
        {/* mock Steps masayaa */}
        <CheckoutSteps currentStep={3} />
        
        {/* Connection Status */}
        <div className="mb-6">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs text-gray-500">
              WebSocket {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          {connectionError && (
            <p className="text-xs text-red-600 mt-1">{connectionError}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side Column Payment Methods */}
          <div className="space-y-6">
            <PaymentMethods 
              onMethodSelect={setSelectedPaymentMethod}
              selectedMethod={selectedPaymentMethod}
            />
          </div>

          {/* Right side Column  Order Summary */}
          <div className="space-y-6">
            <OrderSummary order={currentOrder} />
            
            {/*    Payment Status - Above Pay Now Button */}
            {paymentStatus !== 'IDLE' && (
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <PaymentStatus 
                  status={paymentStatus} 
                  reference={paymentReference}
                  reason={paymentReason}
                />
              </div>
            )}
            
            {/* Pay Now Button */}
            {paymentStatus === 'IDLE' && (
              <button
                onClick={handlePayNow}
                disabled={!isConnected || !selectedPaymentMethod}
                className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-lg transition-colors text-lg"
              >
                Pay Now
              </button>
            )}

            {/* Try Again Button for Failed Payments */}
            {paymentStatus === 'FAILED' && (
              <button
                onClick={handlePayNow}
                disabled={!isConnected || !selectedPaymentMethod}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-lg transition-colors text-lg"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};