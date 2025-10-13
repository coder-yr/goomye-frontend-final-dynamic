import React from 'react';
import { CreditCard, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const DemoPaymentInfo = () => {
  const demoCards = [
    {
      type: 'success',
      number: '4242 4242 4242 4242',
      description: 'Payment will succeed',
      icon: CheckCircle,
      color: 'green'
    },
    {
      type: 'decline',
      number: '4000 0000 0000 0002',
      description: 'Card will be declined',
      icon: XCircle,
      color: 'red'
    },
    {
      type: 'expired',
      number: '4000 0000 0000 0069',
      description: 'Card has expired',
      icon: AlertCircle,
      color: 'yellow'
    }
  ];

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="bg-blue-100 rounded-full p-2">
          <CreditCard className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-blue-900 mb-2">Demo Payment System</h3>
          <p className="text-sm text-blue-800 mb-3">
            This is a demo payment system. Use these test card numbers to simulate different payment scenarios:
          </p>
          
          <div className="space-y-2">
            {demoCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.type} className="flex items-center gap-3 p-2 bg-white rounded border">
                  <Icon className={`h-4 w-4 text-${card.color}-600`} />
                  <div className="flex-1">
                    <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                      {card.number}
                    </code>
                    <p className="text-xs text-gray-600 mt-1">{card.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-3 p-2 bg-white rounded border">
            <p className="text-xs text-gray-600">
              <strong>Note:</strong> Use any future expiry date (MM/YY) and any 3-digit CVV for testing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPaymentInfo;
