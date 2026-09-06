import { Plus } from "lucide-react";
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
  const hasNext = page * limit < total;

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

  // Handle pagination
  const handleNextPage = () => {
    if (hasNext) setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(Math.max(1, page - 1));
  };

  return (
    <section className="notes-section">
      {/* Loading, Error, and Data display */}
      <div>
        {isLoading && <div>Loading notes...</div>}
        {isError && <div>Error: {error?.data?.message || error?.message || "Failed to fetch notes"}</div>}
        {!isLoading && !isError && AllNotes && (
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
        )}
      </div>

      {/* Notes Grid */}
      {!isLoading && !isError && (
        <>
          <div className="notes-grid">
            {notes.length > 0 ? (
              notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p>No notes available</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              onClick={handleNextPage}
              disabled={!hasNext}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}