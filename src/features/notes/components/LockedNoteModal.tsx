"use client";

import { useState } from "react";
import { X, Lock } from "lucide-react";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { Note } from "@/types/note";

interface LockedNoteModalProps {
  note: Note;
  isOpen: boolean;
  onClose: () => void;
  onUnlock: (password: string) => Promise<void>;
}

export default function LockedNoteModal({
  note,
  isOpen,
  onClose,
  onUnlock,
}: LockedNoteModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onUnlock(password);
      setPassword("");
      onClose();
    } catch (err) {
      setError("Incorrect password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-[#36656B]/10 p-4">
              <Lock size={32} className="text-[#36656B]" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Locked Note
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Enter password to unlock "{note.title}"
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error}
              disabled={loading}
              autoFocus
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <Button
                type="submit"
                isLoading={loading}
                disabled={loading || !password}
                className="flex-1"
              >
                Unlock
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
