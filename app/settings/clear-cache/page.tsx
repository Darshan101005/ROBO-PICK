"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { NavigationBar } from "@/components/navigation-bar"
import { ArrowLeft, Trash2, Database, ImageIcon, FileText, Settings, CheckCircle, AlertTriangle } from "lucide-react"

export default function ClearCachePage() {
  const [selectedItems, setSelectedItems] = useState({
    images: true,
    scans: false,
    guides: true,
    temp: true,
    settings: false,
  })
  const [isClearing, setIsClearing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const cacheItems = [
    {
      id: "images",
      name: "Cached Images",
      description: "Produce images and thumbnails",
      icon: ImageIcon,
      size: "45.2 MB",
      safe: true,
    },
    {
      id: "scans",
      name: "Scan Cache",
      description: "Recent scan results and analysis",
      icon: Database,
      size: "12.8 MB",
      safe: false,
    },
    {
      id: "guides",
      name: "Guide Content",
      description: "Downloaded guide articles and tips",
      icon: FileText,
      size: "8.5 MB",
      safe: true,
    },
    {
      id: "temp",
      name: "Temporary Files",
      description: "System temporary files and logs",
      icon: Trash2,
      size: "3.2 MB",
      safe: true,
    },
    {
      id: "settings",
      name: "Settings Cache",
      description: "Cached preferences and configurations",
      icon: Settings,
      size: "0.5 MB",
      safe: false,
    },
  ]

  const handleClear = async () => {
    setIsClearing(true)

    // Simulate clearing process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsClearing(false)
    setIsComplete(true)
  }

  const handleItemToggle = (itemId: string, checked: boolean) => {
    setSelectedItems((prev) => ({ ...prev, [itemId]: checked }))
  }

  const selectedCount = Object.values(selectedItems).filter(Boolean).length
  const totalSize = Object.entries(selectedItems)
    .filter(([_, selected]) => selected)
    .reduce((total, [key]) => {
      const item = cacheItems.find((item) => item.id === key)
      const size = Number.parseFloat(item?.size.split(" ")[0] || "0")
      return total + size
    }, 0)

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
        <div className="bg-white shadow-sm p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/settings">
                <ArrowLeft className="w-6 h-6" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-gray-900 ml-4">Clear Cache</h1>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Cache Cleared!</h2>
              <p className="text-gray-600 mb-6">Successfully freed up {totalSize.toFixed(1)} MB of storage space.</p>
              <Button asChild className="w-full bg-primary hover:bg-primary-600">
                <Link href="/settings">Back to Settings</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <NavigationBar />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/settings">
              <ArrowLeft className="w-6 h-6" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Clear Cache</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Info */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-red-400 to-orange-400 h-2"></div>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Free Up Storage Space</h3>
                <p className="text-gray-600 text-sm">
                  Clear cached data to free up storage space on your device. This won't affect your personal data or
                  settings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Storage Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Storage Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Total Cache Size</span>
                <span className="text-gray-600">70.2 MB</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium text-blue-900">Selected for Clearing</span>
                <span className="text-blue-600">{totalSize.toFixed(1)} MB</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cache Items */}
        <Card>
          <CardHeader>
            <CardTitle>Select Items to Clear</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cacheItems.map((item) => {
                const IconComponent = item.icon
                const isSelected = selectedItems[item.id as keyof typeof selectedItems]

                return (
                  <div
                    key={item.id}
                    className={`flex items-center space-x-3 p-4 border rounded-lg transition-all ${
                      isSelected ? "border-primary bg-primary-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <Checkbox
                      id={item.id}
                      checked={isSelected}
                      onCheckedChange={(checked) => handleItemToggle(item.id, checked as boolean)}
                    />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-gray-600" />
                      </div>
                      <Label htmlFor={item.id} className="cursor-pointer flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{item.name}</span>
                          {!item.safe && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                        </div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </Label>
                      <div className="text-sm font-medium text-gray-900">{item.size}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Warnings */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-900 mb-2">Important Notes</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Clearing scan cache will remove recent scan results</li>
                  <li>• Settings cache affects app performance temporarily</li>
                  <li>• Images and guides will be re-downloaded when needed</li>
                  <li>• Your personal data and preferences are not affected</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clear Button */}
        <Button
          onClick={handleClear}
          disabled={selectedCount === 0 || isClearing}
          className="w-full h-12 bg-red-600 hover:bg-red-700"
        >
          {isClearing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Clearing Cache...
            </>
          ) : (
            <>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Selected Cache ({totalSize.toFixed(1)} MB)
            </>
          )}
        </Button>

        {selectedCount === 0 && (
          <p className="text-center text-sm text-gray-500">Please select at least one item to clear</p>
        )}
      </div>

      <NavigationBar />
    </div>
  )
}
