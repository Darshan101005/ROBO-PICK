"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { NavigationBar } from "./navigation-bar"

const AuthContext = createContext<{
  user: any
  loading: boolean
}>({
  user: null,
  loading: true,
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const supabase = createClientComponentClient()

  // Routes where navigation should be hidden
  const hideNavigationRoutes = ["/", "/login", "/signup", "/forgot-password", "/vision-setup", "/vision-test"]
  const shouldShowNavigation = !hideNavigationRoutes.includes(pathname) && user

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
      {shouldShowNavigation && <NavigationBar />}
    </AuthContext.Provider>
  )
}
