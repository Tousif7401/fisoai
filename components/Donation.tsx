"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { ArrowRight, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { WordsPullUp } from './animations';
import BorderGlow from './ui/BorderGlow';
import { initializeRazorpay, rupeesToPaise } from '@/lib/razorpay';
import Image from 'next/image';

export function Donation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Payment states
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Handle payment
  const handlePayment = useCallback(async (amount: number) => {
    setIsLoading(true);
    setPaymentStatus('idle');
    setErrorMessage('');

    try {
      // Create order on server
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          notes: {
            donation_type: amount === 100 ? 'coffee' : amount === 500 ? 'support' : 'keep_free',
          },
        }),
      });

      const orderData = await response.json();

      if (!response.ok) {
        throw new Error(orderData.error || 'Failed to initiate payment');
      }

      // Initialize Razorpay checkout
      await initializeRazorpay(
        {
          amount: rupeesToPaise(amount),
          currency: 'INR',
          name: 'Calmify',
          description: 'Donation to keep Calmify free for everyone',
          // image: 'https://your-cdn.com/logo.png', // Use public HTTPS URL in production
          order_id: orderData.order_id,
          theme: {
            color: '#E1E0CC',
          },
          method: {
            upi: true,    // PhonePe, Google Pay, Paytm, etc.
            card: true,
            netbanking: true,
            wallet: true,
            emi: false,
            paylater: false,
          },
          config: {
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
          },
        },
        {
          onSuccess: (response) => {
            console.log('Payment successful:', response);
            setPaymentStatus('success');
            setIsLoading(false);
            setSelectedAmount(null);
            setCustomAmount('');
          },
          onError: (error) => {
            console.error('Payment failed:', error);
            setPaymentStatus('error');
            setErrorMessage(error.description || 'Payment failed. Please try again.');
            setIsLoading(false);
          },
        }
      );
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
      setIsLoading(false);
    }
  }, []);

  // Handle preset amount click
  const handlePresetClick = (amountStr: string) => {
    const amount = parseInt(amountStr.replace('₹', ''));
    setSelectedAmount(amount);
    handlePayment(amount);
  };

  // Handle custom amount donation
  const handleCustomDonate = () => {
    const amount = parseInt(customAmount);
    if (!amount || amount < 1) {
      setErrorMessage('Please enter a valid amount');
      setPaymentStatus('error');
      return;
    }
    handlePayment(amount);
  };

  // Reset status
  const resetStatus = () => {
    setPaymentStatus('idle');
    setErrorMessage('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const donationAmounts = [
    { amount: '₹100', label: 'A cup of coffee' },
    { amount: '₹500', label: 'Support the cause' },
    { amount: '₹1000', label: 'Keep Calmify free' },
  ];

  return (
    <section ref={ref} id="donate" className="min-h-screen bg-black py-20 md:py-32 px-4 md:px-6 relative flex items-center">
      {/* Background Noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative w-full">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="backdrop-blur-xl rounded-2xl md:rounded-[2rem] p-8 md:p-16 text-center border"
          style={{
            background: 'rgba(16, 16, 16, 0.6)',
            borderColor: 'rgba(222, 219, 200, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(222, 219, 200, 0.05)'
          }}
        >
          {/* Logo Icon */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: '#212121' }}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Image src="/logo.svg" alt="Calmify Logo" width={96} height={96} className="brightness-0 invert" />
            </motion.div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants} className="mb-6">
            <WordsPullUp
              text="Keep Calmify Free"
              showAsterisk={false}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[0.9] tracking-[-0.05em] text-[#E1E0CC]"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#DEDBC8' }}
          >
            Calmify is and will always be free. Your donation helps cover API costs and keeps mental health support accessible to every developer who needs it.
          </motion.p>

          {/* Success Message */}
          {paymentStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-6 rounded-2xl bg-green-500/10 border border-green-500/20"
            >
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-green-400 mb-2">Thank You!</h3>
              <p className="text-sm text-green-300">Your donation helps keep Calmify free for everyone. 💛</p>
            </motion.div>
          )}

          {/* Error Message */}
          {paymentStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-6 rounded-2xl bg-red-500/10 border border-red-500/20"
            >
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-red-400 mb-2">Payment Failed</h3>
              <p className="text-sm text-red-300 mb-3">{errorMessage}</p>
              <button
                onClick={resetStatus}
                className="text-sm text-red-400 underline hover:text-red-300 transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 flex items-center justify-center gap-3"
            >
              <Loader2 className="w-5 h-5 text-[#E1E0CC] animate-spin" />
              <span className="text-sm text-[#E1E0CC]">Processing payment...</span>
            </motion.div>
          )}

          {/* Donation Amounts */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {donationAmounts.map((option) => (
              <button
                key={option.amount}
                disabled={isLoading || paymentStatus === 'success'}
                className="px-6 py-4 rounded-3xl border transition-all hover:scale-105 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  borderColor: 'rgba(222, 219, 200, 0.2)',
                  color: '#E1E0CC',
                  background: 'rgba(33, 33, 33, 0.4)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading && paymentStatus !== 'success') {
                    e.currentTarget.style.backgroundColor = 'rgba(222, 219, 200, 0.9)';
                    e.currentTarget.style.color = '#000';
                    e.currentTarget.style.borderColor = '#DEDBC8';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(33, 33, 33, 0.4)';
                  e.currentTarget.style.color = '#E1E0CC';
                  e.currentTarget.style.borderColor = 'rgba(222, 219, 200, 0.2)';
                }}
                onClick={() => handlePresetClick(option.amount)}
              >
                <div className="text-lg font-medium">{option.amount}</div>
                <div className="text-xs opacity-70 mt-1">{option.label}</div>
              </button>
            ))}
          </motion.div>

          {/* Custom Amount */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                disabled={isLoading || paymentStatus === 'success'}
                className="backdrop-blur-sm border rounded-3xl px-4 py-3 text-sm w-40 text-center focus:outline-none transition-all disabled:opacity-50"
                style={{
                  borderColor: 'rgba(222, 219, 200, 0.2)',
                  color: '#E1E0CC',
                  background: 'rgba(33, 33, 33, 0.4)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                }}
              />
              <BorderGlow
                edgeSensitivity={30}
                glowColor="45 30 85"
                backgroundColor="rgba(255, 255, 255, 0.05)"
                borderRadius={9999}
                glowRadius={35}
                glowIntensity={1.2}
                coneSpread={25}
                animated={true}
                colors={['#E1E0CC', '#DEDBC8', '#c4b896']}
                className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <button
                  disabled={isLoading || paymentStatus === 'success' || !customAmount}
                  onClick={handleCustomDonate}
                  className="group flex items-center gap-2 rounded-full px-6 py-3 text-[#E1E0CC] font-medium text-xs sm:text-sm hover:gap-3 transition-all bg-transparent border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    <>
                      Donate
                      <span className="bg-white/10 backdrop-blur-sm rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20">
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E1E0CC]" strokeWidth={2} />
                      </span>
                    </>
                  )}
                </button>
              </BorderGlow>
            </div>
          </motion.div>

          {/* Razorpay Note */}
          <motion.p
            variants={itemVariants}
            className="text-xs text-gray-500"
          >
            Secured by Razorpay
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
