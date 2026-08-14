export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  image: string;
  videoUrl?: string;
  duration?: string;
  software: string[];
  role: string;
  breakdown: {
    phase: string;
    description: string;
  }[];
  metrics: {
    label: string;
    value: string;
  }[];
  modelType?: 'shoe' | 'mech' | 'gem' | 'character';
}

export interface SkillItem {
  name: string;
  category: 'Software' | 'Core Discipline' | 'Rendering & VFX';
  level: number; // percentage
  experience: string;
  iconName: string;
  description: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}
