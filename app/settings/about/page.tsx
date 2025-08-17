"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NavigationBar } from "@/components/navigation-bar"
import { ArrowLeft, Heart, Users, Globe, Shield, Zap, Award, ExternalLink, Github, Twitter, Mail } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: Zap,
      title: "AI-Powered Scanning",
      description: "Advanced machine learning for accurate produce analysis",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays secure and private",
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Designed for users with color vision differences",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built with feedback from real users",
    },
  ]

  const team = [
    { name: "Sarah Chen", role: "Founder & CEO", specialty: "AI & Accessibility" },
    { name: "Marcus Rodriguez", role: "CTO", specialty: "Computer Vision" },
    { name: "Dr. Emily Watson", role: "Vision Specialist", specialty: "Color Blindness Research" },
    { name: "James Kim", role: "Lead Designer", specialty: "UX/UI Design" },
  ]

  const stats = [
    { label: "Active Users", value: "50K+" },
    { label: "Scans Completed", value: "2M+" },
    { label: "Accuracy Rate", value: "94%" },
    { label: "Countries", value: "25+" },
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
          <h1 className="text-xl font-semibold text-gray-900 ml-4">About RoboPick</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* App Info */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary-400 to-secondary-400 h-2"></div>
          <CardContent className="p-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4">
              <img src="/images/app-logo.png" alt="RoboPick" className="w-full h-full" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">RoboPick</h2>
            <p className="text-gray-600 mb-4">Smart Vision for Fresh Choices</p>
            <div className="flex items-center justify-center space-x-4">
              <Badge variant="secondary">Version 1.0.0</Badge>
              <Badge variant="outline">Build 2025.1</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Mission */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To make grocery shopping accessible and enjoyable for everyone, especially those with color vision
                  differences. We believe that everyone deserves to confidently select fresh, quality produce regardless
                  of how they see color.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Meet the Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {team.map((member, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">{member.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className="text-xs text-gray-500">{member.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recognition */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Recognition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-800">🏆 Best Accessibility App 2025</h4>
                <p className="text-sm text-yellow-700">Tech for Good Awards</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800">🌟 Featured App</h4>
                <p className="text-sm text-blue-700">App Store Accessibility Collection</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800">💚 Community Choice</h4>
                <p className="text-sm text-green-700">Color Blind Awareness Foundation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connect */}
        <Card>
          <CardHeader>
            <CardTitle>Connect With Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Github className="w-5 h-5 mr-3" />
                Follow us on GitHub
                <ExternalLink className="w-4 h-4 ml-auto" />
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Twitter className="w-5 h-5 mr-3" />
                Follow @RoboPickApp
                <ExternalLink className="w-4 h-4 ml-auto" />
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Mail className="w-5 h-5 mr-3" />
                hello@robopick.app
                <ExternalLink className="w-4 h-4 ml-auto" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Legal */}
        <Card>
          <CardContent className="p-4 text-center text-sm text-gray-500">
            <p className="mb-2">© 2025 RoboPick Technologies Inc.</p>
            <div className="flex justify-center space-x-4">
              <Link href="/settings/privacy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-primary">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/settings/contact" className="hover:text-primary">
                Contact
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <NavigationBar />
    </div>
  )
}
