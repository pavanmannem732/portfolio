export const siteConfig = {
  name: "Pavan Mannem",
  title: "Python Full Stack Developer",
  tagline:
    "I build production-ready web apps and APIs with Python — from Django and FastAPI backends to React and Next.js frontends.",
  email: "pavanmannem42@gmail.com",
  phone: "+91 7337381618",
  github: "https://github.com/pavanmannem732",
  linkedin: "https://www.linkedin.com/in/pavan-mannem-090175247",
  resumeUrl: "/resume.pdf",
  siteUrl: "https://portfolio-tan-eight-12.vercel.app",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://pavan-portfolio-api-lr4f.onrender.com",
};

export const skills = {
  languages: ["Python", "JavaScript", "TypeScript", "SQL", "HTML/CSS"],
  frameworks: ["Django", "FastAPI", "Flask", "React", "Next.js"],
  databases: ["PostgreSQL", "MySQL", "SQLite", "Redis"],
  infra: ["Docker", "Git", "GitHub Actions", "REST APIs", "SMTP"],
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl: string;
  architecture?: string;
};

export const projects: Project[] = [
  {
    title: "Festival Wish Platform (Celebrations)",
    description:
      "Config-driven festival greeting platform with dynamic template engine — users create and share personalized wishes with animated layouts, countdown reveals, and AI-assisted content.",
    tech: ["FastAPI", "React", "PostgreSQL", "SQLAlchemy", "Docker"],
    liveUrl: "https://celebrations-frontend-ten.vercel.app",
    githubUrl: "https://github.com/pavanmannem732/celebrations",
    architecture:
      "React SPA → FastAPI /api/v1 → Repository layer → PostgreSQL | Config-driven TemplateRenderer → S3/static media storage",
  },
  {
    title: "NLQuery Platform (Dialect)",
    description:
      "Natural language to SQL platform with real-time query execution, result sharing, and analytics dashboards for data teams.",
    tech: ["FastAPI", "Next.js", "PostgreSQL", "Redis", "Dramatiq", "Docker"],
    githubUrl: "https://github.com/pavanmannem732/Dialect",
    architecture:
      "Next.js App Router → FastAPI API → SQLAlchemy + Alembic → PostgreSQL | Redis cache → Dramatiq workers → Prometheus/Grafana",
  },
  {
    title: "CA-OS — AI Practice Management",
    description:
      "Practice management intelligence layer for Indian CA firms — client portals, GST compliance calendars, document workflows, and AI-assisted notice responses.",
    tech: ["FastAPI", "Next.js", "PostgreSQL", "Celery", "Terraform"],
    githubUrl: "https://github.com/pavanmannem732/ca-os",
    architecture:
      "Next.js dashboard + client portal → FastAPI routers → Services/agents layer → PostgreSQL + Redis → Celery tasks → S3 document storage",
  },
  {
    title: "FillTheGap — Student Results Portal",
    description:
      "Django web portal for college result management — bulk Excel import, hall-ticket lookup, semester-wise SGPA/CGPA tracking, and captcha-protected uploads.",
    tech: ["Django", "PostgreSQL", "Pandas", "OpenPyXL", "Bootstrap"],
    githubUrl: "https://github.com/pavanmannem732/fillthegap",
    architecture:
      "Django views/templates → Core models (College, Student, SemesterResult) → Pandas Excel import pipeline → PostgreSQL",
  },
];

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Python Full Stack Developer",
    company: "Phenome Cloud Pvt Ltd",
    period: "Nov 2025 — Present",
    description:
      "Building and shipping full-stack Python applications for production clients — APIs, dashboards, and deployment pipelines.",
    highlights: [
      "Develop FastAPI and Django backends with PostgreSQL data models",
      "Build React/Next.js frontends integrated with REST APIs",
      "Containerize services with Docker for staging and production deploys",
    ],
  },
  {
    role: "Python Full Stack Intern",
    company: "Qspiders",
    period: "Jun 2025 — Nov 2025",
    description:
      "Intensive full-stack training and hands-on project work across Python web frameworks and databases.",
    highlights: [
      "Built end-to-end web apps with Django, Flask, and FastAPI",
      "Practiced SQL, REST API design, and frontend integration",
      "Completed capstone projects simulating real client requirements",
    ],
  },
  {
    role: "B.Tech — Computer Science & Business Systems",
    company: "Sree Datta Institutions",
    period: "2021 — 2025",
    description:
      "Full-time undergraduate program focused on software engineering, databases, and business systems integration. Graduated with 7.5 CGPA.",
    highlights: [
      "Core coursework: data structures, DBMS, web technologies, software engineering",
      "Built multiple academic projects including hostel management and expense trackers",
      "Active in hands-on coding and project-based learning",
    ],
  },
];

export const aboutText = [
  "I'm a Python full stack developer based in Vijayawada, currently building production applications at Phenome Cloud. I work across the stack — Django and FastAPI on the backend, React and Next.js on the frontend — with PostgreSQL as my go-to database.",
  "My recent work includes a config-driven festival wish platform, a natural-language-to-SQL tool, a CA firm practice management system, and a college results portal. I care about clean architecture: repositories, services, schemas, and routes separated properly so projects stay maintainable as they grow.",
  "I'm open to full-stack Python roles and collaboration on real-world projects. Reach out via the contact form or connect on LinkedIn.",
];
