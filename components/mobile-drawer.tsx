"use client"

import { useEffect, useState, useMemo } from "react"
import { X, Search, Layers, SlidersHorizontal } from "lucide-react"
import type { Branch } from "@/lib/branches"
import { BranchCard } from "./branch-card"
import { IconButton } from "./ui/icon-button"
import { ProvinceFilter } from "./ui/province-filter"
import { RadiusFilter } from "./radius-filter"
import { cn } from "@/lib/utils"

interface MobileDrawerProps {
  branches: Branch[]
  selectedBranch: Branch | null
  onSelectBranch: (branch: Branch) => void
  onSwitchToCarousel: () => void
  userLocation: { lat: number; lng: number } | null
  radiusKm: number
  onRadiusChange: (km: number) => void
  radiusOptions: readonly number[]
}

const provinces = [
  "All",
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
]

export function MobileDrawer({
  branches,
  selectedBranch,
  onSelectBranch,
  onSwitchToCarousel,
  userLocation,
  radiusKm,
  onRadiusChange,
  radiusOptions,
}: MobileDrawerProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProvince, setSelectedProvince] = useState("All")
  const [visibleCards, setVisibleCards] = useState<string[]>([])
  const [showRadiusFilter, setShowRadiusFilter] = useState(false)

  const filteredBranches = useMemo(() => {
    return branches.filter((branch) => {
      const matchesSearch =
        searchQuery === "" ||
        branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.city.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesProvince =
        selectedProvince === "All" || branch.province === selectedProvince
      return matchesSearch && matchesProvince
    })
  }, [branches, searchQuery, selectedProvince])

  useEffect(() => {
    if (!isOpen) {
      setVisibleCards([])
      return
    }

    setVisibleCards([])
    const ids = filteredBranches.map((b) => b.id)
    const timeouts: NodeJS.Timeout[] = []

    ids.forEach((id, i) => {
      const t = setTimeout(() => {
        setVisibleCards((prev) => [...prev, id])
      }, 60 * (i + 1))
      timeouts.push(t)
    })

    return () => timeouts.forEach(clearTimeout)
  }, [isOpen, filteredBranches])

  const handleSelect = (branch: Branch) => {
    onSelectBranch(branch)
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-xs font-semibold text-primary-foreground shadow-xl cursor-pointer transition-transform active:scale-95"
        aria-label="Open branch list"
      >
        <Layers className="h-4 w-4" />
        Browse Branches
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[1000] bg-foreground/30 backdrop-blur-[2px] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed left-0 bottom-0 right-0 z-[1001] flex flex-col bg-card rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out",
          isOpen
            ? "translate-y-0"
            : "translate-y-full"
        )}
        style={{ maxHeight: "85vh" }}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        <div className="flex items-center justify-between px-4 pb-3">
          <h2 className="text-sm font-bold text-card-foreground">All Branches</h2>
          <div className="flex items-center gap-2">
            {userLocation && (
              <IconButton
                icon={SlidersHorizontal}
                onClick={() => setShowRadiusFilter(!showRadiusFilter)}
                ariaLabel={showRadiusFilter ? "Hide distance filter" : "Show distance filter"}
                variant={showRadiusFilter ? "default" : "secondary"}
                className={showRadiusFilter ? "bg-foreground text-primary-foreground" : ""}
              />
            )}
            <IconButton
              icon={Layers}
              onClick={() => {
                setIsOpen(false)
                onSwitchToCarousel()
              }}
              ariaLabel="Switch to carousel view"
              variant="secondary"
            />
            <IconButton
              icon={X}
              onClick={() => setIsOpen(false)}
              ariaLabel="Close drawer"
              variant="secondary"
            />
          </div>
        </div>

        <div className="px-4 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search branches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-xs text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring/30"
            />
          </div>
        </div>

        <div className="px-4 pb-2">
          <ProvinceFilter
            provinces={provinces}
            selectedProvince={selectedProvince}
            onProvinceChange={setSelectedProvince}
            wrap
          />
        </div>

        {userLocation && showRadiusFilter && (
          <div className="px-4 pb-3">
            <RadiusFilter
              radiusKm={radiusKm}
              onRadiusChange={onRadiusChange}
              radiusOptions={radiusOptions}
              userLocation={userLocation}
              compact
            />
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4 pb-8 sidebar-scroll">
          <div className="flex flex-col gap-3">
            {filteredBranches.map((branch) => {
              const isVisible = visibleCards.includes(branch.id)
              return (
                <div
                  key={branch.id}
                  className="transition-all duration-300 ease-out"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateY(0)"
                      : "translateY(24px)",
                  }}
                >
                  <BranchCard
                    branch={branch}
                    isSelected={selectedBranch?.id === branch.id}
                    onSelect={handleSelect}
                  />
                </div>
              )
            })}
            {filteredBranches.length === 0 && (
              <div className="flex items-center justify-center py-12">
                <p className="text-xs text-muted-foreground">No branches found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
