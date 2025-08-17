"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { NavigationBar } from "@/components/navigation-bar"
import { produceData, getCurrentSeason } from "@/lib/data"
import { Search, Filter, Apple, Carrot, Leaf, Star, Clock, TrendingUp, Calendar, ChevronRight } from "lucide-react"

const categories = [
  { id: "all", name: "All", icon: Leaf, color: "bg-gray-100 text-gray-600" },
  { id: "fruits", name: "Fruits", icon: Apple, color: "bg-red-100 text-red-600" },
  { id: "vegetables", name: "Vegetables", icon: Carrot, color: "bg-green-100 text-green-600" },
]

const seasons = [
  { id: "spring", name: "Spring", emoji: "🌸" },
  { id: "summer", name: "Summer", emoji: "☀️" },
  { id: "fall", name: "Fall", emoji: "🍂" },
  { id: "winter", name: "Winter", emoji: "❄️" },
  { id: "year-round", name: "Year Round", emoji: "🌍" },
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSeason, setSelectedSeason] = useState(getCurrentSeason())

  const filteredProduce = produceData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSeason = item.season.includes(selectedSeason) || item.season.includes("year-round")

    return matchesSearch && matchesCategory && matchesSeason
  })

  const featuredItems = produceData.slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
              <p className="text-gray-600">Discover fresh produce</p>
            </div>
            <Button variant="ghost" size="icon">
              <Filter className="w-6 h-6" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search fruits and vegetables..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="flex space-x-3 mb-4">
            {categories.map((category) => {
              const IconComponent = category.icon
              const isSelected = selectedCategory === category.id
              return (
                <Button
                  key={category.id}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 ${isSelected ? "bg-primary text-white" : "bg-transparent"}`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                </Button>
              )
            })}
          </div>

          {/* Seasons */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {seasons.map((season) => (
              <Button
                key={season.id}
                variant={selectedSeason === season.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSeason(season.id)}
                className={`flex items-center space-x-2 whitespace-nowrap ${
                  selectedSeason === season.id ? "bg-secondary text-white" : "bg-transparent"
                }`}
              >
                <span>{season.emoji}</span>
                <span>{season.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Featured */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              Featured This Week
            </CardTitle>
            <Button variant="ghost" size="sm">
              See All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {featuredItems.map((item) => (
                <Link key={item.id} href={`/produce/${item.id}`}>
                  <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-12 h-12 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {item.season.includes("year-round") ? "Year Round" : "Seasonal"}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900">{filteredProduce.length}</div>
              <div className="text-xs text-gray-600">Available Now</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="w-6 h-6 text-secondary mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900">{selectedSeason}</div>
              <div className="text-xs text-gray-600">Current Season</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900">Fresh</div>
              <div className="text-xs text-gray-600">Daily Updates</div>
            </CardContent>
          </Card>
        </div>

        {/* Produce Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {searchQuery ? `Search Results (${filteredProduce.length})` : "All Produce"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredProduce.length === 0 ? (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No produce found matching your criteria</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {filteredProduce.map((item) => (
                  <Link key={item.id} href={`/produce/${item.id}`}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 mx-auto mb-3"
                        />
                        <h3 className="font-semibold text-gray-900 text-center mb-2">{item.name}</h3>
                        <div className="space-y-2">
                          <Badge variant="outline" className="w-full justify-center">
                            {item.category}
                          </Badge>
                          <div className="text-xs text-gray-600 text-center">{item.nutritionalInfo.calories} cal</div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <NavigationBar />
    </div>
  )
}
