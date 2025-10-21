import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Seed Skills
  const skillCategories = [
    {
      category: "Home Services",
      skills: [
        "Plumbing",
        "Electrical Work",
        "Carpentry",
        "Painting",
        "Cleaning",
        "HVAC",
        "Landscaping",
        "Roofing",
        "Flooring",
        "Window Installation",
      ],
    },
    {
      category: "Professional Services",
      skills: [
        "Web Development",
        "Mobile App Development",
        "Graphic Design",
        "UI/UX Design",
        "Content Writing",
        "Copywriting",
        "Photography",
        "Videography",
        "Video Editing",
        "Social Media Marketing",
        "SEO Services",
        "Accounting",
        "Legal Consulting",
        "Business Consulting",
      ],
    },
    {
      category: "Personal Services",
      skills: [
        "Personal Training",
        "Yoga Instruction",
        "Life Coaching",
        "Career Coaching",
        "Tutoring",
        "Music Lessons",
        "Dance Classes",
        "Pet Sitting",
        "Dog Walking",
        "Massage Therapy",
        "Hair Styling",
        "Makeup Artistry",
      ],
    },
    {
      category: "Event Services",
      skills: [
        "Event Planning",
        "Catering",
        "DJ Services",
        "Live Music",
        "Wedding Photography",
        "Event Photography",
        "Decoration",
        "MC/Host Services",
      ],
    },
    {
      category: "Transportation",
      skills: [
        "Ride Services",
        "Delivery Services",
        "Moving Services",
        "Courier Services",
      ],
    },
    {
      category: "Repair & Maintenance",
      skills: [
        "Computer Repair",
        "Phone Repair",
        "Appliance Repair",
        "Auto Repair",
        "Bike Repair",
        "Furniture Repair",
      ],
    },
  ];

  for (const category of skillCategories) {
    console.log(`Creating skills for ${category.category}...`);

    for (const skillName of category.skills) {
      await prisma.skill.upsert({
        where: { slug: skillName.toLowerCase().replace(/\s+/g, "-") },
        update: {},
        create: {
          name: skillName,
          slug: skillName.toLowerCase().replace(/\s+/g, "-"),
          level: 2,
          isActive: true,
        },
      });
    }
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
