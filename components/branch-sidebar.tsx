"use client"

import Image from "next/image"
import { Search, SlidersHorizontal } from "lucide-react"
import { useState, useMemo } from "react"
import type { BranchWithDistance } from "./branch-locator"
import { BranchCard } from "./branch-card"
import { RadiusFilter } from "./radius-filter"
import { ResetButton } from "./ui/reset-button"
import { IconButton } from "./ui/icon-button"
import { ProvinceFilter } from "./ui/province-filter"
import { cn } from "@/lib/utils"

interface BranchSidebarProps {
  branches: BranchWithDistance[]
  selectedBranch: BranchWithDistance | null
  onSelectBranch: (branch: BranchWithDistance) => void
  userLocation: { lat: number; lng: number } | null
  radiusKm: number
  onRadiusChange: (km: number) => void
  radiusOptions: readonly number[]
  onReset?: () => void
  selectedProvince?: string
  onProvinceChange?: (province: string) => void
}

const provinces = [
  "All Provinces",
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
]

export function BranchSidebar({
  branches,
  selectedBranch,
  onSelectBranch,
  userLocation,
  radiusKm,
  onRadiusChange,
  radiusOptions,
  onReset,
  selectedProvince: controlledProvince,
  onProvinceChange,
}: BranchSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [internalProvince, setInternalProvince] = useState("All Provinces")
  const selectedProvince = controlledProvince ?? internalProvince
  const setSelectedProvince = onProvinceChange ?? setInternalProvince
  const [showFilters, setShowFilters] = useState(false)

  const filteredBranches = useMemo(() => {
    return branches.filter((branch) => {
      const matchesSearch =
        branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.address.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesProvince =
        selectedProvince === "All Provinces" || branch.province === selectedProvince

      return matchesSearch && matchesProvince
    })
  }, [branches, searchQuery, selectedProvince])

  return (
    <aside className="fixed left-0 top-0 z-[999] h-full w-[380px] flex flex-col">
      <div className="bg-card/95 backdrop-blur-sm border-r border-border/40">
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center gap-3">
            <Image
              src="/capiteclogo-preview.png"
              alt="Capitec Bank"
              width={40}
              height={24}
              className="shrink-0"
            />
            <div>
              <h1 className="text-base font-bold text-card-foreground tracking-tight">
                Branch Locator
              </h1>
              <p className="text-[11px] text-muted-foreground">
                Find your nearest Capitec branch
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, city, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-input bg-card pl-9 pr-10 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-foreground/30 transition-all"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "rounded-md p-1.5 transition-colors cursor-pointer",
                  showFilters
                    ? "bg-foreground text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-label="Toggle filters"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "overflow-hidden transition-all duration-200 px-5",
            showFilters ? "max-h-60 pb-3" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-3">
            <ProvinceFilter
              provinces={provinces}
              selectedProvince={selectedProvince}
              onProvinceChange={setSelectedProvince}
              wrap
            />

            <RadiusFilter
              radiusKm={radiusKm}
              onRadiusChange={onRadiusChange}
              radiusOptions={radiusOptions}
              userLocation={userLocation}
            />
          </div>
        </div>

        <div className="px-5 pb-3 flex items-center justify-between gap-2">
          <p className="text-[11px] text-muted-foreground">
            {filteredBranches.length} {filteredBranches.length === 1 ? "branch" : "branches"} found
          </p>
          {onReset && (
            <ResetButton 
              onClick={onReset}
              disabled={!selectedBranch && selectedProvince === "All Provinces"}
            />
          )}
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto border-r border-border/40 bg-background/50 backdrop-blur-sm py-3 sidebar-scroll"
        style={{ direction: "rtl" }}
      >
        <div className="flex flex-col gap-3 pb-6 px-4" style={{ direction: "ltr" }}>
          {filteredBranches.map((branch) => (
            <BranchCard
              key={branch.id}
              branch={branch}
              isSelected={selectedBranch?.id === branch.id}
              onSelect={(b) => onSelectBranch(b as BranchWithDistance)}
            />
          ))}

          {filteredBranches.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary mb-3">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-card-foreground">No branches found</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
