import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src/data");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const PROFILE_FILE = path.join(DATA_DIR, "profile.json");

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  github?: string;
  image?: string;
  featured?: boolean;
}

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  about: {
    title: string;
    subtitle: string;
    description1: string;
    description2: string;
    description3: string;
  };
  image: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
  skills: {
    frontend: string[];
    backend: string[];
    tools: string[];
  };
}

// Helper to read JSON
function readJson<T>(filePath: string): T {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

// Helper to write JSON
function writeJson<T>(filePath: string, data: T): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// Projects
export async function getProjects(): Promise<Project[]> {
  return readJson<Project[]>(PROJECTS_FILE);
}

export async function updateProjects(projects: Project[]): Promise<void> {
  writeJson(PROJECTS_FILE, projects);
}

// Profile
export async function getProfile(): Promise<ProfileData> {
  return readJson<ProfileData>(PROFILE_FILE);
}

export async function updateProfile(profile: ProfileData): Promise<void> {
  writeJson(PROFILE_FILE, profile);
}

// Experience
const EXPERIENCE_FILE = path.join(DATA_DIR, "experience.json");

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

export async function getExperience(): Promise<Experience[]> {
  return readJson<Experience[]>(EXPERIENCE_FILE);
}
