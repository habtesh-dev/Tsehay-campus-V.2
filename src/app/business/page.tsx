import Link from "next/link";
import { Building2, Users, Briefcase, GraduationCap, ChevronRight, BarChart } from "lucide-react";

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-transparent flex flex-col font-sans">
      
      {/* Header */}
      <header className="bg-white dark:bg-[#111111] border-b border-slate-200 dark:border-white/10 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#3268BA] rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-md">
              <span className="text-white font-black text-xl">T</span>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800 dark:text-white">Tsehay<span className="text-[#3268BA]">Business</span></span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/" className="font-bold text-slate-500 hover:text-slate-900 dark:text-white transition">Back to Campus</Link>
            <Link href="/login" className="bg-[#3268BA] text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-800 transition shadow-sm">Contact Sales</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white dark:bg-[#111111] pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F9B03C]/10 text-[#F9B03C] font-bold text-sm mb-6 border border-[#F9B03C]/20">
            <Building2 className="w-4 h-4" /> For Enterprise & Teams
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 leading-tight tracking-tight">
            Upskill your team with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3268BA] to-[#F9B03C]">world-class training.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Get unlimited access to top courses for your employees. Track progress, measure ROI, and build a culture of continuous learning.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/login" className="bg-[#3268BA] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition shadow-lg hover:shadow-xl hover:-translate-y-1">
              Get Started for Business
            </Link>
            <button className="bg-white border-2 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-400 px-8 py-4 rounded-full font-bold text-lg hover:border-slate-300 hover:bg-slate-50 dark:bg-transparent transition">
              View Plans
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50 dark:bg-transparent">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Why choose Tsehay Business?</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto">Everything you need to manage your team's education in one powerful platform.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-[#111111] p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-white/10 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 text-[#3268BA] rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Team Management</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Easily add, remove, and organize your team members into specific learning groups.</p>
            </div>
            
            <div className="bg-white dark:bg-[#111111] p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-white/10 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-orange-50 text-[#F9B03C] rounded-2xl flex items-center justify-center mb-6">
                <BarChart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Advanced Analytics</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Track engagement, course completion rates, and skill acquisition with detailed reports.</p>
            </div>
            
            <div className="bg-white dark:bg-[#111111] p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-white/10 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mb-6">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Custom Learning Paths</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Create mandatory training curriculums tailored to specific roles within your company.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#3268BA] py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-6">Ready to transform your workforce?</h2>
          <p className="text-blue-100 text-xl font-medium mb-10 max-w-2xl mx-auto">
            Join hundreds of forward-thinking companies already using Tsehay Campus.
          </p>
          <Link href="/login" className="inline-flex items-center gap-2 bg-white dark:bg-[#111111] text-[#3268BA] px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition shadow-lg hover:shadow-xl hover:-translate-y-1">
            Contact Sales <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-[#111111] py-8 border-t border-slate-200 dark:border-white/10 mt-auto text-center">
        <p className="text-slate-400 font-semibold text-sm">© 2026 Tsehay Business. All rights reserved.</p>
      </footer>
    </div>
  );
}
