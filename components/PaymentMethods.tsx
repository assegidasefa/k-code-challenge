"use client";

import Image from "next/image";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";

interface PaymentMethod {
  id: string;
  type: "google-pay" | "debit-card" | "credit-card";
  name: string;
  details?: string;
  bank?: string;
  last4?: string;
}

interface PaymentMethodsProps {
  onMethodSelect: (method: PaymentMethod) => void;
  selectedMethod?: PaymentMethod | null;
}

export const PaymentMethods = ({
  onMethodSelect,
  selectedMethod,
}: PaymentMethodsProps) => {
  const [expandedMethod, setExpandedMethod] = useState<string | null>(
    "debit-cards",
  );

  const debitCards: PaymentMethod[] = [
    {
      id: "binance-card",
      type: "debit-card",
      name: "Debit Card",
      bank: "Binance",
      last4: "4578",
    },
    {
      id: "bybit-card",
      type: "credit-card",
      name: "Credit Card",
      bank: "ByBit",
      last4: "4521",
    },
  ];

  const handleMethodClick = (method: PaymentMethod) => {
    onMethodSelect(method);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Payment Method
      </h2>

      {/* Debit Cards Section */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() =>
            setExpandedMethod(
              expandedMethod === "debit-cards" ? null : "debit-cards",
            )
          }
          className="w-full p-4 text-left hover:bg-gray-50 rounded-t-lg transition-colors flex items-center justify-between"
        >
          <span className="text-gray-700">Debit Card</span>
          <IoIosArrowForward
            className={`${expandedMethod === "debit-cards" ? "rotate-90" : ""}`}
          />
        </button>

        {expandedMethod === "debit-cards" && (
          <div className="border-t border-gray-200">
            <div className="p-4 space-y-3">
              <div className="text-sm font-medium text-gray-700 mb-3">
                Cards List
              </div>

              {debitCards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => handleMethodClick(card)}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedMethod?.id === card.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    {/* Card Icon */}
                    {/* <div className="w-8 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded flex items-center justify-center">
                      {card.bank === 'Binance' ? (
                        <div className="w-4 h-3 bg-white rounded-sm opacity-80"></div>
                      ) : (
                        <div className="text-white text-xs font-bold">V</div>
                      )}
                    </div> */}

                    <div className="w-8 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded flex items-center justify-center">
                      {card.bank === "Binance" ? (
                        <Image
                          src="/binance.svg"
                          alt="Binance"
                          width={16}
                          height={16}
                          className="object-contain"
                        />
                      ) : (
                        <div className="text-white text-xs font-bold">V</div>
                      )}
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {card.bank}
                      </div>
                      <div className="text-xs text-gray-500">
                        •••• •••• •••• {card.last4}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      selectedMethod?.id === card.id
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedMethod?.id === card.id && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                </div>
              ))}

              <button className="cursor-pointer flex items-center space-x-2 text-blue-600 text-sm font-medium mt-4">
                <GoPlus size={18} />

                <span>Add New Cards</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
