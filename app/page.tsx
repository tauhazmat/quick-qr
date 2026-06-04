import { QRCodeGenerator } from "@/components/qr-code-generator"
import { QuickQRLogo } from "@/components/quickqr-logo"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <QuickQRLogo className="mb-8" />
      <h1 className="mb-8 text-4xl font-bold font-poppins">QR Code Generator</h1>
      <QRCodeGenerator />   {/* /*Imported module from components/ qr-code-generator*/ */}
     
    </main>
  )
}

