"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { NavigationBar } from "@/components/navigation-bar"
import { mockUser } from "@/lib/data"
import { updateColorBlindType } from "@/app/actions"
import { ArrowLeft, Eye, TestTube, Save, Info } from "lucide-react"

const colorBlindnessTypes = [
  {
    id: "normal",
    name: "Normal Color Vision",
    description: "No color vision deficiency",
    prevalence: "Most common",
  },
  {
    id: "protanopia",
    name: "Protanopia",
    description: "Difficulty seeing red colors",
    prevalence: "1% of men",
  },
  {
    id: "deuteranopia",
    name: "Deuteranopia",
    description: "Difficulty seeing green colors",
    prevalence: "1% of men",
  },
  {
    id: "tritanopia",
    name: "Tritanopia",
    description: "Difficulty seeing blue colors",
    prevalence: "Very rare",
  },
  {
    id: "protanomaly",
    name: "Protanomaly",
    description: "Reduced sensitivity to red light",
    prevalence: "1% of men",
  },
  {
    id: "deuteranomaly",
    name: "Deuteranomaly",
    description: "Reduced sensitivity to green light",
    prevalence: "5% of men",
  },
  {
    id: "tritanomaly",
    name: "Tritanomaly",
    description: "Reduced sensitivity to blue light",
    prevalence: "Very rare",
  },
]

export default function VisionSettingsPage() {
  const [selectedType, setSelectedType] = useState(mockUser.colorBlindType || "normal")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    const formData = new FormData()
    formData.append("colorBlindType", selectedType)
    await updateColorBlindType(formData)
    setIsSaving(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/settings">
                <ArrowLeft className="w-6 h-6" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-gray-900 ml-4">Vision Settings</h1>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary-600">
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Current Setting */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary-400 to-secondary-400 h-2"></div>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Current Setting</h3>
                <p className="text-gray-600 capitalize">
                  {colorBlindnessTypes.find((type) => type.id === selectedType)?.name || "Not set"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vision Test Option */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TestTube className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Not Sure About Your Vision Type?</h3>
                <p className="text-gray-600 text-sm">
                  Take our comprehensive vision test to determine your color vision type
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/vision-test">Take Test</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Vision Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Your Vision Type</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedType} onValueChange={setSelectedType}>
              <div className="space-y-3">
                {colorBlindnessTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`flex items-center space-x-3 p-4 border rounded-lg transition-all ${
                      selectedType === type.id ? "border-primary bg-primary-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <RadioGroupItem value={type.id} id={type.id} />
                    <Label htmlFor={type.id} className="flex-1 cursor-pointer">
                      <div className="font-medium text-gray-900">{type.name}</div>
                      <div className="text-sm text-gray-600">{type.description}</div>
                      <div className="text-xs text-gray-500">{type.prevalence}</div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Information */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">How This Helps</h4>
                <p className="text-sm text-blue-800">
                  Setting your vision type allows RoboPick to optimize color enhancement and provide better guidance
                  when scanning produce. The app will adjust its analysis to work best with your specific type of color
                  vision.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <NavigationBar />
    </div>
  )
}
