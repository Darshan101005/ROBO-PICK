"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { NavigationBar } from "@/components/navigation-bar"
import { ArrowLeft, BookOpen, Clock, Star, Heart, Share, CheckCircle, Play, FileText, Video, Zap } from "lucide-react"
import { useParams } from "next/navigation"

const guideContent = {
  "1": {
    title: "Complete Guide to Apple Selection",
    description: "Learn how to pick the perfect apple every time",
    type: "article",
    readTime: "5 min read",
    difficulty: "Beginner",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=400&text=Apple+Guide",
    content: [
      {
        type: "text",
        content:
          "Selecting the perfect apple is an art that combines visual inspection, touch, and even smell. This comprehensive guide will teach you everything you need to know.",
      },
      {
        type: "heading",
        content: "Visual Inspection",
      },
      {
        type: "text",
        content:
          "Look for apples with smooth, tight skin that has a vibrant color appropriate for the variety. Avoid apples with wrinkles, soft spots, or dark blemishes.",
      },
      {
        type: "list",
        content: [
          "Check for consistent color across the apple",
          "Look for a natural shine on the skin",
          "Avoid apples with cuts or punctures",
          "Small surface scratches are usually fine",
        ],
      },
      {
        type: "heading",
        content: "The Touch Test",
      },
      {
        type: "text",
        content:
          "A good apple should feel firm and solid in your hand. Gently press the skin - it should not give way or feel soft.",
      },
      {
        type: "heading",
        content: "Smell Check",
      },
      {
        type: "text",
        content:
          "Fresh apples have a sweet, crisp aroma near the stem end. If an apple smells fermented or overly sweet, it may be overripe.",
      },
    ],
  },
  "4": {
    title: "Color Blindness and Produce",
    description: "Special tips for color vision differences",
    type: "article",
    readTime: "7 min read",
    difficulty: "Beginner",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=400&text=Color+Vision",
    content: [
      {
        type: "text",
        content:
          "Having color vision differences doesn't mean you can't select great produce. This guide provides alternative methods and tips specifically designed for different types of color vision.",
      },
      {
        type: "heading",
        content: "Beyond Color: Alternative Indicators",
      },
      {
        type: "text",
        content:
          "While color is often used as a primary indicator of ripeness, there are many other reliable signs you can use.",
      },
      {
        type: "list",
        content: [
          "Firmness - Ripe fruit yields slightly to gentle pressure",
          "Aroma - Fresh produce has a pleasant, characteristic smell",
          "Weight - Ripe fruit feels heavy for its size",
          "Skin texture - Should be smooth and taut, not wrinkled",
        ],
      },
      {
        type: "heading",
        content: "Technology Assistance",
      },
      {
        type: "text",
        content:
          "Apps like RoboPick can help by providing real-time color correction and analysis, making it easier to identify the subtle color changes that indicate ripeness.",
      },
      {
        type: "heading",
        content: "Specific Tips by Produce Type",
      },
      {
        type: "text",
        content:
          "Different fruits and vegetables have unique indicators beyond color that can help you make the best selections.",
      },
    ],
  },
}

export default function GuideDetailPage() {
  const params = useParams()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [readProgress, setReadProgress] = useState(0)

  const guide = guideContent[params.id as keyof typeof guideContent]

  if (!guide) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Guide Not Found</h2>
          <p className="text-gray-600 mb-4">The guide you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/guide">Back to Guides</Link>
          </Button>
        </div>
      </div>
    )
  }

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
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/guide">
              <ArrowLeft className="w-6 h-6" />
            </Link>
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={isBookmarked ? "text-red-500" : ""}
            >
              <Heart className={`w-6 h-6 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon">
              <Share className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Hero Image */}
        <div className="relative h-48 bg-gray-200">
          <img src={guide.image || "/placeholder.svg"} alt={guide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="p-4 space-y-6">
          {/* Guide Info */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                {(() => {
                  const TypeIcon = getTypeIcon(guide.type)
                  return <TypeIcon className="w-5 h-5 text-primary" />
                })()}
                <Badge variant="outline">{guide.type}</Badge>
                <Badge className={getDifficultyColor(guide.difficulty)}>{guide.difficulty}</Badge>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">{guide.title}</h1>
              <p className="text-gray-600 mb-4">{guide.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{guide.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current text-yellow-500" />
                    <span>{guide.rating}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Reading Progress</span>
                <span className="text-sm text-gray-500">{readProgress}%</span>
              </div>
              <Progress value={readProgress} className="h-2" />
            </CardContent>
          </Card>

          {/* Article Content */}
          <Card>
            <CardContent className="p-6 space-y-6">
              {guide.content.map((section, index) => {
                switch (section.type) {
                  case "heading":
                    return (
                      <h2 key={index} className="text-xl font-bold text-gray-900 mt-8 mb-4">
                        {section.content}
                      </h2>
                    )
                  case "text":
                    return (
                      <p key={index} className="text-gray-700 leading-relaxed">
                        {section.content}
                      </p>
                    )
                  case "list":
                    return (
                      <ul key={index} className="space-y-2">
                        {(section.content as string[]).map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  default:
                    return null
                }
              })}
            </CardContent>
          </Card>

          {/* Related Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 bg-transparent" asChild>
              <Link href="/camera">
                <Play className="w-5 h-5 mr-2" />
                Try Scanning
              </Link>
            </Button>
            <Button className="h-12 bg-primary hover:bg-primary-600" asChild>
              <Link href="/guide">
                <BookOpen className="w-5 h-5 mr-2" />
                More Guides
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <NavigationBar />
    </div>
  )
}
