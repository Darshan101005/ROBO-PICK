"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { NavigationBar } from "@/components/navigation-bar"
import { getTimeAgo } from "@/lib/data"
import { Heart, Search, Filter, Star, Clock, Apple, Banana, Carrot, Trash2, Share, ShoppingBag } from "lucide-react"

const savedItems = [
  {
    id: "1",
    name: "Red Apple Selection Guide",
    type: "guide",
    savedDate: "2024-01-20",
    category: "guides",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Perfect Banana",
    type: "scan",
    savedDate: "2024-01-19",
    category: "scans",
    freshness: "excellent",
    confidence: 94,
  },
  {
    id: "3",
    name: "Seasonal Produce Calendar",
    type: "guide",
    savedDate: "2024-01-18",
    category: "guides",
    rating: 4.9,
  },
  {
    id: "4",
    name: "Fresh Carrots",
    type: "scan",
    savedDate: "2024-01-17",
    category: "scans",
    freshness: "good",
    confidence: 87,
  },
]

const categories = [
  { id: "all", name: "All", count: savedItems.length },
  { id: "scans", name: "Scans", count: savedItems.filter((item) => item.type === "scan").length },
  { id: "guides", name: "Guides", count: savedItems.filter((item) => item.type === "guide").length },
]

export default function SavedPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [savedList, setSavedList] = useState(savedItems)

  const filteredItems = savedList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const removeItem = (id: string) => {
    setSavedList((prev) => prev.filter((item) => item.id !== id))
  }

  const getItemIcon = (name: string, type: string) => {
    if (type === "guide") return Star

    switch (name.toLowerCase()) {
      case "red apple":
      case "perfect banana":
        return name.includes("apple") ? Apple : Banana
      case "fresh carrots":
        return Carrot
      default:
        return Heart
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Saved</h1>
              <p className="text-gray-600">Your favorite items and guides</p>
            </div>
            <Button variant="ghost" size="icon">
              <Filter className="w-6 h-6" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search saved items..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="flex space-x-3">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id
              return (
                <Button
                  key={category.id}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 ${isSelected ? "bg-primary text-white" : "bg-transparent"}`}
                >
                  <span>{category.name}</span>
                  <Badge variant={isSelected ? "secondary" : "outline"} className="text-xs">
                    {category.count}
                  </Badge>
                </Button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900">{savedList.length}</div>
              <div className="text-xs text-gray-600">Total Saved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900">
                {savedList.filter((item) => item.type === "guide").length}
              </div>
              <div className="text-xs text-gray-600">Guides</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900">
                {savedList.filter((item) => item.type === "scan").length}
              </div>
              <div className="text-xs text-gray-600">Scans</div>
            </CardContent>
          </Card>
        </div>

        {/* Saved Items */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {searchQuery ? `Search Results (${filteredItems.length})` : "Saved Items"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredItems.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {searchQuery ? "No saved items match your search" : "No saved items yet"}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {searchQuery ? "Try a different search term" : "Save guides and scans to access them quickly"}
                </p>
                {!searchQuery && (
                  <div className="space-y-2">
                    <Button asChild className="bg-primary hover:bg-primary-600">
                      <Link href="/guide">Browse Guides</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/camera">Start Scanning</Link>
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredItems.map((item) => {
                  const IconComponent = getItemIcon(item.name, item.type)
                  return (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>

                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-600">Saved {getTimeAgo(item.savedDate)}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          {item.type === "scan" && item.freshness && (
                            <Badge variant="secondary" className={`text-xs ${getFreshnessColor(item.freshness)}`}>
                              {item.freshness}
                            </Badge>
                          )}
                          {item.type === "guide" && item.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 fill-current text-yellow-500" />
                              <span className="text-xs text-gray-600">{item.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ShoppingBag className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        {filteredItems.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recently Added</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredItems.slice(0, 3).map((item) => {
                  const IconComponent = getItemIcon(item.name, item.type)
                  return (
                    <div key={`recent-${item.id}`} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <IconComponent className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">{item.name}</div>
                        <div className="text-xs text-gray-600">{getTimeAgo(item.savedDate)}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <NavigationBar />
    </div>
  )
}
