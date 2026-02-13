"use client"

import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface IconButtonProps {
  icon: LucideIcon
  onClick: () => void
  ariaLabel: string
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "secondary" | "ghost"
}

const sizeClasses = {
  sm: "h-7 w-7",
  md: "h-8 w-8",
  lg: "h-9 w-9",
}

const iconSizeClasses = {
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
  lg: "h-4 w-4",
}

const variantClasses = {
  default: "bg-card shadow-md border border-border/60",
  secondary: "bg-secondary",
  ghost: "bg-transparent hover:bg-foreground/5",
}

export function IconButton({
  icon: Icon,
  onClick,
  ariaLabel,
  className,
  size = "md",
  variant = "default",
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-lg cursor-pointer transition-colors",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      aria-label={ariaLabel}
    >
      <Icon className={cn("text-foreground", iconSizeClasses[size])} />
    </button>
  )
}

