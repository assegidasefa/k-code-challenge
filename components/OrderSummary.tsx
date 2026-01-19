'use client';

import { Order } from '@/types/payment';
import { IoIosArrowForward } from 'react-icons/io';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TiShoppingCart } from 'react-icons/ti';

interface OrderSummaryProps {
  order: Order;
}

export const OrderSummary = ({ order }: OrderSummaryProps) => {
  const deliveryFee = 2.00;
  const total = order.amount + deliveryFee;

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'ETB' ? 'USD' : currency,
      minimumFractionDigits: 2,
    }).format(amount).replace('$', currency === 'ETB' ? 'ETB ' : '$');
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      {/* Product */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <TiShoppingCart size={24} color='white'/>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">Nike Men's Joyride</h3>
          <p className="text-sm text-gray-500">Run Flyknit Shoes</p>
          <p className="font-semibold text-gray-900">{formatAmount(order.amount, order.currency)}</p>
        </div>
      </div>

      {/* Offers */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Offers</span>
          <button className="text-blue-600 text-sm font-medium">Add Code</button>
        </div>
      </div>

      {/* Payment Details */}
      <div className="space-y-3 mb-6">
        <h4 className="font-medium text-gray-900">Payment Details</h4>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Order</span>
          <span className="text-gray-900">{formatAmount(order.amount, order.currency)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Delivery</span>
          <span className="text-gray-900">{formatAmount(deliveryFee, order.currency)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between font-semibold">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">{formatAmount(total, order.currency)}</span>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Address</span>
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-900">12, WLS Regancy</span>
            
            <MdKeyboardArrowDown />

          </div>
        </div>
      </div>

      {/* Order ID */}
      <div className="text-xs text-gray-500 mb-4">
        Order ID: {order.id}
      </div>
    </div>
  );
};