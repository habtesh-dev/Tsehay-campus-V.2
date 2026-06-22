import { db } from "./firebase";
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp, 
  where 
} from "firebase/firestore";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  status: 'Published' | 'Draft';
  students: number;
  imageUrl: string;
  instructorName?: string;
  instructorRole?: string;
  aiInstructions?: string;
  whatYouWillLearn?: string[];
  requirements?: string[];
  modules?: Module[];
  createdAt?: any;
  updatedAt?: any;
}

const COURSES_COLLECTION = "courses";

export const courseService = {
  // Get all courses (for admin)
  getAllCourses: async (): Promise<Course[]> => {
    try {
      const q = query(collection(db, COURSES_COLLECTION), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  },

  // Get only published courses (for landing page/dashboard)
  getPublishedCourses: async (): Promise<Course[]> => {
    try {
      const q = query(
        collection(db, COURSES_COLLECTION), 
        where("status", "==", "Published"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
    } catch (error) {
      console.error("Error fetching published courses:", error);
      throw error;
    }
  },

  // Get a single course by ID
  getCourseById: async (id: string): Promise<Course | null> => {
    try {
      const docRef = doc(db, COURSES_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Course;
      }
      return null;
    } catch (error) {
      console.error("Error fetching course:", error);
      throw error;
    }
  },

  // Create a new course
  createCourse: async (courseData: Omit<Course, "id" | "createdAt" | "updatedAt">): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, COURSES_COLLECTION), {
        ...courseData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  },

  // Update a course
  updateCourse: async (id: string, courseData: Partial<Course>): Promise<void> => {
    try {
      const docRef = doc(db, COURSES_COLLECTION, id);
      await updateDoc(docRef, {
        ...courseData,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating course:", error);
      throw error;
    }
  },

  // Delete a course
  deleteCourse: async (id: string): Promise<void> => {
    try {
      const docRef = doc(db, COURSES_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting course:", error);
      throw error;
    }
  }
};
