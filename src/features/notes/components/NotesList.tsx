"use client";

import { useState } from "react";
import { useNotes } from "../hooks/useNotes";
import { Note } from "../../../types/note";
import { useDebounce } from "../hooks/useDebounce";
import { Lock, Search } from "lucide-react";

export default function NotesList() {
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearch = useDebounce(searchInput, 400);

  const { data, isLoading, isError } = useNotes(1, 12, debouncedSearch);

  const notes: Note[] = data?.notes || [];

  return (
    <div className="space-y-10">
      {/* ================= SEARCH BAR ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search notes..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl 
  text-sm text-slate-900 placeholder:text-slate-400
  focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300
  transition-all shadow-sm"
          />
        </div>

        {/* Notes Count */}
        <div className="text-sm text-slate-500 font-medium">
          {data?.meta.total ?? 0} {data?.meta.total === 1 ? "note" : "notes"}
        </div>
      </div>

      {/* ================= LOADING ================= */}
      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-52 bg-white rounded-xl border border-slate-200 animate-pulse p-6 space-y-4"
            >
              <div className="h-5 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-slate-100 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      )}

      {/* ================= ERROR ================= */}
      {isError && (
        <div className="bg-white border border-red-200 rounded-xl p-8 text-center">
          <h3 className="text-red-600 font-semibold">Failed to load notes</h3>
          <p className="text-sm text-slate-500 mt-2">Please try again.</p>
        </div>
      )}

      {/* ================= EMPTY ================= */}
      {!isLoading && notes.length === 0 && (
        <div className="bg-white border border-dashed border-slate-300 rounded-xl p-16 text-center">
          <h3 className="text-lg font-semibold text-slate-800">
            No notes found
          </h3>
          <p className="text-slate-500 text-sm mt-2">
            Try adjusting your search or create a new note.
          </p>
        </div>
      )}

      {/* ================= NOTES GRID ================= */}
      {!isLoading && notes.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note._id}
              className="group bg-white rounded-xl border border-slate-200 p-6 
              hover:shadow-lg hover:-translate-y-1 transition-all duration-300 
              cursor-pointer flex flex-col min-h-[180px]"
            >
              {/* Title */}
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-lg font-semibold text-slate-900 line-clamp-2">
                  {note.title || "Untitled"}
                </h2>

                {note.isLocked && <Lock size={16} className="text-slate-400" />}
              </div>

              {/* Content */}
              <p className="text-sm text-slate-600 line-clamp-4 flex-1">
                {note.isLocked ? (
                  <span className="text-slate-400 italic">
                    This note is protected.
                  </span>
                ) : (
                  note.content
                )}
              </p>

              {/* Tags */}
              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {note.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md"
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
