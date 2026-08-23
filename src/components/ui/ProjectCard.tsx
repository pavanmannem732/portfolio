"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={
        reducedMotion
          ? undefined
          : { y: -4, transition: { duration: 0.2 } }
      }
      className={cn(
        "group flex flex-col rounded-lg border border-border bg-surface/30 p-6",
        "transition-colors hover:border-accent/30 hover:bg-surface/50",
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <span className="shrink-0 font-mono text-xs text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      {project.architecture && (
        <div className="mb-4 rounded-md border border-border/50 bg-background/40 p-3">
          <p className="mb-1 font-mono text-[10px] tracking-widest text-accent uppercase">
            Architecture
          </p>
          <p className="font-mono text-xs leading-relaxed text-muted">
            {project.architecture}
          </p>
        </div>
      )}

      <div className="mb-5 flex flex-wrap gap-2">
        {project.tech.map((tag) => (
          <span
            key={tag}
            className="rounded border border-border/60 px-2 py-0.5 font-mono text-[11px] text-foreground/80"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 font-mono text-xs">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            live demo →
          </a>
        )}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-foreground hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          github →
        </a>
      </div>
    </motion.article>
  );
}
