export interface Product {
  id: string;
  name: string;
  image: string;
  orderNumber: string;
  returnTerm: string;
}

export interface ReturnCondition {
  sealed: string;
  mistaken: string;
  functionalUnsealed: string;
  nonFunctionalUnsealed: string;
  notDelivered: string;
}

export interface ReturnReason {
  defective: string;
  incorrect: string;
  unsatisfactory: string;
  changedMind: string;
  misleading: string;
}

export interface DeliveryMethod {
  type: 'express' | 'store' | 'flowbox';
}

export interface RefundOption {
  type: 'voucher' | 'money' | 'product';
}
