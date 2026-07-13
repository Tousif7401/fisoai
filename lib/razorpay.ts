/**
 * Razorpay client utility for initializing payments
 * This runs on the client side
 */

declare global {
  interface Window {
    Razorpay: new (options: unknown) => RazorpayInstance;
  }
}

interface RazorpayInstance {
  open: () => void;
  close: () => void;
  on: (event: string, handler: () => void) => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface RazorpayOptions {
  amount: number; // Amount in paise (₹100 = 10000 paise)
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  image?: string; // Logo URL
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color: string;
  };
  method?: {
    upi?: boolean;
    card?: boolean;
    netbanking?: boolean;
    wallet?: boolean;
    emi?: boolean;
    paylater?: boolean;
  };
  config?: {
    display: {
      blocks: {
        [key: string]: {
          name: string;
          channels: string[];
        };
      };
      sequence: string[];
      preferences: {
        offer_selected: string;
      };
    };
  };
}

export interface PaymentCallback {
  onSuccess: (response: { razorpay_payment_id: string; razorpay_order_id?: string; razorpay_signature?: string }) => void;
  onError: (error: { code: number; description: string; source: string; step: string; reason: string }) => void;
}

/**
 * Load Razorpay script dynamically
 */
export function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
    document.head.appendChild(script);
  });
}

/**
 * Initialize Razorpay payment
 */
export async function initializeRazorpay(
  options: RazorpayOptions,
  callbacks: PaymentCallback
) {
  // Load Razorpay SDK
  await loadRazorpayScript();

  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  if (!keyId) {
    throw new Error('Razorpay Key ID is not configured');
  }

  // Default payment methods configuration
  const defaultMethods = {
    upi: true,
    card: true,
    netbanking: true,
    wallet: true,
    emi: false,
    paylater: false,
  };

  // Default display configuration for UPI apps
  const defaultConfig = {
    display: {
      blocks: {
        upi: {
          name: 'Pay via UPI',
          channels: ['upi'],
        },
        card: {
          name: 'Pay via Card',
          channels: ['card'],
        },
        netbanking: {
          name: 'Pay via Netbanking',
          channels: ['netbanking'],
        },
        wallet: {
          name: 'Pay via Wallet',
          channels: ['wallet'],
        },
      },
      sequence: ['upi', 'card', 'netbanking', 'wallet'],
      preferences: {
        offer_selected: 'upi',
      },
    },
  };

  // Create Razorpay instance
  const razorpay = new window.Razorpay({
    key: keyId,
    amount: options.amount,
    currency: options.currency || 'INR',
    name: options.name || 'Calmify',
    description: options.description || 'Donation to keep Calmify free',
    image: options.image || '/logo.svg',
    order_id: options.order_id,
    prefill: options.prefill,
    notes: options.notes,
    theme: options.theme || {
      color: '#E1E0CC',
    },
    method: options.method || defaultMethods,
    config: options.config || defaultConfig,
    handler: function(response: RazorpayResponse) {
      callbacks.onSuccess(response);
    },
    modal: {
      ondismiss: function() {
        callbacks.onError({
          code: 0,
          description: 'Payment modal closed by user',
          source: 'user',
          step: 'payment',
          reason: 'user_cancelled',
        });
      },
    },
  });

  // Open payment modal
  razorpay.open();
}

/**
 * Convert rupees to paise (₹1 = 100 paise)
 */
export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

/**
 * Convert paise to rupees
 */
export function paiseToRupees(paise: number): number {
  return paise / 100;
}
