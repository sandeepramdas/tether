import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { skills } = await req.json();

    // Get provider profile
    const providerProfile = await prisma.providerProfile.findUnique({
      where: { userId: user.id },
    });

    if (!providerProfile) {
      return NextResponse.json(
        { error: "Provider profile not found" },
        { status: 404 }
      );
    }

    // Delete existing skills
    await prisma.providerSkill.deleteMany({
      where: { providerId: providerProfile.id },
    });

    // Add new skills
    const skillRecords = await Promise.all(
      skills.map(async (skill: any) => {
        // Find or create skill
        let skillRecord = await prisma.skill.findFirst({
          where: { name: skill.name },
        });

        if (!skillRecord) {
          skillRecord = await prisma.skill.create({
            data: {
              name: skill.name,
              slug: skill.name.toLowerCase().replace(/\s+/g, "-"),
              level: 2, // category level
              isActive: true,
            },
          });
        }

        // Create provider skill relationship
        return prisma.providerSkill.create({
          data: {
            providerId: providerProfile.id,
            skillId: skillRecord.id,
            proficiency: skill.proficiency.toUpperCase(),
            isPrimary: false,
            isActive: true,
          },
        });
      })
    );

    return NextResponse.json({
      message: "Skills added successfully",
      skills: skillRecords,
    });
  } catch (error: any) {
    console.error("Add skills error:", error);
    return NextResponse.json(
      { error: "Failed to add skills" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // Get all skills for selection
    const skills = await prisma.skill.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ skills });
  } catch (error: any) {
    console.error("Get skills error:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}
