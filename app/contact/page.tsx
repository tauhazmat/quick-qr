import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Contact() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold font-poppins">Contact</CardTitle>
        </CardHeader>
        <CardContent className="font-poppins">
          <p className="mb-4">
            If you have any questions, suggestions, or just want to say hello, feel free to reach out!
          </p>
          <p className="mb-4">
            Email:{" "}
            <a href="mailto:tauhazmat@gmail.com" className="text-primary hover:underline">
              tauhazmat@gmail.com
            </a>
          </p>
          <p>
            GitHub:{" "}
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

