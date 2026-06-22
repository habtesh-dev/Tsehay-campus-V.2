import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="max-w-[1200px] mx-auto p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-[#F9B03C]/10 rounded-2xl flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-[#F9B03C]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Messages</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Communicate with instructors and peers</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-100 dark:divide-white/5">
          {[
            { id: 1, name: "Dr. Samuel Tesfaye", role: "Instructor", time: "10:30 AM", preview: "Your final project looks great! Just a few minor adjustments needed on the database schema.", unread: true },
            { id: 2, name: "Helen Assefa", role: "Peer Student", time: "Yesterday", preview: "Hey, are we still meeting for the study group later today? Let me know!", unread: true },
            { id: 3, name: "Tsehay Admin", role: "Support", time: "Monday", preview: "Congratulations on completing your first course! Your certificate is now ready to download.", unread: true },
            { id: 4, name: "Abebe Kebede", role: "Peer Student", time: "Last Week", preview: "Could you share the notes for the React hooks lecture? I missed that part.", unread: true },
            { id: 5, name: "Instructor Sara", role: "Instructor", time: "May 12", preview: "Welcome to Advanced UI/UX Design! Please check the syllabus for our first assignment.", unread: true },
          ].map((msg) => (
            <div key={msg.id} className="p-6 hover:bg-slate-50 dark:hover:bg-white/5 transition cursor-pointer flex gap-4 items-start relative">
              {msg.unread && <div className="w-2.5 h-2.5 bg-red-500 rounded-full absolute top-8 left-3"></div>}
              <div className="w-12 h-12 rounded-full bg-[#3268BA] flex items-center justify-center text-white font-bold shrink-0 ml-2 text-lg">
                {msg.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-bold truncate ${msg.unread ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
                    {msg.name} <span className="text-xs font-normal text-slate-500 bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded-full ml-2">{msg.role}</span>
                  </h3>
                  <span className="text-xs text-slate-500 shrink-0">{msg.time}</span>
                </div>
                <p className={`text-sm truncate ${msg.unread ? "text-slate-800 dark:text-slate-200 font-medium" : "text-slate-500"}`}>
                  {msg.preview}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
