import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { courseId, courseName, price, userId, userEmail } = body;

    if (!courseId || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const apiKey = process.env.ARIFPAY_API_KEY;

    // We generate a unique transaction ID for tracking
    const txRef = `TC-TX-${Date.now()}-${userId.substring(0, 5)}`;

    const arifpayPayload = {
      cancelUrl: `${baseUrl}/dashboard/courses/${courseId}?payment=cancelled`,
      errorUrl: `${baseUrl}/dashboard/courses/${courseId}?payment=error`,
      notifyUrl: `${baseUrl}/api/checkout/callback?txRef=${txRef}&userId=${userId}&courseId=${courseId}`,
      successUrl: `${baseUrl}/checkout/success?txRef=${txRef}&courseId=${courseId}`,
      paymentMethods: ["TELEBIRR", "CBEBIRR", "AWASH", "CBE"],
      items: [
        {
          name: courseName || "Tsehay Campus Course",
          price: Number(price) || 1, // Defaulting to 1 ETB for testing
          quantity: 1,
          description: "Digital Course Access"
        }
      ]
    };

    // If API key is placeholder, simulate a success response for local testing
    if (!apiKey || apiKey === 'YOUR_ARIFPAY_API_KEY') {
      console.log("Mocking ArifPay checkout because real keys are not set.");
      return NextResponse.json({
        success: true,
        data: {
          paymentUrl: `${baseUrl}/checkout/success?txRef=${txRef}&courseId=${courseId}&mock=true`,
        }
      });
    }

    // Call the actual ArifPay Sandbox/Production API
    const response = await fetch('https://gateway.arifpay.net/api/sandbox/checkout/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-arifpay-key': apiKey,
      },
      body: JSON.stringify(arifpayPayload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to initialize ArifPay session');
    }

    return NextResponse.json({
      success: true,
      data: {
        paymentUrl: data.paymentUrl,
        sessionId: data.sessionId
      }
    });

  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
