export interface Course {
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

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  done: boolean;
  free: boolean;
}

export interface Testimonial {
  name: string;
  major: string;
  text: string;
  initial: string;
}

export interface Category {
  name: string;
  symbol: string;
  count: number;
}
