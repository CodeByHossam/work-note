import { Plus, Search, Inbox } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NoteCard from "./NoteCard";
import "../../../styles/notes/NoteList.css";

import {
  useGetNoteListQuery,
  useDeleteNoteMutation,
} from "../noteApi";

export default function NoteList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const limit = 5;
  const offset = (page - 1) * limit;

  const {
    data: AllNotes,
    isError,
    isLoading,
    error,
  } = useGetNoteListQuery({
    limit,
    offset,
  });

  const [deleteNote] = useDeleteNoteMutation();

  const notes = AllNotes?.data || [];
  const total = AllNotes?.total ?? notes.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const hasNext = page < totalPages;

  const filtered = query
    ? notes.filter((note) =>
        `${note.title} ${note.description || ""}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    : notes;

  const handleEdit = (note) => {
    navigate(`/notes/edit/${note._id}`);
  };

  const handleDelete = async (note) => {
    if (!window.confirm(`Are you sure you want to delete "${note.title}"?`)) {
      return;
    }

    try {
      await deleteNote(note._id).unwrap();
    } catch (err) {
      console.error("Failed to delete note:", err);
      alert(err?.data?.message || "Failed to delete note.");
    }
  };

  const handleAddTask = () => {
    navigate("/notes/new");
  };

  const handleNextPage = () => {
    if (hasNext) setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(Math.max(1, page - 1));
  };

  return (
    <section className="notes-section">

      {/* Header */}
      <div className="notes-list-header">
        <div>
          <h2>Tasks</h2>
          <p>Tasks assigned to your team</p>
        </div>

        <button className="add-task-btn" onClick={handleAddTask}>
          <Plus size={18} />
          Add Task
        </button>
      </div>

      {/* Toolbar */}
      {!isLoading && !isError && (
        <div className="notes-toolbar">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <span className="task-count">
            Showing <strong>{filtered.length}</strong> of {total} tasks
          </span>
        </div>
      )}

      {/* Loading skeletons */}
      {isLoading && (
        <div className="notes-grid">
          {[1, 2, 3].map((n) => (
            <div className="note-card skeleton-card" key={n}>
              <div className="skeleton skeleton-title" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line short" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="notes-error">
          {error?.data?.message || error?.message || "Failed to fetch notes"}
        </div>
      )}

      {/* Data */}
      {!isLoading && !isError && (
        <>
          <div className="notes-grid">
            {filtered.length > 0 ? (
              filtered.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="notes-empty">
                <Inbox size={36} />
                <p>{query ? "No tasks match your search" : "No tasks yet"}</p>
                <button className="add-task-btn" onClick={handleAddTask}>
                  <Plus size={18} />
                  Create your first task
                </button>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {total > limit && (
            <div className="pagination-controls">
              <button onClick={handlePrevPage} disabled={page === 1}>
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button onClick={handleNextPage} disabled={!hasNext}>
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}