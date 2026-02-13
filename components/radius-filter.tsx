"use client"

import { MapPin } from "lucide-react"
import { FilterChip } from "./ui/filter-chip"
import { cn } from "@/lib/utils"

interface RadiusFilterProps {
  radiusKm: number
  onRadiusChange: (km: number) => void
  radiusOptions: readonly number[]
  userLocation: { lat: number; lng: number } | null
  compact?: boolean
}

export function RadiusFilter({
  radiusKm,
  onRadiusChange,
  radiusOptions,
  userLocation,
  compact = false,
}: RadiusFilterProps) {
  if (!userLocation) {
    return (
      <div className={cn("flex items-center gap-1.5 text-muted-foreground", compact ? "text-[10px]" : "text-[11px]")}>
        <MapPin className={cn(compact ? "h-3 w-3" : "h-3.5 w-3.5")} />
        <span>Enable location for distance filter</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className={cn("flex items-center gap-1.5 text-muted-foreground", compact ? "text-[10px]" : "text-[11px]")}>
        <MapPin className={cn(compact ? "h-3 w-3" : "h-3.5 w-3.5")} />
        <span>Radius: {radiusKm === 0 ? "All distances" : `${radiusKm} km`}</span>
      </div>
      <div className={cn("flex flex-wrap", compact ? "gap-1" : "gap-1.5")}>
        {radiusOptions.map((km) => (
          <FilterChip
            key={km}
            label={km === 0 ? "All" : `${km} km`}
            isSelected={radiusKm === km}
            onClick={() => onRadiusChange(km)}
            size={compact ? "sm" : "md"}
            className={compact ? "" : "px-2.5"}
          />
        ))}
      </div>
    </div>
  )
}
