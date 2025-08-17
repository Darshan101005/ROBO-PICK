"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { NavigationBar } from "@/components/navigation-bar"
import { ArrowLeft, Send, MessageCircle, Bug, Lightbulb, HelpCircle, Star } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "feedback",
    message: "",
  })
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const contactTypes = [
    { id: "feedback", name: "General Feedback", icon: MessageCircle, description: "Share your thoughts about the app" },
    { id: "bug", name: "Bug Report", icon: Bug, description: "Report a problem or issue" },
    { id: "feature", name: "Feature Request", icon: Lightbulb, description: "Suggest a new feature" },
    { id: "support", name: "Technical Support", icon: HelpCircle, description: "Get help with using the app" },
    { id: "review", name: "App Review", icon: Star, description: "Share your app store review" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSending(false)
    setIsSent(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
        <div className="bg-white shadow-sm p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/settings">
                <ArrowLeft className="w-6 h-6" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-gray-900 ml-4">Contact Us</h1>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
              <p className="text-gray-600 mb-6">Thank you for contacting us. We'll get back to you within 24 hours.</p>
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
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Contact Us</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Type */}
          <Card>
            <CardHeader>
              <CardTitle>What can we help you with?</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                <div className="space-y-3">
                  {contactTypes.map((type) => {
                    const IconComponent = type.icon
                    return (
                      <div
                        key={type.id}
                        className={`flex items-center space-x-3 p-4 border rounded-lg transition-all ${
                          formData.subject === type.id ? "border-primary bg-primary-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <RadioGroupItem value={type.id} id={type.id} />
                        <div className="flex items-center space-x-3 flex-1">
                          <IconComponent className="w-5 h-5 text-primary" />
                          <Label htmlFor={type.id} className="cursor-pointer flex-1">
                            <div className="font-medium text-gray-900">{type.name}</div>
                            <div className="text-sm text-gray-600">{type.description}</div>
                          </Label>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your full name"
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="h-12"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Message */}
          <Card>
            <CardHeader>
              <CardTitle>Your Message</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Please describe your feedback, issue, or question in detail..."
                  className="min-h-[120px]"
                  required
                />
                <p className="text-sm text-gray-500">The more details you provide, the better we can help you.</p>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSending || !formData.name || !formData.email || !formData.message}
            className="w-full h-12 bg-primary hover:bg-primary-600"
          >
            {isSending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>

        {/* Additional Info */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h4 className="font-medium text-blue-900 mb-2">Response Time</h4>
            <p className="text-sm text-blue-800">
              We typically respond to all messages within 24 hours during business days. For urgent technical issues,
              please include your device model and app version.
            </p>
          </CardContent>
        </Card>
      </div>

      <NavigationBar />
    </div>
  )
}
