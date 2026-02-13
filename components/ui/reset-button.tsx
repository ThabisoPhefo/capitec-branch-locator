"use client"

import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResetButtonProps {
  onClick: () => void
  className?: string
  disabled?: boolean
}

export function ResetButton({ onClick, className, disabled }: ResetButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium",
        "bg-secondary text-secondary-foreground border border-border/60",
        "hover:bg-accent hover:text-accent-foreground",
        "transition-colors cursor-pointer",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      aria-label="Reset map view"
    >
      <RotateCcw className="h-3.5 w-3.5" />
      <span>Reset</span>
    </button>
  )
}

