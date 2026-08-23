"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  download?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  external,
  download,
  className,
}: ButtonProps) {
  const reducedMotion = useReducedMotion();

  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const variants = {
    primary: "bg-accent text-background hover:bg-accent/90",
    secondary:
      "border border-border bg-surface/50 text-foreground hover:border-accent/50 hover:bg-surface",
    ghost: "text-muted hover:text-foreground",
  };

  const content = (
    <motion.span
      className={cn(baseStyles, variants[variant], className)}
      whileHover={reducedMotion ? undefined : { scale: 1.02 }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
    >
      {children}
    </motion.span>
  );

  if (external || download) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        download={download || undefined}
      >
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
}
