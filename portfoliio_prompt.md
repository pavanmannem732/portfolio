Build me a complete, production-ready developer portfolio website for a Python backend developer. 
I want it to stand out from generic template portfolios — it should feel crafted, not templated.

CONTEXT ON ME:
- Python backend developer (mention: Django/FastAPI/Flask, REST APIs, PostgreSQL/Redis, 
  Docker, microservices, cloud/AWS — adjust to my actual stack, ask me only if truly blocking)
- Target audience: recruiters and engineering managers, not designers

DESIGN DIRECTION (backend-dev themed, not another generic gradient-hero template):
- Dark mode as default (no light/dark toggle needed unless trivial) — code-editor/terminal 
  aesthetic done tastefully, not gimmicky. Think: monospace accents for labels/tags/code, 
  a real syntax-highlighted code snippet or terminal window as a hero element, subtle grid/
  dot background texture.
- Minimal, confident layout — lots of whitespace, strong typography hierarchy. Do NOT overload 
  every element with animation. Motion should support content, not distract from it.
- One standout signature interaction (pick ONE, don't do all): 
  e.g. an animated terminal that "types" commands and shows fake API responses, 
  or a live-feeling architecture diagram of a project that assembles on scroll, 
  or a subtle interactive particle/network background representing distributed systems.
- Smooth scroll-triggered reveals for sections (Framer Motion or GSAP + ScrollTrigger), 
  micro-interactions on hover for project cards and buttons, smooth page transitions.
- Fully responsive, mobile-first. Assume 60-70% of traffic is mobile — animations must degrade 
  gracefully and never hurt mobile performance.

TECH STACK:
- Next.js (App Router) + TypeScript + Tailwind CSS
- Framer Motion for UI animation, GSAP + ScrollTrigger for scroll-driven effects
- Three.js / React Three Fiber ONLY if you use it for the one signature hero element — 
  keep it lightweight, lazy-loaded, with a fallback for low-end devices
- Deployable to Vercel out of the box

SECTIONS TO BUILD:
1. Hero — name, title, one-line value prop, the signature animated element, CTA buttons 
   (resume download, contact, GitHub)
2. About — short narrative, skills matrix (grouped: languages, frameworks, databases, 
   infra/devops), presented visually not as a boring bullet list
3. Projects — 3-5 flagship projects as cards: title, short description, tech stack tags, 
   live demo + GitHub links, architecture highlight if relevant. Use placeholder content 
   with clear TODO comments where I need to plug in my real projects
4. Experience/Timeline — animated vertical timeline
5. Contact — simple form (or mailto), links to GitHub/LinkedIn/email

PERFORMANCE & QUALITY BARS (non-negotiable):
- Lighthouse performance score 90+, zero layout shift, images optimized (next/image), 
  fonts self-hosted/optimized
- Clean, componentized code — no giant single-file pages
- Accessible: proper semantic HTML, keyboard nav, reduced-motion media query respected 
  for all animations
- SEO basics: meta tags, OpenGraph image, sitemap

INSTRUCTIONS FOR HOW YOU WORK ON THIS:
- Do NOT overthink or over-plan. Set up the project, then build section by section, 
  end to end, in one continuous pass.
- Do NOT stop halfway through to ask permission for standard decisions — make reasonable 
  choices yourself and keep moving. Only ask me if something is truly ambiguous or blocking 
  (e.g. you need real project data from me).
- Do NOT stop until the entire site is built, styled, animated, responsive, and running 
  cleanly with `npm run dev` with zero console errors.
- Be token-efficient: don't re-read files you just wrote, don't re-explain what you're about 
  to do in long paragraphs, just build. Use concise commit-style summaries between steps, 
  not essays.
- At the very end, give me a short summary of what was built, what placeholder content I 
  need to replace, and the exact command to run it locally.

Start now: scaffold the Next.js + TypeScript + Tailwind project, install the animation 
libraries, then build straight through all sections without stopping.