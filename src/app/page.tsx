import Image from "next/image";
import Link from "next/link";
import { CtaStrip } from "@/components/cta-strip";
import { IconArrowRight, IconArrowUpRight, IconAward, IconBook, IconCheck, IconPlay, IconUsers } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { StatBand } from "@/components/stat-band";
import { SubjectCard } from "@/components/content-cards";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { courseTracks } from "@/data/subjects";
import { subjects } from "@/data/subjects";
import { testimonials } from "@/data/site";

import connectDB from "@/lib/mongodb";
import { PageSection } from "@/models/PageSection";

export default async function HomePage() {
  await connectDB();
  const sections = await PageSection.find({ pageSlug: "home", isHidden: false }).lean();

  const heroSection = sections.find((s: any) => s.type === "hero");
  const missionSection = sections.find((s: any) => s.type === "mission-vision");
  const directorSection = sections.find((s: any) => s.type === "director-message");

  const heroImage = heroSection?.gridFsId ? `/api/images/${heroSection.gridFsId}` : heroSection?.imageUrl || "/images/hero/hero.png";
  const missionImage = missionSection?.gridFsId ? `/api/images/${missionSection.gridFsId}` : missionSection?.imageUrl || "/images/about/teacher-students.jpg";
  const directorImage = directorSection?.gridFsId ? `/api/images/${directorSection.gridFsId}` : directorSection?.imageUrl || "/directorimage.png";

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white pt-24 pb-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl"></div>
        </div>

        <div className="shell relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col justify-center">
            <p className="text-yellow-400 font-bold uppercase tracking-widest text-sm mb-4 inline-flex items-center gap-2">
              <span className="w-8 h-px bg-yellow-400"></span> Emitting The Gleam of First Rate Success
            </p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight mb-6">
              Where Concepts <br /><em className="text-yellow-400 not-italic">Become Success</em>.
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-lg">
              For +2 Science (CHSE) | 1st Year & 2nd Year. The best preparation for tomorrow is doing your best today. Join the unique coaching centre in Baragada town.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/enquiry" className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-red-500/30 transition-all hover:-translate-y-1 inline-flex items-center gap-2">
                Join Today & Shape Your Future <IconArrowUpRight size={18} />
              </Link>
              <Link href="/about" className="text-blue-200 hover:text-white font-semibold flex items-center gap-2 transition-colors">
                <span className="bg-yellow-400/20 text-yellow-400 p-2 rounded-full"><IconPlay size={20} /></span> See how we teach
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center border-t border-white/10 pt-8">
              <div>
                <div className="text-yellow-400 mb-1 flex justify-center"><IconUsers size={24} /></div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-200">Expert Faculty</div>
              </div>
              <div>
                <div className="text-yellow-400 mb-1 flex justify-center"><IconCheck size={24} /></div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-200">Quality Teaching</div>
              </div>
              <div>
                <div className="text-yellow-400 mb-1 flex justify-center"><IconAward size={24} /></div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-200">Better Results</div>
              </div>
              <div>
                <div className="text-yellow-400 mb-1 flex justify-center"><IconBook size={24} /></div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-200">Library Facility</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 rounded-2xl rotate-3 scale-105 blur-sm"></div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image src={heroImage} alt="Students learning science in a Vidyashree classroom" width={800} height={600} priority className="object-cover w-full h-[800px]" />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <div className="border-l-4 border-yellow-400 pl-4">
                  <p className="font-serif text-xl">Learn Today, Lead Tomorrow.</p>
                  <p className="text-sm text-gray-300 mt-1 uppercase tracking-wider">Vidyashree · Baragada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatBand />

      <section className="py-20 bg-white">
        <div className="shell grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading eyebrow="Our Core Philosophy" title={<>Your Success is our <em>Mission</em>.</>} />

            <div className="mt-8 space-y-8">
              <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
                <h3 className="text-xl font-bold text-blue-950 mb-3 flex items-center gap-2">
                  <IconAward size={20} className="text-blue-600" /> Mission
                </h3>
                <p className="text-gray-600">
                  To provide quality education, expert guidance, and an inspiring learning environment that empowers students to achieve academic excellence and realize their full potential.
                </p>
              </div>

              <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600"></div>
                <h3 className="text-xl font-bold text-indigo-950 mb-3 flex items-center gap-2">
                  <IconPlay size={20} className="text-indigo-600" /> Vision
                </h3>
                <p className="text-gray-600">
                  To be the leading institution in science education, recognized for shaping brilliant minds, instilling strong values, and building a foundation for lifelong success and leadership.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[12/18] rounded-2xl overflow-hidden shadow-xl">
              <Image src={missionImage} alt="Mentoring students" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="shell">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            <div className="grid md:grid-cols-5 items-stretch">
              <div className="md:col-span-2 relative min-h-[400px]">
                <Image src={directorImage} alt="Mr. Bhismadev Dash, Founder / Director" fill className="object-cover object-top" />
              </div>
              <div className="md:col-span-3 p-10 md:p-14 flex flex-col justify-center">
                <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">Message from the Desk</p>
                <h2 className="text-3xl font-serif font-bold text-blue-950 mb-6">Director’s Message to Students</h2>

                <div className="prose prose-lg text-gray-600 mb-8 space-y-4">
                  <p><strong>Dear Students,</strong></p>
                  <p>Always dream big and believe in your abilities. Success comes through discipline, dedication, hard work, and consistency.</p>
                  <p>Attend your classes regularly, respect your teachers, complete your work on time, and stay focused on your goals. Remember, every small effort you make today builds the foundation for a successful tomorrow.</p>
                  <p className="text-center font-bold text-blue-900 text-xl py-4 italic">✨ “Your Dream • Our Guidance • Your Success” ✨</p>
                  <p>Let us learn together, grow together, and achieve greatness together. With best wishes for your bright and successful future.</p>
                </div>

                <div className="mt-auto border-t border-slate-100 pt-6">
                  <p className="font-bold text-xl text-blue-950">Mr. Bhismadev Dash</p>
                  <p className="text-gray-500 uppercase tracking-wide text-sm mt-1">Founder / Director of VSC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-programs">
        <div className="shell"><div className="program-header"><SectionHeading eyebrow="Find your starting point" title={<>A path for where you are <em>now.</em></>} /><p>Whether you are beginning Class XI or making your final year count, we meet you with a clear plan and the right kind of support.</p></div><div className="program-grid">{courseTracks.map((course, index) => { const Icon = index === 0 ? IconBook : index === 1 ? IconAward : IconUsers; return <article className="program-card" key={course.title}><div className="program-card-top"><span className="program-card-number">0{index + 1}</span><Icon className="program-card-icon" size={27} /></div><div><h3>{course.title}</h3><p>{course.text}</p></div><Link href={course.href} className="program-card-link">{course.subtitle}<IconArrowRight size={17} /></Link></article>; })}</div></div>
      </section>

      <section className="subjects-home bg-white">
        <div className="shell"><SectionHeading eyebrow="The science desk" title={<>Our Academic <em>Offerings.</em></>} text="Strong fundamentals are built one honest question at a time. Explore the subjects at the heart of our +2 Science programme." /><div className="subject-grid">{subjects.map((subject) => <SubjectCard key={subject.slug} subject={subject} />)}</div><div style={{ textAlign: "center", marginTop: "44px" }}><Link href="/subjects" className="text-button">See our subject approach <IconArrowUpRight size={16} /></Link></div></div>
      </section>

      <section className="testimonials bg-slate-50 py-24 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="shell relative z-10">
          <SectionHeading align="center" eyebrow="In their own words" title={<>What changes when learning <em>clicks.</em></>} />

          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>
      <CtaStrip title="Ready to find a clearer way forward?" text="Tell us where the student is today. We’ll help you understand what the next step could look like." />
    </main>
  );
}
