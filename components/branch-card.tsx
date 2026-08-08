"use client"

import { MapPin, Phone, Clock, ChevronDown, Navigation } from "lucide-react"
import { useState } from "react"
import { getDirectionsUrl, type BranchWithDistance } from "@/lib/branches"
import { cn } from "@/lib/utils"

export type BranchCardVariant = "default" | "compact"

interface BranchCardProps {
  branch: BranchWithDistance
  isSelected: boolean
  onSelect: (branch: BranchWithDistance) => void
  /** "default" is the full sidebar/drawer card; "compact" is the fixed-width carousel card. */
  variant?: BranchCardVariant
}

function formatDistance(distanceKm: number): string {
  return distanceKm < 1 ? `${Math.round(distanceKm * 1000)} m` : `${distanceKm.toFixed(1)} km`
}

function StatusBadge({ isOpen, compact }: { isOpen: boolean; compact?: boolean }) {
  return (
    <span
      className={cn(
        "shrink-0 inline-flex items-center rounded-full font-medium",
        compact ? "px-1.5 py-0.5 text-[9px]" : "px-2 py-0.5 text-[10px]",
        isOpen ? "bg-foreground/5 text-foreground/70" : "bg-destructive/10 text-destructive"
      )}
    >
      {isOpen ? "Open" : "Closed"}
    </span>
  )
}

function DistanceRow({ distanceKm, compact }: { distanceKm: number; compact?: boolean }) {
  return (
    <div
      className={cn(
        "mt-1 flex items-center gap-1 text-muted-foreground font-medium",
        compact ? "text-[9px]" : "text-[10px]"
      )}
    >
      <Navigation className="h-3 w-3" />
      <span>{formatDistance(distanceKm)} away</span>
    </div>
  )
}

function AddressRow({ branch, compact }: { branch: BranchWithDistance; compact?: boolean }) {
  return (
    <div className="mt-2 flex items-start gap-1.5 text-muted-foreground">
      <MapPin className={cn("shrink-0 mt-0.5", compact ? "h-3 w-3" : "h-3.5 w-3.5")} />
      <span className={cn("leading-relaxed", compact ? "text-[10px] line-clamp-2" : "text-xs")}>
        {branch.address}, {branch.city}
      </span>
    </div>
  )
}

function PhoneRow({ phone, compact }: { phone: string; compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-1.5 text-muted-foreground", compact ? "mt-1" : "mt-1.5")}>
      <Phone className={cn("shrink-0", compact ? "h-3 w-3" : "h-3.5 w-3.5")} />
      <span className={compact ? "text-[10px]" : "text-xs"}>{phone}</span>
    </div>
  )
}

function DirectionsLink({ url, compact }: { url: string; compact?: boolean }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "flex items-center justify-center gap-1.5 w-full rounded-lg bg-foreground font-semibold text-primary-foreground transition-opacity hover:opacity-80",
        compact ? "mt-2.5 py-1.5 text-[10px]" : "mt-3 py-2 text-[11px]"
      )}
    >
      <Navigation className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
      Get Directions
    </a>
  )
}

export function BranchCard({ branch, isSelected, onSelect, variant = "default" }: BranchCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const directionsUrl = getDirectionsUrl(branch)
  const isCompact = variant === "compact"

  const selectionProps = {
    role: "button" as const,
    tabIndex: 0,
    onClick: () => onSelect(branch),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        onSelect(branch)
      }
    },
  }

  if (isCompact) {
    return (
      <div
        {...selectionProps}
        className={cn(
          "shrink-0 w-[260px] snap-center rounded-xl border bg-card p-3.5 cursor-pointer transition-all duration-200",
          "shadow-lg hover:shadow-xl flex flex-col",
          isSelected ? "border-foreground/30 ring-1 ring-foreground/10" : "border-border/50"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xs font-semibold text-card-foreground leading-snug line-clamp-2">
            {branch.name}
          </h3>
          <StatusBadge isOpen={branch.isOpen} compact />
        </div>

        <AddressRow branch={branch} compact />
        <PhoneRow phone={branch.phone} compact />

        <div className="flex-1" />
        <DirectionsLink url={directionsUrl} compact />
      </div>
    )
  }

  return (
    <div
      {...selectionProps}
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
            <StatusBadge isOpen={branch.isOpen} />
          </div>

          {branch.distanceKm !== null && <DistanceRow distanceKm={branch.distanceKm} />}

          <AddressRow branch={branch} />
          <PhoneRow phone={branch.phone} />
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

          <DirectionsLink url={directionsUrl} />
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
