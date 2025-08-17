"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NavigationBar } from "@/components/navigation-bar"
import {
  ArrowLeft,
  Camera,
  RotateCcw,
  Zap,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Share,
  Heart,
  ShoppingBag,
  Upload,
  X,
  MapPin,
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"

interface AnalysisResult {
  item_name: string
  bounding_box: { x1: number; y1: number; x2: number; y2: number }
  ripeness_status: string
  recommendation_score: number
  justification: string
}

interface ApiResponse {
  analysis: AnalysisResult[]
  images: {
    original: string
    simulated: string
    corrected_for_study: string
    annotated_simulated: string
    annotated_corrected: string
  }
  cvd_type: string
}

const CVD_TYPES = [
  { value: "Protanopia", label: "Protanopia (Red-blind)" },
  { value: "Deuteranopia", label: "Deuteranopia (Green-blind)" },
  { value: "Tritanopia", label: "Tritanopia (Blue-blind)" },
  { value: "Protanomaly", label: "Protanomaly (Red-weak)" },
  { value: "Deuteranomaly", label: "Deuteranomaly (Green-weak)" },
  { value: "Tritanomaly", label: "Tritanomaly (Blue-weak)" },
  { value: "Achromatopsia", label: "Achromatopsia (No color)" },
]

export default function CameraPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ApiResponse | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedCvdType, setSelectedCvdType] = useState("Protanopia")
  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      setCameraActive(true)
    }
  }, [])

  const analyzeImage = async (imageFile: File) => {
    setIsScanning(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("image", imageFile)
      formData.append("cvd_type", selectedCvdType)

      const response = await fetch("https://robopick-backend.onrender.com/analyze", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse = await response.json()
      setScanResult(result)
    } catch (error) {
      console.error("Error analyzing image:", error)
      setError("Failed to analyze image. Please try again.")
    } finally {
      setIsScanning(false)
    }
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      await analyzeImage(file)
    }
  }

  const resetScan = () => {
    setScanResult(null)
    setIsScanning(false)
    setUploadedImage(null)
    setError(null)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    if (score >= 40) return "text-orange-600"
    return "text-red-600"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-100"
    if (score >= 60) return "bg-yellow-100"
    if (score >= 40) return "bg-orange-100"
    return "bg-red-100"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return TrendingUp
    if (score >= 40) return Minus
    return TrendingDown
  }

  const getPositionDescription = (bbox: { x1: number; y1: number; x2: number; y2: number }) => {
    const centerX = (bbox.x1 + bbox.x2) / 2
    const centerY = (bbox.y1 + bbox.y2) / 2

    let horizontal = "center"
    let vertical = "middle"

    if (centerX < 0.33) horizontal = "left"
    else if (centerX > 0.66) horizontal = "right"

    if (centerY < 0.33) vertical = "top"
    else if (centerY > 0.66) vertical = "bottom"

    if (horizontal === "center" && vertical === "middle") return "center"
    if (horizontal === "center") return vertical
    if (vertical === "middle") return horizontal
    return `${vertical} ${horizontal}`
  }

  if (scanResult) {
    // Sort analysis by recommendation score (highest first)
    const sortedAnalysis = [...scanResult.analysis].sort((a, b) => b.recommendation_score - a.recommendation_score)
    const bestItems = sortedAnalysis.filter((item) => item.recommendation_score >= 70)
    const averageScore = Math.round(
      sortedAnalysis.reduce((sum, item) => sum + item.recommendation_score, 0) / sortedAnalysis.length,
    )

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
        {/* Header */}
        <div className="bg-white shadow-sm p-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={resetScan}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-semibold">Analysis Results</h1>
            <Button variant="ghost" size="icon">
              <Share className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Desktop Container */}
        <div className="flex-1 max-w-6xl mx-auto w-full p-4 space-y-6">
          {/* Overall Summary */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <div
              className={`h-2 ${averageScore >= 70 ? "bg-gradient-to-r from-green-400 to-green-500" : averageScore >= 50 ? "bg-gradient-to-r from-yellow-400 to-yellow-500" : "bg-gradient-to-r from-red-400 to-red-500"}`}
            ></div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{sortedAnalysis.length}</div>
                  <div className="text-sm text-gray-600">Items Detected</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">{bestItems.length}</div>
                  <div className="text-sm text-gray-600">Good to Pick</div>
                </div>
                <div className="text-center">
                  <div
                    className={`w-16 h-16 ${getScoreBgColor(averageScore)} rounded-full flex items-center justify-center mx-auto mb-3`}
                  >
                    <TrendingUp className={`w-8 h-8 ${getScoreColor(averageScore)}`} />
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>{averageScore}%</div>
                  <div className="text-sm text-gray-600">Average Quality</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Desktop Layout: Images + Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 4-Box Image Grid */}
            <Card>
              <CardHeader>
                <CardTitle>Visual Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-gray-700">Original View</h4>
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={`data:image/jpeg;base64,${scanResult.images.original}`}
                        alt="Original view"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-gray-700">CVD View</h4>
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={`data:image/jpeg;base64,${scanResult.images.simulated}`}
                        alt="CVD simulated view"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-gray-700">Color Corrected</h4>
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={`data:image/jpeg;base64,${scanResult.images.corrected_for_study}`}
                        alt="Color corrected view"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-gray-700">CVD AI Analysis</h4>
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={`data:image/jpeg;base64,${scanResult.images.annotated_simulated}`}
                        alt="CVD AI analyzed view"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <div className="space-y-4">
              {/* Best Picks */}
              {bestItems.length > 0 && (
                <Card className="border-green-200 bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-green-800 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Best Picks ({bestItems.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {bestItems.map((item, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg border border-green-200">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{item.item_name}</h4>
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-green-100 text-green-800">{item.recommendation_score}%</Badge>
                              <div className="flex items-center text-xs text-gray-500">
                                <MapPin className="w-3 h-3 mr-1" />
                                {getPositionDescription(item.bounding_box)}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{item.justification}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* All Items Analysis */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                    Detailed Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {sortedAnalysis.map((item, index) => {
                      const ScoreIcon = getScoreIcon(item.recommendation_score)
                      return (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-8 h-8 ${getScoreBgColor(item.recommendation_score)} rounded-full flex items-center justify-center`}
                              >
                                <ScoreIcon className={`w-4 h-4 ${getScoreColor(item.recommendation_score)}`} />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{item.item_name}</h4>
                                <div className="flex items-center text-xs text-gray-500">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  Located at {getPositionDescription(item.bounding_box)}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-lg font-bold ${getScoreColor(item.recommendation_score)}`}>
                                {item.recommendation_score}%
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {item.ripeness_status}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 ml-10">{item.justification}</p>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-12 bg-transparent">
              <Heart className="w-5 h-5 mr-2" />
              Save Analysis
            </Button>
            <Button className="h-12 bg-primary hover:bg-primary-600">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Add Best Items
            </Button>
            <Button onClick={resetScan} className="h-12 bg-secondary hover:bg-secondary-600">
              <Upload className="w-5 h-5 mr-2" />
              Analyze Another
            </Button>
          </div>
        </div>

        <NavigationBar />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex flex-col pb-20">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm p-4 relative z-10">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className="text-white" asChild>
            <Link href="/home">
              <ArrowLeft className="w-6 h-6" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold text-white">Scan Produce</h1>
          <Button variant="ghost" size="icon" className="text-white">
            <RotateCcw className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Camera/Upload View */}
      <div className="flex-1 relative max-w-2xl mx-auto w-full">
        {uploadedImage ? (
          <div className="w-full h-full relative">
            <img
              src={uploadedImage || "/placeholder.svg"}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-lg"
            />
            <Button
              onClick={() => setUploadedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70"
              size="icon"
            >
              <X className="w-5 h-5 text-white" />
            </Button>
          </div>
        ) : cameraActive ? (
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-lg" />
        ) : (
          <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-4">Camera Preview</p>
              <Button
                onClick={startCamera}
                variant="outline"
                className="text-white border-white bg-transparent rounded-full"
              >
                Start Camera
              </Button>
            </div>
          </div>
        )}

        {/* Scanning Overlay */}
        {isScanning && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
            <Card className="mx-4 border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Analyzing...</h3>
                <p className="text-gray-600 text-sm">AI is examining your produce</p>
                <div className="mt-4 flex justify-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Error Overlay */}
        {error && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
            <Card className="mx-4 border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Analysis Failed</h3>
                <p className="text-gray-600 text-sm mb-4">{error}</p>
                <Button onClick={() => setError(null)} variant="outline" className="rounded-full">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Scan Frame - Only show when camera is not active */}
        {!uploadedImage && !cameraActive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 border-4 border-white/50 rounded-lg relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
            </div>
          </div>
        )}
      </div>

      {/* Upload Section */}
      <div className="bg-black/50 backdrop-blur-sm p-6">
        {/* CVD Type Selector */}
        <div className="mb-6">
          <div className="text-center text-white mb-3">
            <p className="text-sm opacity-80">Select your color vision type</p>
          </div>
          <div className="max-w-sm mx-auto">
            <Select value={selectedCvdType} onValueChange={setSelectedCvdType}>
              <SelectTrigger className="w-full bg-white/10 border-white/20 text-white rounded-full">
                <SelectValue placeholder="Select CVD type" />
              </SelectTrigger>
              <SelectContent>
                {CVD_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-center text-white mb-6">
          <p className="text-sm opacity-80">
            {uploadedImage ? "Image uploaded - ready to analyze" : "Upload an image to analyze produce quality"}
          </p>
        </div>

        {/* Upload Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isScanning}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 text-white font-medium shadow-lg"
          >
            <Upload className="w-5 h-5 mr-3" />
            Upload Image
          </Button>
        </div>

        {/* Hidden file input */}
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

        {/* Tips */}
        <div className="mt-6 flex items-center justify-center space-x-6 text-white/70 text-sm">
          <div className="flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Upload from gallery</span>
          </div>
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-4 h-4" />
            <span>Good lighting helps</span>
          </div>
        </div>
      </div>

      <NavigationBar />
    </div>
  )
}
