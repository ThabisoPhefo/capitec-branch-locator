"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import type { Branch } from "@/lib/branches"

import "leaflet/dist/leaflet.css"

interface BranchMapProps {
  branches: Branch[]
  selectedBranch: Branch | null
  onSelectBranch: (branch: Branch) => void
  mobileCarouselActive?: boolean
  userLocation?: { lat: number; lng: number } | null
  radiusKm?: number
  resetView?: "province" | "all" | null
  selectedProvince?: string
}

function createCustomIcon(isSelected: boolean) {
  const size = isSelected ? 36 : 28
  const color = isSelected ? "#1a1a1a" : "#555555"
  const strokeWidth = isSelected ? 2.5 : 2

  return L.divIcon({
    className: "custom-marker",
    html: `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
              fill="${color}" stroke="white" stroke-width="${strokeWidth}"/>
        <circle cx="12" cy="9" r="2.5" fill="white"/>
      </svg>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  })
}

function buildPopupHtml(branch: Branch): string {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`

  return `<div style="font-family: system-ui, sans-serif; padding: 4px 0; min-width: 180px;">
    <strong style="font-size: 13px; color: #1a1a1a;">${branch.name}</strong>
    <div style="font-size: 11px; color: #666; margin-top: 4px; line-height: 1.5;">
      ${branch.address}, ${branch.city}
    </div>
    <div style="font-size: 11px; color: #666; margin-top: 2px;">
      ${branch.phone}
    </div>
    <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee;">
      <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer"
         style="display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; color: #1a1a1a; text-decoration: none; padding: 4px 10px; background: #f3f3f3; border-radius: 6px; transition: background 0.15s;">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 11l19-9-9 19-2-8-8-2z"/>
        </svg>
        Get Directions
      </a>
    </div>
  </div>`
}

function createUserLocationIcon() {
  return L.divIcon({
    className: "user-location-marker",
    html: `
      <div style="position:relative;width:20px;height:20px;">
        <div style="position:absolute;inset:-6px;border-radius:50%;background:rgba(59,130,246,0.15);animation:pulse-ring 2s ease-out infinite;"></div>
        <div style="width:20px;height:20px;border-radius:50%;background:#3b82f6;border:3px solid white;box-shadow:0 2px 8px rgba(59,130,246,0.5);"></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  })
}

const ORIGINAL_CENTER: [number, number] = [-28.7, 25.5]
const ORIGINAL_ZOOM = 6

export function BranchMap({ 
  branches, 
  selectedBranch, 
  onSelectBranch, 
  mobileCarouselActive = false, 
  userLocation,
  resetView,
  selectedProvince = "All Provinces"
}: BranchMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Map<string, L.Marker>>(new Map())
  const userMarkerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const map = L.map(mapContainerRef.current, {
      center: ORIGINAL_CENTER,
      zoom: ORIGINAL_ZOOM,
      zoomControl: false,
    })

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19,
    }).addTo(map)

    L.control.zoom({ position: "bottomright" }).addTo(map)

    branches.forEach((branch) => {
      const marker = L.marker([branch.lat, branch.lng], {
        icon: createCustomIcon(false),
      })
        .addTo(map)
        .bindPopup(buildPopupHtml(branch), {
          className: "custom-popup",
          closeOnClick: false,
          autoClose: false,
        })

      marker.on("click", () => {
        onSelectBranch(branch)
        marker.openPopup()
      })

      markersRef.current.set(branch.id, marker)
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      markersRef.current.clear()
      userMarkerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current) return

    if (userLocation) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng])
      } else {
        userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
          icon: createUserLocationIcon(),
          zIndexOffset: 2000,
          interactive: false,
        })
          .addTo(mapRef.current)
          .bindTooltip("You are here", {
            permanent: false,
            direction: "top",
            offset: [0, -14],
            className: "user-location-tooltip",
          })
      }
    } else if (userMarkerRef.current) {
      userMarkerRef.current.remove()
      userMarkerRef.current = null
    }
  }, [userLocation])

  useEffect(() => {
    if (!mapRef.current) return

    markersRef.current.forEach((marker, id) => {
      const isSelected = selectedBranch?.id === id
      marker.setIcon(createCustomIcon(isSelected))
      if (isSelected) {
        marker.setZIndexOffset(1000)
      } else {
        marker.setZIndexOffset(0)
        marker.closePopup()
      }
    })

    if (selectedBranch) {
      const map = mapRef.current

      const currentCenter = map.getCenter()
      const dx = currentCenter.lat - selectedBranch.lat
      const dy = currentCenter.lng - selectedBranch.lng
      const distance = Math.sqrt(dx * dx + dy * dy)
      const duration = Math.min(3.5, Math.max(1.5, distance * 0.5))

      if (mobileCarouselActive) {
        const mapSize = map.getSize()
        const carouselEl = document.getElementById("mobile-carousel")
        const carouselH = carouselEl ? carouselEl.offsetHeight : 0

        const visibleCenterY = carouselH + (mapSize.y - carouselH) / 2
        const visibleCenterX = mapSize.x / 2

        const targetZoom = 14
        const branchPoint = map.project([selectedBranch.lat, selectedBranch.lng], targetZoom)
        const mapCenterPoint = L.point(visibleCenterX, visibleCenterY)

        const offset = L.point(
          branchPoint.x - mapCenterPoint.x + mapSize.x / 2,
          branchPoint.y - mapCenterPoint.y + mapSize.y / 2,
        )
        const adjustedCenter = map.unproject(offset, targetZoom)

        map.flyTo(adjustedCenter, targetZoom, { duration })

        const marker = markersRef.current.get(selectedBranch.id)
        if (marker) marker.closePopup()
      } else {
        const marker = markersRef.current.get(selectedBranch.id)

        markersRef.current.forEach((m, id) => {
          if (id !== selectedBranch.id) m.closePopup()
        })

        map.flyTo([selectedBranch.lat, selectedBranch.lng], 14, { duration })

        if (marker) {
          const forceOpen = () => marker.openPopup()
          const interval = setInterval(forceOpen, 300)
          const cleanup = () => {
            clearInterval(interval)
            setTimeout(forceOpen, 50)
          }
          setTimeout(cleanup, duration * 1000 + 300)
        }
      }
    }
  }, [selectedBranch, mobileCarouselActive])

  useEffect(() => {
    if (!mapRef.current || !resetView) return

    const map = mapRef.current

    if (resetView === "province" && selectedProvince !== "All Provinces") {
      const provinceBranches = branches.filter(b => b.province === selectedProvince)
      if (provinceBranches.length > 0) {
        const bounds = L.latLngBounds(
          provinceBranches.map(b => [b.lat, b.lng] as [number, number])
        )
        map.flyToBounds(bounds, { 
          padding: [50, 50],
          duration: 1.5,
          maxZoom: 10
        })
      }
    } else if (resetView === "all") {
      map.flyTo(ORIGINAL_CENTER, ORIGINAL_ZOOM, { duration: 1.5 })
    }
  }, [resetView, selectedProvince, branches])

  return <div ref={mapContainerRef} className="h-full w-full" />
}
