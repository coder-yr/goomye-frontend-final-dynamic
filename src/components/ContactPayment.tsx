interface ContactPaymentProps {
  email: string;
  paymentMethod: string;
  cardLast4: string;
}

const ContactPayment = ({ email, paymentMethod, cardLast4 }: ContactPaymentProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Contact details</h3>
        <p className="text-sm">{email}</p>
      </div>
      <div>
        <h3 className="font-semibold mb-3">Payment method</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-6 h-4 rounded-sm bg-red-500" />
            <div className="w-6 h-4 rounded-sm bg-orange-400" />
          </div>
          <span className="text-sm">{paymentMethod} •••• {cardLast4}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactPayment;
