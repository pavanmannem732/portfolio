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
          start: "top 70%",
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

      <div ref={timelineRef} className="relative mx-auto max-w-3xl">
        <div
          ref={lineRef}
          className="absolute top-0 left-[7px] h-full w-px bg-accent/40 md:left-1/2 md:-translate-x-px"
          aria-hidden
        />

        <ol className="space-y-12">
          {experience.map((item, index) => (
            <ScrollReveal key={item.company} delay={index * 0.05}>
              <li className="relative pl-8 md:grid md:grid-cols-2 md:gap-8 md:pl-0">
                <div
                  className={`absolute top-1 left-0 h-3.5 w-3.5 rounded-full border-2 border-accent bg-background md:left-1/2 md:-translate-x-1/2 ${
                    index % 2 === 0 ? "md:col-start-1" : "md:col-start-2"
                  }`}
                  aria-hidden
                />

                <div
                  className={`md:col-start-1 ${
                    index % 2 === 0
                      ? "md:col-start-1 md:text-right md:pr-10"
                      : "md:col-start-2 md:pl-10"
                  }`}
                >
                  <p className="font-mono text-xs tracking-widest text-accent uppercase">
                    {item.period}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">
                    {item.role}
                  </h3>
                  <p className="font-mono text-sm text-muted">{item.company}</p>
                </div>

                <div
                  className={`mt-4 md:mt-0 ${
                    index % 2 === 0
                      ? "md:col-start-2 md:pl-10"
                      : "md:col-start-1 md:pr-10 md:text-right"
                  }`}
                >
                  <p className="text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-left">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-sm text-muted before:mr-2 before:font-mono before:text-accent before:content-['→']"
                      >
                        {highlight}
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
