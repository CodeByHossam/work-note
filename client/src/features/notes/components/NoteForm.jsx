import { useState } from 'react'
import { Save, X } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../../styles/notes/NoteForm.css'

import {
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useGetNoteQuery,
} from '../noteApi'
import { useGetUserDropdownQuery } from '../../users/userApi'

export default function NoteForm() {
  const { id } = useParams()
  const isEditing = Boolean(id)

  const {
    data: noteData,
    isLoading: isNoteLoading,
  } = useGetNoteQuery(id, { skip: !isEditing })

  const {
    data: userData,
    isLoading: isUsersLoading,
  } = useGetUserDropdownQuery()

  const note = noteData?.data
  const users = userData?.data || []

  if (isNoteLoading || isUsersLoading) {
    return (
      <form className="note-form">
        <p>Loading...</p>
      </form>
    )
  }

  return (
    <NoteFormFields
      key={isEditing ? note._id : 'new'}
      initialNote={note}
      users={users}
      isEditing={isEditing}
    />
  )
}

function NoteFormFields({ initialNote, users, isEditing }) {
  const navigate = useNavigate()

  const [createNote, { isLoading: isCreating }] = useCreateNoteMutation()
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation()

  const [title, setTitle] = useState(initialNote?.title || '')
  const [description, setDescription] = useState(initialNote?.description || '')
  const [assignedTo, setAssignedTo] = useState(initialNote?.assignedTo?._id || '')
  const [state, setState] = useState(initialNote?.state || 'pending')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!assignedTo) {
      setError('Please assign the task to an employee.')
      return
    }

    try {
      if (isEditing) {
        await updateNote({
          id: initialNote._id,
          title,
          description,
          assignedTo,
          state,
        }).unwrap()
      } else {
        await createNote({
          title,
          description,
          assignedTo,
        }).unwrap()
      }

      navigate('/notes')
    } catch (err) {
      setError(err?.data?.message || 'Failed to save the task.')
    }
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>

      <div className="form-header">
        <div>
          <h1>{isEditing ? 'Update Task' : 'Create Task'}</h1>
          <p>
            {isEditing
              ? 'Update the task details.'
              : 'Assign a new task to an employee.'}
          </p>
        </div>
      </div>

      {error && (
        <p className="form-error">{error}</p>
      )}

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
        <label htmlFor="description">Description</label>

        <textarea
          id="description"
          placeholder="Describe the task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="6"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="assignedTo">Assign To</label>

        <select
          id="assignedTo"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        >
          <option value="">Select an employee</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {isEditing && (
        <div className="form-group">
          <label htmlFor="state">Status</label>

          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="started">Started</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      )}

      <div className="form-actions">

        <button
          type="button"
          className="cancel-btn"
          onClick={() => navigate('/notes')}
        >
          <X size={18} />
          Cancel
        </button>

        <button
          type="submit"
          className="save-btn"
          disabled={isCreating || isUpdating}
        >
          <Save size={18} />
          {isCreating || isUpdating
            ? 'Saving...'
            : isEditing
              ? 'Update Task'
              : 'Create Task'}
        </button>

      </div>

    </form>
  )
}