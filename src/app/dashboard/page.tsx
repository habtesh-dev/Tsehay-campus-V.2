"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  PlayCircle, Clock, BookOpen, Trophy, ArrowRight, Star, Flame, Target,
  Calendar, ChevronLeft, ChevronRight, ChevronDown, MonitorPlay, Code, PenTool, BarChart3, Edit, Loader2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { courseService, Course } from "@/lib/courseService";

export default function DashboardHome() {
  const { user } = useAuth();
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [loadingRecommended, setLoadingRecommended] = useState(true);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const courses = await courseService.getPublishedCourses();
        setRecommendedCourses(courses.slice(0, 2)); // Show top 2
      } catch (error) {
        console.error("Failed to fetch recommended courses", error);
      } finally {
        setLoadingRecommended(false);
      }
    };
    fetchRecommended();
  }, []);
  
  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-8 relative">
      <div className={`grid ${showRightSidebar ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-8`}>
        
        {/* Main Content Area */}
        <div className={`${showRightSidebar ? 'lg:col-span-2' : 'lg:col-span-1'} space-y-10 relative`}>
          {!showRightSidebar && (
            <button 
              onClick={() => setShowRightSidebar(true)}
              className="hidden lg:flex absolute -right-12 top-0 bg-white dark:bg-[#111111] p-2 rounded-full border border-slate-200 dark:border-white/10 shadow-sm text-slate-400 hover:text-[#F9B03C] transition"
              title="Open Details"
            >
              <ChevronLeft className="w-5 h-5 rotate-180" />
            </button>
          )}
          
          {/* Continue Learning Section */}
          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Continue Learning</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Course Card 1 */}
              <div className="bg-white dark:bg-[#111111] rounded-3xl p-6 border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-orange-50 dark:bg-white/5">
                    <PenTool className="w-7 h-7 text-[#F9B03C]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">Advance UI/UX Design</h3>
                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">DESIGN</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="w-full bg-slate-100 dark:bg-white/5 rounded-full h-2.5 mb-2 overflow-hidden">
                    <div className="bg-[#F9B03C] h-2.5 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> 18/40 Lessons</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 2 hours left</span>
                  </div>
                </div>
                
                <Link href="/dashboard/courses/1" className="text-[#F9B03C] font-bold text-sm flex items-center gap-2 hover:text-[#d99020] transition">
                  Resume Course <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Course Card 2 */}
              <div className="bg-white dark:bg-[#111111] rounded-3xl p-6 border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-red-50 dark:bg-white/5">
                    <Code className="w-7 h-7 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">Basic Web Development</h3>
                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">DEVELOPMENT</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="w-full bg-slate-100 dark:bg-white/5 rounded-full h-2.5 mb-2 overflow-hidden">
                    <div className="bg-[#F9B03C] h-2.5 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> 28/40 Lessons</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 1 hour left</span>
                  </div>
                </div>
                
                <Link href="/dashboard/courses/2" className="text-[#F9B03C] font-bold text-sm flex items-center gap-2 hover:text-[#d99020] transition">
                  Resume Course <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </section>

          {/* Recommended Courses Section */}
          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Recommended Courses For You</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              {loadingRecommended ? (
                <div className="col-span-2 flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-[#F9B03C]" />
                </div>
              ) : recommendedCourses.length === 0 ? (
                <div className="col-span-2 text-center py-8 text-slate-500">
                  No recommendations available at the moment.
                </div>
              ) : (
                recommendedCourses.map((course) => (
                  <div key={course.id} className="bg-white dark:bg-[#111111] border border-slate-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group cursor-pointer flex flex-col">
                    <div className="h-48 bg-slate-900 relative overflow-hidden flex items-center justify-center">
                      {course.imageUrl ? (
                        <div className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-70 transition duration-500" style={{ backgroundImage: `url(${course.imageUrl})` }}></div>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#3268BA]/40 to-[#F9B03C]/40 opacity-50 group-hover:opacity-70 transition duration-500"></div>
                      )}
                      <div className="absolute top-4 left-4 bg-[#F9B03C] text-white text-xs font-black px-2 py-1 rounded-md z-10">{course.category}</div>
                      <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                        {Number(course.price) === 0 ? 'Free' : `${course.price.toLocaleString()} ETB`}
                      </div>
                      <PlayCircle className="w-12 h-12 text-white z-20 opacity-90 group-hover:scale-110 transition" />
                      
                      {/* Video Progress Bar Fake */}
                      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/20">
                        <div className="h-full bg-[#F9B03C] w-[35%]"></div>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 leading-snug line-clamp-2">{course.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 flex-1">{course.description}</p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-[#F9B03C] text-[#F9B03C]" />
                          <span className="font-bold text-slate-900 dark:text-white text-sm">4.8</span>
                          <span className="text-slate-400 text-xs">(124)</span>
                        </div>
                        <Link href={`/dashboard/courses/${course.id}`} className="text-[#3268BA] dark:text-[#F9B03C] font-bold text-sm hover:underline">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}

            </div>
          </section>

        </div>

        {/* Right Sidebar Area (Stats & Profile) */}
        {showRightSidebar && (
        <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
          
          {/* Profile Overview Card */}
          <div className="bg-[#fff8eb] dark:bg-[#F9B03C]/10 rounded-3xl p-6 border border-[#F9B03C]/20 shadow-sm relative group">
            <button 
              onClick={() => setShowRightSidebar(false)}
              className="absolute top-4 right-4 text-xs font-bold text-[#F9B03C] flex items-center gap-1 cursor-pointer hover:bg-[#F9B03C]/10 py-1 px-2 rounded-lg transition"
            >
              <ChevronLeft className="w-4 h-4" /> Close Details
            </button>
            <Link href="/dashboard/settings" className="absolute top-4 left-4 text-slate-400 hover:text-[#F9B03C] transition hidden group-hover:block" title="Edit Profile">
              <Edit className="w-4 h-4" />
            </Link>
            
            <div className="flex flex-col items-center text-center mt-6 mb-8">
              <Link href="/dashboard/settings" className="w-20 h-20 rounded-full border-4 border-white dark:border-[#111111] shadow-lg mb-3 overflow-hidden bg-white cursor-pointer hover:scale-105 transition transform">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-black text-[#F9B03C]">
                    {user?.displayName?.charAt(0) || "B"}
                  </div>
                )}
              </Link>
              <Link href="/dashboard/settings" className="font-black text-xl text-slate-900 dark:text-white hover:text-[#F9B03C] transition cursor-pointer">
                {user?.displayName || "Habtamu Alemu"}
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">UI/UX Designer & Developer</p>
              <div className="bg-white dark:bg-[#111111] px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-slate-100 dark:border-white/5">
                <Trophy className="w-4 h-4 text-[#F9B03C]" />
                <span className="font-bold text-sm text-slate-900 dark:text-white">876 <span className="text-slate-400 font-normal">Points</span></span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center divide-x divide-slate-200 dark:divide-white/10">
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="font-black text-xl text-slate-900 dark:text-white">54</span>
                </div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Days Streak</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Target className="w-5 h-5 text-red-400" />
                  <span className="font-black text-xl text-slate-900 dark:text-white">06</span>
                </div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Goals In Month</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Trophy className="w-5 h-5 text-slate-400" />
                  <span className="font-black text-xl text-slate-900 dark:text-white">02</span>
                </div>
                <p className="text-[10px] uppercase font-bold text-slate-400">2nd Place</p>
              </div>
            </div>
          </div>

          {/* Weekly Streak Card */}
          <div className="bg-white dark:bg-[#111111] rounded-3xl p-6 border border-slate-100 dark:border-white/5 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg text-slate-900 dark:text-white">Weekly Streak</h3>
                <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-[10px] font-bold text-slate-400 cursor-help">i</div>
              </div>
              <button className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-white/5 transition">
                <Calendar className="w-3.5 h-3.5" /> May 2024 <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400">4/4 Weeks</span>
              <div className="flex items-center gap-2">
                <button className="w-6 h-6 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-white/5 transition"><ChevronLeft className="w-3 h-3 text-slate-400" /></button>
                <button className="w-6 h-6 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-white/5 transition"><ChevronRight className="w-3 h-3 text-[#F9B03C]" /></button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              {[
                { day: "Mon", date: "29", active: true },
                { day: "Tue", date: "30", active: true },
                { day: "Wed", date: "31", active: true },
                { day: "Thu", date: "1", active: false },
                { day: "Fri", date: "2", active: false },
                { day: "Sat", date: "3", active: false },
                { day: "Sun", date: "4", active: false },
              ].map((item, i) => (
                <div key={i} className={`flex flex-col items-center justify-center w-10 h-16 rounded-xl transition ${item.active ? "bg-gradient-to-b from-[#F9B03C] to-[#d99020] text-white shadow-md shadow-[#F9B03C]/30" : "bg-transparent text-slate-400"}`}>
                  <span className={`text-[10px] font-bold mb-1 ${item.active ? "text-white/90" : ""}`}>{item.day}</span>
                  <span className={`text-lg font-black ${item.active ? "text-white" : "text-slate-700 dark:text-slate-300"}`}>{item.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Courses Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-[#111111] rounded-3xl p-6 border border-slate-100 dark:border-white/5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-white/5 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5 text-[#F9B03C]" />
              </div>
              <h4 className="font-black text-2xl text-slate-900 dark:text-white mb-1">3 Courses</h4>
              <p className="text-xs font-bold text-slate-400">In Progress</p>
            </div>
            <div className="bg-white dark:bg-[#111111] rounded-3xl p-6 border border-slate-100 dark:border-white/5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5 text-slate-400" />
              </div>
              <h4 className="font-black text-2xl text-slate-900 dark:text-white mb-1">17 Courses</h4>
              <p className="text-xs font-bold text-slate-400">Completed</p>
            </div>
          </div>

          {/* Weekly Watch Time */}
          <div className="bg-white dark:bg-[#111111] rounded-3xl p-6 border border-slate-100 dark:border-white/5 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg text-slate-900 dark:text-white">Weekly Watch Time</h3>
                <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-[10px] font-bold text-slate-400 cursor-help">i</div>
              </div>
              <button className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-white/5 transition">
                <Calendar className="w-3.5 h-3.5" /> May 2024 <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between mb-8">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400">4/4 Weeks</span>
              <div className="flex items-center gap-2">
                <button className="w-6 h-6 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-white/5 transition"><ChevronLeft className="w-3 h-3 text-slate-400" /></button>
                <button className="w-6 h-6 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-white/5 transition"><ChevronRight className="w-3 h-3 text-[#F9B03C]" /></button>
              </div>
            </div>

            {/* Fake Chart */}
            <div className="relative h-32 flex items-end justify-between gap-2 px-2">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] font-bold text-slate-400 py-1">
                <span>6hrs</span>
                <span>4hrs</span>
                <span>2hrs</span>
                <span>0hrs</span>
              </div>
              
              <div className="w-full pl-8 flex justify-between items-end h-full relative z-10">
                {[
                  { day: "Mon", height: "40%", color: "bg-slate-200 dark:bg-slate-800" },
                  { day: "Tue", height: "60%", color: "bg-slate-200 dark:bg-slate-800" },
                  { day: "Wed", height: "30%", color: "bg-slate-200 dark:bg-slate-800" },
                  { day: "Thu", height: "80%", color: "bg-[#F9B03C]", label: "4:24m" },
                  { day: "Fri", height: "20%", color: "bg-slate-200 dark:bg-slate-800" },
                  { day: "Sat", height: "10%", color: "bg-slate-200 dark:bg-slate-800" },
                  { day: "Sun", height: "50%", color: "bg-slate-200 dark:bg-slate-800" },
                ].map((bar, i) => (
                  <div key={i} className="flex flex-col items-center group relative w-full px-1">
                    {bar.label && (
                      <div className="absolute -top-8 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md z-20 whitespace-nowrap">
                        {bar.label}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                      </div>
                    )}
                    <div className={`w-full max-w-[24px] rounded-t-md transition-all ${bar.color} hover:bg-[#F9B03C] hover:opacity-80`} style={{ height: bar.height }}></div>
                    <span className="text-[10px] font-bold text-slate-400 mt-2">{bar.day}</span>
                  </div>
                ))}
              </div>
              
              {/* Horizontal Grid Lines */}
              <div className="absolute left-8 right-0 top-0 h-px bg-slate-100 dark:bg-white/5"></div>
              <div className="absolute left-8 right-0 top-1/3 h-px bg-slate-100 dark:bg-white/5"></div>
              <div className="absolute left-8 right-0 top-2/3 h-px bg-slate-100 dark:bg-white/5"></div>
              <div className="absolute left-8 right-0 bottom-6 h-px bg-slate-100 dark:bg-white/5"></div>
            </div>
          </div>

        </div>
        )}

      </div>
    </div>
  );
}
