"use client";

import { Note } from "@/types/note";
import { Lock, Calendar, Tag, FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface NoteCardProps {
  note: Note;
  onClick: () => void;
}

export default function NoteCard({ note, onClick }: NoteCardProps) {
  const formattedDate = formatDistanceToNow(new Date(note.createdAt), {
    addSuffix: true,
  });

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-[#36656B]/30 hover:-translate-y-1"
    >
      {/* Lock Badge */}
      {note.isLocked && (
        <div className="absolute top-4 right-4">
          <div className="rounded-full bg-[#36656B]/10 p-2">
            <Lock size={16} className="text-[#36656B]" />
          </div>
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 pr-10">
        {note.title}
      </h3>

      {/* Content Preview */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {note.isLocked ? "🔒 This note is locked" : note.content}
      </p>

      {/* Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#36656B]/10 text-[#36656B] text-xs font-medium"
            >
              <Tag size={12} />
              {tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="text-xs text-gray-500">
              +{note.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{formattedDate}</span>
        </div>
        {note.file && (
          <div className="flex items-center gap-1 text-[#36656B]">
            <FileText size={14} />
            <span>Attachment</span>
          </div>
        )}
      </div>
    </div>
  );
}
