import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin';

// List of allowed admin emails (In production, this could be stored in a database or env var)
const ADMIN_EMAILS = [
  "habtesh.dev@gmail.com",
  "tsehaycampus@gmail.com"
];

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid authorization header' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    // Verify the Firebase ID token securely on the server
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
    // Get the user's email from the decoded token
    const userEmail = decodedToken.email;

    if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
      return NextResponse.json({ 
        isAdmin: false, 
        error: 'User is not an authorized administrator' 
      }, { status: 403 });
    }

    return NextResponse.json({ 
      isAdmin: true, 
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email
      }
    });

  } catch (error) {
    console.error("Admin verification failed:", error);
    return NextResponse.json({ error: 'Failed to verify admin token' }, { status: 401 });
  }
}
