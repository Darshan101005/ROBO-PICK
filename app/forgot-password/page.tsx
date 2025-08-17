"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, CheckCircle, ArrowRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState("email")

  const handleSubmit = () => {
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen app-gradient flex flex-col">
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

        <div className="flex-1 px-6 py-8 flex items-center">
          <Card className="border-0 shadow-lg w-full overflow-hidden">
            <div className="bg-gradient-to-r from-primary-400 to-secondary-400 h-2"></div>
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-secondary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Check Your {activeTab === "email" ? "Email" : "Phone"}
              </h2>
              <p className="text-gray-600 mb-8">
                {activeTab === "email" ? (
                  <>
                    We've sent a password reset link to <span className="font-medium">{email}</span>
                  </>
                ) : (
                  <>
                    We've sent a verification code to <span className="font-medium">{phone}</span>
                  </>
                )}
              </p>
              <Button asChild className="w-full h-12 bg-primary hover:bg-primary-600">
                <Link href="/login">Back to Sign In</Link>
              </Button>
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

      <div className="flex-1 px-6 py-8 flex flex-col justify-center">
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary-400 to-secondary-400 h-2"></div>
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">Reset Password</CardTitle>
            <p className="text-gray-600">Choose how to receive your reset link</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="email" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 h-12"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">+1</span>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="pl-10 h-12"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button
              onClick={handleSubmit}
              className="w-full h-12 text-lg bg-primary hover:bg-primary-600"
              disabled={activeTab === "email" ? !email : !phone}
            >
              Send Reset Link
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <div className="text-center">
              <Link href="/login" className="text-sm text-primary hover:underline">
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
