import { QrCode } from "lucide-react"

interface QuickQRLogoProps {
  className?: string
}

export function QuickQRLogo({ className }: QuickQRLogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <QrCode className="w-6 h-6 mr-2 text-primary" />
      <span className="font-bold text-xl font-poppins text-primary">QuickQR</span>
    </div>
  )
}

