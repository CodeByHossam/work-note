import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import NoteCard from './NoteCard'
import '../../../styles/notes/NoteList.css'

const notes = [
  {
    id: 1,
    title: 'Prepare monthly report',
    content:
      'Prepare and submit the monthly project progress report before the end of the week.',
    manager: 'Ahmed Hassan',
    assignedTo: 'Mohamed Ali',
    status: 'pending',
    date: 'Aug 28, 2026',
  },
  {
    id: 2,
    title: 'Update project documents',
    content:
      'Review and update all project documentation before the upcoming technical meeting.',
    manager: 'Sarah Ahmed',
    assignedTo: 'Omar Khaled',
    status: 'completed',
    date: 'Aug 27, 2026',
  },
  {
    id: 3,
    title: 'Inspect irrigation system',
    content:
      'Complete the site inspection and submit the irrigation inspection report.',
    manager: 'Ahmed Hassan',
    assignedTo: 'Khaled Mahmoud',
    status: 'pending',
    date: 'Aug 26, 2026',
  },
  {
    id: 4,
    title: 'Prepare meeting presentation',
    content:
      'Prepare the presentation for next week’s project progress meeting.',
    manager: 'Sarah Ahmed',
    assignedTo: 'Mohamed Ali',
    status: 'completed',
    date: 'Aug 25, 2026',
  },
]

export default function NoteList() {
  const navigate = useNavigate()

  const handleEdit = (note) => {
    console.log('Edit:', note)
  }

  const handleDelete = (id) => {
    console.log('Delete:', id)
  }

  const handleAddTask = () => {
    navigate('/notes/new')
  }

  return (
    <section className="notes-section">

      {/* List header */}
      <div className="notes-list-header">
        <div>
          <h2>Tasks</h2>
          <p>Tasks assigned to your team</p>
        </div>

        <button
          className="add-task-btn"
          onClick={handleAddTask}
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>

      {/* Notes */}
      <div className="notes-grid">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

    </section>
  )
}