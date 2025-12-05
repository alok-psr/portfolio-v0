import { PageHeader } from "@/components/PageHeader";
import { getExperience } from "@/lib/db";
import { ExperienceClient } from "@/components/ExperienceClient";

export default async function Experience() {
  const experiences = await getExperience();

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <PageHeader 
        title="EXPERIENCE" 
        description="My professional journey and the skills I've honed along the way." 
      />

      <ExperienceClient experiences={experiences} />
    </div>
  );
}
