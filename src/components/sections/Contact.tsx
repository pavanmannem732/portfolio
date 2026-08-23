"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(`${siteConfig.apiUrl}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail?.[0]?.msg ?? "Failed to send message");
      }

      setStatus("success");
      setFeedback(result.message);
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Something went wrong. Email me directly instead.",
      );
    }
  }

  return (
    <section id="contact" className="section-padding">
      <ScrollReveal>
        <SectionHeading
          label="// contact"
          title="Let's build something together"
          description="Open to full-stack Python roles and project collaborations. Send a message — I typically respond within 48 hours."
        />
      </ScrollReveal>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block font-mono text-xs tracking-widest text-muted uppercase"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                disabled={status === "loading"}
                className="w-full rounded-md border border-border bg-surface/40 px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none disabled:opacity-60"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-mono text-xs tracking-widest text-muted uppercase"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                disabled={status === "loading"}
                className="w-full rounded-md border border-border bg-surface/40 px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none disabled:opacity-60"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block font-mono text-xs tracking-widest text-muted uppercase"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                minLength={10}
                disabled={status === "loading"}
                className="w-full resize-y rounded-md border border-border bg-surface/40 px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none disabled:opacity-60"
                placeholder="Tell me about the role or project..."
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Send message"}
            </button>
            {feedback && (
              <p
                className={`font-mono text-xs ${status === "error" ? "text-red-400" : "text-accent"}`}
                role="status"
              >
                {feedback}
              </p>
            )}
          </form>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-col justify-center space-y-6">
            <div className="rounded-lg border border-border bg-surface/30 p-6">
              <p className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">
                Direct links
              </p>
              <ul className="space-y-3 font-mono text-sm">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors hover:text-accent"
                  >
                    GitHub →
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors hover:text-accent"
                  >
                    LinkedIn →
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button href={siteConfig.github} external variant="secondary">
                GitHub
              </Button>
              <Button href={siteConfig.linkedin} external variant="secondary">
                LinkedIn
              </Button>
              <Button href={`mailto:${siteConfig.email}`} variant="secondary">
                Email me
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
