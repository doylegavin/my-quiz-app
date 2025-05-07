"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useProtectedPage from "@/hooks/useProtectedPage";
import AvatarUpload from "@/components/profile/AvatarUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { timezones } from "@/lib/timezones";
import { locales } from "@/lib/locales";

interface ProfileFormData {
  name: string;
  username: string;
  preferredName: string;
  pronouns: string;
  locale: string;
  timezone: string;
  image: string | null;
}

export default function ProfilePage() {
  const { authOverlay } = useProtectedPage();
  
  return (
    <>
      <ProfileContent />
      
      {/* Auth overlay - shows when user is not authenticated */}
      {authOverlay}
    </>
  );
}

function ProfileContent() {
  const { data: session, update: updateSession } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    username: "",
    preferredName: "",
    pronouns: "",
    locale: "en-US",
    timezone: "UTC",
    image: null,
  });

  // Fetch user data on initial load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/profile");
        const data = await response.json();
        
        if (data.user) {
          setUserData(data.user);
          setFormData({
            name: data.user.name || "",
            username: data.user.username || "",
            preferredName: data.user.preferredName || "",
            pronouns: data.user.pronouns || "",
            locale: data.user.locale || "en-US",
            timezone: data.user.timezone || "UTC",
            image: data.user.image || null,
          });
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    if (session?.user?.id) {
      fetchUserData();
    }
  }, [session?.user?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (imageDataUrl: string) => {
    setFormData((prev) => ({ ...prev, image: imageDataUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      // Update session with new user data
      await updateSession({
        ...session,
        user: {
          ...session?.user,
          name: formData.name,
          image: formData.image,
        },
      });

      setSuccess("Profile updated successfully");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "An error occurred while updating your profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">My Profile</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="mx-auto">
        <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Avatar/Profile Photo Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Profile Photo</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <AvatarUpload
                  currentImage={formData.image}
                  onImageChange={handleImageChange}
                  size={150}
                  className="mb-4"
                />
                <p className="mt-4 text-sm text-gray-500 text-center">
                  Upload a profile photo or we'll display your initials in a colorful avatar
                </p>
              </CardContent>
            </Card>

            {/* Profile Details Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl">Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert className="mb-6 bg-red-50 dark:bg-red-900/30">
                    <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <AlertDescription className="text-red-700 dark:text-red-300">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="mb-6 bg-green-50 dark:bg-green-900/30">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertDescription className="text-green-700 dark:text-green-300">
                      {success}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-gray-500">
                      Your legal name or the name you'd like to be known by
                    </p>
                  </div>

                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="unique_username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-gray-500">
                      This will be visible on leaderboards and forums
                    </p>
                  </div>

                  {/* Preferred Name */}
                  <div className="space-y-2">
                    <Label htmlFor="preferredName">Preferred Name</Label>
                    <Input
                      id="preferredName"
                      name="preferredName"
                      placeholder="How would you like to be called?"
                      value={formData.preferredName}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-gray-500">
                      What name should we use when addressing you?
                    </p>
                  </div>

                  {/* Pronouns */}
                  <div className="space-y-2">
                    <Label htmlFor="pronouns">Pronouns</Label>
                    <Input
                      id="pronouns"
                      name="pronouns"
                      placeholder="e.g. they/them, she/her, he/him"
                      value={formData.pronouns}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-gray-500">
                      This helps us address you appropriately
                    </p>
                  </div>

                  {/* Locale & Timezone */}
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Locale */}
                    <div className="space-y-2">
                      <Label htmlFor="locale">Language & Region</Label>
                      <Select 
                        value={formData.locale} 
                        onValueChange={(value) => handleSelectChange("locale", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language and region" />
                        </SelectTrigger>
                        <SelectContent>
                          {locales.map((locale) => (
                            <SelectItem key={locale.code} value={locale.code}>
                              {locale.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500">
                        Determines date formats and language preferences
                      </p>
                    </div>

                    {/* Timezone */}
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select 
                        value={formData.timezone} 
                        onValueChange={(value) => handleSelectChange("timezone", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {timezones.map((timezone) => (
                            <SelectItem key={timezone.value} value={timezone.value}>
                              {timezone.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500">
                        Used for scheduling and reminders
                      </p>
                    </div>
                  </div>

                  {/* Email (Read-only) */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      readOnly
                      value={userData?.email || ""}
                      className="bg-gray-50 dark:bg-gray-800"
                    />
                    <div className="flex items-center">
                      <div className={`mr-2 h-2 w-2 rounded-full ${userData?.emailVerified ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                      <p className="text-xs text-gray-500">
                        {userData?.emailVerified 
                          ? 'Email verified' 
                          : 'Email not verified. Check your inbox for a verification link.'}
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full sm:w-auto"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 dark:text-gray-400">
                Account management features will be available soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 