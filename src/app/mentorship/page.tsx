import Link from "next/link";
import { UserPlus, Star, Video, Target, ChevronRight } from "lucide-react";

export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-transparent flex flex-col font-sans">
      <header className="bg-white dark:bg-[#111111] border-b border-slate-200 dark:border-white/10 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#3268BA] rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-md">
              <span className="text-white font-black text-xl">T</span>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800 dark:text-white">Tsehay<span className="text-[#3268BA]">Mentorship</span></span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/" className="font-bold text-slate-500 hover:text-slate-900 dark:text-white transition">Back to Campus</Link>
            <Link href="/login" className="bg-[#3268BA] text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-800 transition shadow-sm">Find a Mentor</Link>
          </div>
        </div>
      </header>

      <section className="bg-white dark:bg-[#111111] pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 leading-tight tracking-tight">
            Accelerate your career with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3268BA] to-[#F9B03C]">1-on-1 Mentorship.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Connect with industry experts who have been in your shoes. Get personalized guidance, portfolio reviews, and career advice.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/login" className="bg-[#3268BA] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition shadow-lg hover:shadow-xl hover:-translate-y-1">
              Browse Mentors
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 dark:bg-transparent">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-[#111111] p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-white/10">
              <div className="w-14 h-14 bg-blue-50 text-[#3268BA] rounded-2xl flex items-center justify-center mb-6">
                <Video className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Live 1-on-1 Calls</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Schedule private video sessions with mentors to discuss your specific goals and blockers.</p>
            </div>
            <div className="bg-white dark:bg-[#111111] p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-white/10">
              <div className="w-14 h-14 bg-orange-50 text-[#F9B03C] rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Actionable Feedback</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Get detailed code reviews, portfolio teardowns, and resume critiques from the pros.</p>
            </div>
            <div className="bg-white dark:bg-[#111111] p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-white/10">
              <div className="w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mb-6">
                <Star className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Top 1% Experts</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">All mentors are heavily vetted professionals working at top global and local tech companies.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
