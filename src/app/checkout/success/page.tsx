"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const txRef = searchParams.get('txRef');
  const courseId = searchParams.get('courseId');
  const mock = searchParams.get('mock');
  
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    async function verifyPayment() {
      if (!user || !courseId || !txRef) return;

      try {
        // In a real app, the webhook handles this, but since we are simulating or doing client-side fallback:
        // We call our callback endpoint to forcefully grant access for this demo
        const res = await fetch(`/api/checkout/callback?txRef=${txRef}&courseId=${courseId}&userId=${user.uid}&mock=${mock}`);
        const data = await res.json();

        if (data.success) {
          // Grant progress document access so they can watch videos
          await setDoc(doc(db, "users", user.uid, "progress", courseId), {
            courseId: courseId,
            completedLessons: [],
            lastUpdated: new Date()
          }, { merge: true });

          setStatus('success');
          setTimeout(() => {
            router.push(`/dashboard/courses/${courseId}`);
          }, 2000);
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    }

    if (user) {
      verifyPayment();
    }
  }, [user, txRef, courseId, router, mock]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-transparent flex items-center justify-center p-6">
      <div className="bg-white dark:bg-[#111111] max-w-md w-full p-10 rounded-3xl shadow-xl text-center border border-slate-100 dark:border-white/10">
        
        {status === 'verifying' && (
          <>
            <Loader2 className="w-16 h-16 text-[#3268BA] animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Verifying Payment...</h2>
            <p className="text-slate-500 dark:text-slate-400">Please wait while we confirm your transaction with ArifPay.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Payment Successful!</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Your course has been unlocked. Redirecting you to the classroom...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Verification Failed</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">We could not verify your payment. Please contact support.</p>
            <button 
              onClick={() => router.push(`/dashboard`)}
              className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition"
            >
              Return to Dashboard
            </button>
          </>
        )}
        
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-[#3268BA]" /></div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
