"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { QRCodeSVG } from "qrcode.react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Edit, Trash, Save } from "lucide-react"

interface QRCode {
  id: string
  content: string
  contentType: string
}

export default function MyQRCodes() {
  const [qrCodes, setQRCodes] = useState<QRCode[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")
  const [editContentType, setEditContentType] = useState("")
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      fetchQRCodes()
    }
  }, [user])

  const fetchQRCodes = async () => {
    if (!user) return

    const q = query(collection(db, "qrcodes"), where("userId", "==", user.uid))
    const querySnapshot = await getDocs(q)
    const codes: QRCode[] = []
    querySnapshot.forEach((doc) => {
      codes.push({ id: doc.id, ...doc.data() } as QRCode)
    })
    setQRCodes(codes)
  }

  const handleEdit = (qrCode: QRCode) => {
    setEditingId(qrCode.id)
    setEditContent(qrCode.content)
    setEditContentType(qrCode.contentType)
  }

  const handleSave = async () => {
    if (!editingId) return

    try {
      await updateDoc(doc(db, "qrcodes", editingId), {
        content: editContent,
        contentType: editContentType,
      })
      setEditingId(null)
      fetchQRCodes()
      toast({
        title: "Success",
        description: "QR code updated successfully.",
      })
    } catch (error) {
      console.error("Error updating QR code:", error)
      toast({
        title: "Error",
        description: "Failed to update QR code. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "qrcodes", id))
      fetchQRCodes()
      toast({
        title: "Success",
        description: "QR code deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting QR code:", error)
      toast({
        title: "Error",
        description: "Failed to delete QR code. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 font-poppins">My QR Codes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qrCodes.map((qrCode) => (
          <Card key={qrCode.id}>
            <CardHeader>
              <CardTitle className="font-poppins">{qrCode.contentType}</CardTitle>
            </CardHeader>
            <CardContent>
              {editingId === qrCode.id ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="editContentType">Content Type</Label>
                    <Select value={editContentType} onValueChange={setEditContentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="url">URL</SelectItem>
                        {/* Add other content types here */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="editContent">Content</Label>
                    <Input id="editContent" value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                  </div>
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              ) : (
                <>
                  <QRCodeSVG value={qrCode.content} size={150} />
                  <p className="mt-2 font-poppins">{qrCode.content}</p>
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" onClick={() => handleEdit(qrCode)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(qrCode.id)}>
                      <Trash className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

