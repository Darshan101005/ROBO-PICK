"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Camera, Settings, BookOpen, ShoppingBag, Heart, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavigationItem {
  name: string
  href: string
  icon: React.ElementType
}

const navigationItems: NavigationItem[] = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Explore", href: "/explore", icon: Search },
  { name: "Guide", href: "/guide", icon: BookOpen },
  { name: "Market", href: "/market", icon: ShoppingBag },
  { name: "Saved", href: "/saved", icon: Heart },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function NavigationBar() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(pathname)

  return (
    <>
      {/* Camera Button */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-20">
        <Button
          size="lg"
          className="w-16 h-16 rounded-full bg-primary hover:bg-primary-600 shadow-lg flex items-center justify-center"
          asChild
        >
          <Link href="/camera">
            <Camera className="w-8 h-8" />
            <span className="sr-only">Open Camera</span>
          </Link>
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-10 px-1">
        <div className="grid grid-cols-6 h-16">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center space-y-1 transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary",
                )}
                onClick={() => setActiveTab(item.href)}
              >
                <Icon className={cn("w-5 h-5", isActive && "text-primary")} />
                <span className="text-xs">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
