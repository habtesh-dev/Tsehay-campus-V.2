"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Award, ShieldCheck, Star, Bot, MessageCircle, Send, Menu, X, Globe, Zap, CheckCircle2, ChevronDown, Search, Sun, Rocket, Loader2 } from "lucide-react";
import { PlayCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { courseService, Course } from "@/lib/courseService";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [publishedCourses, setPublishedCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getPublishedCourses();
        setPublishedCourses(data.slice(0, 3)); // Display top 3
      } catch (error) {
        console.error("Error fetching courses", error);
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] font-sans selection:bg-blue-200 dark:selection:bg-amber-500/30">
      
      {/* Enterprise Header (Udemy/Coursera Style) */}
      <header className="sticky top-0 w-full bg-white/90 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 z-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/Campus Logo.jpg" alt="Tsehay Campus Logo" className="w-10 h-10 rounded-lg shadow-sm transform group-hover:rotate-12 transition object-cover" />
            <span className="text-xl font-black tracking-tight">Tsehay<span className="text-[#3268BA]">Campus</span></span>
          </Link>

          {/* Centered Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-6 font-bold text-sm text-slate-600 dark:text-slate-300">
            <Link href="/" className="hover:text-[#F9B03C] transition text-[#F9B03C]">{t('nav.home')}</Link>
            
            {/* Courses Category Dropdown */}
            <div className="flex items-center gap-1 hover:text-[#F9B03C] cursor-pointer group relative py-6">
              <span>{t('nav.courses')}</span>
              
              {/* Dropdown Menu */}
              <div className="absolute top-[80px] left-0 w-64 bg-white dark:bg-[#0f172a] shadow-xl shadow-blue-900/10 dark:shadow-black/50 rounded-2xl py-4 border border-slate-100 dark:border-slate-800 opacity-0 translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300">
                <Link href="/dashboard/courses" className="block px-6 py-3 hover:bg-slate-50 dark:bg-transparent dark:hover:bg-slate-800 hover:text-[#3268BA] dark:hover:text-[#F9B03C] font-semibold transition text-slate-600 dark:text-slate-300">Digital Marketing</Link>
                <Link href="/dashboard/courses" className="block px-6 py-3 hover:bg-slate-50 dark:bg-transparent dark:hover:bg-slate-800 hover:text-[#3268BA] dark:hover:text-[#F9B03C] font-semibold transition text-slate-600 dark:text-slate-300">Software Engineering</Link>
                <Link href="/dashboard/courses" className="block px-6 py-3 hover:bg-slate-50 dark:bg-transparent dark:hover:bg-slate-800 hover:text-[#3268BA] dark:hover:text-[#F9B03C] font-semibold transition text-slate-600 dark:text-slate-300">Graphic Design</Link>
                <Link href="/dashboard/courses" className="block px-6 py-3 hover:bg-slate-50 dark:bg-transparent dark:hover:bg-slate-800 hover:text-[#3268BA] dark:hover:text-[#F9B03C] font-semibold transition text-slate-600 dark:text-slate-300">Business & Startup</Link>
              </div>
            </div>

            <Link href="/dashboard/ai-tutor" className="hover:text-[#F9B03C] transition">{t('nav.tsehayAI')}</Link>
            <Link href="/affiliate" className="hover:text-[#F9B03C] transition">{t('nav.affiliate')}</Link>
            <Link href="/about" className="hover:text-[#F9B03C] transition">{t('nav.aboutUs')}</Link>
            <Link href="#testimonials" className="hover:text-[#F9B03C] transition">{t('nav.testimonials')}</Link>
            <Link href="/mentorship" className="hover:text-[#F9B03C] transition">{t('nav.mentorship')}</Link>
          </nav>

          {/* Auth & Icons (Desktop) */}
          <div className="hidden lg:flex items-center gap-5 ml-auto">
            <ThemeSwitcher />
            <button className="text-slate-600 dark:text-slate-300 hover:text-[#F9B03C] dark:hover:text-[#F9B03C] transition"><Search className="w-5 h-5" /></button>
            <button onClick={toggleLanguage} className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-[#F9B03C] transition font-bold text-sm">
              {language === 'am' ? 'ENG' : 'AM'}
            </button>
            <Link href="/login" className="font-bold text-slate-800 dark:text-slate-200 hover:text-[#3268BA] dark:hover:text-[#F9B03C] transition">{t('nav.login')}</Link>
            <Link href="/signup" className="bg-[#F9B03C] text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#e6a236] transition shadow-sm whitespace-nowrap">{t('nav.joinNow')}</Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-4 ml-auto">
            <ThemeSwitcher />
            <button onClick={toggleLanguage} className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-bold text-sm">
              {language === 'am' ? 'ENG' : 'AM'}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-900 dark:text-white p-2 focus:outline-none">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800 shadow-xl flex flex-col p-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{t('nav.explore')}</span>
              <Link href="/dashboard/courses" className="font-semibold text-slate-700 dark:text-slate-400 py-2 border-b border-slate-100 dark:border-white/10">Digital Marketing</Link>
              <Link href="/dashboard/courses" className="font-semibold text-slate-700 dark:text-slate-400 py-2 border-b border-slate-100 dark:border-white/10">E-Commerce & Dropshipping</Link>
              <Link href="/dashboard/courses" className="font-semibold text-slate-700 dark:text-slate-400 py-2 border-b border-slate-100 dark:border-white/10">Crypto & Web3</Link>
              <Link href="/dashboard/courses" className="font-semibold text-slate-700 dark:text-slate-400 py-2 border-b border-slate-100 dark:border-white/10">Web Development</Link>
            </div>
            
            <div className="flex flex-col space-y-2 pt-2">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{t('nav.navigation')}</span>
              <Link href="/" className="font-semibold text-slate-700 dark:text-slate-400 py-2 border-b border-slate-100 dark:border-white/10">{t('nav.home')}</Link>
              <Link href="/dashboard/ai-tutor" className="font-semibold text-slate-700 dark:text-slate-400 py-2 border-b border-slate-100 dark:border-white/10 flex items-center gap-2"><Bot className="w-4 h-4 text-[#F9B03C]"/> {t('nav.tsehayAI')}</Link>
              <Link href="/affiliate" className="font-semibold text-slate-700 dark:text-slate-400 py-2 border-b border-slate-100 dark:border-white/10">{t('nav.affiliate')}</Link>
              <Link href="/about" className="font-semibold text-slate-700 dark:text-slate-400 py-2 border-b border-slate-100 dark:border-white/10">{t('nav.aboutUs')}</Link>
              <Link href="#testimonials" className="font-semibold text-slate-700 dark:text-slate-400 py-2 border-b border-slate-100 dark:border-white/10">{t('nav.testimonials')}</Link>
              <Link href="/mentorship" className="font-semibold text-slate-700 dark:text-slate-400 py-2 border-b border-slate-100 dark:border-white/10">{t('nav.mentorship')}</Link>
            </div>

            <div className="flex flex-col gap-3 pt-6">
              <Link href="/login" className="w-full text-center font-bold text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 py-3 rounded-lg">{t('nav.login')}</Link>
              <Link href="/signup" className="w-full text-center bg-[#F9B03C] text-black py-3 rounded-lg font-bold">{t('nav.joinNow')}</Link>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden bg-transparent text-slate-900 dark:text-white">
          {/* Glowing Aurora Blobs */}
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#3268BA]/20 dark:bg-[#3268BA]/40 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#F9B03C]/10 dark:bg-[#F9B03C]/20 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-white dark:bg-[#111111]/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-bold px-4 py-1.5 rounded-full text-sm mb-6 backdrop-blur-md">
                <span className="text-[#F9B03C]">★</span> {t('hero.badge').replace('★ ', '')}
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
                {t('hero.title1')}<br />
                <span className="text-[#F9B03C]">{t('hero.title2')}</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard/courses" className="px-8 py-4 bg-gradient-to-r from-[#3268BA] to-[#1e4a8f] dark:from-[#3268BA] dark:to-[#6366f1] text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl shadow-[#3268BA]/30 flex items-center justify-center gap-2 text-lg">
                  {t('hero.exploreCourses')} <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/about" className="px-8 py-4 bg-white/60 dark:bg-white/5 backdrop-blur-md text-slate-900 dark:text-white border border-slate-200/50 dark:border-white/10 font-bold rounded-2xl hover:bg-white dark:hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-sm">
                  <PlayCircle className="w-5 h-5 text-[#3268BA] dark:text-white" /> {t('hero.watchDemo')}
                </Link>
              </div>
              
              <div className="pt-8 flex items-center gap-8 border-t border-slate-200 dark:border-white/10 mt-8">
                <div>
                  <h4 className="text-3xl font-black text-slate-900 dark:text-white">{t('hero.stats.students')}</h4>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">{t('hero.stats.studentsLabel')}</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-slate-900 dark:text-white">{t('hero.stats.courses')}</h4>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">{t('hero.stats.coursesLabel')}</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-slate-900 dark:text-white">{t('hero.stats.success')}</h4>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">{t('hero.stats.successLabel')}</p>
                </div>
              </div>
            </div>
            
            <div className="relative z-10 lg:ml-auto w-full max-w-lg aspect-[4/5] sm:aspect-square">
               {/* Main image container */}
               <div className="w-full h-full bg-gradient-to-tr from-[#3268BA]/20 to-[#F9B03C]/20 dark:from-[#3268BA]/30 dark:to-[#F9B03C]/30 rounded-[2.5rem] relative p-2 shadow-2xl border border-white/50 dark:border-white/10 backdrop-blur-3xl overflow-hidden group">
                 <div className="w-full h-full rounded-[2rem] bg-white/50 dark:bg-[#111111]/80 backdrop-blur-md overflow-hidden relative border border-white/40 dark:border-white/5 group-hover:scale-[1.02] transition-transform duration-500">
                   {/* Student Image Placeholder */}
                   <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop" alt="Student Learning" className="w-full h-full object-cover mix-blend-overlay dark:mix-blend-normal opacity-90 dark:opacity-80" />
                   
                   {/* Gradient Overlay for dark mode to match reference */}
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent dark:from-[#0a0a0a]/90 dark:to-transparent"></div>
                 </div>

                 {/* Floating Card 1: Instructor */}
                 <div className="absolute bottom-12 left-[-10px] sm:left-[-30px] bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/50 dark:border-white/10 flex items-center gap-4 animate-bounce" style={{animationDuration: '4s'}}>
                   <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop" alt="Instructor" className="w-12 h-12 rounded-full border-2 border-[#F9B03C] object-cover" />
                   <div>
                     <p className="text-sm font-black text-slate-900 dark:text-white">Fariya Islam</p>
                     <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-1">Python Instructor</p>
                     <div className="flex gap-1">
                       <Star className="w-3 h-3 text-[#F9B03C] fill-[#F9B03C]" />
                       <Star className="w-3 h-3 text-[#F9B03C] fill-[#F9B03C]" />
                       <Star className="w-3 h-3 text-[#F9B03C] fill-[#F9B03C]" />
                       <Star className="w-3 h-3 text-[#F9B03C] fill-[#F9B03C]" />
                       <Star className="w-3 h-3 text-[#F9B03C] fill-[#F9B03C]" />
                     </div>
                   </div>
                 </div>

                 {/* Floating Element 2: Path */}
                 <div className="absolute top-24 right-[-10px] sm:right-[-20px] bg-white/70 dark:bg-white/10 backdrop-blur-xl px-5 py-3 rounded-xl shadow-xl border border-white/50 dark:border-white/20 flex items-center gap-3 transform rotate-3 hover:rotate-0 transition-transform cursor-default">
                   <div className="w-8 h-8 rounded-full bg-[#3268BA]/10 dark:bg-[#F9B03C]/20 flex items-center justify-center">
                     <CheckCircle2 className="w-5 h-5 text-[#3268BA] dark:text-[#F9B03C]" />
                   </div>
                   <span className="text-sm font-bold text-slate-800 dark:text-white">Personalized Learning Paths</span>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-12 bg-white dark:bg-transparent border-b border-slate-100 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center border border-[#F9B03C] text-[#F9B03C] rounded-full px-6 py-2 bg-[#F9B03C]/10 text-xs font-bold uppercase tracking-widest mb-10">
              {t('trust.title')}
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {/* Google */}
              <div className="flex items-center gap-2 text-2xl font-black text-slate-800 dark:text-white">
                <svg viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </div>

              {/* Meta */}
              <div className="flex items-center gap-2 text-2xl font-black text-slate-800 dark:text-white">
                <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.5 0C18.5 0 16 3 16 3C16 3 13.5 0 9.5 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 9.5 20C13.5 20 16 17 16 17C16 17 18.5 20 22.5 20C27.5 20 32 15.5 32 10C32 4.5 27.5 0 22.5 0ZM9.5 15C6.5 15 4 12.5 4 10C4 7.5 6.5 5 9.5 5C12.5 5 14 7 14 7L18 13C18 13 19.5 15 22.5 15C25.5 15 28 12.5 28 10C28 7.5 25.5 5 22.5 5C19.5 5 18 7 18 7L14 13C14 13 12.5 15 9.5 15Z" fill="#0668E1"/>
                </svg>
                Meta
              </div>

              {/* SHEIN */}
              <div className="bg-white text-black px-4 py-1.5 font-black text-xl tracking-widest rounded">
                SHEIN
              </div>

              {/* TikTok */}
              <div className="flex items-center gap-2 text-2xl font-black text-slate-800 dark:text-white">
                <svg viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.64-5.46-.23-2.52.88-5.07 2.87-6.52 1.99-1.45 4.75-1.74 6.94-.7v4.18c-1.5-.78-3.32-.47-4.48.71-1.07 1.09-1.34 2.8-.62 4.15.52.98 1.58 1.63 2.69 1.66 1.45.03 2.86-.96 3.26-2.35.15-.52.2-1.07.2-1.61V.02z" />
                </svg>
                TikTok
              </div>

              {/* BYBIT */}
              <div className="flex items-center text-2xl font-black text-slate-800 dark:text-white tracking-wide">
                BYB<span className="text-[#F9B03C]">I</span>T
              </div>
            </div>
          </div>
        </section>

        {/* The Tsehay AI Advantage Section */}
        <section className="py-24 bg-slate-50 dark:bg-transparent border-y border-slate-100 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">{t('features.title1')} <span className="text-[#3268BA] dark:text-[#F9B03C]">{t('features.title2')}</span></h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                {t('features.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white dark:bg-[#111111] p-8 rounded-3xl border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 hover:shadow-2xl hover:border-[#3268BA]/30 dark:hover:border-[#F9B03C]/30 transition-all duration-300 group">
                <div className="w-14 h-14 bg-blue-50 dark:bg-[#0a0a0a] text-[#3268BA] dark:text-[#F9B03C] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#3268BA] dark:group-hover:bg-[#F9B03C] group-hover:text-white dark:group-hover:text-black transition border dark:border-white/10">
                  <Globe className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('features.f1_title')}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t('features.f1_desc')}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white dark:bg-[#111111] p-8 rounded-3xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/5 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 bg-amber-50 dark:bg-[#0a0a0a] rounded-2xl flex items-center justify-center mb-6 border dark:border-white/10">
                  <Award className="w-7 h-7 text-[#F9B03C]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('features.f2_title')}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t('features.f2_desc')}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white dark:bg-[#111111] p-8 rounded-3xl border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 hover:shadow-2xl hover:border-[#F9B03C]/30 transition-all duration-300 group">
                <div className="w-14 h-14 bg-orange-50 dark:bg-[#0a0a0a] text-[#F9B03C] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#F9B03C] group-hover:text-white dark:group-hover:text-black transition border dark:border-white/10">
                  <Bot className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('features.f3_title')}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t('features.f3_desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Us & Team Section */}
        <section className="py-24 bg-slate-50 dark:bg-transparent border-y border-slate-100 dark:border-white/10" id="about">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">{t('about.title1')} <span className="text-[#F9B03C]">{t('about.title2')}</span></h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {t('about.p1')}
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  {t('about.p2')}
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-12">
                  <div className="bg-white dark:bg-[#0f172a] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <h4 className="text-3xl font-black text-[#3268BA] mb-1">{t('about.stat1')}</h4>
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('about.stat1_label')}</p>
                  </div>
                  <div className="bg-white dark:bg-[#0f172a] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <h4 className="text-3xl font-black text-green-600 mb-1">{t('about.stat2')}</h4>
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('about.stat2_label')}</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-[#F9B03C] rounded-full blur-3xl opacity-20 dark:opacity-5 translate-x-4 translate-y-4 pointer-events-none"></div>
                <div className="bg-white dark:bg-[#111111] p-8 rounded-3xl shadow-xl relative border border-slate-100 dark:border-white/5">
                  <div className="aspect-[4/3] bg-slate-200 dark:bg-[#0a0a0a] rounded-2xl mb-6 overflow-hidden relative border dark:border-white/10">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-600 dark:text-slate-400">
                      [Team Image Placeholder]
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Ephrem M.</h4>
                    <p className="text-[#3268BA] dark:text-[#F9B03C] font-semibold text-sm mb-4">Founder & Lead Instructor</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">"Our mission is to bridge the digital skills gap in Ethiopia and empower the next generation of tech leaders."</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-24 pt-16 border-t border-slate-200 dark:border-white/10">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-12 text-center">{t('about.meetTeam')}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Eyob Sahle */}
                <div className="bg-white dark:bg-[#111111] p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-white/5 text-center">
                  <div className="w-24 h-24 mx-auto bg-slate-200 dark:bg-[#0a0a0a] border dark:border-white/10 rounded-full mb-4 overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=Eyob+Sahle&background=111111&color=fff" alt="Eyob Sahle" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">Eyob Sahle</h4>
                  <p className="text-sm text-[#3268BA] dark:text-[#F9B03C] font-bold">{t('about.role1')}</p>
                </div>
                
                {/* Habtamu Alemu */}
                <div className="bg-white dark:bg-[#111111] p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-white/5 text-center">
                  <div className="w-24 h-24 mx-auto bg-slate-200 dark:bg-[#0a0a0a] border dark:border-white/10 rounded-full mb-4 overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=Habtamu+Alemu&background=F9B03C&color=000" alt="Habtamu Alemu" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">Habtamu Alemu</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">{t('about.role2')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Catalog Preview */}
        <section className="py-24 bg-white dark:bg-transparent">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">{t('courses.title1')} <span className="text-[#F9B03C]">{t('courses.title2')}</span></h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">{t('courses.subtitle')}</p>
              </div>
              <Link href="/dashboard/courses" className="hidden md:flex items-center gap-2 font-bold text-[#3268BA] hover:text-[#2a579c] transition">
                {t('courses.viewAll')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loadingCourses ? (
                <div className="col-span-full flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-[#F9B03C]" />
                </div>
              ) : publishedCourses.length === 0 ? (
                <div className="col-span-full text-center py-12 text-slate-500 dark:text-slate-400 font-medium">
                  Courses coming soon...
                </div>
              ) : (
                publishedCourses.map((course) => (
                  <div key={course.id} className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 hover:shadow-[#F9B03C]/5 transition-all duration-300 group flex flex-col">
                    <div className="aspect-video bg-slate-100 dark:bg-[#0a0a0a] relative overflow-hidden border-b dark:border-white/5">
                      {course.imageUrl ? (
                        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#3268BA]/20 to-[#F9B03C]/20 flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-[#3268BA]/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition"></div>
                      <div className="absolute top-4 left-4 bg-white dark:bg-[#111111]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1 shadow-sm">
                        <Star className="w-3 h-3 text-[#F9B03C] fill-[#F9B03C]" /> 4.9
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#3268BA] dark:text-[#F9B03C] mb-3 uppercase tracking-wider">
                        {course.category}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">{course.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-3 flex-1">{course.description}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                        <div className="font-black text-xl text-slate-900 dark:text-white">
                          {Number(course.price) === 0 ? 'Free' : `${course.price.toLocaleString()} ETB`}
                        </div>
                        <Link href={`/dashboard/courses/${course.id}`} className="font-bold text-[#3268BA] hover:text-[#234b8a] dark:text-[#F9B03C] dark:hover:text-[#e6a236] text-sm">
                          {t('courses.enroll')}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* AI Interactive Demo */}
        <section className="py-24 bg-slate-950 text-white relative overflow-hidden" id="ai-demo">
          <div className="absolute inset-0 bg-blue-900/20"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-black mb-6">{t('ai.title1')} <span className="text-[#3268BA]">{t('ai.title2')}</span></h2>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                {t('ai.desc')}
              </p>
              <Link href="/dashboard/ai-tutor" className="inline-block bg-[#3268BA] text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-[#2a579c] transition shadow-lg shadow-[#3268BA]/50">
                {t('ai.tryDemo')}
              </Link>
            </div>
            
            {/* Mock Chat UI */}
            <div className="flex-1 w-full max-w-lg bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-2xl">
              <div className="flex items-center gap-4 border-b border-slate-800 pb-4 mb-6">
                <div className="w-10 h-10 bg-[#3268BA] rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold">{t('ai.botName')}</h4>
                  <p className="text-xs text-green-400">{t('ai.online')}</p>
                </div>
              </div>
              <div className="space-y-4 mb-6 h-64 overflow-y-auto">
                <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-sm max-w-[85%] border-l-2 border-[#3268BA] text-sm text-slate-200">
                  {t('ai.chatMsg')}
                </div>
              </div>
              <div className="flex gap-2">
                <input type="text" placeholder={t('ai.placeholder')} className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3268BA] text-white" />
                <button className="bg-[#3268BA] w-12 h-12 rounded-xl flex items-center justify-center hover:bg-[#2a579c] transition">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white dark:bg-transparent" id="faq">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">{t('faq.title1')} <span className="text-[#F9B03C]">{t('faq.title2')}</span></h2>
            </div>
            <div className="space-y-4">
              {[
                { q: t('faq.q1'), a: t('faq.a1') },
                { q: t('faq.q2'), a: t('faq.a2') },
                { q: t('faq.q3'), a: t('faq.a3') }
              ].map((faq, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-[#111111] border border-slate-100 dark:border-white/5 rounded-2xl p-6">
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{faq.q}</h4>
                  <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="py-24 bg-white dark:bg-transparent">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-black text-center py-20 px-8 rounded-[3rem] shadow-2xl relative overflow-hidden border border-slate-800">
              {/* Subtle top right glow */}
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#F9B03C]/20 blur-[100px] rounded-full pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                {/* Rocket Icon */}
                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-8 border border-slate-800 shadow-inner">
                  <Rocket className="w-8 h-8 text-[#F9B03C]" />
                </div>
                
                {/* Heading */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight text-white whitespace-pre-line">
                  {t('cta.title1')}
                  <span className="text-[#F9B03C]">{t('cta.title2')}</span>
                </h2>
                
                {/* Description */}
                <p className="text-lg text-slate-300 mb-10 max-w-2xl leading-relaxed">
                  {t('cta.desc')}
                </p>
                
                {/* Button */}
                <Link href="/signup" className="inline-flex items-center justify-center gap-2 bg-[#F9B03C] text-black font-black text-lg px-8 py-4 rounded-xl hover:bg-[#e6a236] transition shadow-lg shadow-[#F9B03C]/20 hover:-translate-y-1">
                  {t('cta.btn')} <ArrowRight className="w-5 h-5" />
                </Link>
                
                {/* Disclaimer */}
                <p className="mt-6 text-sm text-slate-400 font-bold flex items-center justify-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-500" /> {t('cta.secure')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-white dark:bg-transparent border-t border-slate-100 dark:border-white/10" id="testimonials">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <h2 className="text-4xl font-black mb-16 text-center text-slate-900 dark:text-white">{t('testimonials.title1')} <span className="text-[#F9B03C]">{t('testimonials.title2')}</span>{t('testimonials.title3')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-[#111111] p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-white/5">
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-5 h-5 text-[#F9B03C] fill-[#F9B03C]" />
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-8 font-medium text-lg italic">
                    "{t('testimonials.quote')}"
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-white/5">
                    <div className="w-12 h-12 bg-slate-200 dark:bg-transparent rounded-full overflow-hidden border dark:border-white/10"></div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Abebe K.</h4>
                      <p className="text-sm text-[#F9B03C]">{t('testimonials.role')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Enterprise Footer */}
      <footer className="bg-[#0a0a0a] text-slate-400 py-16 border-t-4 border-[#F9B03C]">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src="/Campus Logo.jpg" alt="Tsehay Campus Logo" className="h-12 w-auto rounded-xl object-cover" />
                <span className="font-black text-3xl tracking-tight text-white">Tsehay<span className="text-[#F9B03C]">Campus</span></span>
              </div>
              <p className="text-sm leading-relaxed mb-8 max-w-sm text-slate-300 font-medium">
                {t('footer.desc')}
              </p>
              
              <div className="flex gap-4">
                <Link href="https://t.me/tsehaycampus" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white dark:bg-[#111111]/10 rounded-full flex items-center justify-center hover:bg-[#F9B03C] hover:text-black transition cursor-pointer text-white">
                  <Send className="w-4 h-4" />
                </Link>
                <Link href="https://tiktok.com/@tsehaycampus" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white dark:bg-[#111111]/10 rounded-full flex items-center justify-center hover:bg-[#F9B03C] hover:text-black transition cursor-pointer text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                </Link>
                <Link href="https://facebook.com/tsehaydigital" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white dark:bg-[#111111]/10 rounded-full flex items-center justify-center hover:bg-[#F9B03C] hover:text-black transition cursor-pointer text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <h4 className="font-bold text-white mb-6 text-sm border-b-2 border-[#F9B03C] inline-block pb-1">{t('footer.col1')}</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/about" className="hover:text-white transition">{t('footer.links.about')}</Link></li>
                <li><Link href="/business" className="hover:text-white transition">{t('footer.links.business')}</Link></li>
                <li><Link href="/dashboard/ai-tutor" className="hover:text-white transition">{t('footer.links.ai')}</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">{t('footer.links.contact')}</Link></li>
              </ul>
            </div>
            
            <div className="lg:col-span-1">
              <h4 className="font-bold text-white mb-6 text-sm border-b-2 border-[#F9B03C] inline-block pb-1">{t('footer.col2')}</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/verify" className="hover:text-white transition">{t('footer.links.verify')}</Link></li>
                <li><Link href="/blog" className="hover:text-white transition">{t('footer.links.blog')}</Link></li>
                <li><Link href="/support" className="hover:text-white transition">{t('footer.links.support')}</Link></li>
                <li><Link href="/instructors" className="hover:text-white transition">{t('footer.links.instructors')}</Link></li>
              </ul>
            </div>
            
            <div className="lg:col-span-1">
              <h4 className="font-bold text-white mb-6 text-sm border-b-2 border-[#F9B03C] inline-block pb-1">{t('footer.col3')}</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/terms" className="hover:text-white transition">{t('footer.links.terms')}</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition">{t('footer.links.privacy')}</Link></li>
                <li><Link href="/refund" className="hover:text-white transition">{t('footer.links.refund')}</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition">{t('footer.links.cookies')}</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col items-start gap-4 text-xs font-bold text-slate-500 dark:text-slate-400">
            <p className="text-slate-400">{t('footer.copyright')}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="uppercase tracking-widest text-[10px]">Powered By</span>
              <div className="flex items-center gap-1.5 bg-white dark:bg-[#111111]/5 px-3 py-1.5 rounded">
                <img src="/TD Logo.jpg" alt="Tsehay Digital Logo" className="h-8 w-auto rounded object-cover" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Contact Buttons (Crucial for Local Market) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <Link href="https://t.me/tsehaycampus" target="_blank" className="bg-[#F9B03C] text-black p-4 rounded-full shadow-lg shadow-[#F9B03C]/20 hover:scale-110 hover:bg-[#e6a236] transition-all flex items-center justify-center group relative">
          <Send className="w-6 h-6" />
          <span className="absolute right-full mr-4 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
            Chat on Telegram
          </span>
        </Link>
        <Link href="/signup" className="bg-[#F9B03C] text-black p-4 rounded-full shadow-lg shadow-[#F9B03C]/20 hover:scale-110 hover:bg-[#e6a236] transition-all flex items-center justify-center group relative">
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-full mr-4 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
            WhatsApp Support
          </span>
        </Link>
      </div>
    </div>
  );
}
