"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SlotSearchProps {
  slotNumber: string
  isLoading: boolean
  onSlotNumberChange: (value: string) => void
  onSearch: () => void
  onKeyPress: (e: React.KeyboardEvent) => void
}

export function SlotSearch({ slotNumber, isLoading, onSlotNumberChange, onSearch, onKeyPress }: SlotSearchProps) {
  return (
    <div className="max-w-md mx-auto mb-8">
      <div className="flex space-x-2">
        <Input
          type="number"
          placeholder="Enter slot number (e.g., 123456789)"
          value={slotNumber}
          onChange={(e) => onSlotNumberChange(e.target.value)}
          onKeyPress={onKeyPress}
          className="flex-1"
        />
        <Button onClick={onSearch} disabled={isLoading}>
          <Search className="w-4 h-4 mr-2" />
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
    </div>
  )
}
