'use client';

interface CheckoutStepsProps {
  currentStep: number;
}

export const CheckoutSteps = ({ currentStep }: CheckoutStepsProps) => {
  const steps = [
    { id: 1, name: 'Cart', icon: '🛒' },
    { id: 2, name: 'Shipping', icon: '🚚' },
    { id: 3, name: 'Checkout', icon: '💳' },
  ];

  return (
    <div className="flex items-center space-x-4 mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
            step.id <= currentStep 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-500'
          }`}>
            {step.id < currentStep ? '✓' : step.id}
          </div>
          <span className={`ml-2 text-sm font-medium ${
            step.id <= currentStep 
              ? 'text-blue-600' 
              : 'text-gray-500'
          }`}>
            {step.name}
          </span>
          {index < steps.length - 1 && (
            <div className={`ml-4 w-8 h-0.5 ${
              step.id < currentStep 
                ? 'bg-blue-500' 
                : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};