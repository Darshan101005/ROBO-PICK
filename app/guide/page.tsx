"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { NavigationBar } from "@/components/navigation-bar"
import { Search, BookOpen, Video, FileText, Star, Clock, ChevronRight, Eye, Lightbulb, Heart, Zap } from "lucide-react"

const guideCategories = [
  { id: "basics", name: "Basics", icon: BookOpen, color: "bg-blue-100 text-blue-600" },
  { id: "seasonal", name: "Seasonal", icon: Star, color: "bg-green-100 text-green-600" },
  { id: "storage", name: "Storage", icon: Clock, color: "bg-purple-100 text-purple-600" },
  { id: "nutrition", name: "Nutrition", icon: Heart, color: "bg-red-100 text-red-600" },
]

const guides = [
  {
    id: "1",
    title: "Complete Guide to Apple Selection",
    description: "Learn how to pick the perfect apple every time",
    category: "basics",
    type: "article",
    readTime: "5 min read",
    difficulty: "Beginner",
    rating: 4.8,
    image: "/placeholder.svg?height=120&width=200&text=Apple+Guide",
    featured: true,
  },
  {
    id: "2",
    title: "Seasonal Produce Calendar",
    description: "Know what's in season throughout the year",
    category: "seasonal",
    type: "interactive",
    readTime: "10 min read",
    difficulty: "Beginner",
    rating: 4.9,
    image: "/placeholder.svg?height=120&width=200&text=Seasonal+Calendar",
    featured: true,
  },
  {
    id: "3",
    title: "Proper Storage Techniques",
    description: "Keep your produce fresh for longer",
    category: "storage",
    type: "video",
    readTime: "8 min watch",
    difficulty: "Intermediate",
    rating: 4.7,
    image: "/placeholder.svg?height=120&width=200&text=Storage+Tips",
    featured: false,
  },
  {
    id: "4",
    title: "Color Blindness and Produce",
    description: "Special tips for color vision differences",
    category: "basics",
    type: "article",
    readTime: "7 min read",
    difficulty: "Beginner",
    rating: 4.9,
    image: "/placeholder.svg?height=120&width=200&text=Color+Vision",
    featured: true,
  },
  {
    id: "5",
    title: "Nutritional Value Guide",
    description: "Understanding vitamins and minerals in produce",
    category: "nutrition",
    type: "article",
    readTime: "12 min read",
    difficulty: "Advanced",
    rating: 4.6,
    image: "/placeholder.svg?height=120&width=200&text=Nutrition",
    featured: false,
  },
  {
    id: "6",
    title: "Shopping List Optimization",
    description: "Plan your grocery trips like a pro",
    category: "basics",
    type: "interactive",
    readTime: "6 min read",
    difficulty: "Intermediate",
    rating: 4.8,
    image: "/placeholder.svg?height=120&width=200&text=Shopping+Tips",
    featured: false,
  },
]

const quickTips = [
  {
    id: "1",
    title: "Best Time to Shop",
    tip: "Shop early morning for the freshest selection",
    icon: Clock,
  },
  {
    id: "2",
    title: "Lighting Matters",
    tip: "Use natural light when possible for color accuracy",
    icon: Eye,
  },
  {
    id: "3",
    title: "Touch Test",
    tip: "Gently squeeze to check firmness",
    icon: Lightbulb,
  },
  {
    id: "4",
    title: "Seasonal Shopping",
    tip: "Buy in-season produce for best quality and price",
    icon: Star,
  },
]

export default function GuidePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || guide.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const featuredGuides = guides.filter((guide) => guide.featured)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video
      case "interactive":
        return Zap
      default:
        return FileText
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
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
              <h1 className="text-2xl font-bold text-gray-900">Guide</h1>
              <p className="text-gray-600">Learn to shop smarter</p>
            </div>
            <Button variant="ghost" size="icon">
              <BookOpen className="w-6 h-6" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search guides and tips..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="flex space-x-3 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className={selectedCategory === "all" ? "bg-primary text-white" : "bg-transparent"}
            >
              All
            </Button>
            {guideCategories.map((category) => {
              const IconComponent = category.icon
              const isSelected = selectedCategory === category.id
              return (
                <Button
                  key={category.id}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 whitespace-nowrap ${
                    isSelected ? "bg-primary text-white" : "bg-transparent"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                </Button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Quick Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
              Quick Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickTips.map((tip) => {
                const IconComponent = tip.icon
                return (
                  <div key={tip.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <IconComponent className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-gray-900">{tip.title}</span>
                    </div>
                    <p className="text-xs text-gray-600">{tip.tip}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Featured Guides */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              Featured Guides
            </CardTitle>
            <Button variant="ghost" size="sm">
              See All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featuredGuides.slice(0, 2).map((guide) => {
                const TypeIcon = getTypeIcon(guide.type)
                return (
                  <Link key={guide.id} href={`/guide/${guide.id}`}>
                    <div className="flex space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <img
                        src={guide.image || "/placeholder.svg"}
                        alt={guide.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{guide.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{guide.description}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            <TypeIcon className="w-3 h-3 mr-1" />
                            {guide.type}
                          </Badge>
                          <Badge variant="secondary" className={`text-xs ${getDifficultyColor(guide.difficulty)}`}>
                            {guide.difficulty}
                          </Badge>
                          <span className="text-xs text-gray-500">{guide.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* All Guides */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {searchQuery ? `Search Results (${filteredGuides.length})` : "All Guides"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredGuides.length === 0 ? (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No guides found matching your criteria</p>
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
              <div className="space-y-4">
                {filteredGuides.map((guide) => {
                  const TypeIcon = getTypeIcon(guide.type)
                  return (
                    <Link key={guide.id} href={`/guide/${guide.id}`}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex space-x-4">
                            <img
                              src={guide.image || "/placeholder.svg"}
                              alt={guide.title}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-gray-900">{guide.title}</h3>
                                <div className="flex items-center space-x-1 text-yellow-500">
                                  <Star className="w-4 h-4 fill-current" />
                                  <span className="text-sm">{guide.rating}</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{guide.description}</p>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-xs">
                                  <TypeIcon className="w-3 h-3 mr-1" />
                                  {guide.type}
                                </Badge>
                                <Badge
                                  variant="secondary"
                                  className={`text-xs ${getDifficultyColor(guide.difficulty)}`}
                                >
                                  {guide.difficulty}
                                </Badge>
                                <span className="text-xs text-gray-500">{guide.readTime}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <NavigationBar />
    </div>
  )
}
