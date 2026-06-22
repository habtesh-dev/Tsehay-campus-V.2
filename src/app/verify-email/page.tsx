"use client";

import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function VerifyEmailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    // If user is already verified or logged out, redirect them
    if (user && user.emailVerified) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleCheckStatus = async () => {
    if (auth.currentUser) {
      setChecking(true);
      await auth.currentUser.reload();
      if (auth.currentUser.emailVerified) {
        router.push("/dashboard");
      } else {
        alert("Your email is not verified yet. Please check your inbox and click the link we sent.");
      }
      setChecking(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-[#3268BA]/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#F9B03C]/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto w-20 h-20 bg-[#3268BA]/10 rounded-full flex items-center justify-center mb-6">
          <Mail className="w-10 h-10 text-[#3268BA]" />
        </div>
        
        <h2 className="text-4xl font-black tracking-tight text-white mb-4">
          Verify Your Email
        </h2>
        
        <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-white/10 mt-8">
          <p className="text-slate-300 text-lg mb-6 leading-relaxed">
            We've sent a verification link to <br/>
            <span className="font-bold text-white bg-white/5 px-2 py-1 rounded-md">{user?.email || "your email"}</span>. 
          </p>
          <p className="text-slate-400 text-sm mb-8">
            Please check your inbox (and spam folder) and click the link to activate your account.
          </p>

          <button
            onClick={handleCheckStatus}
            disabled={checking}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-[#F9B03C]/20 text-sm font-black text-black bg-[#F9B03C] hover:bg-[#e6a236] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F9B03C] focus:ring-offset-black transition disabled:opacity-50"
          >
            {checking ? "Checking..." : "I've Verified My Email"} <ArrowRight className="w-4 h-4" />
          </button>
          
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-sm text-slate-500">
              Need to use a different account? <Link href="/login" className="text-[#3268BA] hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
