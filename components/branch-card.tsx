"use client"

import { MapPin, Phone, Clock, ChevronDown, Navigation } from "lucide-react"
import { useState } from "react"
import type { Branch } from "@/lib/branches"
import { cn } from "@/lib/utils"

interface BranchCardProps {
  branch: Branch & { distanceKm?: number | null }
  isSelected: boolean
  onSelect: (branch: Branch) => void
}

export function BranchCard({ branch, isSelected, onSelect }: BranchCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`
  const distance = (branch as { distanceKm?: number | null }).distanceKm

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
        "w-full text-left rounded-xl border bg-card p-4 transition-all duration-200 cursor-pointer",
        "hover:shadow-lg hover:-translate-y-0.5",
        "shadow-md",
        isSelected
          ? "border-foreground/30 shadow-xl ring-1 ring-foreground/10"
          : "border-border/60"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm text-card-foreground truncate">
              {branch.name}
            </h3>
            <span
              className={cn(
                "shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                branch.isOpen
                  ? "bg-foreground/5 text-foreground/70"
                  : "bg-destructive/10 text-destructive"
              )}
            >
              {branch.isOpen ? "Open" : "Closed"}
            </span>
          </div>

          {distance !== null && distance !== undefined && (
            <div className="mt-1 flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
              <Navigation className="h-3 w-3" />
              <span>{distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`} away</span>
            </div>
          )}

          <div className="mt-2 flex items-start gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <span className="text-xs leading-relaxed">{branch.address}, {branch.city}</span>
          </div>

          <div className="mt-1.5 flex items-center gap-1.5 text-muted-foreground">
            <Phone className="h-3.5 w-3.5 shrink-0" />
            <span className="text-xs">{branch.phone}</span>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isExpanded ? "max-h-72 mt-3" : "max-h-0"
        )}
      >
        <div className="border-t border-border/60 pt-3">
          <div className="flex items-start gap-1.5 text-muted-foreground mb-2">
            <Clock className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <div className="flex justify-between gap-4">
                <span>Mon - Fri</span>
                <span className="text-card-foreground font-medium">{branch.hours.weekday}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Saturday</span>
                <span className="text-card-foreground font-medium">{branch.hours.saturday}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Sunday</span>
                <span className="text-card-foreground font-medium">{branch.hours.sunday}</span>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1.5">
              Services
            </p>
            <div className="flex flex-wrap gap-1">
              {branch.services.map((service) => (
                <span
                  key={service}
                  className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-3 flex items-center justify-center gap-1.5 w-full rounded-lg bg-foreground py-2 text-[11px] font-semibold text-primary-foreground transition-opacity hover:opacity-80"
          >
            <Navigation className="h-3.5 w-3.5" />
            Get Directions
          </a>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsExpanded(!isExpanded)
        }}
        className="mt-2 flex w-full items-center justify-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        aria-label={isExpanded ? "Show less details" : "Show more details"}
      >
        <span>{isExpanded ? "Less" : "Details"}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </button>
    </div>
  )
}
