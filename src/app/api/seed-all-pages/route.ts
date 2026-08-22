import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { PageSection } from "@/models/PageSection";

const allSections = [
  // ─────────────────────── HOME ───────────────────────
  {
    pageSlug: "home",
    order: 0,
    type: "hero",
    eyebrow: "Emitting The Gleam of First Rate Success",
    title: "Where Concepts <em>Become Success</em>.",
    content: "For +2 Science (CHSE) | 1st Year & 2nd Year. The best preparation for tomorrow is doing your best today. Join the unique coaching centre in Baragada town.",
    imageUrl: "/images/hero/science-classroom.jpg",
  },
  {
    pageSlug: "home",
    order: 1,
    type: "mission-vision",
    eyebrow: "Our Core Philosophy",
    title: "Your Success is our <em>Mission</em>.",
    content: JSON.stringify({
      mission: "To provide quality education, expert guidance, and an inspiring learning environment that empowers students to achieve academic excellence and realize their full potential.",
      vision: "To be the leading institution in science education, recognized for shaping brilliant minds, instilling strong values, and building a foundation for lifelong success and leadership.",
    }),
    imageUrl: "/images/about/teacher-students.jpg",
  },
  {
    pageSlug: "home",
    order: 2,
    type: "director-message",
    eyebrow: "Message from the Desk",
    title: "Director's Message to Students",
    content: `<p><strong>Dear Students,</strong></p><p>Always dream big and believe in your abilities. Success comes through discipline, dedication, hard work, and consistency.</p><p>Attend your classes regularly, respect your teachers, complete your work on time, and stay focused on your goals. Remember, every small effort you make today builds the foundation for a successful tomorrow.</p><p class="text-center font-bold text-blue-900 text-xl py-4 italic">✨ "Your Dream • Our Guidance • Your Success" ✨</p><p>Let us learn together, grow together, and achieve greatness together. With best wishes for your bright and successful future.</p><div class="mt-8 border-t border-slate-200 pt-6"><p class="font-bold text-xl text-blue-950">Mr. Bhismadev Dash</p><p class="text-gray-500 uppercase tracking-wide text-sm mt-1">Founder / Director of VSC</p></div>`,
    imageUrl: "/directorimage.png",
  },

  // ─────────────────────── COURSES ───────────────────────
  {
    pageSlug: "courses",
    order: 0,
    type: "hero",
    eyebrow: "Choose your pace",
    title: "The right structure for your <em>next step.</em>",
    content: "Thoughtfully designed programmes for Class XI, Class XII and the summer in between — with enough structure to keep you moving and enough space to make learning yours.",
    imageUrl: "/images/hero/students-study.jpg",
  },
  {
    pageSlug: "courses",
    order: 1,
    type: "split-grid",
    eyebrow: "A calmer exam season",
    title: "Preparation that leaves room for <em>confidence.</em>",
    content: "<p>Our revision plans make the workload visible. Students know what is coming, how to practise and where their mentor can help — so preparation feels like progress, not panic.</p>",
    imageUrl: "/images/features/exam-preparation.jpg",
  },

  // ─────────────────────── WHY US ───────────────────────
  {
    pageSlug: "why-us",
    order: 0,
    type: "hero",
    eyebrow: "What makes the difference",
    title: "A little more <em>human.</em> A lot more intentional.",
    content: "Good teaching is not only about covering the material. It is about noticing how a student is meeting it — and knowing what to do next.",
    imageUrl: "/images/features/concept-learning.jpg",
  },
  {
    pageSlug: "why-us",
    order: 1,
    type: "split-grid",
    eyebrow: "The mentor effect",
    title: "Students do better when someone is paying <em>attention.</em>",
    content: "<p>A mentor does more than explain a chapter. They notice the hesitation before a student gives up, the pattern behind a silly mistake and the moment it is time for a harder question.</p>",
    imageUrl: "/images/about/teacher-students.jpg",
  },

  // ─────────────────────── FACILITIES ───────────────────────
  {
    pageSlug: "facilities",
    order: 0,
    type: "hero",
    eyebrow: "The place around the lesson",
    title: "A calm space for <em>serious</em> learning.",
    content: "The best classroom is not the fanciest one. It is the room where students feel comfortable enough to focus, ask and try again.",
    imageUrl: "/images/about/classroom.jpg",
  },
  {
    pageSlug: "facilities",
    order: 1,
    type: "split-grid",
    eyebrow: "A room that listens",
    title: "Learning happens between the <em>lines.</em>",
    content: "<p>Some of the most important moments happen after class — around a diagram, over a half-finished question or in the quiet decision to try once more.</p>",
    imageUrl: "/images/features/concept-learning.jpg",
  },
  {
    pageSlug: "facilities",
    order: 2,
    type: "split-grid",
    eyebrow: "Come by for a visit",
    title: "See the room before you make a <em>decision.</em>",
    content: "<p>We are happy to show families around, talk through the daily rhythm and answer the practical questions that matter. Near Baragada main road. Weekday visits welcome.</p>",
    imageUrl: "/images/contact/institute.jpg",
  },
];

export async function GET() {
  try {
    await connectDB();

    // Use native collection to avoid schema stripping imageUrl
    await PageSection.collection.deleteMany({});
    await PageSection.collection.insertMany(allSections as any);

    return NextResponse.json({
      message: "All pages seeded successfully",
      count: allSections.length,
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
