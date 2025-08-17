"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, HelpCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Ishihara test plates
const testQuestions = [
  {
    id: 1,
    question: "What number do you see in this image?",
    image: "/placeholder.svg?height=250&width=250",
    options: ["12", "8", "3", "I can't see a number"],
    correct: "12",
    colorBlindType: "Deuteranopia/Protanopia",
  },
  {
    id: 2,
    question: "What number do you see in this image?",
    image: "/placeholder.svg?height=250&width=250",
    options: ["8", "3", "6", "I can't see a number"],
    correct: "8",
    colorBlindType: "Deuteranopia/Protanopia",
  },
  {
    id: 3,
    question: "What number do you see in this image?",
    image: "/placeholder.svg?height=250&width=250",
    options: ["29", "70", "79", "I can't see a number"],
    correct: "29",
    colorBlindType: "Deuteranopia/Protanopia",
  },
  {
    id: 4,
    question: "What number do you see in this image?",
    image: "/placeholder.svg?height=250&width=250",
    options: ["5", "2", "7", "I can't see a number"],
    correct: "5",
    colorBlindType: "Protanopia",
  },
  {
    id: 5,
    question: "What number do you see in this image?",
    image: "/placeholder.svg?height=250&width=250",
    options: ["3", "8", "5", "I can't see a number"],
    correct: "3",
    colorBlindType: "Deuteranopia",
  },
  {
    id: 6,
    question: "What number do you see in this image?",
    image: "/placeholder.svg?height=250&width=250",
    options: ["15", "17", "75", "I can't see a number"],
    correct: "15",
    colorBlindType: "Tritanopia",
  },
  {
    id: 7,
    question: "What number do you see in this image?",
    image: "/placeholder.svg?height=250&width=250",
    options: ["74", "21", "71", "I can't see a number"],
    correct: "74",
    colorBlindType: "Tritanopia",
  },
  {
    id: 8,
    question: "What number do you see in this image?",
    image: "/placeholder.svg?height=250&width=250",
    options: ["42", "4", "2", "I can't see a number"],
    correct: "42",
    colorBlindType: "Protanomaly",
  },
  {
    id: 9,
    question: "What number do you see in this image?",
    image: "/placeholder.svg?height=250&width=250",
    options: ["6", "9", "8", "I can't see a number"],
    correct: "6",
    colorBlindType: "Deuteranomaly",
  },
  {
    id: 10,
    question: "What number do you see in this image?",
    image: "/placeholder.svg?height=250&width=250",
    options: ["57", "35", "75", "I can't see a number"],
    correct: "57",
    colorBlindType: "Normal vision",
  },
]

export default function VisionTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(((currentQuestion + 1) / testQuestions.length) * 100)
  }, [currentQuestion])

  const handleNext = () => {
    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)

    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer("")
    } else {
      setIsComplete(true)
    }
  }

  const getResult = () => {
    // Count incorrect answers by type
    const incorrectByType: Record<string, number> = {
      "Deuteranopia/Protanopia": 0,
      Protanopia: 0,
      Deuteranopia: 0,
      Tritanopia: 0,
      Protanomaly: 0,
      Deuteranomaly: 0,
      "Normal vision": 0,
    }

    answers.forEach((answer, index) => {
      if (answer !== testQuestions[index].correct) {
        incorrectByType[testQuestions[index].colorBlindType] =
          (incorrectByType[testQuestions[index].colorBlindType] || 0) + 1
      }
    })

    // Determine most likely color blindness type
    let maxIncorrect = 0
    let likelyType = "Normal Color Vision"

    for (const [type, count] of Object.entries(incorrectByType)) {
      if (count > maxIncorrect && type !== "Normal vision") {
        maxIncorrect = count
        likelyType = type
      }
    }

    // If deuteranopia/protanopia has highest count, check specific types
    if (likelyType === "Deuteranopia/Protanopia") {
      if (incorrectByType["Deuteranopia"] > incorrectByType["Protanopia"]) {
        likelyType = "Deuteranopia"
      } else if (incorrectByType["Protanopia"] > incorrectByType["Deuteranopia"]) {
        likelyType = "Protanopia"
      }
    }

    // If few or no errors, likely normal vision
    const totalIncorrect = Object.values(incorrectByType).reduce((sum, count) => sum + count, 0)
    if (totalIncorrect <= 2) {
      likelyType = "Normal Color Vision"
    }

    return likelyType
  }

  const getResultDescription = () => {
    const result = getResult()

    switch (result) {
      case "Normal Color Vision":
        return "You have normal color vision. The app will still enhance colors to make produce selection easier."
      case "Deuteranopia":
        return "You may have deuteranopia, which affects green color perception. We'll optimize the app for your vision type."
      case "Protanopia":
        return "You may have protanopia, which affects red color perception. We'll optimize the app for your vision type."
      case "Tritanopia":
        return "You may have tritanopia, which affects blue color perception. We'll optimize the app for your vision type."
      case "Deuteranomaly":
        return "You may have deuteranomaly, a mild form of green color blindness. We'll optimize the app for your vision type."
      case "Protanomaly":
        return "You may have protanomaly, a mild form of red color blindness. We'll optimize the app for your vision type."
      default:
        return "Based on your responses, we'll customize the app to enhance your color perception."
    }
  }

  if (isComplete) {
    return (
      <div className="min-h-screen app-gradient flex flex-col">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/vision-setup">
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

        <div className="flex-1 px-6 py-8">
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-primary-400 to-secondary-400 h-2"></div>
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">Test Results</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                <Image src="/images/app-logo.png" alt="RoboPick Logo" width={40} height={40} />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{getResult()}</h3>
                <p className="text-gray-600 text-sm">{getResultDescription()}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Test Summary</h4>
                <p className="text-sm text-gray-600">
                  You answered {answers.filter((answer, index) => answer === testQuestions[index].correct).length} out
                  of {testQuestions.length} questions correctly.
                </p>
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full h-12 bg-primary hover:bg-primary-600">
                  <Link href="/home">Continue to App</Link>
                </Button>

                <Button asChild variant="outline" className="w-full h-12 bg-transparent">
                  <Link href="/vision-setup">Choose Manually Instead</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen app-gradient flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/vision-setup">
            <ArrowLeft className="w-6 h-6" />
          </Link>
        </Button>
        <div className="flex-1 text-center">
          <div className="w-10 h-10 relative mx-auto">
            <Image src="/images/app-logo.png" alt="RoboPick Logo" fill style={{ objectFit: "contain" }} />
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <HelpCircle className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How to take the test</DialogTitle>
              <DialogDescription>
                Look at each image and select the number or shape you see. If you can't see anything clearly, select "I
                can't see a number". Take your time and answer honestly for the most accurate results.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {/* Progress */}
      <div className="px-6 pb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            Question {currentQuestion + 1} of {testQuestions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex-1 px-6 py-4">
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary-400 to-secondary-400 h-2"></div>
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">{testQuestions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center">
                <img
                  src={testQuestions[currentQuestion].image || "/placeholder.svg"}
                  alt="Color vision test plate"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>

            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              <div className="space-y-3">
                {testQuestions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-4 border rounded-lg transition-all ${
                      selectedAnswer === option ? "border-primary bg-primary-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-medium">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleNext}
              className="w-full h-12 text-lg bg-primary hover:bg-primary-600"
              disabled={!selectedAnswer}
            >
              {currentQuestion < testQuestions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              ) : (
                "Complete Test"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
