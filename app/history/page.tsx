"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { NavigationBar } from "@/components/navigation-bar"
import { mockScans, getTimeAgo } from "@/lib/data"
import {
  Clock,
  Search,
  Calendar,
  TrendingUp,
  Apple,
  Banana,
  Carrot,
  Grape,
  Share,
  Heart,
  RotateCcw,
  BarChart3,
} from "lucide-react"

const timeFilters = [
  { id: "all", name: "All Time" },
  { id: "today", name: "Today" },
  { id: "week", name: "This Week" },
  { id: "month", name: "This Month" },
]

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("all")
  const [scans] = useState(mockScans)

  const filteredScans = scans.filter((scan) => {
    const matchesSearch = scan.itemName.toLowerCase().includes(searchQuery.toLowerCase())

    // Time filtering logic would go here
    // For demo purposes, we'll show all scans

    return matchesSearch
  })

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

  const totalScans = scans.length
  const avgConfidence = Math.round(scans.reduce((sum, scan) => sum + scan.confidence, 0) / scans.length)
  const excellentScans = scans.filter((scan) => scan.freshness === "excellent").length

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">History</h1>
              <p className="text-gray-600">Your scanning activity</p>
            </div>
            <Button variant="ghost" size="icon">
              <BarChart3 className="w-6 h-6" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search your scans..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Time Filters */}
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {timeFilters.map((filter) => {
              const isSelected = selectedTimeFilter === filter.id
              return (
                <Button
                  key={filter.id}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeFilter(filter.id)}
                  className={`whitespace-nowrap ${isSelected ? "bg-primary text-white" : "bg-transparent"}`}
                >
                  {filter.name}
                </Button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900">{totalScans}</div>
              <div className="text-xs text-gray-600">Total Scans</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-secondary mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900">{avgConfidence}%</div>
              <div className="text-xs text-gray-600">Avg Confidence</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Apple className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900">{excellentScans}</div>
              <div className="text-xs text-gray-600">Excellent Finds</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Summary */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">This Week's Summary</h3>
                <p className="text-sm text-gray-600">
                  You've scanned {scans.length} items with an average quality score of {avgConfidence}%. Keep up the
                  great work finding fresh produce!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scan History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {searchQuery ? `Search Results (${filteredScans.length})` : "Scan History"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredScans.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">{searchQuery ? "No scans match your search" : "No scan history yet"}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {searchQuery ? "Try a different search term" : "Start scanning produce to build your history"}
                </p>
                {!searchQuery && (
                  <Button asChild className="bg-primary hover:bg-primary-600">
                    <Link href="/camera">Start Scanning</Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredScans.map((scan) => {
                  const IconComponent = getIconForItem(scan.itemName)
                  return (
                    <div
                      key={scan.id}
                      className="flex items-center space-x-3 p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>

                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{scan.itemName}</div>
                        <div className="text-sm text-gray-600">{getTimeAgo(scan.timestamp)}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className={getFreshnessColor(scan.freshness)}>
                            {scan.freshness}
                          </Badge>
                          <span className="text-xs text-gray-500">{scan.confidence}% confident</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                          <Link href="/camera">
                            <RotateCcw className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        {filteredScans.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 bg-transparent" asChild>
              <Link href="/camera">
                <RotateCcw className="w-5 h-5 mr-2" />
                Scan Again
              </Link>
            </Button>
            <Button className="h-12 bg-secondary hover:bg-secondary-600" asChild>
              <Link href="/guide">
                <Calendar className="w-5 h-5 mr-2" />
                Learn More
              </Link>
            </Button>
          </div>
        )}
      </div>

      <NavigationBar />
    </div>
  )
}
