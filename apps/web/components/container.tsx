import type React from "react"

interface ContainerProps {
  children: React.ReactNode
}

export function Container({ children }: ContainerProps) {
  return <div className="min-h-screen bg-background flex flex-col">{children}</div>
}
