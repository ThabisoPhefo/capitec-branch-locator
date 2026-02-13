"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import Image from "next/image"
import { Search, List } from "lucide-react"
import type { Branch } from "@/lib/branches"
import { MobileBranchCard } from "./mobile-branch-card"
import { IconButton } from "./ui/icon-button"
import { ProvinceFilter } from "./ui/province-filter"
import { cn } from "@/lib/utils"
import { MobileMenuOverlay } from "./site-header"

interface MobileCarouselProps {
  branches: Branch[]
  selectedBranch: Branch | null
  onSelectBranch: (branch: Branch) => void
  onSwitchToDrawer: () => void
}

const provinces = [
  "All",
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
]

export function MobileCarousel({
  branches,
  selectedBranch,
  onSelectBranch,
  onSwitchToDrawer,
}: MobileCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProvince, setSelectedProvince] = useState("All")
  const [showSearch, setShowSearch] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
    if (!selectedBranch || !scrollRef.current) return
    const index = filteredBranches.findIndex((b) => b.id === selectedBranch.id)
    if (index < 0) return
    const container = scrollRef.current
    const card = container.children[index] as HTMLElement | undefined
    if (card) {
      card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
    }
  }, [selectedBranch, filteredBranches])

  return (
    <div id="mobile-carousel" className="absolute top-0 left-0 right-0 z-[999] flex flex-col">
      <div className="flex items-center gap-2 px-3 pt-3 pb-2">
        <button
          onClick={() => setMenuOpen(true)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-card shadow-md border border-border/60"
          aria-label="Open menu"
        >
          <Image
            src="/capiteclogo-preview.png"
            alt="Capitec Bank"
            width={22}
            height={14}
            className="shrink-0"
          />
        </button>

        {showSearch ? (
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              autoFocus
              type="text"
              placeholder="Search branches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => {
                if (!searchQuery) setShowSearch(false)
              }}
              className="h-8 w-full rounded-lg border border-input bg-card pl-8 pr-3 text-xs text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring/30 shadow-md"
            />
          </div>
        ) : (
          <h1 className="flex-1 text-sm font-bold text-card-foreground drop-shadow-sm">
            Branch Locator
          </h1>
        )}

        <IconButton
          icon={Search}
          onClick={() => setShowSearch(!showSearch)}
          ariaLabel="Search"
        />

        <IconButton
          icon={List}
          onClick={onSwitchToDrawer}
          ariaLabel="Switch to list view"
        />
      </div>

      {menuOpen && <MobileMenuOverlay onClose={() => setMenuOpen(false)} />}

      <div className="px-3 pb-2">
        <ProvinceFilter
          provinces={provinces}
          selectedProvince={selectedProvince}
          onProvinceChange={setSelectedProvince}
        />
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 px-3 pb-3 overflow-x-auto no-scrollbar snap-x snap-mandatory"
      >
        {filteredBranches.map((branch) => (
          <MobileBranchCard
            key={branch.id}
            branch={branch}
            isSelected={selectedBranch?.id === branch.id}
            onSelect={onSelectBranch}
          />
        ))}
        {filteredBranches.length === 0 && (
          <div className="flex items-center justify-center w-full py-4">
            <p className="text-xs text-muted-foreground">No branches found</p>
          </div>
        )}
      </div>
    </div>
  )
}
