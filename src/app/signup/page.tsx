"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Lock, User, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

// Helper component for the Terms Text
const TermsText = () => (
  <div className="h-32 overflow-y-auto p-3 bg-black/40 border border-white/5 rounded-lg text-xs text-slate-400 space-y-2 mb-4 custom-scrollbar">
    <p><strong>1. Acceptance of Terms:</strong> By accessing and using Tsehay Campus, you agree to be bound by these Terms of Service.</p>
    <p><strong>2. User Accounts:</strong> You are responsible for maintaining the confidentiality of your account credentials.</p>
    <p><strong>3. Course Content:</strong> All course materials, videos, and documents are the intellectual property of Tsehay Campus. You may not distribute or reproduce them without permission.</p>
    <p><strong>4. Privacy Policy:</strong> We collect and store your email and basic profile information solely for the purpose of providing you with educational services. We do not sell your data to third parties.</p>
    <p><strong>5. AI Tutor Usage:</strong> The AI Tutor is provided to assist your learning. Misuse, spamming, or attempting to bypass its educational constraints may result in account suspension.</p>
    <p><strong>6. Payments & Refunds:</strong> All payments are processed securely. Refund policies vary by course; please refer to the specific course details.</p>
  </div>
);

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();
  const { signInWithGoogle } = useAuth();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's profile with their name
      await updateProfile(userCredential.user, {
        displayName: name
      });

      // Send Email Verification Link
      await sendEmailVerification(userCredential.user);

      // Explicitly create user doc here as well just to be safe
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: name,
        createdAt: new Date(),
      });

      router.push("/verify-email");
    } catch (err: any) {
      setError(err.message || "Failed to create an account");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
        return; // Ignore
      }
      setError("Failed to sign up with Google");
    }
  };

  return (
    <main className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-[#3268BA]/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#F9B03C]/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-6 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        <h2 className="text-center text-4xl font-black tracking-tight text-white mb-2">
          Start Your Journey
        </h2>
        <p className="text-center text-sm text-slate-400">
          Create an account and join 500+ successful students.
        </p>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900/50 backdrop-blur-xl py-10 px-6 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/10">
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleEmailSignup}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                Full Name
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-black/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3268BA] focus:border-transparent transition"
                  placeholder="Abebe Kebede"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email address
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-black/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3268BA] focus:border-transparent transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-black/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3268BA] focus:border-transparent transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <ul className="space-y-2 mt-4">
              <li className="flex items-center gap-2 text-xs text-slate-400"><CheckCircle2 className="w-3.5 h-3.5 text-[#F9B03C]" /> At least 8 characters</li>
              <li className="flex items-center gap-2 text-xs text-slate-400"><CheckCircle2 className="w-3.5 h-3.5 text-[#F9B03C]" /> Access to AI Tutor</li>
            </ul>

            <div className="mt-4 pt-2 border-t border-white/10">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Terms & Privacy Policy
              </label>
              <TermsText />
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 text-[#3268BA] bg-black/50 border-white/20 rounded focus:ring-[#3268BA] focus:ring-2"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-slate-300">
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || !agreedToTerms}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-[#F9B03C]/20 text-sm font-black text-black bg-[#F9B03C] hover:bg-[#e6a236] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F9B03C] focus:ring-offset-black transition transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating account..." : "Create Free Account"}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900 text-slate-400 backdrop-blur-xl">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignup}
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-white/10 rounded-xl shadow-sm bg-white/5 text-sm font-medium text-white hover:bg-white dark:bg-[#111111]/10 transition"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
            </div>
          </div>
          
          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#3268BA] hover:text-blue-400 transition">
              Log in instead
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
