"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { PlusCircle } from 'lucide-react'

export default function DashboardSettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [instruments, setInstruments] = useState<string[]>([])
  const [newInstrument, setNewInstrument] = useState("")

  const addInstrument = () => {
    if (newInstrument) {
      setInstruments([...instruments, newInstrument])
      setNewInstrument("")
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Settings</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="avatar">Profile Picture</Label>
                <Input id="avatar" type="file" accept="image/*" />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself" />
              </div>
              <div>
                <Label>Instruments</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newInstrument}
                    onChange={(e) => setNewInstrument(e.target.value)}
                    placeholder="Add an instrument"
                  />
                  <Button type="button" onClick={addInstrument}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {instruments.map((instrument, index) => (
                    <div key={index} className="bg-gray-100 px-2 py-1 rounded">
                      {instrument}
                    </div>
                  ))}
                </div>
              </div>
              <Button type="submit">Update Profile</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="website">Website</Label>
                <Input id="website" type="url" placeholder="https://yourwebsite.com" />
              </div>
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" type="url" placeholder="https://facebook.com/yourusername" />
              </div>
              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <Input id="twitter" type="url" placeholder="https://twitter.com/yourusername" />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" type="url" placeholder="https://instagram.com/yourusername" />
              </div>
              <Button type="submit">Update Social Links</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Email Notifications</Label>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            <div>
              <Button variant="outline" className="w-full">Change Password</Button>
            </div>
            <div>
              <Button variant="destructive" className="w-full">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

