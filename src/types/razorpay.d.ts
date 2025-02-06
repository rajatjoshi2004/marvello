declare interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color: string;
  };
  modal?: {
    ondismiss: () => void;
  };
}

declare interface Razorpay {
  new (options: RazorpayOptions): {
    open: () => void;
  };
}

declare interface Window {
  Razorpay: Razorpay;
}