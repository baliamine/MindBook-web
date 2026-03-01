"use client";

import { useState } from "react";
import { useNotes } from "../hooks/useNotes";
import { Note } from "../../../types/note";
import { useDebounce } from "../hooks/useDebounce";
import { Lock, Search } from "lucide-react";

export default function NotesList() {
  const [searchInput, setSearchInput] = useState("");

  // debounce to avoid instant refetch
  const debouncedSearch = useDebounce(searchInput, 500);

  const { data, isLoading, isError } = useNotes(1, 10, debouncedSearch);

  const notes: Note[] = data?.notes || [];
console.log("Searching for:", debouncedSearch);
console.log("Returned notes:", notes);
  return (
    <div className="space-y-10">

      {/* ===== Search Section ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        <div className="relative w-full sm:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by title, content or tag..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
          />
        </div>

        <span className="text-sm text-gray-500">
          {data?.meta.total ?? 0} notes
        </span>
      </div>

      {/* ===== Loading State ===== */}
      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-40 bg-gray-100 rounded-xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* ===== Error ===== */}
      {isError && (
        <div className="text-center text-red-500">
          Failed to load notes.
        </div>
      )}

      {/* ===== Empty State ===== */}
      {!isLoading && notes.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-lg font-semibold text-gray-800">
            No notes found
          </h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or create a new note.
          </p>
        </div>
      )}

      {/* ===== Notes Grid ===== */}
      {!isLoading && notes.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note._id}
              className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
            >
              {/* Locked Overlay */}
              {note.isLocked && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 transition">
                  <Lock size={28} className="text-gray-700 mb-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Locked Note
                  </p>
                </div>
              )}

              <h2 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-1">
                {note.title || "Untitled"}
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                {note.isLocked
                  ? "This content is protected."
                  : note.content}
              </p>

              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {note.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}