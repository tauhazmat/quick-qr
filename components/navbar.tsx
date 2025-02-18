"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ThemeSwitch } from "./theme-switch"
import { Button } from "./ui/button"
import { useAuth } from "@/lib/auth"
import { LogOut } from "lucide-react"
import { QuickQRLogo } from "./quickqr-logo"

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "My QR Codes", path: "/my-qr-codes" },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault()
    await signOut()
    router.push("/")
  }

  return (
    <nav className="flex justify-between items-center border-b border-gray-200 py-4 px-6 font-poppins">
      <div className="flex items-center space-x-6">
        <Link href="/">
          <QuickQRLogo />
        </Link>
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.path ? "text-primary" : "text-muted-foreground hover:text-primary",
              )}
            >
              {item.name}
              {pathname === item.path && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 w-full bg-primary"
                  layoutId="navbar-underline"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeSwitch />
        {user ? (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{user.email}</span>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Sign out</span>
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault()
              router.push("/login")
            }}
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  )
}

