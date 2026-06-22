import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-[1200px] mx-auto p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-slate-200 dark:bg-white/10 rounded-2xl flex items-center justify-center">
          <Settings className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage your account preferences</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-sm">
        <div className="max-w-2xl">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Profile Settings</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
              <input type="text" defaultValue="Habtamu Alemu" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white focus:outline-none focus:border-[#F9B03C] focus:ring-1 focus:ring-[#F9B03C]" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
              <input type="email" defaultValue="user@example.com" disabled className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-500 cursor-not-allowed" />
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-white/10">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Notifications</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-[#F9B03C] focus:ring-[#F9B03C]" />
                  <span className="text-slate-700 dark:text-slate-300">Email notifications for new lessons</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-[#F9B03C] focus:ring-[#F9B03C]" />
                  <span className="text-slate-700 dark:text-slate-300">Weekly progress reports</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-[#F9B03C] focus:ring-[#F9B03C]" />
                  <span className="text-slate-700 dark:text-slate-300">New message alerts</span>
                </label>
              </div>
            </div>

            <div className="pt-6">
              <button className="bg-[#F9B03C] hover:bg-[#e6a236] text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-sm">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
