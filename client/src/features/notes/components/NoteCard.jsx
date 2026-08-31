import { Pencil, Trash2, User, UserCheck, CalendarDays } from 'lucide-react'
import '../../../styles/notes/NoteCard.css'

export default function NoteCard({ note, onEdit, onDelete }) {
  const isCompleted = note.status === 'completed'

  return (
    <article className="note-card">

      {/* Header */}
      <div className="note-card-header">
        <div>
          <h3>{note.title}</h3>

          <span
            className={`note-status ${
              isCompleted ? 'status-completed' : 'status-pending'
            }`}
          >
            {isCompleted ? 'Completed' : 'Pending'}
          </span>
        </div>

        <div className="note-actions">
          <button
            className="edit-btn"
            onClick={() => onEdit(note)}
            aria-label="Edit note"
            title="Edit"
          >
            <Pencil size={17} />
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(note.id)}
            aria-label="Delete note"
            title="Delete"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="note-content">
        {note.content}
      </p>

      {/* Assignment information */}
      <div className="note-info">

        <div className="info-item">
          <User size={16} />
          <div>
            <span>Manager</span>
            <strong>{note.manager}</strong>
          </div>
        </div>

        <div className="info-item">
          <UserCheck size={16} />
          <div>
            <span>Assigned to</span>
            <strong>{note.assignedTo}</strong>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="note-footer">

        <div className="note-date">
          <CalendarDays size={15} />
          <span>{note.date}</span>
        </div>

        <span className="task-label">
          {isCompleted ? 'Task completed' : 'Task in progress'}
        </span>

      </div>

    </article>
  )
}