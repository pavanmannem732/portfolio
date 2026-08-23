"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { aboutText, skills } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const skillGroups = [
  { key: "languages" as const, label: "Languages" },
  { key: "frameworks" as const, label: "Frameworks" },
  { key: "databases" as const, label: "Databases" },
  { key: "infra" as const, label: "Infra / DevOps" },
];

export function About() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="about" className="section-padding">
      <ScrollReveal>
        <SectionHeading
          label="// about"
          title="Building systems that scale quietly"
          description="Backend engineering is where reliability meets craft. Here's what I work with and how I think about building software."
        />
      </ScrollReveal>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal delay={0.1}>
          <div className="space-y-4 text-base leading-relaxed text-muted md:text-lg">
            {aboutText.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div
                key={group.key}
                className="rounded-lg border border-border bg-surface/40 p-5"
              >
                <h3 className="mb-3 font-mono text-xs tracking-widest text-accent uppercase">
                  {group.label}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {skills[group.key].map((skill) => (
                    <motion.li
                      key={skill}
                      whileHover={
                        reducedMotion ? undefined : { scale: 1.05, y: -1 }
                      }
                      className="rounded-md border border-border/60 bg-background/60 px-2.5 py-1 font-mono text-xs text-foreground"
                    >
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
