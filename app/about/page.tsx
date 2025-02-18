import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuickQRLogo } from "@/components/quickqr-logo"

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-col items-center">
          <QuickQRLogo className="mb-4" />
          <CardTitle className="text-3xl font-bold font-poppins">About QuickQR</CardTitle>
        </CardHeader>
        <CardContent className="font-poppins">
          <p className="mb-4">
            QuickQR is a versatile QR code generator that allows you to create QR codes for various purposes, including:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Plain text</li>
            <li>URLs</li>
            <li>
              Social media profiles:
              <ul className="list-disc list-inside ml-4">
                <li>Instagram</li>
                <li>Snapchat</li>
                <li>Facebook</li>
                <li>TikTok</li>
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>GitHub</li>
                <li>Dribbble</li>
              </ul>
            </li>
          </ul>
          <p className="mb-4">
            Created by Tauhazmat, this project aims to provide a simple and efficient way to generate QR codes for
            personal and professional use. Whether you want to share your social media profiles, website, or any other
            information, QuickQR makes it easy to create QR codes that can be scanned by smartphones and other devices.
          </p>
          <p>
            For more projects and information, visit my GitHub:{" "}
            <a
              href="https://github.com/tauhazmat"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @tauhazmat
            </a>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}

