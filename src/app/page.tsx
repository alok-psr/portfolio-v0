import { getProfile, getProjects } from "@/lib/db";
import { HomeClient } from "@/components/HomeClient";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    title: `${profile.name} | ${profile.title}`,
    description: profile.about.description1,
  };
}

export default async function Home() {
  const profile = await getProfile();
  
  if (!profile) {
    return <div className="p-8 text-center">Failed to load profile data.</div>;
  }

  const projects = await getProjects();

  return <HomeClient profile={profile} projects={projects} />;
}
