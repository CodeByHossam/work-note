import { Plus, Search, Inbox } from 'lucide-react'
import { useState } from 'react'
import UserCard from './UserCard'
import { filterByQuery } from '../../../utils/filters'
import mockUsers from '../../../mock/users'
import '../../../styles/users/UserList.css'

export default function UserList() {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const limit = 6
  const offset = (page - 1) * limit

  const total = mockUsers.length
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const hasNext = page < totalPages

  const filtered = filterByQuery(mockUsers, query, ['name', 'email'])
  const paginated = filtered.slice(offset, offset + limit)

  const handleEdit = (user) => {
    console.log('Edit user:', user)
  }

  const handleDelete = (user) => {
    if (!window.confirm(`Are you sure you want to delete "${user.name}"?`)) {
      return
    }
    console.log('Delete user:', user)
  }

  const handleAddUser = () => {
    console.log('Add new user')
  }

  const handleNextPage = () => {
    if (hasNext) setPage(page + 1)
  }

  const handlePrevPage = () => {
    setPage(Math.max(1, page - 1))
  }

  return (
    <section className="users-section">

      <div className="users-list-header">
        <div>
          <h2>Users</h2>
          <p>Manage team members and their roles</p>
        </div>

        <button className="add-user-btn" onClick={handleAddUser}>
          <Plus size={18} />
          Add User
        </button>
      </div>

      <div className="users-toolbar">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <span className="task-count">
          Showing <strong>{paginated.length}</strong> of {total} users
        </span>
      </div>

      <div className="users-grid">
        {paginated.length > 0 ? (
          paginated.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="users-empty">
            <Inbox size={36} />
            <p>{query ? 'No users match your search' : 'No users found'}</p>
            <button className="add-user-btn" onClick={handleAddUser}>
              <Plus size={18} />
              Add your first user
            </button>
          </div>
        )}
      </div>

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

    </section>
  )
}