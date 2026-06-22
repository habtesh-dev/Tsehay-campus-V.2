"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  BookOpen, 
  Bot, 
  Award, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  Loader2,
  BarChart2,
  PieChart,
  MessageSquare,
  TrendingUp,
  Flag
} from "lucide-react";
import { FloatingAIIcon } from "@/components/FloatingAIIcon";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Protected Route Logic
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (!user.emailVerified) {
        router.push("/verify-email");
      }
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#F9B03C] animate-spin" />
      </div>
    );
  }

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Lessons", href: "/dashboard/lessons", icon: BookOpen },
    { name: "Leaderboard", href: "/dashboard/leaderboard", icon: Flag },
    { name: "Skill Graph", href: "/dashboard/skills", icon: PieChart },
    { name: "Courses", href: "/dashboard/courses", icon: BookOpen },
    { name: "Tsehay AI", href: "/dashboard/ai-tutor", icon: Bot },
    { name: "Certificates", href: "/dashboard/certificates", icon: Award },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare, badge: "5" },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-transparent flex">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Desktop & Mobile Slide-over) */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#0a0a0a] border-r border-slate-200 dark:border-white/10 transform transition-transform duration-300 ease-in-out flex flex-col
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <img src="/Campus Logo.jpg" alt="Tsehay Campus Logo" className="h-8 w-auto rounded object-cover" />
            <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">Tsehay<span className="text-[#3268BA] dark:text-[#F9B03C]">Campus</span></span>
          </Link>
          <button 
            className="ml-auto lg:hidden text-slate-400 hover:text-white"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <p className="px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
            Navigation
          </p>
          
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all relative
                  ${isActive 
                    ? "bg-[#fff8eb] dark:bg-[#F9B03C]/10 text-[#F9B03C]" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#F9B03C] rounded-r-full"></div>
                )}
                <Icon className={`w-5 h-5 ${isActive ? "text-[#F9B03C]" : "text-slate-400"}`} />
                {item.name}
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/10 shrink-0">
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-all"
          >
            <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white dark:bg-[#111111] border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-6 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-slate-600 hover:text-slate-900 dark:text-white"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="hidden md:flex items-center relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3" />
              <input 
                type="text" 
                placeholder="Search here..." 
                className="pl-10 pr-12 py-2.5 bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-full text-sm focus:ring-2 focus:ring-[#F9B03C] focus:border-transparent transition-all w-80 shadow-sm"
              />
              <div className="absolute right-3 flex items-center gap-1">
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded border border-slate-200 dark:border-white/10">⌘</span>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded border border-slate-200 dark:border-white/10">K</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <Link href="/dashboard/messages" className="relative w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition bg-white dark:bg-[#111111] shadow-sm">
              <MessageSquare className="w-5 h-5" />
            </Link>
            <Link href="/dashboard/messages" className="relative w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition bg-white dark:bg-[#111111] shadow-sm">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>
            
            <Link href="/dashboard/settings" className="w-10 h-10 rounded-full bg-[#F9B03C] flex items-center justify-center text-white font-bold cursor-pointer border-2 border-slate-100 dark:border-white/10 uppercase overflow-hidden ml-2 shadow-sm hover:scale-105 transition transform">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"
              )}
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-transparent">
          {children}
        </main>
      </div>

      <FloatingAIIcon />
    </div>
  );
}
