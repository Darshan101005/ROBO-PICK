"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
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

// No changes needed to the testQuestions array
const testQuestions = [
    {
      id: 1,
      type: 'mcq',
      question: "Which black and white image below matches the pattern in the colored image?",
      image: "/plates/plate1.png",
      options: [
        "/options/plate1correct.png",
        "/options/plate1wrong1.png",
        "/options/plate1wrong2.png",
        "/options/plate1wrong3.png",
        "I can't see a clear pattern",
      ],
      correct: "/options/plate1correct.png",
      diagnosis: { "I can't see a clear pattern": { tritan: 4 } },
      optionLayout: 'grid'
    },
    {
      id: 2,
      type: 'mcq',
      question: "What are the colors of the two dots?",
      image: "/plates/plate2.png",
      options: ["Top: Red, Bottom: Green", "Top: Dark Yellow, Bottom: Yellow", "Top: Pink, Bottom: Teal", "I see no difference"],
      correct: "Top: Red, Bottom: Green",
      diagnosis: {
        "Top: Dark Yellow, Bottom: Yellow": { protan: 3, deutan: 2 },
        "Top: Pink, Bottom: Teal": { tritan: 3 },
        "I see no difference": { protan: 4, deutan: 4 },
      },
      optionLayout: 'list'
    },
    {
      id: 3,
      type: 'mcq',
      question: "Which black and white image below matches the pattern in the colored image?",
      image: "/plates/plate3.png",
      options: [
        "/options/plate3correct.png",
        "/options/plate3wrong1.png",
        "/options/plate3wrong2.png",
        "/options/plate3wrong3.png",
        "I struggle to see a clear pattern",
      ],
      correct: "/options/plate3correct.png",
      diagnosis: { "I struggle to see a clear pattern": { protan: 1, deutan: 1 } },
      optionLayout: 'grid'
    },
    {
      id: 4,
      type: 'mcq',
      question: "What color lines can you trace?",
      image: "/plates/plate4.png",
      options: ["A pink line and a violet line", "Only the bottom line is clear", "I see two gray lines", "I see no lines"],
      correct: "A pink line and a violet line",
      diagnosis: {
        "Only the bottom line is clear": { protan: 3, deutan: 3 },
        "I see two gray lines": { protan: 4, deutan: 4 },
        "I see no lines": { protan: 2, deutan: 2 },
      },
      optionLayout: 'list'
    },
    {
      id: 5,
      type: 'text',
      question: "What number do you see?",
      image: "/plates/plate5.png",
      correct: "12",
      diagnosis: {},
      control: true,
    },
    {
      id: 6,
      type: 'text',
      question: "What number do you see?",
      image: "/plates/plate6.png",
      correct: "59",
      diagnosis: { "I can't see a number": { deutan: 4, protan: 2 } },
    },
    {
      id: 7,
      type: 'text',
      question: "What number do you see?",
      image: "/plates/plate7.png",
      correct: "74",
      diagnosis: {
        "21": { protan: 4, deutan: 3 },
        "71": { deutan: 2 },
        "I can't see a number": { protan: 2, deutan: 2 },
      },
    },
    {
      id: 8,
      type: 'text',
      question: "What number do you see?",
      image: "/plates/plate9.png",
      correct: "23",
      diagnosis: { "I can't see a number": { protan: 4, deutan: 4 } },
    },
    {
      id: 9,
      type: 'text',
      question: "What number do you see?",
      image: "/plates/plate10.png",
      correct: "3",
      diagnosis: { "5": { protan: 3, deutan: 2 }, "I can't see a number": { protan: 4, deutan: 4 } },
    },
    {
      id: 10,
      type: 'text',
      question: "What number do you see?",
      image: "/plates/plate11.png",
      correct: "29",
      diagnosis: { "70": { protan: 4, deutan: 4 }, "I can't see a number": { protan: 2, deutan: 2 } },
    },
    {
      id: 11,
      type: 'mcq',
      question: "What shapes do you see?",
      image: "/plates/plate12.png",
      options: ["A circle at the top and a triangle at the bottom", "Only a circle", "Only a triangle", "I see no distinct shapes"],
      correct: "A circle at the top and a triangle at the bottom",
      diagnosis: { "I see no distinct shapes": { protan: 4, deutan: 4 } },
      optionLayout: 'list'
    },
    {
      id: 12,
      type: 'text',
      question: "What number do you see?",
      image: "/plates/plate13.png",
      correct: "2",
      diagnosis: { "I can't see a number": { protan: 4, deutan: 4 } },
    },
    {
      id: 13,
      type: 'text',
      question: "What number do you see?",
      image: "/plates/plate14.png",
      correct: "45",
      diagnosis: { "I can't see a number": { protan: 4, deutan: 4 } },
    },
    {
      id: 14,
      type: 'text',
      question: "What number do you see?",
      image: "/plates/plate15.png",
      correct: "16",
      diagnosis: { "I can't see a number": { protan: 4, deutan: 4 } },
    },
    {
      id: 15,
      type: 'text',
      question: "What number do you see?",
      image: "/plates/plate16.png",
      correct: "73",
      diagnosis: { "I can't see a number": { tritan: 4 } },
    },
]


