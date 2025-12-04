import { getProjects } from "@/lib/db";
import { ProjectsList } from "@/components/ProjectsList";
import { PageHeader } from "@/components/PageHeader";

export default async function Projects() {
  const projects = await getProjects();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader 
        title="PROJECTS" 
        description="A collection of my work, side projects, and experiments." 
      />

      <ProjectsList initialProjects={projects} />
    </div>
  );
}
