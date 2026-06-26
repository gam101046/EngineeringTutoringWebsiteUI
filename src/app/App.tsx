import { useState } from "react";
import {
  BookOpen, Star, ChevronRight, ChevronDown, Search,
  Bell, Menu, X, CheckCircle, Clock, Users, Shield,
  LogOut, CreditCard, Check, Play,
  Download, MessageCircle, Award, ChevronLeft, Lock,
} from "lucide-react";

type Page = "landing" | "catalog" | "detail" | "auth" | "checkout" | "my-courses" | "learning" | "profile";

interface Course {
  id: number;
  title: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  students: number;
  lessons: number;
  hours: number;
  category: string;
  badge?: string;
  image: string;
  description: string;
  progress?: number;
  completed?: boolean;
}

interface Lesson {
  id: number;
  title: string;
  duration: string;
  done: boolean;
  free: boolean;
}

const COURSES: Course[] = [
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

const LESSONS: Lesson[] = [
  { id: 1, title: "ทำความรู้จักกับลิมิต (Limits)", duration: "18:30", done: true, free: true },
  { id: 2, title: "เทคนิคการหาลิมิต (Limit Techniques)", duration: "22:15", done: true, free: false },
  { id: 3, title: "ความต่อเนื่องของฟังก์ชัน (Continuity)", duration: "15:40", done: true, free: false },
  { id: 4, title: "บทนำอนุพันธ์ (Derivative Introduction)", duration: "20:00", done: false, free: false },
  { id: 5, title: "กฎการหาอนุพันธ์ (Differentiation Rules)", duration: "25:10", done: false, free: false },
  { id: 6, title: "Chain Rule และ Implicit Differentiation", duration: "19:55", done: false, free: false },
  { id: 7, title: "การประยุกต์อนุพันธ์: ค่าสูงสุด-ต่ำสุด", duration: "28:20", done: false, free: false },
  { id: 8, title: "บทนำอินทิกรัล (Integration)", duration: "16:45", done: false, free: false },
];

const TESTIMONIALS = [
  { name: "นิว", major: "วิศวะเครื่องกล ปี 3", text: "ติวกับพี่นัทแล้วเข้าใจ Calculus มากขึ้นมากเลยครับ สอนง่าย อธิบายดี ทำให้เห็นภาพชัดขึ้น ผ่านสอบ midterm ได้ 85 แต้ม!", initial: "น" },
  { name: "แพร", major: "วิศวะไฟฟ้า ปี 2", text: "คอร์ส Circuit วิเคราะห์ดีมากค่ะ พี่เบสอธิบาย Thevenin/Norton ชัดกว่าที่เรียนในคลาสอีก ผ่านสอบได้ A!", initial: "พ" },
  { name: "ต้น", major: "วิศวะโยธา ปี 3", text: "คุ้มมากครับ ดูย้อนหลังได้ไม่จำกัด ก่อนสอบกลับมาทบทวนง่ายมาก ไม่ต้องกลัวลืม เปิดดูตอนดึกก็ได้", initial: "ต" },
];

const CATEGORIES = [
  { name: "Calculus", symbol: "∫", count: 8 },
  { name: "Circuit", symbol: "⚡", count: 6 },
  { name: "Thermodynamics", symbol: "🌡", count: 5 },
  { name: "Programming", symbol: "</>", count: 9 },
  { name: "Mechanics", symbol: "⚙", count: 7 },
  { name: "Materials", symbol: "🔬", count: 4 },
];

const MAROON = "#7A1F2B";
const MAROON_DARK = "#5C141E";
const ORANGE = "#F2994A";
const ORANGE_DARK = "#e08030";

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course>(COURSES[0]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [detailTab, setDetailTab] = useState<"content" | "instructor" | "reviews">("content");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "promptpay">("card");
  const [myCourseTab, setMyCourseTab] = useState<"active" | "completed">("active");
  const [currentLesson, setCurrentLesson] = useState<Lesson>(LESSONS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formName, setFormName] = useState("");

  const navigate = (p: Page) => {
    setPage(p);
    setMobileOpen(false);
    try { window.scrollTo(0, 0); } catch { /* ignore */ }
  };

  const viewCourse = (course: Course) => {
    setSelectedCourse(course);
    setDetailTab("content");
    navigate("detail");
  };

  const buyCourse = (course: Course) => {
    setSelectedCourse(course);
    setCheckoutDone(false);
    if (!isLoggedIn) { setAuthTab("login"); navigate("auth"); }
    else navigate("checkout");
  };

  const learnCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentLesson(LESSONS[0]);
    navigate("learning");
  };

  const filteredCourses = COURSES.filter(c => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q);
    const matchCat = !selectedCategory || c.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const myCourses = COURSES.filter(c => c.progress !== undefined);
  const activeCourses = myCourses.filter(c => !c.completed);
  const completedCourses = myCourses.filter(c => c.completed);

  // ── Course card ────────────────────────────────────────────────────────
  const CourseCard = ({ course, showProgress = false }: { course: Course; showProgress?: boolean }) => (
    <div
      className="bg-white rounded-xl border border-border overflow-hidden cursor-pointer group transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
      onClick={() => viewCourse(course)}
    >
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-44 object-cover bg-muted transition-transform duration-300 group-hover:scale-105"
        />
        {course.badge && (
          <span
            className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-xs font-bold text-white"
            style={{ backgroundColor: course.badge === "ขายดี" ? MAROON : course.badge === "ใหม่" ? "#16a34a" : ORANGE }}
          >
            {course.badge === "ลด" && course.originalPrice
              ? `ลด ${Math.round((1 - course.price / course.originalPrice) * 100)}%`
              : course.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{course.category}</p>
        <h3 className="font-semibold text-foreground text-sm leading-snug mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-xs text-muted-foreground mb-3">{course.instructor}</p>
        <div className="flex items-center gap-1 mb-3">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-foreground">{course.rating}</span>
          <span className="text-xs text-muted-foreground">({course.reviewCount})</span>
        </div>
        {showProgress && course.progress !== undefined ? (
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>เรียนไปแล้ว</span>
              <span className="font-semibold">{course.progress}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${course.progress}%`, backgroundColor: MAROON }} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-foreground">฿{course.price.toLocaleString()}</span>
              {course.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">฿{course.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock size={10} />
              <span>{course.hours}ชม.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ── Navbar ─────────────────────────────────────────────────────────────
  const navbar = (
    <nav className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => navigate("landing")} className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: MAROON }}>
            <BookOpen size={15} className="text-white" />
          </div>
          <span className="font-bold text-lg" style={{ color: MAROON }}>EngiTutor</span>
        </button>

        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => navigate("catalog")} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            คอร์สทั้งหมด
          </button>
          {isLoggedIn && (
            <button onClick={() => navigate("my-courses")} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              คอร์สของฉัน
            </button>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell size={19} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: ORANGE }} />
              </button>
              <button
                onClick={() => navigate("profile")}
                className="w-9 h-9 text-white rounded-full flex items-center justify-center text-sm font-bold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: MAROON }}
              >
                น
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { setAuthTab("login"); navigate("auth"); }}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                เข้าสู่ระบบ
              </button>
              <button
                onClick={() => { setAuthTab("register"); navigate("auth"); }}
                className="px-4 py-2 text-white text-sm font-bold rounded-lg transition-all hover:shadow-md"
                style={{ backgroundColor: ORANGE }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = ORANGE_DARK)}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = ORANGE)}
              >
                สมัครสมาชิก
              </button>
            </>
          )}
        </div>

        <button className="md:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-2">
          <button onClick={() => navigate("catalog")} className="text-left py-2.5 text-sm font-medium text-foreground">
            คอร์สทั้งหมด
          </button>
          {isLoggedIn && (
            <button onClick={() => navigate("my-courses")} className="text-left py-2.5 text-sm font-medium text-foreground">
              คอร์สของฉัน
            </button>
          )}
          <div className="flex gap-3 pt-3 border-t border-border">
            {isLoggedIn ? (
              <button onClick={() => navigate("profile")} className="flex-1 py-2.5 border border-border rounded-lg text-sm font-medium">
                โปรไฟล์
              </button>
            ) : (
              <>
                <button onClick={() => { setAuthTab("login"); navigate("auth"); }} className="flex-1 py-2.5 border border-border rounded-lg text-sm font-medium">
                  เข้าสู่ระบบ
                </button>
                <button
                  onClick={() => { setAuthTab("register"); navigate("auth"); }}
                  className="flex-1 py-2.5 text-white rounded-lg text-sm font-bold"
                  style={{ backgroundColor: ORANGE }}
                >
                  สมัครสมาชิก
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );

  // ── Footer ─────────────────────────────────────────────────────────────
  const footer = (
    <footer style={{ backgroundColor: "#1A1A1A" }} className="text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: MAROON }}>
              <BookOpen size={15} className="text-white" />
            </div>
            <span className="font-bold text-lg">EngiTutor</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            แพลตฟอร์มติวออนไลน์สำหรับวิศวกรรม<br />
            โดยรุ่นพี่ที่ผ่านมาแล้ว เพื่อน้องที่กำลังสู้อยู่
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm">หมวดวิชา</h4>
          <div className="flex flex-col gap-2">
            {["Calculus", "Circuit Analysis", "Thermodynamics", "Programming", "Mechanics"].map(c => (
              <button
                key={c}
                onClick={() => { setSelectedCategory(c.split(" ")[0]); navigate("catalog"); }}
                className="text-gray-400 hover:text-white text-sm text-left transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm">ข้อมูลทั่วไป</h4>
          <div className="flex flex-col gap-2">
            {["เกี่ยวกับเรา", "นโยบายความเป็นส่วนตัว", "เงื่อนไขการใช้งาน", "ติดต่อเรา"].map(item => (
              <span key={item} className="text-gray-400 hover:text-white text-sm cursor-pointer transition-colors">{item}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-gray-500 text-xs">
          © 2024 EngiTutor · ทำด้วย ❤️ สำหรับน้องๆ วิศวะทุกคน
        </div>
      </div>
    </footer>
  );

  // ── Landing Page ───────────────────────────────────────────────────────
  const landingPage = (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #F9F0F1 0%, #FFFFFF 55%, #FEF3EA 100%)" }} className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ backgroundColor: `${MAROON}18`, color: MAROON }}
            >
              🎓 ติวโดยรุ่นพี่วิศวะจริงๆ
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5">
              วิชาวิศวะ<br />
              <span style={{ color: MAROON }}>ยากแค่ไหน</span><br />
              ก็ผ่านได้!
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-md">
              คอร์สติวออนไลน์โดยรุ่นพี่ที่ผ่านมาแล้ว อธิบายแบบเพื่อนช่วยติว เข้าใจง่าย ดูย้อนหลังได้ตลอดชีพ
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={() => navigate("catalog")}
                className="px-7 py-3.5 text-white font-bold rounded-xl text-base transition-all hover:shadow-lg"
                style={{ backgroundColor: ORANGE }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = ORANGE_DARK)}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = ORANGE)}
              >
                ดูคอร์สทั้งหมด →
              </button>
              <button
                onClick={() => viewCourse(COURSES[0])}
                className="px-7 py-3.5 font-semibold rounded-xl text-base transition-all hover:bg-primary/5"
                style={{ border: `2px solid ${MAROON}`, color: MAROON }}
              >
                ดูตัวอย่างฟรี
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Users size={14} style={{ color: MAROON }} />
                <span><b className="text-foreground">12,000+</b> นักเรียน</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen size={14} style={{ color: MAROON }} />
                <span><b className="text-foreground">50+</b> คอร์ส</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                <span><b className="text-foreground">4.8</b> คะแนนเฉลี่ย</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=640&h=430&fit=crop&auto=format"
                alt="นักเรียนเรียนออนไลน์"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 60%)" }} />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-xl p-3.5 flex items-center gap-3">
              <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">ผ่านสอบได้ A! 🎉</p>
                <p className="text-xs text-muted-foreground">นิว วิศวะเครื่องกล</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-3 text-center">
              <div className="flex items-center gap-0.5 justify-center mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={10} className="fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-xs font-bold text-foreground">4.9 / 5.0</p>
              <p className="text-xs text-muted-foreground">342 รีวิว</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-bold text-foreground mb-6">เลือกตามวิชาที่ต้องการ</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat.name}
                onClick={() => { setSelectedCategory(cat.name); navigate("catalog"); }}
                className="p-4 rounded-xl border border-border hover:shadow-md transition-all text-center group"
                onMouseOver={e => (e.currentTarget.style.borderColor = MAROON)}
                onMouseOut={e => (e.currentTarget.style.borderColor = "")}
              >
                <div className="text-2xl mb-2">{cat.symbol}</div>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</p>
                <p className="text-xs text-muted-foreground">{cat.count} คอร์ส</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="py-12" style={{ backgroundColor: "#FAFAFA" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">คอร์สแนะนำ 🔥</h2>
            <button
              onClick={() => navigate("catalog")}
              className="text-sm font-medium flex items-center gap-1 hover:underline"
              style={{ color: MAROON }}
            >
              ดูทั้งหมด <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COURSES.slice(0, 4).map(c => <CourseCard key={c.id} course={c} />)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-bold text-foreground mb-1">น้องๆ พูดว่าอะไร 💬</h2>
          <p className="text-muted-foreground text-sm mb-8">จากนักเรียนจริงๆ ที่ผ่านมาแล้ว</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="rounded-xl p-5 border border-border" style={{ backgroundColor: "#FAFAFA" }}>
                <div className="flex items-center gap-0.5 mb-3">
                  {[1,2,3,4,5].map(s => <Star key={s} size={13} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ backgroundColor: MAROON }}>
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.major}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA banner */}
      <section className="py-16" style={{ backgroundColor: MAROON }}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">พร้อมสู้กับวิชายากๆ แล้วหรือยัง?</h2>
          <p className="text-white/75 mb-8 text-base">เริ่มเรียนวันนี้ ดูย้อนหลังได้ตลอด ไม่มีหมดอายุ ราคาที่น้องๆ จับต้องได้</p>
          <button
            onClick={() => navigate("catalog")}
            className="px-8 py-4 text-white font-bold rounded-xl text-base transition-all hover:shadow-2xl"
            style={{ backgroundColor: ORANGE }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = ORANGE_DARK)}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = ORANGE)}
          >
            เริ่มเรียนเลย! →
          </button>
        </div>
      </section>
    </div>
  );

  // ── Catalog Page ───────────────────────────────────────────────────────
  const catalogPage = (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-1">คอร์สทั้งหมด</h1>
      <p className="text-muted-foreground text-sm mb-6">{filteredCourses.length} คอร์ส พร้อมให้เรียน</p>

      <div className="relative mb-4">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="ค้นหาคอร์ส เช่น Calculus, Circuit, Python..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-sm focus:outline-none bg-white"
          style={{ outlineColor: MAROON }}
          onFocus={e => (e.target.style.borderColor = MAROON)}
          onBlur={e => (e.target.style.borderColor = "")}
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
          style={!selectedCategory ? { backgroundColor: MAROON, color: "white" } : { backgroundColor: "#F5F5F5", color: "#6B6B6B" }}
        >
          ทั้งหมด
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            style={selectedCategory === cat.name ? { backgroundColor: MAROON, color: "white" } : { backgroundColor: "#F5F5F5", color: "#6B6B6B" }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map(c => <CourseCard key={c.id} course={c} />)}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">ไม่พบคอร์สที่ค้นหา</h3>
          <p className="text-muted-foreground mb-5">ลองค้นหาด้วยคำอื่น หรือดูคอร์สทั้งหมด</p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
            className="px-5 py-2.5 text-white rounded-xl text-sm font-bold"
            style={{ backgroundColor: MAROON }}
          >
            ดูคอร์สทั้งหมด
          </button>
        </div>
      )}
    </div>
  );

  // ── Course Detail Page ─────────────────────────────────────────────────
  const discountPct = selectedCourse.originalPrice
    ? Math.round((1 - selectedCourse.price / selectedCourse.originalPrice) * 100)
    : 0;

  const detailPage = (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("catalog")}
        className="flex items-center gap-1 text-sm text-muted-foreground mb-6 hover:text-primary transition-colors"
      >
        <ChevronLeft size={15} /> กลับไปดูคอร์สทั้งหมด
      </button>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <span
            className="inline-block px-2.5 py-1 rounded text-xs font-semibold mb-3"
            style={{ backgroundColor: `${MAROON}18`, color: MAROON }}
          >
            {selectedCourse.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{selectedCourse.title}</h1>
          <p className="text-muted-foreground leading-relaxed mb-5">{selectedCourse.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span className="font-semibold text-foreground">{selectedCourse.rating}</span>
              <span>({selectedCourse.reviewCount} รีวิว)</span>
            </div>
            <div className="flex items-center gap-1.5"><Users size={13} />{selectedCourse.students.toLocaleString()} นักเรียน</div>
            <div className="flex items-center gap-1.5"><Clock size={13} />{selectedCourse.hours} ชั่วโมง</div>
            <div className="flex items-center gap-1.5"><BookOpen size={13} />{selectedCourse.lessons} บทเรียน</div>
          </div>

          <div className="relative rounded-xl overflow-hidden mb-6 bg-gray-900">
            <img
              src={selectedCourse.image}
              alt={selectedCourse.title}
              className="w-full h-56 md:h-64 object-cover opacity-75"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                <Play size={24} className="ml-1" style={{ color: MAROON }} />
              </button>
            </div>
            <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-lg">
              ตัวอย่างฟรี: บทที่ 1
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border mb-6">
            <div className="flex">
              {(["content", "instructor", "reviews"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setDetailTab(tab)}
                  className="px-5 py-3 text-sm font-medium border-b-2 transition-colors"
                  style={detailTab === tab
                    ? { borderColor: MAROON, color: MAROON }
                    : { borderColor: "transparent", color: "#6B6B6B" }}
                >
                  {tab === "content" ? "เนื้อหาคอร์ส" : tab === "instructor" ? "ผู้สอน" : "รีวิว"}
                </button>
              ))}
            </div>
          </div>

          {detailTab === "content" && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                รวม {selectedCourse.lessons} บทเรียน · {selectedCourse.hours} ชั่วโมง
              </p>
              <div className="space-y-1">
                {LESSONS.map((lesson, i) => (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer"
                    onClick={() => { if (lesson.free || selectedCourse.progress !== undefined) learnCourse(selectedCourse); }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: lesson.done ? "#f0fdf4" : "#F5F5F5" }}
                    >
                      {lesson.done
                        ? <CheckCircle size={15} className="text-green-600" />
                        : lesson.free
                          ? <Play size={13} style={{ color: MAROON }} />
                          : <Lock size={12} className="text-muted-foreground" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{lesson.title}</p>
                      {lesson.free && <span className="text-xs text-green-600 font-medium">ดูฟรี</span>}
                    </div>
                    <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {detailTab === "instructor" && (
            <div className="flex gap-4">
              <div
                className="w-16 h-16 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
                style={{ backgroundColor: MAROON }}
              >
                {selectedCourse.instructor.charAt(2)}
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{selectedCourse.instructor}</h3>
                <p className="text-sm text-muted-foreground mb-3">ผู้เชี่ยวชาญวิชา {selectedCourse.category} · ประสบการณ์ 5+ ปี</p>
                <p className="text-sm text-foreground leading-relaxed">
                  ผ่านการเรียนวิศวกรรมมาโดยตรง เข้าใจจุดที่น้องๆ มักติดขัด อธิบายด้วยตัวอย่างจากชีวิตจริงและโจทย์สอบจริง
                  ช่วยน้องให้ผ่านวิชาหนักๆ มาแล้วกว่า 2,000 คน ตอบ comment ทุกข้อภายใน 24 ชั่วโมง
                </p>
              </div>
            </div>
          )}

          {detailTab === "reviews" && (
            <div className="space-y-5">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="border-b border-border pb-5 last:border-0">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className="w-9 h-9 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{ backgroundColor: MAROON }}
                    >
                      {t.initial}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.major}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[1,2,3,4,5].map(s => <Star key={s} size={12} className="fill-amber-400 text-amber-400" />)}
                    </div>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{t.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sticky purchase card */}
        <div className="md:col-span-1">
          <div className="sticky top-20 bg-white rounded-xl border border-border shadow-xl p-5">
            <div className="mb-5">
              <div className="flex items-end gap-2 mb-1.5">
                <span className="text-3xl font-bold text-foreground">฿{selectedCourse.price.toLocaleString()}</span>
                {selectedCourse.originalPrice && (
                  <span className="text-muted-foreground line-through text-base mb-0.5">฿{selectedCourse.originalPrice.toLocaleString()}</span>
                )}
              </div>
              {discountPct > 0 && (
                <span
                  className="inline-block px-2 py-0.5 rounded text-xs font-bold"
                  style={{ backgroundColor: `${ORANGE}20`, color: ORANGE }}
                >
                  ลด {discountPct}% — ราคาพิเศษ!
                </span>
              )}
            </div>

            <button
              onClick={() => buyCourse(selectedCourse)}
              className="w-full py-3.5 text-white font-bold rounded-xl text-base mb-3 transition-all hover:shadow-md"
              style={{ backgroundColor: ORANGE }}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = ORANGE_DARK)}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = ORANGE)}
            >
              ซื้อคอร์สนี้!
            </button>
            <button
              className="w-full py-2.5 rounded-xl text-sm font-semibold mb-5 transition-all"
              style={{ border: `2px solid ${MAROON}`, color: MAROON }}
              onClick={() => learnCourse(selectedCourse)}
            >
              ลองดูตัวอย่างฟรี
            </button>

            <div className="space-y-2.5 text-sm text-foreground">
              <div className="flex items-center gap-2.5">
                <span className="text-xl font-bold" style={{ color: MAROON }}>∞</span>
                ดูซ้ำได้ตลอดชีพ
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={15} style={{ color: MAROON }} />
                <span>{selectedCourse.lessons} บทเรียน · {selectedCourse.hours} ชั่วโมง</span>
              </div>
              <div className="flex items-center gap-2">
                <Download size={15} style={{ color: MAROON }} />
                <span>เอกสารประกอบดาวน์โหลดได้</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={15} style={{ color: MAROON }} />
                <span>ใบเซอร์เมื่อเรียนจบ</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={15} className="text-green-600" />
                <span>ชำระเงินปลอดภัย 100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Auth Page ──────────────────────────────────────────────────────────
  const authPage = (
    <div
      className="min-h-[80vh] flex items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(135deg, #F9F0F1 0%, #FEF3EA 100%)" }}
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex border border-border rounded-xl p-1 mb-6">
          {(["login", "register"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setAuthTab(tab)}
              className="flex-1 py-2.5 rounded-lg text-sm font-bold transition-colors"
              style={authTab === tab ? { backgroundColor: MAROON, color: "white" } : { color: "#6B6B6B" }}
            >
              {tab === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
            </button>
          ))}
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-foreground">
            {authTab === "login" ? "ยินดีต้อนรับกลับ! 👋" : "เริ่มต้นกันเลย! 🚀"}
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            {authTab === "login" ? "เข้าสู่ระบบเพื่อเข้าถึงคอร์สของคุณ" : "สมัครฟรี เริ่มเรียนได้ทันที"}
          </p>
        </div>

        <button className="w-full flex items-center justify-center gap-3 py-3 border border-border rounded-xl hover:bg-muted/30 transition-colors mb-4 text-sm font-medium">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
          </svg>
          {authTab === "login" ? "เข้าสู่ระบบด้วย Google" : "สมัครด้วย Google"}
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">หรือ</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="space-y-3 mb-4">
          {authTab === "register" && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">ชื่อ-นามสกุล</label>
              <input
                type="text"
                placeholder="เช่น นิว วิชัย"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none transition-colors"
                onFocus={e => (e.target.style.borderColor = MAROON)}
                onBlur={e => (e.target.style.borderColor = "")}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">อีเมล</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={formEmail}
              onChange={e => setFormEmail(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none transition-colors"
              onFocus={e => (e.target.style.borderColor = MAROON)}
              onBlur={e => (e.target.style.borderColor = "")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">รหัสผ่าน</label>
            <input
              type="password"
              placeholder={authTab === "login" ? "รหัสผ่านของคุณ" : "อย่างน้อย 8 ตัวอักษร"}
              value={formPassword}
              onChange={e => setFormPassword(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none transition-colors"
              onFocus={e => (e.target.style.borderColor = MAROON)}
              onBlur={e => (e.target.style.borderColor = "")}
            />
          </div>
        </div>

        {authTab === "login" && (
          <div className="flex justify-end mb-3">
            <button className="text-xs hover:underline" style={{ color: MAROON }}>ลืมรหัสผ่าน?</button>
          </div>
        )}

        <button
          onClick={() => { setIsLoggedIn(true); navigate("landing"); }}
          className="w-full py-3.5 text-white font-bold rounded-xl text-base transition-all hover:shadow-lg"
          style={{ backgroundColor: ORANGE }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = ORANGE_DARK)}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = ORANGE)}
        >
          {authTab === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิกฟรี! 🎉"}
        </button>
      </div>
    </div>
  );

  // ── Checkout Page ──────────────────────────────────────────────────────
  const checkoutDiscount = selectedCourse.originalPrice
    ? selectedCourse.originalPrice - selectedCourse.price
    : 0;

  const checkoutPage = checkoutDone ? (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">ชำระเงินสำเร็จ! 🎉</h2>
        <p className="text-muted-foreground mb-1 text-sm">{selectedCourse.title}</p>
        <p className="text-muted-foreground text-sm mb-8">พร้อมให้เรียนแล้ว ดูย้อนหลังได้ตลอดชีพ</p>
        <button
          onClick={() => navigate("my-courses")}
          className="px-8 py-3.5 text-white font-bold rounded-xl transition-all"
          style={{ backgroundColor: ORANGE }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = ORANGE_DARK)}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = ORANGE)}
        >
          ไปดูคอร์สของฉัน →
        </button>
      </div>
    </div>
  ) : (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">สรุปการสั่งซื้อ</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-xl border border-border p-5 mb-4">
            <h3 className="font-semibold text-foreground mb-4">รายการสั่งซื้อ</h3>
            <div className="flex gap-3 mb-4">
              <img src={selectedCourse.image} alt="" className="w-20 h-14 rounded-lg object-cover bg-muted flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground leading-snug">{selectedCourse.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{selectedCourse.instructor}</p>
                <p className="text-xs text-muted-foreground">{selectedCourse.lessons} บทเรียน · ดูได้ตลอดชีพ</p>
              </div>
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ราคาปกติ</span>
                <span>฿{(selectedCourse.originalPrice || selectedCourse.price).toLocaleString()}</span>
              </div>
              {checkoutDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ส่วนลด</span>
                  <span className="text-green-600 font-medium">-฿{checkoutDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-base border-t border-border pt-2">
                <span>รวมทั้งสิ้น</span>
                <span>฿{selectedCourse.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1"><Shield size={12} className="text-green-600" />ชำระเงินปลอดภัย</div>
            <div className="flex items-center gap-1"><Check size={12} className="text-green-600" />คืนเงินได้ใน 7 วัน</div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-4">เลือกช่องทางชำระเงิน</h3>
          <div className="space-y-3 mb-5">
            {[
              { id: "card", label: "บัตรเครดิต / เดบิต", emoji: "💳" },
              { id: "promptpay", label: "พร้อมเพย์ (QR Code)", emoji: "📱" },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setPaymentMethod(m.id as "card" | "promptpay")}
                className="w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all"
                style={paymentMethod === m.id
                  ? { borderColor: MAROON, backgroundColor: `${MAROON}06` }
                  : { borderColor: "#E5E5E5" }}
              >
                <span className="text-xl">{m.emoji}</span>
                <span className="text-sm font-medium text-foreground flex-1 text-left">{m.label}</span>
                {paymentMethod === m.id && <Check size={16} style={{ color: MAROON }} />}
              </button>
            ))}
          </div>

          {paymentMethod === "card" && (
            <div className="space-y-3 mb-5">
              <input
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none"
                onFocus={e => (e.target.style.borderColor = MAROON)}
                onBlur={e => (e.target.style.borderColor = "")}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="MM / YY"
                  className="px-4 py-3 border border-border rounded-xl text-sm focus:outline-none"
                  onFocus={e => (e.target.style.borderColor = MAROON)}
                  onBlur={e => (e.target.style.borderColor = "")}
                />
                <input
                  placeholder="CVV"
                  className="px-4 py-3 border border-border rounded-xl text-sm focus:outline-none"
                  onFocus={e => (e.target.style.borderColor = MAROON)}
                  onBlur={e => (e.target.style.borderColor = "")}
                />
              </div>
              <input
                placeholder="ชื่อบนบัตร"
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none"
                onFocus={e => (e.target.style.borderColor = MAROON)}
                onBlur={e => (e.target.style.borderColor = "")}
              />
            </div>
          )}

          {paymentMethod === "promptpay" && (
            <div className="text-center py-6 rounded-xl mb-5" style={{ backgroundColor: "#F5F5F5" }}>
              <div className="w-28 h-28 bg-white border-2 border-border rounded-xl mx-auto flex items-center justify-center mb-3">
                <span className="text-5xl">📱</span>
              </div>
              <p className="text-sm font-medium text-foreground">สแกน QR Code ด้วยแอปธนาคาร</p>
              <p className="text-xs text-muted-foreground mt-1">หรือโอนมาที่เบอร์ 099-999-9999</p>
            </div>
          )}

          <button
            onClick={() => setCheckoutDone(true)}
            className="w-full py-4 text-white font-bold rounded-xl text-base transition-all hover:shadow-lg"
            style={{ backgroundColor: ORANGE }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = ORANGE_DARK)}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = ORANGE)}
          >
            ยืนยันการชำระเงิน ฿{selectedCourse.price.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );

  // ── My Courses Page ────────────────────────────────────────────────────
  const displayedCourses = myCourseTab === "active" ? activeCourses : completedCourses;

  const myCoursesPage = (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">คอร์สของฉัน</h1>

      <div className="flex border border-border rounded-xl p-1 mb-6 max-w-xs">
        {(["active", "completed"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setMyCourseTab(tab)}
            className="flex-1 py-2.5 rounded-lg text-sm font-bold transition-colors"
            style={myCourseTab === tab ? { backgroundColor: MAROON, color: "white" } : { color: "#6B6B6B" }}
          >
            {tab === "active" ? `กำลังเรียน (${activeCourses.length})` : `จบแล้ว (${completedCourses.length})`}
          </button>
        ))}
      </div>

      {displayedCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedCourses.map(course => (
            <div key={course.id} className="bg-white rounded-xl border border-border p-4 flex gap-4">
              <img src={course.image} alt={course.title} className="w-24 h-20 rounded-lg object-cover bg-muted flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">{course.category}</p>
                <h3 className="text-sm font-semibold text-foreground leading-snug mb-2 line-clamp-2">{course.title}</h3>
                {course.progress !== undefined && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>เรียนไปแล้ว</span>
                      <span className="font-semibold">{course.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${course.progress}%`, backgroundColor: MAROON }} />
                    </div>
                  </div>
                )}
                <button
                  onClick={() => learnCourse(course)}
                  className="px-4 py-1.5 text-xs font-bold text-white rounded-lg transition-colors"
                  style={{ backgroundColor: course.completed ? "#16a34a" : ORANGE }}
                >
                  {course.completed ? "ดูอีกครั้ง" : "เข้าเรียนต่อ →"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-5">{myCourseTab === "active" ? "📚" : "🎓"}</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {myCourseTab === "active" ? "ยังไม่มีคอร์สที่กำลังเรียน" : "ยังไม่มีคอร์สที่เรียนจบ"}
          </h3>
          <p className="text-muted-foreground mb-6">ไปหาคอร์สที่ชอบแล้วเริ่มเรียนกันเลย!</p>
          <button
            onClick={() => navigate("catalog")}
            className="px-6 py-3 text-white rounded-xl text-sm font-bold"
            style={{ backgroundColor: ORANGE }}
          >
            ดูคอร์สทั้งหมด
          </button>
        </div>
      )}
    </div>
  );

  // ── Learning Page ──────────────────────────────────────────────────────
  const learningPage = (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="bg-white border-b border-border px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate("my-courses")}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
        >
          <ChevronLeft size={16} /> กลับ
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{selectedCourse.title}</p>
          <p className="text-xs text-muted-foreground truncate">{currentLesson.title}</p>
        </div>
        <div className="hidden sm:block text-xs text-muted-foreground flex-shrink-0">{selectedCourse.lessons} บทเรียน</div>
      </div>

      <div className="flex flex-col md:flex-row" style={{ minHeight: "calc(100vh - 112px)" }}>
        {/* Video player */}
        <div className="flex-1">
          <div className="bg-gray-950 relative w-full" style={{ aspectRatio: "16/9" }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <button
                className="w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)" }}
              >
                <Play size={26} className="text-white ml-1" />
              </button>
              <p className="text-white text-sm font-medium text-center px-6">{currentLesson.title}</p>
              <p className="text-gray-400 text-xs">{currentLesson.duration}</p>
            </div>
            {/* Fake progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
              <div className="h-full transition-all" style={{ width: "35%", backgroundColor: ORANGE }} />
            </div>
          </div>

          <div className="p-4 md:p-5 bg-white border-t border-border">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <h3 className="font-semibold text-foreground">{currentLesson.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedCourse.instructor}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-2 border border-border rounded-lg text-xs font-medium hover:bg-muted/40 transition-colors">
                  <Download size={13} /> เอกสาร
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 border border-border rounded-lg text-xs font-medium hover:bg-muted/40 transition-colors">
                  <MessageCircle size={13} /> ถามคำถาม
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Playlist sidebar */}
        <div className="w-full md:w-80 bg-white border-l border-border flex-shrink-0 flex flex-col">
          <div className="p-4 border-b border-border flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground text-sm">รายการบทเรียน</h3>
              <span className="text-xs text-muted-foreground">{selectedCourse.progress || 35}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${selectedCourse.progress || 35}%`, backgroundColor: MAROON }} />
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            {LESSONS.map((lesson, i) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentLesson(lesson)}
                className="w-full flex items-start gap-3 p-3.5 text-left border-b border-border/50 transition-all hover:bg-muted/20"
                style={currentLesson.id === lesson.id
                  ? { backgroundColor: `${MAROON}06`, borderLeftWidth: "3px", borderLeftColor: MAROON }
                  : {}}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs"
                  style={{
                    backgroundColor: lesson.done ? "#f0fdf4"
                      : currentLesson.id === lesson.id ? MAROON
                      : "#F5F5F5",
                    color: currentLesson.id === lesson.id && !lesson.done ? "white" : undefined,
                  }}
                >
                  {lesson.done
                    ? <CheckCircle size={14} className="text-green-600" />
                    : currentLesson.id === lesson.id
                      ? <Play size={11} className="text-white ml-0.5" />
                      : <span className="text-muted-foreground font-medium">{i + 1}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-medium leading-snug"
                    style={{ color: currentLesson.id === lesson.id ? MAROON : "#1A1A1A" }}
                  >
                    {lesson.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                    {lesson.done && (
                      <span className="text-xs text-green-600 flex items-center gap-0.5 font-medium">
                        <CheckCircle size={9} /> ดูแล้ว
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ── Profile Page ───────────────────────────────────────────────────────
  const profilePage = (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">โปรไฟล์ของฉัน</h1>

      <div className="bg-white rounded-xl border border-border p-6 mb-4">
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0"
            style={{ backgroundColor: MAROON }}
          >
            น
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">นิว วิชัยพงศ์</h2>
            <p className="text-sm text-muted-foreground">niw@university.ac.th</p>
            <span
              className="inline-block px-2.5 py-0.5 rounded text-xs font-medium mt-1"
              style={{ backgroundColor: `${MAROON}18`, color: MAROON }}
            >
              นักเรียน
            </span>
          </div>
          <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted/40 transition-colors">
            แก้ไขข้อมูล
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "คอร์สทั้งหมด", value: myCourses.length },
            { label: "เรียนจบแล้ว", value: completedCourses.length },
            { label: "ชั่วโมงเรียน", value: "24h" },
          ].map(s => (
            <div key={s.label} className="rounded-lg p-3 text-center" style={{ backgroundColor: "#FAFAFA" }}>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 mb-4">
        <h3 className="font-semibold text-foreground mb-4">ประวัติการสั่งซื้อ</h3>
        <div className="space-y-3">
          {myCourses.map(course => (
            <div key={course.id} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
              <img src={course.image} alt="" className="w-12 h-9 rounded-lg object-cover bg-muted flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{course.title}</p>
                <p className="text-xs text-muted-foreground">ชำระแล้ว 15 ม.ค. 2567</p>
              </div>
              <span className="text-sm font-bold text-foreground flex-shrink-0">฿{course.price.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => { setIsLoggedIn(false); navigate("landing"); }}
        className="flex items-center gap-2 px-4 py-3 border rounded-xl text-sm font-medium transition-colors hover:bg-red-50"
        style={{ borderColor: "#fca5a5", color: "#dc2626" }}
      >
        <LogOut size={15} />
        ออกจากระบบ
      </button>
    </div>
  );

  // ── Render ─────────────────────────────────────────────────────────────
  const renderPage = () => {
    switch (page) {
      case "landing":    return landingPage;
      case "catalog":    return catalogPage;
      case "detail":     return detailPage;
      case "auth":       return authPage;
      case "checkout":   return checkoutPage;
      case "my-courses": return myCoursesPage;
      case "learning":   return learningPage;
      case "profile":    return profilePage;
      default:           return landingPage;
    }
  };

  return (
    <div
      className="min-h-screen bg-background"
      style={{ fontFamily: "'Noto Sans Thai', 'Inter', sans-serif" }}
    >
      {navbar}
      <main>{renderPage()}</main>
      {page !== "learning" && footer}
    </div>
  );
}
