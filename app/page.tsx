import { BranchLocator } from "@/components/branch-locator"
import { SiteHeader } from "@/components/site-header"

export default function Page() {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <SiteHeader />
      <BranchLocator />
    </main>
  )
}
