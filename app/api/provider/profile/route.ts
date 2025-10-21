import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    // Check if provider profile already exists
    const existingProfile = await prisma.providerProfile.findUnique({
      where: { userId: user.id },
    });

    if (existingProfile) {
      // Update existing profile
      const updatedProfile = await prisma.providerProfile.update({
        where: { userId: user.id },
        data: {
          businessName: data.businessName,
          tagline: data.tagline,
          description: data.description,
          yearsOfExperience: data.yearsOfExperience ? parseInt(data.yearsOfExperience) : null,
          defaultHourlyRate: data.hourlyRate ? parseFloat(data.hourlyRate) : null,
          serviceRadius: data.serviceRadius !== "unlimited" ? parseInt(data.serviceRadius) : 999,
          isOnlineProvider: data.serviceType === "online" || data.serviceType === "both",
          isOfflineProvider: data.serviceType === "offline" || data.serviceType === "both",
          status: "ACTIVE",
        },
      });

      // Update user location if provided
      if (data.city && data.state) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            city: data.city,
            state: data.state,
            postalCode: data.postalCode,
            countryCode: data.country === "United States" ? "US" : "XX",
          },
        });
      }

      return NextResponse.json({
        message: "Profile updated successfully",
        profile: updatedProfile,
      });
    } else {
      // Create new profile
      const newProfile = await prisma.providerProfile.create({
        data: {
          userId: user.id,
          businessName: data.businessName,
          tagline: data.tagline,
          description: data.description,
          yearsOfExperience: data.yearsOfExperience ? parseInt(data.yearsOfExperience) : null,
          defaultHourlyRate: data.hourlyRate ? parseFloat(data.hourlyRate) : null,
          serviceRadius: data.serviceRadius !== "unlimited" ? parseInt(data.serviceRadius) : 999,
          isOnlineProvider: data.serviceType === "online" || data.serviceType === "both",
          isOfflineProvider: data.serviceType === "offline" || data.serviceType === "both",
          status: "ACTIVE",
        },
      });

      // Update user location and type
      await prisma.user.update({
        where: { id: user.id },
        data: {
          userType: user.email?.includes("provider") ? "PROVIDER" : "BOTH",
          city: data.city || undefined,
          state: data.state || undefined,
          postalCode: data.postalCode || undefined,
          countryCode: data.country === "United States" ? "US" : "XX",
        },
      });

      return NextResponse.json({
        message: "Profile created successfully",
        profile: newProfile,
      }, { status: 201 });
    }
  } catch (error: any) {
    console.error("Provider profile error:", error);
    return NextResponse.json(
      { error: "Failed to save profile" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.providerProfile.findUnique({
      where: { userId: user.id },
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
            avatar: true,
            city: true,
            state: true,
          },
        },
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({ profile });
  } catch (error: any) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}
