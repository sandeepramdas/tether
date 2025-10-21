import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase, User, MapPin, Award } from "lucide-react";

export default async function OnboardingPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="container mx-auto max-w-4xl py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Tether!</h1>
          <p className="text-xl text-muted-foreground">
            Let's get your profile set up in just a few steps
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Complete Profile */}
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Complete Your Profile</CardTitle>
                  <CardDescription>Add your details and photo</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/profile/edit">Complete Profile</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Set Location */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Set Your Location</CardTitle>
                  <CardDescription>Help us find services near you</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full" variant="outline">
                <Link href="/profile/location">Add Location</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Become a Provider */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Become a Provider</CardTitle>
                  <CardDescription>Start offering your services</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full" variant="outline">
                <Link href="/provider/setup">Setup Provider Profile</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Verify Identity */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Verify Your Identity</CardTitle>
                  <CardDescription>Build trust with verification</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full" variant="outline">
                <Link href="/verification">Get Verified</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            You can complete these steps later
          </p>
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Skip to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
