import { projects } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="section-padding">
      <ScrollReveal>
        <SectionHeading
          label="// projects"
          title="Flagship work"
          description="Selected backend systems I've designed and shipped — APIs, pipelines, and platforms built for production load."
        />
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
