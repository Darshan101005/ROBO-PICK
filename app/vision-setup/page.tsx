"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, TestTube, Info, ArrowRight } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const colorBlindnessTypes = [
  {
    id: "protanopia",
    name: "Protanopia",
    description: "Difficulty seeing red colors",
    prevalence: "1% of men",
    info: "Protanopia is a type of color blindness where individuals have difficulty distinguishing between red and green colors, specifically lacking the long-wavelength sensitive retinal cones.",
  },
  {
    id: "deuteranopia",
    name: "Deuteranopia",
    description: "Difficulty seeing green colors",
    prevalence: "1% of men",
    info: "Deuteranopia is a condition where the medium-wavelength sensitive retinal cones are absent, making it difficult to distinguish between red and green colors.",
  },
  {
    id: "tritanopia",
    name: "Tritanopia",
    description: "Difficulty seeing blue colors",
    prevalence: "Very rare",
    info: "Tritanopia is a rare form of color blindness that affects the short-wavelength cones in the retina, resulting in difficulty distinguishing between blue and yellow colors.",
  },
  {
    id: "protanomaly",
    name: "Protanomaly",
    description: "Reduced sensitivity to red light",
    prevalence: "1% of men",
    info: "Protanomaly is a mild form of red-green color blindness where red cones are present but have an abnormal sensitivity to light wavelengths.",
  },
  {
    id: "deuteranomaly",
    name: "Deuteranomaly",
    description: "Reduced sensitivity to green light",
    prevalence: "5% of men",
    info: "Deuteranomaly is the most common type of color blindness, characterized by a reduced sensitivity to green light due to abnormal green cone photopigments.",
  },
  {
    id: "tritanomaly",
    name: "Tritanomaly",
    description: "Reduced sensitivity to blue light",
    prevalence: "Very rare",
    info: "Tritanomaly is a rare condition where the blue cone photopigments have an abnormal sensitivity, resulting in reduced discrimination between blue and green colors and between yellow and red colors.",
  },
  {
    id: "achromatopsia",
    name: "Achromatopsia",
    description: "Complete color blindness",
    prevalence: "Extremely rare",
    info: "Achromatopsia is a rare condition characterized by the absence or malfunction of all cone cells in the retina, resulting in the inability to perceive any colors.",
  },
]

export default function VisionSetupPage() {
  const [selectedType, setSelectedType] = useState("")

  return (
    <div className="min-h-screen app-gradient flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/login">
            <ArrowLeft className="w-6 h-6" />
          </Link>
        </Button>
        <div className="flex-1 text-center">
          <div className="w-10 h-10 relative mx-auto">
            <Image src="/images/app-logo.png" alt="RoboPick Logo" fill style={{ objectFit: "contain" }} />
          </div>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 px-6 py-4">
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary-400 to-secondary-400 h-2"></div>
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">Vision Setup</CardTitle>
            <p className="text-gray-600">Select your color vision type to personalize your experience</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={selectedType} onValueChange={setSelectedType}>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
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
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Info className="h-4 w-4" />
                            <span className="sr-only">Info</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{type.info}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="space-y-3 pt-2">
              <Button asChild className="w-full h-12 text-lg bg-primary hover:bg-primary-600" disabled={!selectedType}>
                <Link href="/home">
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full h-12 bg-transparent">
                <Link href="/vision-test">
                  <TestTube className="w-5 h-5 mr-2" />
                  I'm not sure - Take Vision Test
                </Link>
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">Don't worry, you can change this later in settings</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
