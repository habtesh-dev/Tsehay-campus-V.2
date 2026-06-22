import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    // If you have a service account JSON, parse it here from process.env.FIREBASE_SERVICE_ACCOUNT
    // For now, if no service account is provided, it tries to use default application credentials
    // which may work depending on the environment, or fail gracefully.
    
    // Fallback or explicit setup (replace with actual service account env variable in production)
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    
    if (serviceAccountKey) {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(serviceAccountKey)),
      });
    } else {
      admin.initializeApp(); // relies on GOOGLE_APPLICATION_CREDENTIALS
    }
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
