"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError("No account found with this email. Please check your spelling.");
      } else {
        setError(err.message || "Failed to send reset email");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#3268BA]/20 blur-[120px]"></div>
        <div className="absolute top-[60%] right-[0%] w-[40%] h-[40%] rounded-full bg-[#F9B03C]/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md mb-8 text-center">
        <Link href="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-6 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Login
        </Link>
        <h2 className="text-center text-4xl font-black tracking-tight text-white mb-2">
          Forgot Password
        </h2>
        <p className="text-center text-sm text-slate-400">
          Enter your email and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900/50 backdrop-blur-xl py-10 px-6 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/10">
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          {success ? (
            <div className="text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Check Your Email</h3>
              <p className="text-slate-400 text-sm">
                We've sent a password reset link to <span className="font-semibold text-white">{email}</span>. 
                Please check your inbox and spam folder.
              </p>
              <div className="pt-4">
                <Link href="/login" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-[#3268BA]/20 text-sm font-black text-white bg-[#3268BA] hover:bg-[#234b8a] transition">
                  Return to Login
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleResetPassword}>
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
                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-[#F9B03C]/20 text-sm font-black text-black bg-[#F9B03C] hover:bg-[#e6a236] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F9B03C] focus:ring-offset-black transition transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
