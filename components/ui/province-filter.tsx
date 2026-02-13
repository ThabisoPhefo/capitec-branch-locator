"use client"

import { FilterChip } from "./filter-chip"
import { cn } from "@/lib/utils"

interface ProvinceFilterProps {
  provinces: string[]
  selectedProvince: string
  onProvinceChange: (province: string) => void
  className?: string
  size?: "sm" | "md"
  wrap?: boolean
}

export function ProvinceFilter({
  provinces,
  selectedProvince,
  onProvinceChange,
  className,
  size = "md",
  wrap = false,
}: ProvinceFilterProps) {
  return (
    <div
      className={cn(
        "flex gap-1.5",
        wrap ? "flex-wrap" : "overflow-x-auto no-scrollbar",
        className
      )}
    >
      {provinces.map((province) => (
        <FilterChip
          key={province}
          label={province}
          isSelected={selectedProvince === province}
          onClick={() => onProvinceChange(province)}
          size={size}
          className={size === "sm" ? "shadow-sm" : ""}
        />
      ))}
    </div>
  )
}

