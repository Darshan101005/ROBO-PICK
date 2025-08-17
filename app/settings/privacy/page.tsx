"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NavigationBar } from "@/components/navigation-bar"
import { ArrowLeft, Shield, Eye, Database, Share, Lock, Globe, Calendar } from "lucide-react"

export default function PrivacyPage() {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Account information (name, email, preferences)",
        "Scan history and results for your personal use",
        "Device information for app optimization",
        "Usage analytics to improve our services",
      ],
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "Provide personalized produce recommendations",
        "Improve our AI scanning accuracy",
        "Send you relevant tips and updates (if enabled)",
        "Ensure app security and prevent fraud",
      ],
    },
    {
      icon: Share,
      title: "Information Sharing",
      content: [
        "We never sell your personal information",
        "Data is not shared with third parties for marketing",
        "Anonymous usage data may be used for research",
        "Legal compliance when required by law",
      ],
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "End-to-end encryption for sensitive data",
        "Secure cloud storage with industry standards",
        "Regular security audits and updates",
        "Limited access on a need-to-know basis",
      ],
    },
    {
      icon: Globe,
      title: "Your Rights",
      content: [
        "Access and download your data anytime",
        "Request deletion of your account and data",
        "Opt-out of non-essential data collection",
        "Update your preferences and settings",
      ],
    },
  ]

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
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Privacy Policy</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Header */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-2"></div>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Privacy Matters</h2>
            <p className="text-gray-600">
              We're committed to protecting your privacy and being transparent about how we handle your data.
            </p>
          </CardContent>
        </Card>

        {/* Last Updated */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <span className="font-medium text-gray-900">Last Updated:</span>
                <span className="text-gray-600 ml-2">January 15, 2025</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Sections */}
        {sections.map((section, index) => {
          const IconComponent = section.icon
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <IconComponent className="w-5 h-5 mr-2 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}

        {/* Data Retention */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2 text-primary" />
              Data Retention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Account Data</h4>
                <p className="text-sm text-gray-600">
                  Retained while your account is active and for 30 days after deletion request
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Scan History</h4>
                <p className="text-sm text-gray-600">
                  Stored for up to 2 years to improve AI accuracy, or until you delete it
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Analytics Data</h4>
                <p className="text-sm text-gray-600">
                  Anonymous usage data retained for up to 1 year for service improvement
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact for Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>Questions About Privacy?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              If you have any questions about this privacy policy or how we handle your data, please don't hesitate to
              contact us.
            </p>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/settings/contact">Contact Privacy Team</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                privacy@robopick.app
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Manage Your Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/settings/export">Download My Data</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/settings/clear-cache">Clear App Data</Link>
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                Delete My Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <NavigationBar />
    </div>
  )
}