export default function VisionTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [isNilChecked, setIsNilChecked] = useState(false);
  const [isComplete, setIsComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState({ title: "", description: "", note: "" })

  const currentQ = testQuestions[currentQuestion];

  useEffect(() => {
    setProgress(((currentQuestion + 1) / testQuestions.length) * 100)
    setSelectedAnswer("");
    setIsNilChecked(false);
  }, [currentQuestion])

  /**
   * NEW: Asynchronous function to save the test result.
   */
  const saveTestResult = async (diagnosis: object, finalAnswers: string[]) => {
    // Construct a detailed history of answers for this session
    const answerHistory = finalAnswers.map((userAnswer, index) => {
      const question = testQuestions[index];
      return {
        questionId: question.id,
        questionText: question.question,
        userAnswer: userAnswer,
        correctAnswer: question.correct,
        isCorrect: userAnswer === question.correct,
      };
    });

    const correctCount = answerHistory.filter(a => a.isCorrect).length;

    // Create the final data payload
    const payload = {
      timestamp: new Date().toISOString(),
      diagnosis,
      summary: {
        correctCount,
        totalQuestions: testQuestions.length,
      },
      answerHistory,
    };

    try {
      // FIX: Use the correct API endpoint
      const response = await fetch('/api/save-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save the result.');
      }

      console.log('Result saved successfully!');

    } catch (error) {
      console.error('Error:', error);
      // Here you could show an error message to the user
    }
  };


  const handleNext = async () => {
    let finalAnswer = selectedAnswer;
    if (currentQ.type === 'text') {
      finalAnswer = isNilChecked ? "I can't see a number" : selectedAnswer;
    }

    const newAnswers = [...answers, finalAnswer]
    setAnswers(newAnswers)

    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Test is complete, process the final answers and save
      const diagnosisResult = getDiagnosisResult(newAnswers);
      setResult(diagnosisResult); // Update UI state
      await saveTestResult(diagnosisResult, newAnswers); // Save the result
      setIsComplete(true);
    }
  }

  // MODIFIED: This function now returns the result object
  const getDiagnosisResult = (finalAnswers: string[]) => {
    const scores = { protan: 0, deutan: 0, tritan: 0, unreliable: false }

    finalAnswers.forEach((answer, index) => {
      const question = testQuestions[index]
      if (answer !== question.correct) {
        if (question.control) {
          scores.unreliable = true
        }

        const errorEffect = question.diagnosis[answer as keyof typeof question.diagnosis]
        if (errorEffect) {
          for (const type in errorEffect) {
            if (Object.prototype.hasOwnProperty.call(scores, type)) {
              const key = type as keyof Omit<typeof scores, "unreliable">
              const value = errorEffect[key as keyof typeof errorEffect]
              if (typeof value === "number") {
                scores[key] += value
              }
            }
          }
        } else {
          scores.protan += 0.5
          scores.deutan += 0.5
        }
      }
    })

    const NORMAL_VISION_THRESHOLD = 8
    const RED_GREEN_THRESHOLD = 5
    const TRITAN_THRESHOLD = 6
    const totalScore = scores.protan + scores.deutan + scores.tritan

    let finalDiagnosis = {
      title: "",
      description: "",
      note: "",
    }

    if (scores.unreliable && totalScore > 7) {
      finalDiagnosis.note = "Note: You missed a control question. This may impact the reliability of these results."
    }

    if (totalScore < NORMAL_VISION_THRESHOLD) {
      finalDiagnosis.title = "Normal Color Vision"
      finalDiagnosis.description = `Your answers are consistent with normal trichromatic color vision. Your total error score of ${totalScore.toFixed(1)} is below the threshold required for a deficiency diagnosis.`
    } else {
      const isRedGreen = scores.protan + scores.deutan > scores.tritan * 1.5
      const maxRedGreen = Math.max(scores.protan, scores.deutan)

      if (isRedGreen && maxRedGreen > RED_GREEN_THRESHOLD) {
        finalDiagnosis.title = "Indication of Red-Green Deficiency"
        if (scores.protan > scores.deutan * 1.5) {
          finalDiagnosis.description = "Your error score is above the threshold, and your answers strongly suggest a Protan-type deficiency (Protanopia/Protanomaly), involving reduced sensitivity to red light."
        } else if (scores.deutan > scores.protan * 1.5) {
          finalDiagnosis.description = "Your error score is above the threshold, and your answers strongly suggest a Deutan-type deficiency (Deuteranopia/Deuteranomaly), which involves reduced sensitivity to green light."
        } else {
          finalDiagnosis.description = "Your error score points to a general Red-Green deficiency, but is not specific enough to differentiate between the Protan and Deutan types from this test alone."
        }
      } else if (scores.tritan > TRITAN_THRESHOLD) {
        finalDiagnosis.title = "Indication of Blue-Yellow Deficiency"
        finalDiagnosis.description = "Your answers suggest a Tritan-type deficiency (Tritanopia/Tritanomaly), a rare condition involving difficulty distinguishing between blue/green and yellow/violet."
      } else {
        finalDiagnosis.title = "Inconclusive / Mild Deficiency"
        finalDiagnosis.description = `Your total error score of ${totalScore.toFixed(1)} was above the normal threshold, but your mistakes did not consistently match a single pattern. This could indicate a very mild or non-specific color vision deficiency.`
      }
    }
    return finalDiagnosis;
  }

  // --- RENDER LOGIC (No changes below this line) --- //

  if (isComplete) {
    return (
      <div className="min-h-screen app-gradient flex flex-col">
        {/* Results Header */}
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
        {/* Results Card */}
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{result.title}</h3>
                {result.note && <p className="text-sm text-yellow-800 bg-yellow-50 p-3 rounded-lg mb-4">{result.note}</p>}
                <p className="text-gray-600 text-sm">{result.description}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Test Summary</h4>
                <p className="text-sm text-gray-600">
                  You answered {answers.filter((answer, index) => answer === testQuestions[index].correct).length} out
                  of {testQuestions.length} questions correctly.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Disclaimer: This is a high-fidelity screening tool, not a formal medical diagnosis.
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

  const isGridLayout = currentQ.optionLayout === 'grid';
  const isButtonDisabled = currentQ.type === 'text' ? !selectedAnswer && !isNilChecked : !selectedAnswer;

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
                Look at each image and select the number, shape, or pattern you see. If you can't see anything clearly, select the "I can't see..." option. Take your time and answer honestly for the most accurate results.
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
            <CardTitle className="text-xl font-bold text-gray-900">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center">
                <img
                  src={currentQ.image || "/placeholder.svg"}
                  alt="Color vision test plate"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>

            {/* CONDITIONAL RENDER: MCQ or TEXT INPUT */}
            {currentQ.type === 'mcq' && currentQ.options && (
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                <div className={isGridLayout ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
                  {currentQ.options.map((option, index) => {
                    const isImageOption = option.endsWith('.png');
                    const isTextInGrid = !isImageOption && isGridLayout;

                    return (
                      <div
                        key={index}
                        className={`flex items-center justify-center rounded-lg transition-all ${
                          selectedAnswer === option ? "border-primary bg-primary-50 border-2" : "border hover:bg-gray-50"
                        } ${isTextInGrid ? 'col-span-2' : ''}`}
                      >
                        <RadioGroupItem value={option} id={`option-${index}`} className="sr-only" />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-medium p-4 text-center">
                          {isImageOption ? (
                            <img src={option} alt={`Option ${index+1}`} className="w-24 h-24 object-contain mx-auto rounded-md" />
                          ) : (
                            option
                          )}
                        </Label>
                      </div>
                    )
                  })}
                </div>
              </RadioGroup>
            )}

            {currentQ.type === 'text' && (
              <div className="space-y-4 max-w-xs mx-auto">
                <Input
                  type="number"
                  placeholder="Enter number"
                  className="text-center text-lg h-12"
                  value={selectedAnswer}
                  onChange={(e) => {
                    setSelectedAnswer(e.target.value);
                    if (isNilChecked) setIsNilChecked(false);
                  }}
                  disabled={isNilChecked}
                />
                <div className="flex items-center justify-center space-x-2">
                  <Checkbox 
                    id="nil-check" 
                    checked={isNilChecked}
                    onCheckedChange={(checked) => {
                      setIsNilChecked(!!checked);
                      if (checked) setSelectedAnswer("");
                    }}
                  />
                  <Label htmlFor="nil-check" className="text-gray-600">I can't see a number</Label>
                </div>
              </div>
            )}
            
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleNext}
              className="w-full h-12 text-lg bg-primary hover:bg-primary-600"
              disabled={isButtonDisabled}
            >
              {currentQuestion < testQuestions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              ) : (
                // CHANGE: Last question button text
                "Save & Complete Test"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}