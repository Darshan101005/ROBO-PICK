"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { NavigationBar } from "@/components/navigation-bar"
import { ArrowLeft, Moon, Sun, Smartphone, Type, Palette, Save } from "lucide-react"

export default function AppearancePage() {
  const [settings, setSettings] = useState({
    darkMode: false,
    autoTheme: true,
    fontSize: "medium",
    colorIntensity: [75],
    highContrast: false,
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const fontSizes = [
    { id: "small", name: "Small", description: "Compact text size" },
    { id: "medium", name: "Medium", description: "Default text size" },
    { id: "large", name: "Large", description: "Larger text for better readability" },
    { id: "extra-large", name: "Extra Large", description: "Maximum text size" },
  ]

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
            <h1 className="text-xl font-semibold text-gray-900 ml-4">Appearance</h1>
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
        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Moon className="w-5 h-5 mr-2" />
              Theme
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Auto Theme</Label>
                <p className="text-sm text-gray-600">Follow system theme settings</p>
              </div>
              <Switch
                checked={settings.autoTheme}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, autoTheme: checked }))}
              />
            </div>

            {!settings.autoTheme && (
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Dark Mode</Label>
                  <p className="text-sm text-gray-600">Use dark theme</p>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, darkMode: checked }))}
                />
              </div>
            )}

            {/* Theme Preview */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-white border-2 border-primary rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Sun className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">Light</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded"></div>
                  <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                </div>
              </div>
              <div className="p-4 bg-gray-900 border-2 border-gray-700 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Moon className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-white">Dark</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-700 rounded"></div>
                  <div className="h-2 bg-gray-600 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Font Size */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Type className="w-5 h-5 mr-2" />
              Font Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={settings.fontSize}
              onValueChange={(value) => setSettings((prev) => ({ ...prev, fontSize: value }))}
            >
              <div className="space-y-3">
                {fontSizes.map((size) => (
                  <div
                    key={size.id}
                    className={`flex items-center space-x-3 p-4 border rounded-lg transition-all ${
                      settings.fontSize === size.id ? "border-primary bg-primary-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <RadioGroupItem value={size.id} id={size.id} />
                    <Label htmlFor={size.id} className="flex-1 cursor-pointer">
                      <div className="font-medium text-gray-900">{size.name}</div>
                      <div className="text-sm text-gray-600">{size.description}</div>
                    </Label>
                    <div
                      className={`text-gray-900 ${
                        size.id === "small"
                          ? "text-sm"
                          : size.id === "large"
                            ? "text-lg"
                            : size.id === "extra-large"
                              ? "text-xl"
                              : "text-base"
                      }`}
                    >
                      Aa
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Color Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Color Enhancement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Label className="text-base font-medium">Color Intensity</Label>
                  <p className="text-sm text-gray-600">Adjust color enhancement strength</p>
                </div>
                <span className="text-sm font-medium">{settings.colorIntensity[0]}%</span>
              </div>
              <Slider
                value={settings.colorIntensity}
                onValueChange={(value) => setSettings((prev) => ({ ...prev, colorIntensity: value }))}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Subtle</span>
                <span>Strong</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">High Contrast</Label>
                <p className="text-sm text-gray-600">Increase contrast for better visibility</p>
              </div>
              <Switch
                checked={settings.highContrast}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, highContrast: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sample Content</h4>
                  <p className="text-sm text-gray-600">This is how text will appear</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-primary-300 rounded"></div>
                <div className="h-2 bg-secondary-300 rounded w-3/4"></div>
                <div className="h-2 bg-primary-200 rounded w-1/2"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <NavigationBar />
    </div>
  )
}
