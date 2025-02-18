"use client"

import type React from "react"

import { useState, useRef } from "react"
import { QRCodeSVG } from "qrcode.react"
import { toPng } from "html-to-image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Instagram,
  SnailIcon as Snapchat,
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Dribbble,
  Globe,
  Type,
  AtSign,
  Download,
  Save,
  Rocket,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth"
import { db } from "@/lib/firebase"
import { addDoc, collection } from "firebase/firestore"

const socialMediaPlatforms = [
  { name: "Instagram", prefix: "https://www.instagram.com/", icon: Instagram },
  { name: "Snapchat", prefix: "https://www.snapchat.com/add/", icon: Snapchat },
  { name: "Facebook", prefix: "https://www.facebook.com/", icon: Facebook },
  { name: "TikTok", prefix: "https://www.tiktok.com/@", icon: AtSign },
  { name: "Twitter", prefix: "https://twitter.com/", icon: Twitter },
  { name: "LinkedIn", prefix: "https://www.linkedin.com/in/", icon: Linkedin },
  { name: "GitHub", prefix: "https://github.com/", icon: Github },
  { name: "Dribbble", prefix: "https://dribbble.com/", icon: Dribbble },
]

export function QRCodeGenerator() {
  const [content, setContent] = useState("")
  const [contentType, setContentType] = useState("text")
  const [qrCode, setQRCode] = useState("")
  const [isRocketLaunched, setIsRocketLaunched] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const { user } = useAuth()

  const generateQRCode = (e: React.FormEvent) => {
    e.preventDefault()
    let finalContent = content
    if (contentType !== "text" && contentType !== "url") {
      const platform = socialMediaPlatforms.find((p) => p.name.toLowerCase() === contentType)
      if (platform) {
        finalContent = `${platform.prefix}${content}`
      }
    }
    setQRCode(finalContent)
  }

  const downloadQRCode = () => {
    if (qrRef.current === null) {
      return
    }

    setIsRocketLaunched(true)

    toPng(qrRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a")
        link.download = "qr-code.png"
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.error(err)
        toast({
          title: "Download failed",
          description: "There was an error downloading the QR code. Please try again.",
          variant: "destructive",
        })
      })
      .finally(() => {
        setTimeout(() => setIsRocketLaunched(false), 1000)
      })
  }

  const saveQRCode = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to save QR codes.",
        variant: "destructive",
      })
      return
    }

    try {
      await addDoc(collection(db, "qrcodes"), {
        userId: user.uid,
        content,
        contentType,
        createdAt: new Date(),
      })
      toast({
        title: "Success",
        description: "QR code saved successfully.",
      })
    } catch (error) {
      console.error("Error saving QR code:", error)
      toast({
        title: "Error",
        description: "Failed to save QR code. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-poppins">Generate QR Code</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={generateQRCode} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contentType" className="font-poppins">
              Content Type
            </Label>
            <Select onValueChange={setContentType} defaultValue="text">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">
                  <div className="flex items-center">
                    <Type className="w-4 h-4 mr-2" />
                    Text
                  </div>
                </SelectItem>
                <SelectItem value="url">
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    URL
                  </div>
                </SelectItem>
                {socialMediaPlatforms.map((platform) => (
                  <SelectItem key={platform.name.toLowerCase()} value={platform.name.toLowerCase()}>
                    <div className="flex items-center">
                      <platform.icon className="w-4 h-4 mr-2" />
                      {platform.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="content" className="font-poppins">
              {contentType === "text" ? "Enter Text" : contentType === "url" ? "Enter URL" : "Enter Username"}
            </Label>
            <Input
              id="content"
              type={contentType === "url" ? "url" : "text"}
              placeholder={contentType === "url" ? "https://example.com" : "Enter content"}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="font-poppins"
            />
          </div>
          <Button type="submit" className="w-full font-poppins">
            Generate QR Code
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        {qrCode && (
          <>
            <div ref={qrRef} className="qr-code-container bg-white p-4 rounded-lg">
              <QRCodeSVG
                value={qrCode}
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"L"}
                includeMargin={false}
              />
            </div>
            <div className="flex space-x-2 mt-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={downloadQRCode} className="font-poppins relative">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                  <AnimatePresence>
                    {isRocketLaunched && (
                      <motion.div
                        initial={{ y: 0, opacity: 1 }}
                        animate={{ y: -50, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute top-0 left-1/2 transform -translate-x-1/2"
                      >
                        <Rocket className="w-6 h-6 text-primary" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={saveQRCode} className="font-poppins">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </motion.div>
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

