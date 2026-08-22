import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { AboutSection } from "@/models/AboutSection";

export async function GET() {
  try {
    await connectDB();
    
    // Clear existing
    await AboutSection.deleteMany({});

    const sections = [
      {
        order: 0,
        type: "director-message",
        eyebrow: "Message from the Desk",
        title: "Director’s Message to Students",
        content: `
          <p><strong>Dear Students,</strong></p>
          <p>Always dream big and believe in your abilities. Success comes through discipline, dedication, hard work, and consistency.</p>
          <p>Attend your classes regularly, respect your teachers, complete your work on time, and stay focused on your goals. Remember, every small effort you make today builds the foundation for a successful tomorrow.</p>
          <p class="text-center font-bold text-blue-900 text-xl py-4 italic">✨ “Your Dream • Our Guidance • Your Success” ✨</p>
          <p>Let us learn together, grow together, and achieve greatness together. With best wishes for your bright and successful future.</p>
          <div class="mt-8 border-t border-slate-200 pt-6">
            <p class="font-bold text-xl text-blue-950">Mr. Bhismadev Dash</p>
            <p class="text-gray-500 uppercase tracking-wide text-sm mt-1">Founder / Director of VSC</p>
          </div>
        `,
        imageUrl: "/directorimage.png",
      },
      {
        order: 1,
        type: "split-grid",
        eyebrow: "Our beginning",
        title: "Teaching that starts with attention.",
        content: `
          <p>For more than a decade, Vidyashree has been a steady academic home for students in Baragada and the wider Bhubaneswar community. We keep the rooms focused, the groups personal and the conversation around learning honest.</p>
          <p>That means celebrating a strong result, of course. It also means celebrating a brave question, a better method and the moment a student stops waiting for an answer and starts looking for one.</p>
          <div class="font-bold text-slate-800 uppercase tracking-wide text-sm mb-4 mt-8 border-b pb-2">The Vidyashree promise</div>
          <ul class="space-y-2 mt-4 text-slate-700">
            <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500"><polyline points="20 6 9 17 4 12"></polyline></svg> We explain without rushing</li>
            <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500"><polyline points="20 6 9 17 4 12"></polyline></svg> We challenge with care</li>
            <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500"><polyline points="20 6 9 17 4 12"></polyline></svg> We keep families close</li>
            <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500"><polyline points="20 6 9 17 4 12"></polyline></svg> We notice the next step</li>
          </ul>
        `,
        imageUrl: "/images/about/classroom.jpg",
      },
      {
        order: 2,
        type: "values-grid",
        eyebrow: "What guides us",
        title: "The values behind every <em>lesson.</em>",
        content: "A clear academic standard feels better when it is held with humanity. These are the principles we return to every day.",
      },
      {
        order: 3,
        type: "split-grid",
        eyebrow: "A living community",
        title: "Small enough to know you. Serious enough to <em>stretch you.</em>",
        content: `
          <p>Students grow faster when they know who to ask and where to begin. Our teachers, mentors and support team work as one circle around each learner.</p>
          <a href="/why-us" class="button button-outline mt-6 inline-flex">See what makes us different <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></a>
        `,
        imageUrl: "/images/hero/students-study.jpg",
      }
    ];

    await AboutSection.collection.deleteMany({});
    await AboutSection.collection.insertMany(sections as any);
    
    return NextResponse.json({ message: "Seeded all 4 sections successfully with native collection" });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
