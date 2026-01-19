import { PaymentStatus as PaymentStatusType } from '@/types/payment';
import { FaCheck } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';

interface PaymentStatusProps {
  status: PaymentStatusType;
  reference?: string;
  reason?: string;
}

export const PaymentStatus = ({ status, reference, reason }: PaymentStatusProps) => {
  const getStatusContent = () => {
    switch (status) {
      case 'PENDING':
        return (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-blue-600 font-medium">Processing payment...</span>
          </div>
        );
      
      case 'SUCCESS':
        return (
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
             
              <FaCheck className="text-green-800"/>

            </div>
            <p className="text-green-600 font-medium mb-1">Payment Successful!</p>
            {reference && (
              <p className="text-sm text-gray-600">Reference: {reference}</p>
            )}
          </div>
        );
      
      case 'FAILED':
        return (
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
           
              <RxCrossCircled color='red' />

            </div>
            <p className="text-red-600 font-medium mb-1">Payment Failed</p>
            {reason && (
              <p className="text-sm text-gray-600">{reason}</p>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  if (status === 'IDLE') return null;

  return (
    <div className="mt-6 p-4 rounded-lg border bg-gray-50">
      {getStatusContent()}
    </div>
  );
};