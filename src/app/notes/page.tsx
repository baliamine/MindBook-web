import ProtectedRoute from "@/components/ProtectedRoute";
import NotesList from "@/features/notes/components/NotesList";
import Navbar from "@/components/Navbar";

export default function NotesPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Notes</h1>
            <p className="text-gray-600">
              Manage and organize your personal notes
            </p>
          </div>

          {/* Notes List */}
          <NotesList />
        </main>
      </div>
    </ProtectedRoute>
  );
}
