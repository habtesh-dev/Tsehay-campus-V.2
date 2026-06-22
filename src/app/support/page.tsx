import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-transparent flex flex-col font-sans">
      <header className="bg-white dark:bg-[#111111] border-b border-slate-200 dark:border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
          <Link href="/" className="text-slate-500 hover:text-slate-900 dark:text-white transition">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Help & Support</h1>
        </div>
      </header>
      
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        <div className="bg-white dark:bg-[#111111] p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-white/10 shadow-xl shadow-slate-200/50">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-3xl">📄</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Help & Support</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Find answers to common questions or reach out to support.
          </p>
          
          <div className="prose prose-slate max-w-none">
            <p>This page is currently being updated. Please check back soon for the full help & support.</p>
            <p>If you need immediate assistance, please contact our support team at <strong>support@tsehaycampus.com</strong> or reach out via our official Telegram channel.</p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/10">
            <Link href="/" className="text-[#3268BA] font-bold hover:text-[#234b8a] transition flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Return to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
