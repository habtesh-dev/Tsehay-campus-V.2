"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Users, BookOpen, DollarSign, Activity } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Admin Overview</h1>
        <p className="text-slate-500 dark:text-slate-400">Welcome to the Tsehay Campus control center.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-[#F9B03C]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">ETB 45,231</div>
            <p className="text-xs text-green-500 font-bold">+20% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Active Students</CardTitle>
            <Users className="w-4 h-4 text-[#3268BA]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">+2,350</div>
            <p className="text-xs text-slate-500 font-bold">180 joined this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Active Courses</CardTitle>
            <BookOpen className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">12</div>
            <p className="text-xs text-slate-500 font-bold">2 courses in draft</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">System Status</CardTitle>
            <Activity className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-green-500">Healthy</div>
            <p className="text-xs text-slate-500 font-bold">All services running</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-white/10 rounded-full flex items-center justify-center font-bold text-slate-500">S</div>
                    <div>
                      <p className="font-bold text-sm text-slate-900 dark:text-white">Student {i}</p>
                      <p className="text-xs text-slate-500">student{i}@example.com</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-[#3268BA]">Digital Marketing</p>
                    <p className="text-xs text-slate-500">2 mins ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <button className="w-full text-left p-4 rounded-xl border border-slate-200 dark:border-white/10 hover:border-[#3268BA] dark:hover:border-[#3268BA] transition flex items-center justify-between group">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Create New Course</p>
                <p className="text-xs text-slate-500">Upload videos, PDF and set price</p>
              </div>
              <BookOpen className="w-5 h-5 text-slate-400 group-hover:text-[#3268BA]" />
            </button>
            <button className="w-full text-left p-4 rounded-xl border border-slate-200 dark:border-white/10 hover:border-[#F9B03C] dark:hover:border-[#F9B03C] transition flex items-center justify-between group">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Manage Users</p>
                <p className="text-xs text-slate-500">View progress and reset passwords</p>
              </div>
              <Users className="w-5 h-5 text-slate-400 group-hover:text-[#F9B03C]" />
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
