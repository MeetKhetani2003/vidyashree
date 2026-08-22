import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Course } from "@/models/Course";

export async function GET() {
  try {
    await connectDB();
    const count = await Course.countDocuments();
    if (count > 0) return NextResponse.json({ message: "Already seeded" });

    const courses = [
      {
        title: "Foundation · Class XI",
        subtitle: "Start with a strong first step",
        text: "A steady academic rhythm that helps students adapt to +2 science, strengthen fundamentals and discover how they learn best.",
        points: ["Concept-first classroom sessions", "Weekly guided practice", "Monthly parent progress notes"],
        href: "/enquiry",
        order: 0,
      },
      {
        title: "Mastery · Class XII",
        subtitle: "Make the final year count",
        text: "Focused board preparation, exam strategy and personal mentoring to turn two years of work into a confident finish.",
        points: ["Chapter-wise revision plans", "Board-style answer writing", "Targeted doubt clinics"],
        href: "/enquiry",
        order: 1,
      },
      {
        title: "Bridge · Summer Programme",
        subtitle: "Arrive ready for what is next",
        text: "A short, purposeful programme for students moving into Class XI who want a head start without losing the joy of learning.",
        points: ["Maths & science refresh", "Study habits that last", "Small group orientation"],
        href: "/enquiry",
        order: 2,
      },
    ];

    await Course.insertMany(courses);
    return NextResponse.json({ message: "Courses seeded successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
