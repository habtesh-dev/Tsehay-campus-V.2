import { PieChart } from "lucide-react";

export default function SkillsPage() {
  return (
    <div className="max-w-[1200px] mx-auto p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-[#3268BA]/10 rounded-2xl flex items-center justify-center">
          <PieChart className="w-6 h-6 text-[#3268BA]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Skill Graph</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Track your skill development over time</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-3xl p-8 text-center min-h-[400px] flex flex-col items-center justify-center shadow-sm">
        <PieChart className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" />
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">Not enough data to display</h2>
        <p className="text-slate-500 max-w-sm mx-auto">Complete more courses and assessments to generate your personal skill graph.</p>
      </div>
    </div>
  );
}
