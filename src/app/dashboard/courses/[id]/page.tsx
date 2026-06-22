"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { PlayCircle, CheckCircle, Lock, MessageSquare, StickyNote, FileText, Download, ChevronLeft, Loader2, Play } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { courseService, Course, Module, Lesson } from "@/lib/courseService";

export default function CoursePlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: courseId } = use(params);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<(Module & { lessons: (Lesson & { completed: boolean, active: boolean, locked: boolean })[] })[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  // Helper to extract YouTube ID
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    } else if (url.includes("youtube.com/embed/")) {
      return url; // Already an embed URL
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1` : null;
  };

  useEffect(() => {
    async function loadCourseAndProgress() {
      if (!user) return;
      
      try {
        // 1. Load Course Data
        const courseData = await courseService.getCourseById(courseId);
        if (!courseData) {
          setLoading(false);
          return;
        }
        setCourse(courseData);

        // 2. Load User Progress
        const progressRef = doc(db, "users", user.uid, "progress", courseId);
        const progressSnap = await getDoc(progressRef);
        
        let completedLessonIds: string[] = [];
        if (progressSnap.exists()) {
          setIsEnrolled(true);
          completedLessonIds = progressSnap.data().completedLessons || [];
        } else {
          // Check if it's free, auto-enroll for now for testing
          // In real app, they still might need to click "Enroll for Free"
          if (courseData.price === 0) {
            setIsEnrolled(true);
            await setDoc(progressRef, { courseId, completedLessons: [], lastUpdated: new Date() });
          } else {
            setIsEnrolled(false);
          }
        }

        // 3. Map Curriculum state
        if (courseData.modules && courseData.modules.length > 0) {
          let nextLessonToUnlock = true;
          
          const mappedModules = courseData.modules.map(mod => ({
            ...mod,
            lessons: mod.lessons.map(lesson => {
              const isCompleted = completedLessonIds.includes(lesson.id);
              
              let isActive = false;
              let isLocked = true;
              
              if (isCompleted) {
                isLocked = false;
                nextLessonToUnlock = true;
              } else if (nextLessonToUnlock) {
                isActive = true;
                isLocked = false;
                nextLessonToUnlock = false;
              }

              return {
                ...lesson,
                completed: isCompleted,
                active: isActive,
                locked: isLocked
              };
            })
          }));
          setModules(mappedModules);
        } else {
          setModules([]); // No modules yet
        }

      } catch (error) {
        console.error("Failed to load course/progress:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCourseAndProgress();
  }, [user, courseId]);

  // Find active lesson
  const currentModuleIndex = modules.findIndex(m => m.lessons.some(l => l.active));
  const currentLessonIndex = currentModuleIndex !== -1 ? modules[currentModuleIndex].lessons.findIndex(l => l.active) : -1;
  const currentLesson = currentModuleIndex !== -1 ? modules[currentModuleIndex].lessons[currentLessonIndex] : null;

  const handleCompleteAndContinue = async () => {
    if (!user || !currentLesson || saving) return;

    setSaving(true);
    try {
      const progressRef = doc(db, "users", user.uid, "progress", courseId);
      const progressSnap = await getDoc(progressRef);
      
      let completedLessons = [];
      if (progressSnap.exists()) {
        completedLessons = progressSnap.data().completedLessons || [];
      }
      
      if (!completedLessons.includes(currentLesson.id)) {
        completedLessons.push(currentLesson.id);
      }

      await setDoc(progressRef, {
        courseId: courseId,
        completedLessons: completedLessons,
        lastUpdated: new Date()
      }, { merge: true });

      // Advance State
      setModules(prevModules => {
        let foundCurrent = false;
        let activatedNext = false;

        return prevModules.map(mod => ({
          ...mod,
          lessons: mod.lessons.map(lesson => {
            if (lesson.id === currentLesson.id) {
              foundCurrent = true;
              return { ...lesson, completed: true, active: false };
            }
            if (foundCurrent && !activatedNext) {
              activatedNext = true;
              return { ...lesson, active: true, locked: false };
            }
            return lesson;
          })
        }));
      });

    } catch (error) {
      console.error("Failed to save progress:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCheckout = async () => {
    if (!user || !course) return;
    setCheckingOut(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          courseName: course.title,
          price: course.price,
          userId: user.uid,
          userEmail: user.email
        })
      });
      const data = await res.json();
      if (data.success && data.data.paymentUrl) {
        window.location.href = data.data.paymentUrl;
      } else {
        alert(data.error || 'Failed to initialize checkout');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during checkout.');
    } finally {
      setCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1600px] mx-auto h-[calc(100vh-8rem)] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#F9B03C] animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-[1600px] mx-auto h-[calc(100vh-8rem)] flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Course Not Found</h1>
        <Link href="/dashboard" className="text-[#F9B03C] hover:underline">Back to Dashboard</Link>
      </div>
    );
  }

  if (!isEnrolled) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-6 text-center">
        <div className="bg-white dark:bg-[#111111] p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-white/10">
          <div className="w-20 h-20 bg-[#F9B03C]/20 text-[#F9B03C] rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Unlock This Course</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            You are about to enroll in <strong>{course.title}</strong>. Get lifetime access to all modules, the AI Tutor, and earn your verified certificate.
          </p>
          <div className="text-3xl font-black text-[#F9B03C] mb-8">{course.price > 0 ? `${course.price.toLocaleString()} ETB` : "Free"}</div>
          <button 
            onClick={handleCheckout}
            disabled={checkingOut}
            className="bg-[#F9B03C] text-black px-8 py-4 rounded-xl font-black text-lg hover:bg-[#d99020] transition shadow-lg flex justify-center items-center gap-2 mx-auto disabled:opacity-50"
          >
            {checkingOut ? <Loader2 className="w-6 h-6 animate-spin" /> : (course.price > 0 ? "Pay with ArifPay" : "Enroll Now")}
          </button>
        </div>
      </div>
    );
  }

  const embedUrl = currentLesson ? getYouTubeEmbedUrl(currentLesson.videoUrl) : null;
  
  // Calculate completion percentage
  let totalLessons = 0;
  let completedCount = 0;
  modules.forEach(m => {
    m.lessons.forEach(l => {
      totalLessons++;
      if (l.completed) completedCount++;
    });
  });
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="max-w-[1600px] mx-auto h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6">
      
      {/* Left Column: Video Player & Tabs */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto pr-2 pb-10 no-scrollbar">
        
        {/* Breadcrumb / Back button */}
        <div className="mb-4">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:text-white transition">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>

        {/* Video Player Area */}
        <div className="w-full aspect-video bg-black rounded-2xl relative overflow-hidden shadow-lg group">
          {embedUrl ? (
            <iframe 
              src={embedUrl} 
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
              <Play className="w-12 h-12 mb-2 opacity-50" />
              <p>No video available for this lesson.</p>
            </div>
          )}
        </div>

        <div className="mt-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
              {currentLesson?.title || course.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              {currentModuleIndex !== -1 ? modules[currentModuleIndex].title : (totalLessons === 0 ? "No curriculum found." : "Course Complete!")}
            </p>
          </div>
          <button 
            onClick={handleCompleteAndContinue}
            disabled={saving || !currentLesson}
            className="bg-[#F9B03C] text-black px-5 py-2.5 rounded-xl font-bold hover:bg-[#d99020] transition shadow-sm text-sm shrink-0 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Complete & Continue
          </button>
        </div>

        {/* Tabs Menu */}
        <div className="flex items-center gap-8 border-b border-slate-200 dark:border-white/10 mb-6">
          {["Overview", "What You Will Learn", "AI Tutor", "Downloads"].map((tab) => {
            const key = tab.toLowerCase().replace(/ /g, '-');
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`pb-4 font-bold text-sm border-b-2 transition-colors ${
                  activeTab === key
                    ? "border-[#F9B03C] text-[#F9B03C]"
                    : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
          {activeTab === "overview" && (
            <div className="space-y-4">
              <p className="whitespace-pre-line">{course.description}</p>
              
              {course.instructorName && (
                <div className="mt-6 p-4 bg-slate-50 dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-white/10">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">Instructor: {course.instructorName}</h3>
                  <p className="text-sm">{course.instructorRole}</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === "what-you-will-learn" && (
            <div className="space-y-6">
              {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 ? (
                <>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Key Takeaways:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {course.whatYouWillLearn.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : <p>No specific objectives listed.</p>}

              {course.requirements && course.requirements.length > 0 && (
                <>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-6">Requirements:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {course.requirements.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {activeTab === "ai-tutor" && (
            <div className="bg-slate-50 dark:bg-transparent p-6 rounded-xl border border-[#F9B03C]/30 text-center">
              <MessageSquare className="w-10 h-10 text-[#F9B03C] mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">Stuck on a concept?</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-4">Chat with the AI Tutor specially trained for this course.</p>
              <button className="bg-[#F9B03C] text-black px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-[#e09e35] transition">Open AI Tutor</button>
            </div>
          )}

          {activeTab === "downloads" && (
            <div className="space-y-3">
              <p>No resources available for download in this module.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Syllabus/Modules */}
      <div className="w-full lg:w-96 flex flex-col bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm shrink-0 h-full max-h-[800px]">
        <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-transparent">
          <h2 className="font-black text-slate-900 dark:text-white mb-1">Course Curriculum</h2>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <div className="flex-1 bg-slate-200 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#F9B03C] h-1.5 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <span>{completedCount} / {totalLessons} Completed</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {modules.map((module, mIdx) => (
            <div key={module.id} className="border-b border-slate-100 dark:border-white/10 last:border-0">
              <div className="p-4 bg-slate-50 dark:bg-[#1a1a1a]">
                <h3 className="font-bold text-sm text-slate-800 dark:text-white">{module.title}</h3>
              </div>
              <div className="flex flex-col">
                {module.lessons.map((lesson) => (
                  <button 
                    key={lesson.id}
                    onClick={() => {
                      if (!lesson.locked) {
                        setModules(prev => prev.map(m => ({
                          ...m,
                          lessons: m.lessons.map(l => ({
                            ...l,
                            active: l.id === lesson.id
                          }))
                        })));
                      }
                    }}
                    disabled={lesson.locked}
                    className={`
                      flex items-start gap-3 p-4 text-left transition-colors border-l-4 w-full
                      ${lesson.active 
                        ? "bg-[#F9B03C]/10 border-[#F9B03C]" 
                        : "border-transparent hover:bg-slate-50 dark:hover:bg-white/5"}
                      ${lesson.locked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    `}
                  >
                    <div className="mt-0.5 shrink-0">
                      {lesson.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : lesson.locked ? (
                        <Lock className="w-4 h-4 text-slate-400" />
                      ) : lesson.active ? (
                        <div className="w-4 h-4 rounded-full border-2 border-[#F9B03C] flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-[#F9B03C] rounded-full"></div>
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600"></div>
                      )}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold mb-1 transition-colors ${lesson.active ? "text-[#F9B03C] dark:text-[#F9B03C]" : "text-slate-700 dark:text-slate-300"}`}>
                        {lesson.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-500">
                        <PlayCircle className="w-3 h-3" /> {lesson.duration}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
