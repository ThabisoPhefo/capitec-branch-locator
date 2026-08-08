"use client"

import { useMemo } from "react"
import { ALL_PROVINCES, type Branch } from "@/lib/branches"

interface UseFilteredBranchesOptions {
  searchQuery: string
  selectedProvince: string
}

export function useFilteredBranches<T extends Branch>(
  branches: T[],
  { searchQuery, selectedProvince }: UseFilteredBranchesOptions
): T[] {
  return useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return branches.filter((branch) => {
      const matchesSearch =
        query === "" ||
        branch.name.toLowerCase().includes(query) ||
        branch.city.toLowerCase().includes(query) ||
        branch.address.toLowerCase().includes(query)

      const matchesProvince =
        selectedProvince === ALL_PROVINCES || branch.province === selectedProvince

      return matchesSearch && matchesProvince
    })
  }, [branches, searchQuery, selectedProvince])
}
