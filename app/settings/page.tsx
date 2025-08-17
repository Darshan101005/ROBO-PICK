"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { NavigationBar } from "@/components/navigation-bar"
import { mockUser } from "@/lib/data"
import { updateUserPreferences } from "@/app/actions"
import {
  User,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Palette,
  Volume2,
  Vibrate,
  Moon,
  Globe,
  Download,
  Trash2,
  Star,
  MessageCircle,
  Info,
  Eye,
} from "lucide-react"

export default function SettingsPage() {
  const [preferences, setPreferences] = useState(mockUser.preferences)
  const [isUpdating, setIsUpdating] = useState(false)

  const handlePreferenceChange = async (key: string, value: boolean) => {
    setIsUpdating(true)
    setPreferences((prev) => ({ ...prev, [key]: value }))

    const formData = new FormData()
    formData.append(key, value ? "on" : "off")

    await updateUserPreferences(formData)
    setIsUpdating(false)
  }

  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          icon: User,
          label: "Profile",
          description: "Manage your personal information",
          href: "/settings/profile",
          showChevron: true,
        },
        {
          icon: Eye,
          label: "Vision Settings",
          description: "Color blindness type and preferences",
          href: "/settings/vision",
          showChevron: true,
        },
      ],
    },
    {
      title: "App Preferences",
      items: [
        {
          icon: Bell,
          label: "Notifications",
          description: "Get updates and tips",
          toggle: true,
          key: "notifications",
          value: preferences.notifications,
        },
        {
          icon: Volume2,
          label: "Camera Sound",
          description: "Play sound when scanning",
          toggle: true,
          key: "cameraSound",
          value: preferences.cameraSound,
        },
        {
          icon: Vibrate,
          label: "Haptic Feedback",
          description: "Vibrate on interactions",
          toggle: true,
          key: "hapticFeedback",
          value: preferences.hapticFeedback,
        },
      ],
    },
    {
      title: "Appearance",
      items: [
        {
          icon: Moon,
          label: "Dark Mode",
          description: "Switch to dark theme",
          href: "/settings/appearance",
          showChevron: true,
        },
        {
          icon: Palette,
          label: "Color Correction",
          description: "Adjust color enhancement settings",
          href: "/settings/color-correction",
          showChevron: true,
        },
        {
          icon: Globe,
          label: "Language",
          description: "English",
          href: "/settings/language",
          showChevron: true,
        },
      ],
    },
    {
      title: "Data & Storage",
      items: [
        {
          icon: Download,
          label: "Export Data",
          description: "Download your scan history",
          href: "/settings/export",
          showChevron: true,
        },
        {
          icon: Trash2,
          label: "Clear Cache",
          description: "Free up storage space",
          href: "/settings/clear-cache",
          showChevron: true,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: HelpCircle,
          label: "Help Center",
          description: "Get help and support",
          href: "/settings/help",
          showChevron: true,
        },
        {
          icon: MessageCircle,
          label: "Contact Us",
          description: "Send feedback or report issues",
          href: "/settings/contact",
          showChevron: true,
        },
        {
          icon: Star,
          label: "Rate App",
          description: "Leave a review in the app store",
          href: "/settings/rate",
          showChevron: true,
        },
        {
          icon: Info,
          label: "About",
          description: "App version and information",
          href: "/settings/about",
          showChevron: true,
        },
      ],
    },
    {
      title: "Security",
      items: [
        {
          icon: Shield,
          label: "Privacy Policy",
          description: "How we protect your data",
          href: "/settings/privacy",
          showChevron: true,
        },
        {
          icon: LogOut,
          label: "Sign Out",
          description: "Sign out of your account",
          href: "/",
          showChevron: true,
          danger: true,
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Customize your experience</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Profile Card */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary-400 to-secondary-400 h-2"></div>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{mockUser.name}</h3>
                <p className="text-gray-600">{mockUser.email}</p>
                <p className="text-sm text-primary-600 capitalize">
                  {mockUser.colorBlindType?.replace(/([A-Z])/g, " $1").trim() || "Vision type not set"}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <Card key={sectionIndex}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {section.items.map((item, itemIndex) => {
                  const IconComponent = item.icon
                  const isLast = itemIndex === section.items.length - 1

                  if (item.toggle) {
                    return (
                      <div key={itemIndex}>
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center space-x-3">
                            <IconComponent className="w-5 h-5 text-gray-600" />
                            <div>
                              <Label className="text-base font-medium">{item.label}</Label>
                              <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                          </div>
                          <Switch
                            checked={item.value}
                            onCheckedChange={(checked) => handlePreferenceChange(item.key!, checked)}
                            disabled={isUpdating}
                          />
                        </div>
                        {!isLast && <Separator />}
                      </div>
                    )
                  }

                  return (
                    <div key={itemIndex}>
                      <Link href={item.href!}>
                        <div
                          className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                            item.danger ? "hover:bg-red-50" : ""
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent className={`w-5 h-5 ${item.danger ? "text-red-600" : "text-gray-600"}`} />
                            <div>
                              <span className={`font-medium ${item.danger ? "text-red-600" : "text-gray-900"}`}>
                                {item.label}
                              </span>
                              <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                          </div>
                          {item.showChevron && <ChevronRight className="w-5 h-5 text-gray-400" />}
                        </div>
                      </Link>
                      {!isLast && <Separator />}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* App Info */}
        <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-3">
              <img src="/images/app-logo.png" alt="RoboPick" className="w-full h-full" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">RoboPick</h3>
            <p className="text-sm text-gray-600 mb-2">Version 1.0.0</p>
            <p className="text-xs text-gray-500">Smart Vision for Fresh Choices</p>
          </CardContent>
        </Card>
      </div>

      <NavigationBar />
    </div>
  )
}
