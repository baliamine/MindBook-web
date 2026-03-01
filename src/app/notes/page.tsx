import ProtectedRoute from "@/components/ProtectedRoute";
import NotesList from "@/features/notes/components/NotesList";

export default function NotesPage() {
  return (
    <ProtectedRoute>
      <div >
        <div >
          <div >
            <h1 >
              My Notes
            </h1>
            <NotesList />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}