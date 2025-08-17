"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NavigationBar } from "@/components/navigation-bar"
import { mockScans, getTimeAgo, getSeasonalProduce, getRandomTip } from "@/lib/data"
import {
  Camera,
  Clock,
  Star,
  Apple,
  Banana,
  Carrot,
  Grape,
  Bell,
  Search,
  ChevronRight,
  Lightbulb,
  TrendingUp,
  Calendar,
  BookOpen,
} from "lucide-react"

export default function HomePage() {
  const [greeting, setGreeting] = useState("")
  const [dailyTip, setDailyTip] = useState("")
  const [seasonalProduce, setSeasonalProduce] = useState<any[]>([])

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good Morning")
    else if (hour < 18) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")

    setDailyTip(getRandomTip())
    setSeasonalProduce(getSeasonalProduce().slice(0, 3))
  }, [])

  const recentScans = mockScans.slice(0, 4)

  const quickActions = [
    { name: "Scan Now", icon: Camera, href: "/camera", color: "bg-primary-100 text-primary-600" },
    { name: "Guide", icon: BookOpen, href: "/guide", color: "bg-secondary-100 text-secondary-600" },
    { name: "Explore", icon: Search, href: "/explore", color: "bg-blue-100 text-blue-600" },
    { name: "History", icon: Clock, href: "/history", color: "bg-purple-100 text-purple-600" },
  ]

  const getIconForItem = (itemName: string) => {
    switch (itemName.toLowerCase()) {
      case "red apple":
      case "apple":
        return Apple
      case "banana":
        return Banana
      case "carrot":
        return Carrot
      case "grapes":
        return Grape
      default:
        return Apple
    }
  }

  const getFreshnessColor = (freshness: string) => {
    switch (freshness) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "fair":
        return "bg-yellow-100 text-yellow-800"
      case "poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <Image src="/images/app-logo.png" alt="Profile" width={24} height={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{greeting}, John!</h1>
                <p className="text-gray-600 text-sm">Ready to shop smart today?</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
            </div>
          </div>

          {/* Learning Progress */}
          <Card className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Learning Progress</p>
                  <p className="text-2xl font-bold">Level 3</p>
                  <p className="text-white/80 text-xs">Produce Expert in Training</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">127 scans</div>
                  <div className="text-white/80 text-xs">This month</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const IconComponent = action.icon
                return (
                  <Button
                    key={action.name}
                    variant="outline"
                    className="h-20 flex-col bg-transparent hover:bg-gray-50"
                    asChild
                  >
                    <Link href={action.href}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${action.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium">{action.name}</span>
                    </Link>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/history">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentScans.map((scan) => {
                const IconComponent = getIconForItem(scan.itemName)
                return (
                  <div key={scan.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{scan.itemName}</div>
                      <div className="text-sm text-gray-600">{getTimeAgo(scan.timestamp)}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className={getFreshnessColor(scan.freshness)}>
                        {scan.freshness}
                      </Badge>
                      <div className="text-xs text-gray-500 mt-1">{scan.confidence}% confident</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Seasonal Produce */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-secondary" />
              In Season Now
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/explore">
                See More
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {seasonalProduce.map((item) => (
                <div key={item.id} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-8 h-8" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-500">Peak season</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Tip */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Daily Tip</h3>
                <p className="text-sm text-gray-600">{dailyTip}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-primary mr-2" />
                <span className="text-2xl font-bold text-primary">23</span>
              </div>
              <div className="text-sm text-gray-600">Items This Week</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-5 h-5 text-secondary mr-2" />
                <span className="text-2xl font-bold text-secondary">4.8</span>
              </div>
              <div className="text-sm text-gray-600">Avg Quality Score</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <NavigationBar />
    </div>
  )
}
