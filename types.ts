import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string; // Placeholder URL
  featured?: boolean;
  size?: 'normal' | 'wide' | 'tall' | 'large';
}

export type ContentBlock =
  | { type: 'text'; content: string }
  | { type: 'code'; language: string; code: string; caption?: string }
  | { type: 'mermaid'; diagram: string; caption?: string };

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
  content?: ContentBlock[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  logo?: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon?: LucideIcon;
}

export interface TechStackItem {
  name: string;
  icon: string;
}

export interface ResumeItem {
  url: string;
  label: string;
}
