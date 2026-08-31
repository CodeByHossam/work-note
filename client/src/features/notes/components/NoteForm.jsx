import { useState } from 'react'
import { Save, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import '../../../styles/notes/NoteForm.css'

export default function NoteForm() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [manager, setManager] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [status, setStatus] = useState('pending')

  const handleSubmit = (e) => {
    e.preventDefault()

    const note = {
      title,
      content,
      manager,
      assignedTo,
      status,
      date: new Date().toLocaleDateString(),
    }

    console.log('New task:', note)

    // Later this will be replaced with your API call

    navigate('/notes')
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>

      <div className="form-header">
        <div>
          <h1>Create Task</h1>
          <p>Assign a new task to an employee.</p>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="title">Task Title</label>

        <input
          id="title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Description</label>

        <textarea
          id="content"
          placeholder="Describe the task..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          required
        />
      </div>

      <div className="form-row">

        <div className="form-group">
          <label htmlFor="manager">Manager</label>

          <input
            id="manager"
            type="text"
            placeholder="Manager name"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="assignedTo">Assign To</label>

          <input
            id="assignedTo"
            type="text"
            placeholder="Employee name"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          />
        </div>

      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>

        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="form-actions">

        <button
          type="button"
          className="cancel-btn"
          onClick={() => navigate('/notes')}
        >
          <X size={18} />
          Cancel
        </button>

        <button type="submit" className="save-btn">
          <Save size={18} />
          Create Task
        </button>

      </div>

    </form>
  )
}