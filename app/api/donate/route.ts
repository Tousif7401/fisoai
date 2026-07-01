/**
 * Razorpay Order Creation API Route
 * Creates a payment order on the server side for security
 */

import { NextRequest, NextResponse } from 'next/server';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

// In production, install razorpay package: npm install razorpay
// For now, we'll use a simplified approach with fetch

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'INR', notes = {} } = body;

    // Debug logging
    console.log('Environment check:', {
      hasKeyId: !!process.env.RAZORPAY_KEY_ID,
      hasKeySecret: !!process.env.RAZORPAY_KEY_SECRET,
      keyIdLength: process.env.RAZORPAY_KEY_ID?.length,
      nodeEnv: process.env.NODE_ENV,
    });

    // Validate amount
    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      console.error('Missing Razorpay credentials');
      return NextResponse.json(
        { error: 'Payment gateway not configured' },
        { status: 500 }
      );
    }

    // Convert amount to paise (₹1 = 100 paise)
    const amountInPaise = Math.round(amount * 100);

    // Create Razorpay order
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency,
        receipt: `receipt_${Date.now()}`,
        notes: {
          ...notes,
          source: 'calmify-donation',
        },
      }),
    });

    const order = await response.json();

    if (!response.ok) {
      console.error('Razorpay order creation failed:', order);
      return NextResponse.json(
        { error: 'Failed to create payment order' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error) {
    console.error('Payment order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
