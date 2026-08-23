"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type TerminalLine =
  | { type: "command"; text: string }
  | { type: "output"; text: string; color?: string };

const sequence: TerminalLine[] = [
  { type: "command", text: "$ curl -s localhost:8000/api/health" },
  {
    type: "output",
    text: '{ "status": "ok", "service": "api-gateway", "uptime": "99.97%" }',
    color: "text-syntax-string",
  },
  { type: "command", text: "$ python manage.py migrate --check" },
  {
    type: "output",
    text: "✓ All migrations applied. Database schema is current.",
    color: "text-syntax-comment",
  },
  { type: "command", text: "$ docker compose up -d --scale worker=3" },
  {
    type: "output",
    text: "✓ Started 3 worker replicas. Queue depth: 0",
    color: "text-accent",
  },
];

function TerminalShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="overflow-hidden rounded-lg border border-border bg-[#0d1117] shadow-2xl shadow-black/40"
      role="region"
      aria-label="Interactive terminal demo"
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
        <span className="ml-2 font-mono text-xs text-muted">
          backend-dev ~ zsh
        </span>
      </div>
      <div className="h-64 overflow-y-auto p-4 font-mono text-sm leading-relaxed md:h-72">
        {children}
      </div>
    </div>
  );
}

function TerminalLineView({ line }: { line: TerminalLine }) {
  if (line.type === "command") {
    return <span className="text-foreground">{line.text}</span>;
  }
  return (
    <span className={line.color ?? "text-muted"}>{line.text}</span>
  );
}

function StaticTerminal() {
  return (
    <TerminalShell>
      {sequence.map((line, i) => (
        <div key={i} className="mb-2">
          <TerminalLineView line={line} />
        </div>
      ))}
    </TerminalShell>
  );
}

function AnimatedTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [seqIndex, setSeqIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = sequence[seqIndex];
    if (!current) {
      const resetTimer = setTimeout(() => {
        setLines([]);
        setSeqIndex(0);
        setCharIndex(0);
        setCurrentLine("");
      }, 4000);
      return () => clearTimeout(resetTimer);
    }

    if (current.type === "output") {
      const outputTimer = setTimeout(() => {
        setLines((prev) => [...prev, current]);
        setSeqIndex((prev) => prev + 1);
        setCharIndex(0);
        setCurrentLine("");
      }, 300);
      return () => clearTimeout(outputTimer);
    }

    const fullText = current.text;
    if (charIndex < fullText.length) {
      const typeTimer = setTimeout(() => {
        setCurrentLine(fullText.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 35);
      return () => clearTimeout(typeTimer);
    }

    const lineDoneTimer = setTimeout(() => {
      setLines((prev) => [...prev, current]);
      setSeqIndex((prev) => prev + 1);
      setCharIndex(0);
      setCurrentLine("");
    }, 600);

    return () => clearTimeout(lineDoneTimer);
  }, [seqIndex, charIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [lines, currentLine]);

  return (
    <TerminalShell>
      <div ref={containerRef} className="h-full overflow-y-auto">
        {lines.map((line, i) => (
          <div key={i} className="mb-2">
            <TerminalLineView line={line} />
          </div>
        ))}
        {currentLine && (
          <div className="text-foreground">
            {currentLine}
            <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-accent" />
          </div>
        )}
      </div>
    </TerminalShell>
  );
}

export function Terminal() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <StaticTerminal />;
  }

  return <AnimatedTerminal />;
}
