import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

// This is the secure POST webhook from the payment gateway (e.g. ArifPay/Chapa)
export async function POST(req: Request) {
  try {
    // 1. Verify Authorization Header to prevent fake webhooks
    const authHeader = req.headers.get('authorization');
    const API_SECRET = process.env.PAYMENT_API_SECRET || 'dev_secret_tsehay';
    
    // Using Bearer token or exact match depending on the gateway
    if (!authHeader || authHeader !== `Bearer ${API_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized webhook' }, { status: 401 });
    }

    const body = await req.json();
    
    // Extract payment info from the webhook body
    // Note: Adjust these field names based on your actual payment gateway's webhook payload
    const { txRef, userId, courseId, status } = body;

    if (!userId || !courseId || !txRef || status !== 'success') {
      return NextResponse.json({ error: 'Invalid webhook payload or unsuccessful payment' }, { status: 400 });
    }

    // 2. Securely write to Firestore using Firebase Admin SDK
    // This bypasses client-side firestore.rules completely.
    const enrollmentRef = adminDb.collection('users').doc(userId).collection('enrollments').doc(courseId);
    
    await enrollmentRef.set({
      courseId: courseId,
      txRef: txRef,
      enrolledAt: new Date(),
      status: 'active',
      progress: 0
    });

    // Respond quickly to the webhook with 200 OK
    return NextResponse.json({ success: true, message: 'Successfully processed webhook' });
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

// Deprecated: Remove the GET route as it's insecure to use URLs for sensitive state changes.
export async function GET(req: Request) {
  return NextResponse.json({ error: 'Method Not Allowed. Please use secure POST webhooks.' }, { status: 405 });
}
