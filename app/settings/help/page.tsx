"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { NavigationBar } from "@/components/navigation-bar"
import {
  ArrowLeft,
  Search,
  HelpCircle,
  BookOpen,
  MessageCircle,
  Video,
  ChevronRight,
  ExternalLink,
  Phone,
  Mail,
} from "lucide-react"

const faqCategories = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: BookOpen,
    questions: [
      {
        question: "How do I scan my first produce item?",
        answer:
          "Tap the camera button, point your phone at the produce, and tap the scan button when the item is in the frame.",
      },
      {
        question: "How accurate is the scanning?",
        answer: "Our AI has over 90% accuracy in identifying produce freshness and quality.",
      },
      {
        question: "Do I need an internet connection?",
        answer:
          "Yes, an internet connection is required for the AI analysis and to access the latest produce information.",
      },
    ],
  },
  {
    id: "color-vision",
    name: "Color Vision",
    icon: HelpCircle,
    questions: [
      {
        question: "How does RoboPick help with color blindness?",
        answer:
          "The app enhances colors and provides alternative indicators like texture, firmness, and smell to help identify fresh produce.",
      },
      {
        question: "Can I change my color vision settings?",
        answer: "Yes, go to Settings > Vision Settings to update your color vision type or retake the vision test.",
      },
      {
        question: "What if I'm not sure about my color vision type?",
        answer:
          "Take our built-in vision test in the app, or consult with an eye care professional for a comprehensive assessment.",
      },
    ],
  },
  {
    id: "features",
    name: "Features",
    icon: Video,
    questions: [
      {
        question: "How do I save items for later?",
        answer: "Tap the heart icon on any scan result or guide to save it to your favorites.",
      },
      {
        question: "Can I create shopping lists?",
        answer: "Yes, use the Market tab to create and manage your shopping lists with price estimates.",
      },
      {
        question: "How do I access my scan history?",
        answer: "Your scan history is available in the History tab, where you can search and filter past scans.",
      },
    ],
  },
]

const contactOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team",
    action: "Start Chat",
    available: "Available 9 AM - 6 PM PST",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us a detailed message",
    action: "Send Email",
    available: "Response within 24 hours",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak with a support agent",
    action: "Call Now",
    available: "Mon-Fri 9 AM - 5 PM PST",
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const filteredCategories = faqCategories.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  }))

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
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Help Center</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search for help..."
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-16 flex-col bg-transparent" asChild>
                <Link href="/guide">
                  <BookOpen className="w-6 h-6 mb-2" />
                  <span className="text-sm">User Guide</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-16 flex-col bg-transparent" asChild>
                <Link href="/vision-test">
                  <HelpCircle className="w-6 h-6 mb-2" />
                  <span className="text-sm">Vision Test</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Categories */}
        <div className="space-y-4">
          {filteredCategories.map((category) => {
            const IconComponent = category.icon
            const isExpanded = expandedCategory === category.id
            const hasResults = category.questions.length > 0

            if (!hasResults && searchQuery) return null

            return (
              <Card key={category.id}>
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                >
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <IconComponent className="w-5 h-5 mr-2" />
                      {category.name}
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  </CardTitle>
                </CardHeader>
                {isExpanded && (
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {category.questions.map((faq, index) => (
                        <div key={index} className="border-l-4 border-primary pl-4">
                          <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                          <p className="text-sm text-gray-600">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>Still Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contactOptions.map((option, index) => {
                const IconComponent = option.icon
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{option.title}</h4>
                        <p className="text-sm text-gray-600">{option.description}</p>
                        <p className="text-xs text-gray-500">{option.available}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {option.action}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link
                href="/settings/about"
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
              >
                <span className="font-medium">About RoboPick</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/settings/privacy"
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
              >
                <span className="font-medium">Privacy Policy</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <span className="font-medium">Community Forum</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <NavigationBar />
    </div>
  )
}
