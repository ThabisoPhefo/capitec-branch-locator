"use client"

import { useState } from "react"
import Image from "next/image"
import { User, Briefcase, Search, UserCircle, X } from "lucide-react"

const navItems = [
  { label: "Personal", icon: User },
  { label: "Business", icon: Briefcase },
  { label: "Search", icon: Search },
  { label: "Account", icon: UserCircle },
]

export function SiteHeader() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <header className="absolute top-5 left-1/2 z-[1000] -translate-x-1/2 hidden md:block">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center gap-3 rounded-full border border-border/30 bg-background/60 px-5 py-2.5 shadow-lg backdrop-blur-xl transition-all duration-300 ease-in-out"
      >
        <div className="flex items-center gap-2.5">
          <Image
            src="/capiteclogo-preview.png"
            alt="Capitec Bank"
            width={28}
            height={18}
            className="shrink-0"
          />
          <span className="text-sm font-semibold tracking-tight text-foreground whitespace-nowrap">
            Capitec
          </span>
        </div>

        <div
          className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out ${
            isHovered
              ? "ml-1 max-w-[400px] opacity-100"
              : "max-w-0 opacity-0"
          }`}
        >
          <div className="mx-2 h-4 w-px shrink-0 bg-border/50" />
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                title="Coming soon"
                aria-disabled="true"
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground whitespace-nowrap transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <item.icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export function MobileMenuOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[1200]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-[6px]" />

      <div
        className="absolute inset-0 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-56 flex-col items-stretch gap-3">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card shadow-xl border border-border/20">
              <Image
                src="/capiteclogo-preview.png"
                alt="Capitec Bank"
                width={32}
                height={20}
                className="shrink-0"
              />
            </div>
          </div>

          {navItems.map((item, index) => (
            <button
              key={item.label}
              type="button"
              title="Coming soon"
              aria-disabled="true"
              className="bubble-item flex w-full items-center gap-3 rounded-2xl bg-card/90 px-4 py-3.5 shadow-lg border border-border/20 active:scale-[0.97] transition-transform"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                <item.icon className="h-4.5 w-4.5 text-foreground" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {item.label}
              </span>
            </button>
          ))}

          <button
            onClick={onClose}
            className="bubble-item mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-card/80 shadow-md border border-border/20 active:scale-90 transition-transform mt-1"
            style={{ animationDelay: `${navItems.length * 70}ms` }}
            aria-label="Close menu"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}
