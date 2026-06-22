"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { courseService, Module, Lesson } from "@/lib/courseService";
import { ArrowLeft, Loader2, Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import Link from "next/link";

export default function EditCourse({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  // Basic Info
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Technology",
    status: "Draft" as "Draft" | "Published",
    imageUrl: "",
    instructorName: "",
    instructorRole: "",
    aiInstructions: "",
  });

  // Metadata Lists
  const [whatYouWillLearn, setWhatYouWillLearn] = useState<string[]>([""]);
  const [requirements, setRequirements] = useState<string[]>([""]);

  // Curriculum
  const [modules, setModules] = useState<Module[]>([]);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const course = await courseService.getCourseById(id);
        if (course) {
          setFormData({
            title: course.title,
            description: course.description || "",
            price: course.price.toString(),
            category: course.category || "Technology",
            status: course.status || "Draft",
            imageUrl: course.imageUrl || "",
            instructorName: course.instructorName || "",
            instructorRole: course.instructorRole || "",
            aiInstructions: course.aiInstructions || "",
          });
          
          if (course.whatYouWillLearn && course.whatYouWillLearn.length > 0) {
            setWhatYouWillLearn(course.whatYouWillLearn);
          }
          if (course.requirements && course.requirements.length > 0) {
            setRequirements(course.requirements);
          }
          if (course.modules && course.modules.length > 0) {
            setModules(course.modules);
          }
        } else {
          alert("Course not found");
          router.push("/admin/courses");
        }
      } catch (error) {
        console.error("Error fetching course", error);
        alert("Failed to load course");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [id, router]);

  const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleListChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter(prev => {
      const newList = [...prev];
      newList[index] = value;
      return newList;
    });
  };

  const handleAddListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, ""]);
  };

  const handleRemoveListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  // Curriculum Handlers
  const handleAddModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: "New Module",
      lessons: []
    };
    setModules([...modules, newModule]);
    setExpandedModule(newModule.id);
  };

  const handleRemoveModule = (moduleId: string) => {
    setModules(modules.filter(m => m.id !== moduleId));
  };

  const handleModuleTitleChange = (moduleId: string, title: string) => {
    setModules(modules.map(m => m.id === moduleId ? { ...m, title } : m));
  };

  const handleAddLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: "New Lesson",
      duration: "00:00",
      videoUrl: ""
    };
    setModules(modules.map(m => m.id === moduleId ? { ...m, lessons: [...m.lessons, newLesson] } : m));
  };

  const handleRemoveLesson = (moduleId: string, lessonId: string) => {
    setModules(modules.map(m => 
      m.id === moduleId 
        ? { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) } 
        : m
    ));
  };

  const handleLessonChange = (moduleId: string, lessonId: string, field: keyof Lesson, value: string) => {
    setModules(modules.map(m => 
      m.id === moduleId 
        ? { 
            ...m, 
            lessons: m.lessons.map(l => l.id === lessonId ? { ...l, [field]: value } : l) 
          } 
        : m
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const cleanLearn = whatYouWillLearn.filter(item => item.trim() !== "");
      const cleanReq = requirements.filter(item => item.trim() !== "");

      await courseService.updateCourse(id, {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        status: formData.status,
        imageUrl: formData.imageUrl,
        instructorName: formData.instructorName,
        instructorRole: formData.instructorRole,
        aiInstructions: formData.aiInstructions,
        whatYouWillLearn: cleanLearn,
        requirements: cleanReq,
        modules: modules
      });
      router.push("/admin/courses");
    } catch (error) {
      console.error("Failed to update course", error);
      alert("Failed to update course");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#F9B03C]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/courses">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Edit Course</h1>
          <p className="text-slate-500 dark:text-slate-400">Update the details and curriculum of your course.</p>
        </div>
      </div>

      <div className="flex border-b border-slate-200 dark:border-white/10 overflow-x-auto no-scrollbar">
        {[
          { id: "basic", label: "Basic Info" },
          { id: "instructor", label: "Instructor" },
          { id: "metadata", label: "Features" },
          { id: "ai", label: "AI Tutor" },
          { id: "curriculum", label: "Curriculum" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-bold text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id 
                ? "border-[#3268BA] text-[#3268BA] dark:border-[#F9B03C] dark:text-[#F9B03C]" 
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* BASIC INFO TAB */}
        {activeTab === "basic" && (
          <Card className="bg-white dark:bg-[#111111] border-slate-200 dark:border-white/10 animate-in fade-in">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900 dark:text-white">Course Title</label>
                <Input name="title" value={formData.title} onChange={handleBasicChange} required placeholder="e.g. Master React in 30 Days" className="bg-slate-50 dark:bg-[#1a1a1a] dark:border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900 dark:text-white">Description</label>
                <textarea name="description" value={formData.description} onChange={handleBasicChange} required rows={4} className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3268BA] dark:border-white/10 dark:bg-[#1a1a1a] dark:text-white" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900 dark:text-white">Price (ETB)</label>
                  <Input name="price" type="number" min="0" value={formData.price} onChange={handleBasicChange} required placeholder="0 for free" className="bg-slate-50 dark:bg-[#1a1a1a] dark:border-white/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900 dark:text-white">Category</label>
                  <select name="category" value={formData.category} onChange={handleBasicChange} className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3268BA] dark:border-white/10 dark:bg-[#1a1a1a] dark:text-white h-10">
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900 dark:text-white">Cover Image URL</label>
                <Input name="imageUrl" value={formData.imageUrl} onChange={handleBasicChange} placeholder="https://..." className="bg-slate-50 dark:bg-[#1a1a1a] dark:border-white/10" />
                {formData.imageUrl && (
                  <div className="mt-2 w-32 h-20 rounded-md overflow-hidden bg-slate-100 border border-slate-200 dark:border-white/10">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900 dark:text-white">Status</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" value="Draft" checked={formData.status === "Draft"} onChange={handleBasicChange} />
                    <span className="text-sm dark:text-slate-300">Draft</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" value="Published" checked={formData.status === "Published"} onChange={handleBasicChange} />
                    <span className="text-sm dark:text-slate-300">Published</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* INSTRUCTOR TAB */}
        {activeTab === "instructor" && (
          <Card className="bg-white dark:bg-[#111111] border-slate-200 dark:border-white/10 animate-in fade-in">
            <CardHeader>
              <CardTitle>Instructor Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900 dark:text-white">Instructor Name</label>
                <Input name="instructorName" value={formData.instructorName} onChange={handleBasicChange} placeholder="e.g. John Doe" className="bg-slate-50 dark:bg-[#1a1a1a] dark:border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900 dark:text-white">Instructor Role / Bio</label>
                <Input name="instructorRole" value={formData.instructorRole} onChange={handleBasicChange} placeholder="e.g. Senior Software Engineer" className="bg-slate-50 dark:bg-[#1a1a1a] dark:border-white/10" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* METADATA TAB */}
        {activeTab === "metadata" && (
          <Card className="bg-white dark:bg-[#111111] border-slate-200 dark:border-white/10 animate-in fade-in">
            <CardHeader>
              <CardTitle>Course Features & Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* What You Will Learn */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-900 dark:text-white">What You Will Learn</label>
                  <Button type="button" variant="outline" size="sm" onClick={() => handleAddListItem(setWhatYouWillLearn)} className="h-8">
                    <Plus className="w-4 h-4 mr-1" /> Add Item
                  </Button>
                </div>
                {whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input 
                      value={item} 
                      onChange={(e) => handleListChange(setWhatYouWillLearn, index, e.target.value)} 
                      placeholder="e.g. Build fullstack applications"
                      className="bg-slate-50 dark:bg-[#1a1a1a] dark:border-white/10"
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveListItem(setWhatYouWillLearn, index)} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-900 dark:text-white">Course Requirements</label>
                  <Button type="button" variant="outline" size="sm" onClick={() => handleAddListItem(setRequirements)} className="h-8">
                    <Plus className="w-4 h-4 mr-1" /> Add Requirement
                  </Button>
                </div>
                {requirements.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input 
                      value={item} 
                      onChange={(e) => handleListChange(setRequirements, index, e.target.value)} 
                      placeholder="e.g. Basic understanding of HTML"
                      className="bg-slate-50 dark:bg-[#1a1a1a] dark:border-white/10"
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveListItem(setRequirements, index)} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI TUTOR TAB */}
        {activeTab === "ai" && (
          <Card className="bg-white dark:bg-[#111111] border-slate-200 dark:border-white/10 animate-in fade-in">
            <CardHeader>
              <CardTitle>AI Tutor Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Provide specific system prompts and instructions for the AI Tutor for this course. The AI will use this context to answer student questions.
              </p>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900 dark:text-white">System Instructions</label>
                <textarea 
                  name="aiInstructions" 
                  value={formData.aiInstructions} 
                  onChange={handleBasicChange} 
                  rows={8} 
                  placeholder="You are an expert tutor for this React course. Your goal is to..."
                  className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3268BA] dark:border-white/10 dark:bg-[#1a1a1a] dark:text-white font-mono" 
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* CURRICULUM TAB */}
        {activeTab === "curriculum" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Curriculum Builder</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Add modules and lessons to build your course content.</p>
              </div>
              <Button type="button" onClick={handleAddModule} className="bg-[#111111] text-white hover:bg-black dark:bg-white dark:text-black">
                <Plus className="w-4 h-4 mr-2" /> Add Module
              </Button>
            </div>

            {modules.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl">
                <p className="text-slate-500 dark:text-slate-400 mb-4">No modules added yet.</p>
                <Button type="button" onClick={handleAddModule} variant="outline">
                  <Plus className="w-4 h-4 mr-2" /> Create First Module
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {modules.map((module, mIndex) => (
                  <Card key={module.id} className="bg-white dark:bg-[#111111] border-slate-200 dark:border-white/10 overflow-hidden">
                    <div 
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-[#1a1a1a] cursor-pointer hover:bg-slate-100 dark:hover:bg-[#222]"
                      onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <GripVertical className="w-5 h-5 text-slate-400" />
                        <span className="font-bold text-sm text-slate-500">Module {mIndex + 1}:</span>
                        <Input 
                          value={module.title}
                          onChange={(e) => handleModuleTitleChange(module.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="max-w-sm h-8 bg-white dark:bg-[#111111] dark:border-white/10 font-bold"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => { e.stopPropagation(); handleRemoveModule(module.id); }}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 h-8 w-8"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        {expandedModule === module.id ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                      </div>
                    </div>

                    {expandedModule === module.id && (
                      <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#111111]">
                        <div className="space-y-3 mb-4">
                          {module.lessons.map((lesson, lIndex) => (
                            <div key={lesson.id} className="flex flex-col gap-3 p-4 border border-slate-100 dark:border-white/5 rounded-lg bg-slate-50/50 dark:bg-[#1a1a1a]/50">
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-sm text-slate-400">{lIndex + 1}.</span>
                                <Input 
                                  value={lesson.title}
                                  onChange={(e) => handleLessonChange(module.id, lesson.id, "title", e.target.value)}
                                  placeholder="Lesson Title"
                                  className="flex-1 h-8 dark:border-white/10 dark:bg-[#111111]"
                                />
                                <Input 
                                  value={lesson.duration}
                                  onChange={(e) => handleLessonChange(module.id, lesson.id, "duration", e.target.value)}
                                  placeholder="Duration (e.g. 12:45)"
                                  className="w-32 h-8 dark:border-white/10 dark:bg-[#111111]"
                                />
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleRemoveLesson(module.id, lesson.id)}
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 h-8 w-8 shrink-0"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="pl-6">
                                <Input 
                                  value={lesson.videoUrl}
                                  onChange={(e) => handleLessonChange(module.id, lesson.id, "videoUrl", e.target.value)}
                                  placeholder="YouTube Video URL (e.g. https://youtu.be/...)"
                                  className="w-full h-8 text-sm text-slate-600 dark:text-slate-300 dark:border-white/10 dark:bg-[#111111]"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={() => handleAddLesson(module.id)}>
                          <Plus className="w-4 h-4 mr-2" /> Add Lesson
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUBMIT ACTIONS */}
        <div className="pt-8 flex justify-end gap-4 border-t border-slate-200 dark:border-white/10 sticky bottom-4 bg-slate-50 dark:bg-[#0a0a0a] p-4 rounded-xl shadow-lg border">
          <Link href="/admin/courses">
            <Button type="button" variant="outline" className="px-8">Cancel</Button>
          </Link>
          <Button 
            type="submit" 
            disabled={saving}
            className="bg-[#3268BA] hover:bg-[#255296] text-white font-bold px-12"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Update Full Course"}
          </Button>
        </div>

      </form>
    </div>
  );
}
