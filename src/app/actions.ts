"use server";

import { revalidatePath } from "next/cache";
import { 
  getProjects, 
  updateProjects, 
  getProfile, 
  updateProfile, 
  Project, 
  ProfileData 
} from "@/lib/db";
import fs from "fs";
import path from "path";

// --- Admin Verification ---
export async function verifyAdmin(passcode: string) {
  // In a real app, use environment variables for secrets
  // For this demo, we'll use a hardcoded secret or env var
  const SECRET = process.env.ADMIN_SECRET || "konami"; 
  
  if (passcode === SECRET) {
    return { success: true };
  }
  return { success: false, error: "Invalid passcode" };
}

// --- Projects ---
export async function saveProjects(projects: Project[]) {
  try {
    await updateProjects(projects);
    revalidatePath("/projects");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to save projects:", error);
    return { success: false, error: "Failed to save projects" };
  }
}

// --- Profile ---
export async function saveProfile(profile: ProfileData) {
  try {
    await updateProfile(profile);
    revalidatePath("/");
    revalidatePath("/about");
    return { success: true };
  } catch (error) {
    console.error("Failed to save profile:", error);
    return { success: false, error: "Failed to save profile" };
  }
}

// --- Blog ---
export async function createBlogPost(filename: string, content: string) {
  try {
    // Basic sanitization for filename
    const safeFilename = filename.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
    const filePath = path.join(process.cwd(), "content/blogs", `${safeFilename}.md`);
    
    fs.writeFileSync(filePath, content, "utf-8");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to create blog post:", error);
    return { success: false, error: "Failed to create blog post" };
  }
}

// --- Fetch Actions (for Client Components) ---
export async function fetchProfile() {
  return await getProfile();
}

export async function fetchProjects() {
  return await getProjects();
}
