"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import dynamic from "next/dynamic"
import { branches, getDistanceKm, ALL_PROVINCES } from "@/lib/branches"
import { BranchSidebar } from "./branch-sidebar"
import { MobileCarousel } from "./mobile-carousel"
import { MobileDrawer } from "./mobile-drawer"
import type { BranchWithDistance } from "@/lib/branches"

const BranchMap = dynamic(
  () => import("./branch-map").then((mod) => ({ default: mod.BranchMap })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-secondary">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground" />
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    ),
  }
)

const RADIUS_OPTIONS = [5, 10, 25, 50, 100, 250, 0] as const

type MobileView = "carousel" | "drawer"

export function BranchLocator() {
  const [selectedBranch, setSelectedBranch] = useState<BranchWithDistance | null>(null)
  const [mobileView, setMobileView] = useState<MobileView>("carousel")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [radiusKm, setRadiusKm] = useState<number>(0)
  const [selectedProvince, setSelectedProvince] = useState<string>(ALL_PROVINCES)
  const [resetView, setResetView] = useState<"province" | "all" | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
      },
      () => {},
      { enableHighAccuracy: false, timeout: 8000 }
    )
  }, [])

  const branchesWithDistance: BranchWithDistance[] = useMemo(() => {
    return branches
      .map((b) => ({
        ...b,
        distanceKm: userLocation
          ? getDistanceKm(userLocation.lat, userLocation.lng, b.lat, b.lng)
          : null,
      }))
      .filter((b) => {
        if (radiusKm === 0 || b.distanceKm === null) return true
        return b.distanceKm <= radiusKm
      })
      .sort((a, b) => {
        if (a.distanceKm !== null && b.distanceKm !== null) return a.distanceKm - b.distanceKm
        return 0
      })
  }, [userLocation, radiusKm])

  const handleSelectBranch = useCallback((branch: BranchWithDistance) => {
    setSelectedBranch(branch)
  }, [])

  const handleReset = useCallback(() => {
    if (selectedBranch) {
      const branchProvince = selectedBranch.province
      setSelectedProvince(branchProvince)
      setResetView("province")
      setSelectedBranch(null)
      setTimeout(() => setResetView(null), 100)
    } else if (selectedProvince !== ALL_PROVINCES) {
      setResetView("all")
      setSelectedProvince(ALL_PROVINCES)
      setTimeout(() => setResetView(null), 100)
    }
  }, [selectedBranch, selectedProvince])

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0">
        <BranchMap
          branches={branchesWithDistance}
          selectedBranch={selectedBranch}
          onSelectBranch={handleSelectBranch}
          mobileCarouselActive={mobileView === "carousel"}
          userLocation={userLocation}
          radiusKm={radiusKm}
          resetView={resetView}
          selectedProvince={selectedProvince}
        />
      </div>

      <div className="hidden md:block">
        <BranchSidebar
          branches={branchesWithDistance}
          selectedBranch={selectedBranch ? branchesWithDistance.find(b => b.id === selectedBranch.id) || null : null}
          onSelectBranch={handleSelectBranch}
          userLocation={userLocation}
          radiusKm={radiusKm}
          onRadiusChange={setRadiusKm}
          radiusOptions={RADIUS_OPTIONS}
          onReset={handleReset}
          selectedProvince={selectedProvince}
          onProvinceChange={setSelectedProvince}
        />
      </div>

      <div className="md:hidden">
        {mobileView === "carousel" ? (
          <MobileCarousel
            branches={branchesWithDistance}
            selectedBranch={selectedBranch}
            onSelectBranch={handleSelectBranch}
            onSwitchToDrawer={() => setMobileView("drawer")}
            selectedProvince={selectedProvince}
            onProvinceChange={setSelectedProvince}
            userLocation={userLocation}
            radiusKm={radiusKm}
            onRadiusChange={setRadiusKm}
            radiusOptions={RADIUS_OPTIONS}
          />
        ) : (
          <MobileDrawer
            branches={branchesWithDistance}
            selectedBranch={selectedBranch}
            onSelectBranch={handleSelectBranch}
            onSwitchToCarousel={() => setMobileView("carousel")}
            selectedProvince={selectedProvince}
            onProvinceChange={setSelectedProvince}
            userLocation={userLocation}
            radiusKm={radiusKm}
            onRadiusChange={setRadiusKm}
            radiusOptions={RADIUS_OPTIONS}
          />
        )}
      </div>
    </div>
  )
}
