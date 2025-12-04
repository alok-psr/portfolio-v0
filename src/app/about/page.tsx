import { getProfile } from "@/lib/db";
import { AboutClient } from "@/components/AboutClient";

export default async function About() {
  const profile = await getProfile();

  if (!profile) {
    return <div className="p-8 text-center">Failed to load profile data.</div>;
  }

  return <AboutClient profile={profile} />;
}
