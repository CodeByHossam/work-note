import { Pencil, Trash2, User, UserCheck, CalendarDays } from 'lucide-react'
import '../../../styles/notes/NoteCard.css'

const STATE_LABELS = {
  pending: 'Pending',
  started: 'Started',
  completed: 'Completed',
}

const STATE_CLASSES = {
  pending: 'status-pending',
  started: 'status-started',
  completed: 'status-completed',
}

export default function NoteCard({ note, onEdit, onDelete }) {
  const state = note.state || 'pending'
  const stateLabel = STATE_LABELS[state] || state

  const formattedDate = note.createdAt
    ? new Date(note.createdAt).toLocaleDateString()
    : '-'

  return (
    <article className="note-card">

      {/* Header */}
      <div className="note-card-header">
        <div>
          <h3>{note.title}</h3>

          <span className={`note-status ${STATE_CLASSES[state]}`}>
            {stateLabel}
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
            onClick={() => onDelete(note)}
            aria-label="Delete note"
            title="Delete"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="note-content">
        {note.description}
      </p>

      {/* Assignment information */}
      <div className="note-info">

        <div className="info-item">
          <User size={16} />
          <div>
            <span>Manager</span>
            <strong>{note?.creator?.name || '-'}</strong>
          </div>
        </div>

        <div className="info-item">
          <UserCheck size={16} />
          <div>
            <span>Assigned to</span>
            <strong>{note?.assignedTo?.name || '-'}</strong>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="note-footer">

        <div className="note-date">
          <CalendarDays size={15} />
          <span>{formattedDate}</span>
        </div>

        <span className="task-label">
          {state === 'completed' ? 'Task completed' : 'Task in progress'}
        </span>

      </div>

    </article>
  )
}