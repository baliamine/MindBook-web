import ProtectedRoute from "@/components/ProtectedRoute";
import NotesList from "@/features/notes/components/NotesList";

export default function NotesPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-6 py-14">
          
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-semibold text-slate-900 tracking-tight">
              My Notes
            </h1>

            <p className="text-slate-500 mt-3 text-base max-w-xl leading-relaxed">
              Organize your ideas in a clean and secure workspace.
            </p>
          </div>

          <NotesList />
        </div>
      </div>
    </ProtectedRoute>
  );
}