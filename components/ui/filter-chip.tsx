"use client"

import { cn } from "@/lib/utils"

interface FilterChipProps {
  label: string
  isSelected: boolean
  onClick: () => void
  className?: string
  size?: "sm" | "md"
}

const sizeClasses = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-3 py-1 text-[11px]",
}

export function FilterChip({
  label,
  isSelected,
  onClick,
  className,
  size = "md",
}: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full font-medium transition-all cursor-pointer",
        sizeClasses[size],
        isSelected
          ? "bg-foreground text-primary-foreground"
          : "bg-secondary text-secondary-foreground hover:bg-accent border border-border/60",
        className
      )}
    >
      {label}
    </button>
  )
}

