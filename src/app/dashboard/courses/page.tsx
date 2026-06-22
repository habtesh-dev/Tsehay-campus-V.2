"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, PlayCircle, Star, Loader2 } from "lucide-react";
import { courseService, Course } from "@/lib/courseService";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await courseService.getPublishedCourses();
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-[#F9B03C]/10 rounded-2xl flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-[#F9B03C]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">All Courses</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Browse our complete course catalog</p>
        </div>
      </div>
      
      {loading ? (
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-3xl p-8 text-center min-h-[400px] flex flex-col items-center justify-center shadow-sm">
          <Loader2 className="w-16 h-16 animate-spin text-[#F9B03C] mb-4" />
          <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">Loading courses...</h2>
          <p className="text-slate-500 max-w-sm mx-auto">We are fetching the latest and greatest courses for you.</p>
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-3xl p-8 text-center min-h-[400px] flex flex-col items-center justify-center shadow-sm">
          <BookOpen className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" />
          <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No courses found</h2>
          <p className="text-slate-500 max-w-sm mx-auto">Check back later for new content.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
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
          ))}
        </div>
      )}
    </div>
  );
}
