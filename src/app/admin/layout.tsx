import Link from "next/link";
import { IconArrowRight } from "@/components/icons";
import LogoutButton from "./logout-button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-6 shadow-xl z-10 flex-shrink-0">
        <div className="mb-10">
          <h2 className="text-xl font-bold font-serif text-yellow-400">Vidyashree</h2>
          <p className="text-slate-400 text-sm">Admin Portal</p>
        </div>
        
        <nav className="space-y-2">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest px-4 mt-2 mb-3">Content Management</p>
          <Link href="/admin/pages" className="block py-2 px-4 rounded text-blue-100 hover:text-white transition-colors border-l-2 border-transparent hover:border-yellow-400 hover:bg-slate-800">
            Website Pages
          </Link>
          <Link href="/admin/courses" className="block py-2 px-4 rounded text-blue-100 hover:text-white transition-colors border-l-2 border-transparent hover:border-yellow-400 hover:bg-slate-800">
            Course Tracks
          </Link>
          <Link href="/admin/subjects" className="block py-2 px-4 rounded text-blue-100 hover:text-white transition-colors border-l-2 border-transparent hover:border-yellow-400 hover:bg-slate-800">
            Subjects
          </Link>
          <Link href="/admin/gallery" className="block py-2 px-4 rounded text-blue-100 hover:text-white transition-colors border-l-2 border-transparent hover:border-yellow-400 hover:bg-slate-800">
            Gallery Management
          </Link>
          <div className="mt-8 pt-6 border-t border-slate-700/50 space-y-2">
            <Link href="/" className="block py-2 px-4 text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
              Back to Website <IconArrowRight size={14} />
            </Link>
            <LogoutButton />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        {children}
      </main>
    </div>
  );
}
