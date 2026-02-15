"use client";

import { useState } from "react";
import { useNotes } from "../hooks/useNotes";
import NoteCard from "./NoteCard";
import LockedNoteModal from "./LockedNoteModal";
import { Note } from "@/types/note";
import { unlockNote } from "../services/noteService";
import { AlertCircle, Loader2, FileText } from "lucide-react";

export default function NotesList() {
  const { notes, isLoading, error, refetch } = useNotes();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unlockedNotes, setUnlockedNotes] = useState<Set<string>>(new Set());

  const handleNoteClick = (note: Note) => {
    if (note.isLocked && !unlockedNotes.has(note._id)) {
      setSelectedNote(note);
      setIsModalOpen(true);
    } else {
      // TODO: Navigate to note detail page or show full content
      alert(`Note: ${note.title}\n\n${note.content}`);
    }
  };

  const handleUnlock = async (password: string) => {
    if (!selectedNote) return;

    try {
      await unlockNote(selectedNote._id, password);
      setUnlockedNotes((prev) => new Set(prev).add(selectedNote._id));
      setIsModalOpen(false);
      // Show unlocked content
      alert(`Note: ${selectedNote.title}\n\n${selectedNote.content}`);
    } catch (err) {
      throw err; // Re-throw to be handled by modal
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-[#36656B]" />
        <p className="mt-4 text-gray-600">Loading your notes...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="rounded-full bg-red-50 p-4 mb-4">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Failed to load notes
        </h3>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <button
          onClick={() => refetch()}
          className="px-6 py-2.5 bg-[#36656B] text-white rounded-lg font-medium hover:bg-[#2a4e53] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty State
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="rounded-full bg-gray-100 p-6 mb-4">
          <FileText className="h-16 w-16 text-gray-400" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          No notes yet
        </h3>
        <p className="text-gray-600 mb-6">
          Start creating notes to see them here
        </p>
        <button className="px-6 py-2.5 bg-[#36656B] text-white rounded-lg font-medium hover:bg-[#2a4e53] transition-colors">
          Create Your First Note
        </button>
      </div>
    );
  }

  // Notes Grid
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onClick={() => handleNoteClick(note)}
          />
        ))}
      </div>

      {/* Locked Note Modal */}
      {selectedNote && (
        <LockedNoteModal
          note={selectedNote}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUnlock={handleUnlock}
        />
      )}
    </>
  );
}
