import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Subject } from "@/models/Subject";

export async function GET() {
  try {
    await connectDB();
    const count = await Subject.countDocuments();
    if (count > 0) return NextResponse.json({ message: "Already seeded" });

    const subjects = [
      {
        slug: "chemistry",
        title: "Chemistry",
        eyebrow: "Reactions · patterns · precision",
        description: "Find the order in every reaction through practical thinking and guided practice.",
        imageUrl: "/images/subjects/chemistry.jpg",
        accent: "#167878",
        icon: "flask",
        topics: ["Physical chemistry", "Organic chemistry", "Inorganic chemistry", "Lab thinking"],
        order: 0,
      },
      {
        slug: "physics",
        title: "Physics",
        eyebrow: "Motion · matter · possibility",
        description: "Turn the invisible into something you can see, test and solve with confidence.",
        imageUrl: "/images/subjects/physics.jpg",
        accent: "#c8282d",
        icon: "atom",
        topics: ["Mechanics", "Electricity & magnetism", "Optics", "Modern physics"],
        order: 1,
      },
      {
        slug: "biology",
        title: "Biology",
        eyebrow: "Life · systems · wonder",
        description: "Build a connected understanding of life — from the cell to the living world.",
        imageUrl: "/images/subjects/biology.jpg",
        accent: "#6d8f45",
        icon: "leaf",
        topics: ["Cell biology", "Human physiology", "Genetics", "Ecology"],
        order: 2,
      },
      {
        slug: "english",
        title: "English",
        eyebrow: "Language · expression · success",
        description: "Master communication skills essential for academic excellence and future success.",
        imageUrl: "/images/subjects/mathematics.jpg",
        accent: "#4b6584",
        icon: "book",
        topics: ["Grammar", "Literature", "Writing skills", "Comprehension"],
        order: 3,
      },
      {
        slug: "it",
        title: "Information Technology",
        eyebrow: "Logic · code · innovation",
        description: "Learn the fundamentals of technology and programming to prepare for a digital future.",
        imageUrl: "/images/subjects/mathematics.jpg",
        accent: "#3867d6",
        icon: "award",
        topics: ["Programming basics", "Web technologies", "Database", "Networking"],
        order: 4,
      },
    ];

    await Subject.insertMany(subjects);
    return NextResponse.json({ message: "Subjects seeded successfully", count: subjects.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
