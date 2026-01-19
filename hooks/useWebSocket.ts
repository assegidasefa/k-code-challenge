import { useEffect, useRef } from 'react';
import { PaymentStatusMessage } from '@/types/payment';
import { usePaymentStore } from '@/stores/paymentStore';

interface UseWebSocketReturn {
  sendMessage: (message: any) => void;
}

export const useWebSocket = (url: string): UseWebSocketReturn => {
  const ws = useRef<WebSocket | null>(null);
  const { 
    setConnectionStatus, 
    setConnectionError,
    setPaymentStatus,
    setPaymentReference,
    setPaymentReason 
  } = usePaymentStore();

  useEffect(() => {
    const connectWebSocket = () => {
      try {
        ws.current = new WebSocket(url);

        ws.current.onopen = () => {
          setConnectionStatus(true);
          setConnectionError(null);
          console.log('WebSocket connected');
        };

        ws.current.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data) as PaymentStatusMessage;
            if (message.type === 'PAYMENT_STATUS') {
              setPaymentStatus(message.status);
              
              if (message.status === 'SUCCESS' && message.reference) {
                setPaymentReference(message.reference);
              }
              
              if (message.status === 'FAILED' && message.reason) {
                setPaymentReason(message.reason);
              }
            }
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
          }
        };

        ws.current.onclose = () => {
          setConnectionStatus(false);
          console.log('WebSocket disconnected');
        };

        ws.current.onerror = (error) => {
          setConnectionError('WebSocket connection failed');
          console.error('WebSocket error:', error);
        };
      } catch (error) {
        setConnectionError('Failed to create WebSocket connection');
        console.error('WebSocket creation error:', error);
      }
    };

    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url, setConnectionStatus, setConnectionError, setPaymentStatus, setPaymentReference, setPaymentReason]);

  const sendMessage = (message: any) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  };

  return {
    sendMessage,
  };
};