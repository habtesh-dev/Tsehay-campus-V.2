"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { courseService, Course } from "@/lib/courseService";

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      alert("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      setDeletingId(id);
      await courseService.deleteCourse(id);
      setCourses(courses.filter(course => course.id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Manage Courses</h1>
          <p className="text-slate-500 dark:text-slate-400">Add, edit, and organize your educational content.</p>
        </div>
        <Link href="/admin/courses/new">
          <Button className="gap-2 shrink-0 bg-[#F9B03C] hover:bg-[#e6a236] text-slate-900 font-bold border-none">
            <Plus className="w-4 h-4" /> Create Course
          </Button>
        </Link>
      </div>

      <Card className="bg-white dark:bg-[#111111] border-slate-200 dark:border-white/10">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-slate-900 dark:text-white">Course Catalog</CardTitle>
            <div className="w-full sm:w-64">
              <Input placeholder="Search courses..." className="bg-slate-50 dark:bg-[#1a1a1a] border-slate-200 dark:border-white/10 text-slate-900 dark:text-white" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#F9B03C]" />
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <p>No courses found. Create your first course!</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-sm">
                    <th className="pb-3 font-semibold px-4">Course Name</th>
                    <th className="pb-3 font-semibold px-4">Price (ETB)</th>
                    <th className="pb-3 font-semibold px-4">Category</th>
                    <th className="pb-3 font-semibold px-4">Status</th>
                    <th className="pb-3 font-semibold px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition">
                      <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-3">
                          {course.imageUrl && (
                            <img src={course.imageUrl} alt={course.title} className="w-10 h-10 rounded-md object-cover" />
                          )}
                          <span>{course.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-300">
                        {Number(course.price) === 0 ? 'Free' : course.price.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-300">
                        <span className="px-2 py-1 rounded-md text-xs font-semibold bg-blue-50 text-[#3268BA] dark:bg-[#3268BA]/20 dark:text-blue-300">
                          {course.category}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                          course.status === 'Published' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' 
                            : 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300'
                        }`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/courses/edit/${course.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                            onClick={() => course.id && handleDelete(course.id)}
                            disabled={deletingId === course.id}
                          >
                            {deletingId === course.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
