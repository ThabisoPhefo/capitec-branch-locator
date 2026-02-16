"use client"

import { MapPin, Phone, Navigation } from "lucide-react"
import type { Branch } from "@/lib/branches"
import { cn } from "@/lib/utils"

interface MobileBranchCardProps {
  branch: Branch & { distanceKm?: number | null }
  isSelected: boolean
  onSelect: (branch: Branch) => void
}

export function MobileBranchCard({ branch, isSelected, onSelect }: MobileBranchCardProps) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(branch)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect(branch)
        }
      }}
      className={cn(
        "shrink-0 w-[260px] snap-center rounded-xl border bg-card p-3.5 cursor-pointer transition-all duration-200",
        "shadow-lg hover:shadow-xl flex flex-col",
        isSelected
          ? "border-foreground/30 ring-1 ring-foreground/10"
          : "border-border/50"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-xs font-semibold text-card-foreground leading-snug line-clamp-2">
          {branch.name}
        </h3>
        <span
          className={cn(
            "shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-medium",
            branch.isOpen
              ? "bg-foreground/5 text-foreground/70"
              : "bg-destructive/10 text-destructive"
          )}
        >
          {branch.isOpen ? "Open" : "Closed"}
        </span>
      </div>

      <div className="mt-2 flex items-start gap-1.5 text-muted-foreground">
        <MapPin className="h-3 w-3 shrink-0 mt-0.5" />
        <span className="text-[10px] leading-relaxed line-clamp-2">
          {branch.address}, {branch.city}
        </span>
      </div>

      <div className="mt-1 flex items-center gap-1.5 text-muted-foreground">
        <Phone className="h-3 w-3 shrink-0" />
        <span className="text-[10px]">{branch.phone}</span>
      </div>

      <div className="flex-1" />

      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="mt-2.5 flex items-center justify-center gap-1.5 w-full rounded-lg bg-foreground py-1.5 text-[10px] font-semibold text-primary-foreground transition-opacity hover:opacity-80"
      >
        <Navigation className="h-3 w-3" />
        Get Directions
      </a>
    </div>
  )
}
