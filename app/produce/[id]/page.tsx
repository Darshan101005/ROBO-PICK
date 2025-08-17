"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NavigationBar } from "@/components/navigation-bar"
import { produceData } from "@/lib/data"
import { addToShoppingList } from "@/app/actions"
import { ArrowLeft, Heart, Share, ShoppingBag, Star, Calendar, Zap, CheckCircle } from "lucide-react"
import { useParams } from "next/navigation"

export default function ProduceDetailPage() {
  const params = useParams()
  const [isSaved, setIsSaved] = useState(false)
  const [isAddingToList, setIsAddingToList] = useState(false)

  const item = produceData.find((p) => p.id === params.id)

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Item Not Found</h2>
          <p className="text-gray-600 mb-4">The produce item you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/explore">Back to Explore</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToShoppingList = async () => {
    setIsAddingToList(true)
    const formData = new FormData()
    formData.append("itemName", item.name)
    formData.append("quantity", "1")

    await addToShoppingList(formData)
    setIsAddingToList(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/explore">
              <ArrowLeft className="w-6 h-6" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">{item.name}</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSaved(!isSaved)}
              className={isSaved ? "text-red-500" : ""}
            >
              <Heart className={`w-6 h-6 ${isSaved ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon">
              <Share className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Main Info */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary-400 to-secondary-400 h-2"></div>
          <CardContent className="p-6 text-center">
            <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-32 h-32 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="flex justify-center space-x-2">
              <Badge variant="outline">{item.category}</Badge>
              {item.season.map((season) => (
                <Badge key={season} variant="secondary">
                  {season}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nutritional Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              Nutritional Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{item.nutritionalInfo.calories}</div>
                <div className="text-sm text-gray-600">Calories</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-secondary">{item.nutritionalInfo.vitamin.length}</div>
                <div className="text-sm text-gray-600">Vitamins</div>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Vitamins</h4>
                <div className="flex flex-wrap gap-1">
                  {item.nutritionalInfo.vitamin.map((vitamin) => (
                    <Badge key={vitamin} variant="outline" className="text-xs">
                      {vitamin}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Minerals</h4>
                <div className="flex flex-wrap gap-1">
                  {item.nutritionalInfo.minerals.map((mineral) => (
                    <Badge key={mineral} variant="outline" className="text-xs">
                      {mineral}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selection Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              How to Select
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {item.selectionTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Seasonal Info */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Seasonal Information</h3>
                <p className="text-sm text-gray-600">
                  {item.season.includes("year-round")
                    ? "Available year-round with consistent quality."
                    : `Best during ${item.season.join(", ")} months for peak freshness and flavor.`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleAddToShoppingList}
            disabled={isAddingToList}
            className="h-12 bg-primary hover:bg-primary-600"
          >
            {isAddingToList ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <ShoppingBag className="w-5 h-5 mr-2" />
            )}
            Add to List
          </Button>
          <Button variant="outline" className="h-12 bg-transparent" asChild>
            <Link href="/camera">
              <Star className="w-5 h-5 mr-2" />
              Scan Similar
            </Link>
          </Button>
        </div>
      </div>

      <NavigationBar />
    </div>
  )
}
