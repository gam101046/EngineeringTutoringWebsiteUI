import type { Category, Course, Lesson, Testimonial } from "./types";

export const COURSES: Course[] = [
  {
    id: 1,
    title: "Calculus 1 ฉบับเร่งรัด: ลิมิต อนุพันธ์ อินทิกรัล",
    instructor: "พี่นัท วิศวะจุฬา",
    price: 490,
    originalPrice: 790,
    rating: 4.9,
    reviewCount: 342,
    students: 2341,
    lessons: 48,
    hours: 12,
    category: "Calculus",
    badge: "ขายดี",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=340&fit=crop&auto=format",
    description: "ติวครบจบในคอร์สเดียว ตั้งแต่พื้นฐานจนถึงโจทย์ระดับกลาง เน้นเข้าใจจริง ไม่ท่องจำสูตร อธิบายด้วยตัวอย่างที่เห็นภาพง่าย",
    progress: 65,
  },
  {
    id: 2,
    title: "วงจรไฟฟ้า (Circuit Analysis) สำหรับปี 2",
    instructor: "พี่เบส วิศวะไฟฟ้า มช.",
    price: 590,
    rating: 4.8,
    reviewCount: 218,
    students: 1892,
    lessons: 36,
    hours: 9,
    category: "Circuit",
    badge: "ใหม่",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=340&fit=crop&auto=format",
    description: "เข้าใจ KVL, KCL, Thevenin, Norton และ AC Circuit อย่างละเอียด พร้อมตัวอย่างข้อสอบจริงทุกบท",
  },
  {
    id: 3,
    title: "Thermodynamics: จากศูนย์ถึงสอบผ่าน",
    instructor: "พี่เจน วิศวะเครื่องกล มก.",
    price: 450,
    originalPrice: 650,
    rating: 4.7,
    reviewCount: 156,
    students: 1234,
    lessons: 30,
    hours: 8,
    category: "Thermodynamics",
    badge: "ลด",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=340&fit=crop&auto=format",
    description: "เรียนรู้กฎข้อที่ 1 และ 2 ของเทอร์โม พร้อมการประยุกต์กับ engine cycle และโจทย์คำนวณจริง",
  },
  {
    id: 4,
    title: "Python สำหรับวิศวกร: ตั้งแต่เริ่มต้นจนโปรเจกต์",
    instructor: "พี่ฝน วิศวะคอมพิวเตอร์",
    price: 390,
    rating: 4.9,
    reviewCount: 489,
    students: 3210,
    lessons: 52,
    hours: 14,
    category: "Programming",
    badge: "ขายดี",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=340&fit=crop&auto=format",
    description: "Python จากศูนย์ถึงสร้าง automation script และ data analysis ด้วย NumPy, Pandas",
    progress: 30,
  },
  {
    id: 5,
    title: "Statics & Dynamics: กลศาสตร์วิศวกรรม",
    instructor: "พี่โบว์ วิศวะโยธา จุฬา",
    price: 520,
    rating: 4.6,
    reviewCount: 134,
    students: 987,
    lessons: 40,
    hours: 11,
    category: "Mechanics",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=340&fit=crop&auto=format",
    description: "เรียน Free body diagram, equilibrium, kinematics จนถึง work-energy theorem",
  },
  {
    id: 6,
    title: "Linear Algebra สำหรับวิศวกร",
    instructor: "พี่นัท วิศวะจุฬา",
    price: 420,
    originalPrice: 590,
    rating: 4.8,
    reviewCount: 201,
    students: 1567,
    lessons: 38,
    hours: 10,
    category: "Calculus",
    badge: "ลด",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&h=340&fit=crop&auto=format",
    description: "Matrix operations, eigenvalues, vector spaces และ applications ใน engineering problems",
    completed: true,
    progress: 100,
  },
];

export const LESSONS: Lesson[] = [
  { id: 1, title: "ทำความรู้จักกับลิมิต (Limits)", duration: "18:30", done: true, free: true },
  { id: 2, title: "เทคนิคการหาลิมิต (Limit Techniques)", duration: "22:15", done: true, free: false },
  { id: 3, title: "ความต่อเนื่องของฟังก์ชัน (Continuity)", duration: "15:40", done: true, free: false },
  { id: 4, title: "บทนำอนุพันธ์ (Derivative Introduction)", duration: "20:00", done: false, free: false },
  { id: 5, title: "กฎการหาอนุพันธ์ (Differentiation Rules)", duration: "25:10", done: false, free: false },
  { id: 6, title: "Chain Rule และ Implicit Differentiation", duration: "19:55", done: false, free: false },
  { id: 7, title: "การประยุกต์อนุพันธ์: ค่าสูงสุด-ต่ำสุด", duration: "28:20", done: false, free: false },
  { id: 8, title: "บทนำอินทิกรัล (Integration)", duration: "16:45", done: false, free: false },
];

export const TESTIMONIALS: Testimonial[] = [
  { name: "นิว", major: "วิศวะเครื่องกล ปี 3", text: "ติวกับพี่นัทแล้วเข้าใจ Calculus มากขึ้นมากเลยครับ สอนง่าย อธิบายดี ทำให้เห็นภาพชัดขึ้น ผ่านสอบ midterm ได้ 85 แต้ม!", initial: "น" },
  { name: "แพร", major: "วิศวะไฟฟ้า ปี 2", text: "คอร์ส Circuit วิเคราะห์ดีมากค่ะ พี่เบสอธิบาย Thevenin/Norton ชัดกว่าที่เรียนในคลาสอีก ผ่านสอบได้ A!", initial: "พ" },
  { name: "ต้น", major: "วิศวะโยธา ปี 3", text: "คุ้มมากครับ ดูย้อนหลังได้ไม่จำกัด ก่อนสอบกลับมาทบทวนง่ายมาก ไม่ต้องกลัวลืม เปิดดูตอนดึกก็ได้", initial: "ต" },
];

export const CATEGORIES: Category[] = [
  { name: "Calculus", symbol: "∫", count: 8 },
  { name: "Circuit", symbol: "⚡", count: 6 },
  { name: "Thermodynamics", symbol: "🌡", count: 5 },
  { name: "Programming", symbol: "</>", count: 9 },
  { name: "Mechanics", symbol: "⚙", count: 7 },
  { name: "Materials", symbol: "🔬", count: 4 },
];

export function getCourseById(id: number): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

export function getMyCourses(): Course[] {
  return COURSES.filter((c) => c.progress !== undefined);
}

export function getActiveCourses(): Course[] {
  return getMyCourses().filter((c) => !c.completed);
}

export function getCompletedCourses(): Course[] {
  return getMyCourses().filter((c) => c.completed);
}

export function getBadgeColor(badge?: string): string {
  if (badge === "ขายดี") return "#7A1F2B";
  if (badge === "ใหม่") return "#16a34a";
  return "#F2994A";
}

export function getDiscountPercent(course: Course): number {
  if (!course.originalPrice) return 0;
  return Math.round((1 - course.price / course.originalPrice) * 100);
}
