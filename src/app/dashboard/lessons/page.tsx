import { BookOpen } from "lucide-react";

export default function LessonsPage() {
  return (
    <div className="max-w-[1200px] mx-auto p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-[#3268BA]/10 rounded-2xl flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-[#3268BA]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Lessons</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">View and manage your active lessons</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-3xl p-8 text-center min-h-[400px] flex flex-col items-center justify-center shadow-sm">
        <BookOpen className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" />
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No active lessons right now</h2>
        <p className="text-slate-500 max-w-sm mx-auto">You haven't started any new lessons today. Browse our course catalog to find something interesting.</p>
      </div>
    </div>
  );
}
