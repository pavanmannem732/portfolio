"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const line = lineRef.current;
    const container = timelineRef.current;
    if (!line || !container) return;

    if (reducedMotion) {
      gsap.set(line, { scaleY: 1 });
      return;
    }

    gsap.set(line, { scaleY: 0, transformOrigin: "top center" });

    const ctx = gsap.context(() => {
      gsap.to(line, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="experience" className="section-padding">
      <ScrollReveal>
        <SectionHeading
          label="// experience"
          title="Where I've shipped"
          description="A timeline of roles where I've owned backend systems end to end."
        />
      </ScrollReveal>

      <div ref={timelineRef} className="relative mx-auto max-w-3xl pl-6 sm:pl-8">
        {/* Vertical Timeline Line */}
        <div
          ref={lineRef}
          className="absolute top-2 left-2 sm:left-3 bottom-2 w-0.5 bg-accent/40 origin-top"
          aria-hidden
        />

        <ol className="space-y-8 sm:space-y-10">
          {experience.map((item, index) => (
            <ScrollReveal key={item.company} delay={index * 0.08}>
              <li className="relative group">
                {/* Timeline Dot Node */}
                <div
                  className="absolute -left-6 sm:-left-8 top-1.5 h-3.5 w-3.5 -translate-x-[3px] rounded-full border-2 border-accent bg-background group-hover:scale-125 group-hover:bg-accent transition-all duration-300 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                  aria-hidden
                />

                {/* Content Card */}
                <div className="rounded-xl border border-border/60 bg-card/40 p-5 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-card/70 hover:shadow-lg hover:shadow-accent/5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                        {item.role}
                      </h3>
                      <p className="font-mono text-sm text-muted mt-0.5">
                        {item.company}
                      </p>
                    </div>
                    <span className="inline-block font-mono text-xs font-medium tracking-wide text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-md">
                      {item.period}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted/90">
                    {item.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-sm text-muted/90 flex items-start gap-2.5"
                      >
                        <span className="font-mono text-accent select-none shrink-0 mt-0.5">
                          →
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
