import { getProjects } from "@/lib/db";
import { ProjectsList } from "@/components/ProjectsList";

export default async function Projects() {
  const projects = await getProjects();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold">Projects</h1>
        <p className="text-muted-foreground max-w-2xl">
          A collection of my work, side projects, and experiments.
        </p>
      </div>

      <ProjectsList initialProjects={projects} />
    </div>
  );
}
