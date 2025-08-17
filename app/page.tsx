"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { User } from "@supabase/supabase-js"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Eye, Smartphone, Shield, Users, Star, ArrowRight, Menu, X, LogOut, UserIcon } from "lucide-react"

export default function LandingPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setMobileMenuOpen(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-orange-50/80 via-white/80 to-green-50/80 backdrop-blur-sm border-b border-orange-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 relative">
                <Image src="/images/app-logo.png" alt="RoboPick Logo" fill style={{ objectFit: "contain" }} />
              </div>
              <span className="text-xl font-bold text-gray-900">RoboPick</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Welcome back, {user.user_metadata?.full_name || "User"}!</span>
                  <Button asChild>
                    <Link href="/home">
                      Go to App
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="ghost" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-orange-100">
            <div className="px-4 py-4 space-y-3">
              {user ? (
                <>
                  <div className="text-gray-700 font-medium">
                    Welcome back, {user.user_metadata?.full_name || "User"}!
                  </div>
                  <Button className="w-full" asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link href="/home">
                      Go to App
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="w-full" asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button className="w-full" asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                  🎯 AI-Powered Produce Detection
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Smart Shopping for{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    Everyone
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  RoboPick uses advanced AI to help you identify the freshest fruits and vegetables, making grocery
                  shopping accessible and confident for everyone, including those with color vision differences.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {!user && (
                  <>
                    <Button size="lg" className="text-lg px-8" asChild>
                      <Link href="/signup">
                        Get Started Free
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
                      <Link href="/login">Sign In</Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">99%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">Produce Types</div>
                </div>
              </div>
            </div>

            {/* Right Content - Phone Mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Phone Frame */}
                <div className="w-72 h-[580px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"></div>

                    {/* Screen Content */}
                    <div className="h-full bg-gradient-to-br from-orange-50 to-green-50 flex flex-col">
                      {/* Header */}
                      <div className="bg-white shadow-sm p-4 pt-8">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <UserIcon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h1 className="text-lg font-bold text-gray-900">Good Morning!</h1>
                              <p className="text-gray-600 text-sm">Ready to shop smart?</p>
                            </div>
                          </div>
                        </div>

                        <Card className="bg-gradient-to-r from-primary to-secondary text-white border-0">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-white/80 text-sm">Learning Progress</p>
                                <p className="text-xl font-bold">Level 3</p>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold">127 scans</div>
                                <div className="text-white/80 text-xs">This month</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex-1 p-4">
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                              <Camera className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-sm font-medium">Scan Now</span>
                          </div>
                          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                            <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                              <Eye className="w-4 h-4 text-secondary" />
                            </div>
                            <span className="text-sm font-medium">Guide</span>
                          </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="space-y-3">
                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-sm">Red Apple</div>
                                <div className="text-xs text-gray-500">2 hours ago</div>
                              </div>
                              <Badge className="bg-green-100 text-green-800 text-xs">Excellent</Badge>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-sm">Banana</div>
                                <div className="text-xs text-gray-500">1 day ago</div>
                              </div>
                              <Badge className="bg-blue-100 text-blue-800 text-xs">Good</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-secondary/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 mb-4">
              How it Works
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Simple, fast, and accurate</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with RoboPick in three easy steps and transform your grocery shopping experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Point & Scan</h3>
              <p className="text-gray-600">
                Simply point your phone camera at any fruit or vegetable in the store. Our AI instantly recognizes what
                you're looking at.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900">AI Analysis</h3>
              <p className="text-gray-600">
                Our advanced AI analyzes color, texture, and ripeness with 99% accuracy, providing personalized results
                for your vision needs.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Get Results</h3>
              <p className="text-gray-600">
                Receive clear guidance on ripeness, quality, and personalized recommendations to make confident shopping
                decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose RoboPick?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced AI technology meets accessibility to create the perfect shopping companion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: "AI-Powered Detection",
                description: "Advanced computer vision identifies produce freshness with 99% accuracy",
              },
              {
                icon: Eye,
                title: "Accessibility First",
                description: "Designed specifically for users with color vision differences",
              },
              {
                icon: Smartphone,
                title: "Mobile Optimized",
                description: "Works seamlessly on any smartphone with a camera",
              },
              {
                icon: Shield,
                title: "Privacy Protected",
                description: "Your data stays secure with end-to-end encryption",
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Learn from thousands of users and their experiences",
              },
              {
                icon: Star,
                title: "Highly Rated",
                description: "Trusted by over 10,000 users with 4.9-star rating",
              },
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-20 bg-gradient-to-r from-primary to-secondary">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Shop Smarter?</h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of users who are already shopping with confidence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8" asChild>
                <Link href="/signup">
                  Start Free Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 bg-transparent"
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 relative">
                  <Image src="/images/app-logo.png" alt="RoboPick Logo" fill style={{ objectFit: "contain" }} />
                </div>
                <span className="text-xl font-bold">RoboPick</span>
              </div>
              <p className="text-gray-400 mb-4">
                Making grocery shopping accessible and confident for everyone through AI-powered produce detection.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/signup" className="hover:text-white transition-colors">
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/settings/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/settings/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 RoboPick. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
