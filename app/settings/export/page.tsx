"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { NavigationBar } from "@/components/navigation-bar"
import { ArrowLeft, Download, Database, Settings, History, Heart, CheckCircle } from "lucide-react"

export default function ExportPage() {
  const [selectedData, setSelectedData] = useState({
    profile: true,
    scans: true,
    settings: true,
    saved: true,
    history: true,
  })
  const [isExporting, setIsExporting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const dataTypes = [
    {
      id: "profile",
      name: "Profile Information",
      description: "Name, email, color vision settings",
      icon: Settings,
      size: "< 1 KB",
    },
    {
      id: "scans",
      name: "Scan Results",
      description: "All your produce scan history and results",
      icon: History,
      size: "~2.5 MB",
    },
    {
      id: "settings",
      name: "App Settings",
      description: "Preferences, notifications, appearance",
      icon: Settings,
      size: "< 1 KB",
    },
    {
      id: "saved",
      name: "Saved Items",
      description: "Bookmarked guides and scan results",
      icon: Heart,
      size: "~500 KB",
    },
    {
      id: "history",
      name: "Activity History",
      description: "App usage and interaction history",
      icon: Database,
      size: "~1 MB",
    },
  ]

  const handleExport = async () => {
    setIsExporting(true)

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsExporting(false)
    setIsComplete(true)
  }

  const handleDataToggle = (dataType: string, checked: boolean) => {
    setSelectedData((prev) => ({ ...prev, [dataType]: checked }))
  }

  const selectedCount = Object.values(selectedData).filter(Boolean).length
  const totalSize = selectedData.scans ? "~4 MB" : "~1.5 MB"

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
            <h1 className="text-xl font-semibold text-gray-900 ml-4">Export Data</h1>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Export Complete!</h2>
              <p className="text-gray-600 mb-6">Your data has been exported and will be downloaded shortly.</p>
              <div className="space-y-3">
                <Button className="w-full bg-primary hover:bg-primary-600">
                  <Download className="w-4 h-4 mr-2" />
                  Download robopick-data.zip
                </Button>
                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href="/settings">Back to Settings</Link>
                </Button>
              </div>
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
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Export Data</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Info */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-400 to-green-400 h-2"></div>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Download Your Data</h3>
                <p className="text-gray-600 text-sm">
                  Export your RoboPick data in a portable format. You can use this to backup your information or
                  transfer it to another service.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Data to Export</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dataTypes.map((dataType) => {
                const IconComponent = dataType.icon
                const isSelected = selectedData[dataType.id as keyof typeof selectedData]

                return (
                  <div
                    key={dataType.id}
                    className={`flex items-center space-x-3 p-4 border rounded-lg transition-all ${
                      isSelected ? "border-primary bg-primary-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <Checkbox
                      id={dataType.id}
                      checked={isSelected}
                      onCheckedChange={(checked) => handleDataToggle(dataType.id, checked as boolean)}
                    />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-gray-600" />
                      </div>
                      <Label htmlFor={dataType.id} className="cursor-pointer flex-1">
                        <div className="font-medium text-gray-900">{dataType.name}</div>
                        <div className="text-sm text-gray-600">{dataType.description}</div>
                      </Label>
                      <div className="text-xs text-gray-500">{dataType.size}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Export Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Export Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Selected Items</span>
                <span className="text-gray-600">
                  {selectedCount} of {dataTypes.length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Estimated Size</span>
                <span className="text-gray-600">{totalSize}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Format</span>
                <span className="text-gray-600">ZIP Archive</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">📁 File Format</h4>
                <p className="text-sm text-blue-800">
                  Data will be exported as JSON files in a ZIP archive for easy access and portability.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">🔒 Privacy</h4>
                <p className="text-sm text-green-800">
                  Your exported data is encrypted and only accessible to you. We don't store copies of your exports.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-900 mb-2">⏱️ Processing Time</h4>
                <p className="text-sm text-yellow-800">
                  Large exports may take a few minutes to process. You'll receive a download link when ready.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Button */}
        <Button
          onClick={handleExport}
          disabled={selectedCount === 0 || isExporting}
          className="w-full h-12 bg-primary hover:bg-primary-600"
        >
          {isExporting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Preparing Export...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Export Selected Data
            </>
          )}
        </Button>

        {selectedCount === 0 && (
          <p className="text-center text-sm text-gray-500">Please select at least one data type to export</p>
        )}
      </div>

      <NavigationBar />
    </div>
  )
}
