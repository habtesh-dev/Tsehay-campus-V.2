"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { MoreVertical } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: "Abebe Kebede", email: "abebe@example.com", joined: "Oct 12, 2024", role: "Student", active: true },
    { id: 2, name: "Sara Alemu", email: "sara@example.com", joined: "Nov 01, 2024", role: "Student", active: true },
    { id: 3, name: "Habte", email: "habte@gmail.com", joined: "Jan 01, 2024", role: "Admin", active: true },
  ]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Manage Users</h1>
        <p className="text-slate-500 dark:text-slate-400">View and manage registered students and admins.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>User Directory</CardTitle>
            <div className="w-64">
              <Input placeholder="Search users by email or name..." />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500 text-sm">
                  <th className="pb-3 font-semibold px-4">User</th>
                  <th className="pb-3 font-semibold px-4">Role</th>
                  <th className="pb-3 font-semibold px-4">Joined Date</th>
                  <th className="pb-3 font-semibold px-4">Status</th>
                  <th className="pb-3 font-semibold px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                        user.role === 'Admin' 
                          ? 'bg-orange-100 text-[#F9B03C] dark:bg-[#F9B03C]/10' 
                          : 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-300">{user.joined}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${user.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm text-slate-600 dark:text-slate-300">{user.active ? "Active" : "Suspended"}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition rounded-lg hover:bg-slate-100 dark:hover:bg-white/10">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
