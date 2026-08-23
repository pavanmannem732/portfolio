"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/portfolio";
import { Terminal } from "@/components/ui/Terminal";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Hero() {
  return (
    <section
      id="hero"
      className="section-padding flex min-h-[90vh] flex-col justify-center pt-24 md:pt-32"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 font-mono text-sm tracking-widest text-accent uppercase"
          >
            {"// backend engineer"}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            {siteConfig.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 font-mono text-lg text-accent md:text-xl"
          >
            {siteConfig.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button href={siteConfig.resumeUrl} download variant="primary">
              Download resume
            </Button>
            <Button href="#contact" variant="secondary">
              Get in touch
            </Button>
            <Button href={siteConfig.github} external variant="ghost">
              GitHub →
            </Button>
          </motion.div>
        </div>

        <ScrollReveal className="w-full">
          <Terminal />
        </ScrollReveal>
      </div>
    </section>
  );
}
