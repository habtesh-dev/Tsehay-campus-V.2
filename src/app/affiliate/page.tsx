import Link from "next/link";
import { DollarSign, Share2, TrendingUp, ChevronRight } from "lucide-react";

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-transparent flex flex-col font-sans">
      <header className="bg-white dark:bg-[#111111] border-b border-slate-200 dark:border-white/10 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#3268BA] rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-md">
              <span className="text-white font-black text-xl">T</span>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800 dark:text-white">Tsehay<span className="text-[#3268BA]">Affiliate</span></span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/" className="font-bold text-slate-500 hover:text-slate-900 dark:text-white transition">Back to Campus</Link>
            <Link href="/login" className="bg-[#3268BA] text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-800 transition shadow-sm">Join Program</Link>
          </div>
        </div>
      </header>

      <section className="bg-white dark:bg-[#111111] pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 leading-tight tracking-tight">
            Earn money by sharing <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3268BA] to-[#F9B03C]">Tsehay Campus.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Join our affiliate program and earn a generous 30% commission for every student you refer to our premium courses.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/login" className="bg-[#3268BA] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition shadow-lg hover:shadow-xl hover:-translate-y-1">
              Become an Affiliate
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 dark:bg-transparent">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-[#111111] p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-white/10">
              <div className="w-14 h-14 bg-blue-50 text-[#3268BA] rounded-2xl flex items-center justify-center mb-6">
                <Share2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Share your link</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Promote Tsehay Campus on your social media, blog, or to your friends using your unique tracking link.</p>
            </div>
            <div className="bg-white dark:bg-[#111111] p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-white/10">
              <div className="w-14 h-14 bg-orange-50 text-[#F9B03C] rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Students enroll</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">When someone clicks your link and purchases a course within 60 days, you get credited for the sale.</p>
            </div>
            <div className="bg-white dark:bg-[#111111] p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-white/10">
              <div className="w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mb-6">
                <DollarSign className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Get Paid</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Receive 30% of the sale price. Payouts are made monthly directly to your bank account or crypto wallet.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
