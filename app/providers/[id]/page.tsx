import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Star,
  Briefcase,
  CheckCircle,
  MessageSquare,
  DollarSign,
  Award,
  Clock
} from "lucide-react";

export default async function ProviderProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const profile = await prisma.providerProfile.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          displayName: true,
          avatar: true,
          city: true,
          state: true,
          emailVerified: true,
          phoneVerified: true,
        },
      },
      skills: {
        include: {
          skill: true,
        },
        where: {
          isActive: true,
        },
      },
      services: {
        where: {
          status: "ACTIVE",
        },
        take: 6,
      },
    },
  });

  if (!profile) {
    notFound();
  }

  const displayName = profile.businessName || profile.user.displayName ||
    `${profile.user.firstName} ${profile.user.lastName}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="md:col-span-2 space-y-6">
              {/* Avatar and Name */}
              <div className="flex items-start gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-4xl font-bold text-primary">
                    {displayName.charAt(0)}
                  </div>
                  {profile.level !== "BRONZE" && (
                    <div className="absolute -bottom-2 -right-2 p-2 bg-primary rounded-full">
                      <Award className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{displayName}</h1>
                      {profile.tagline && (
                        <p className="text-lg text-muted-foreground italic mb-3">
                          "{profile.tagline}"
                        </p>
                      )}

                      {/* Verification Badges */}
                      <div className="flex flex-wrap gap-2">
                        {profile.user.emailVerified && (
                          <Badge variant="secondary" className="gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Email Verified
                          </Badge>
                        )}
                        {profile.user.phoneVerified && (
                          <Badge variant="secondary" className="gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Phone Verified
                          </Badge>
                        )}
                        {profile.backgroundCheckStatus === "APPROVED" && (
                          <Badge variant="default" className="gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Background Checked
                          </Badge>
                        )}
                        <Badge variant="outline">{profile.level}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <p className="text-2xl font-bold">
                        {profile.averageRating > 0 ? profile.averageRating.toFixed(1) : "New"}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {profile.totalReviews} reviews
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <p className="text-2xl font-bold">{profile.totalJobsCompleted}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Jobs completed</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock className="h-5 w-5 text-primary" />
                      <p className="text-2xl font-bold">
                        {profile.responseTimeMinutes ? `${profile.responseTimeMinutes}m` : "-"}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">Response time</p>
                  </CardContent>
                </Card>
              </div>

              {/* Description */}
              {profile.description && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-semibold mb-3">About</h2>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {profile.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Skills */}
              {profile.skills.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-semibold mb-3 flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Skills & Expertise
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((ps) => (
                        <Badge key={ps.id} variant="secondary" className="text-sm py-1 px-3">
                          {ps.skill.name}
                          <span className="ml-2 text-xs opacity-70">
                            {ps.proficiency.toLowerCase()}
                          </span>
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Contact Card */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  {profile.defaultHourlyRate && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <p className="text-sm text-muted-foreground">Starting Rate</p>
                      </div>
                      <p className="text-3xl font-bold">
                        ${profile.defaultHourlyRate}
                        <span className="text-lg text-muted-foreground">/hour</span>
                      </p>
                    </div>
                  )}

                  <Button className="w-full gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Contact Provider
                  </Button>

                  <Button variant="outline" className="w-full">
                    View Services
                  </Button>
                </CardContent>
              </Card>

              {/* Location Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Service Area</p>
                      <p className="text-sm text-muted-foreground">
                        {profile.user.city && profile.user.state
                          ? `${profile.user.city}, ${profile.user.state}`
                          : "Location not specified"}
                      </p>
                      {profile.serviceRadius < 999 && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Within {profile.serviceRadius} km
                        </p>
                      )}
                      {profile.isOnlineProvider && (
                        <Badge variant="secondary" className="mt-2">
                          Available Online
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Experience */}
              {profile.yearsOfExperience && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold mb-1">Experience</p>
                        <p className="text-2xl font-bold text-primary">
                          {profile.yearsOfExperience}+ years
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      {profile.services.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Services Offered</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  {service.basePrice && (
                    <p className="text-lg font-bold text-primary">
                      ${service.basePrice}
                    </p>
                  )}
                  <Button variant="outline" className="w-full mt-4">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
