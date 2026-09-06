import { useState } from 'react'
import { Database, Users, UserPlus, X, ShieldCheck, User, Mail } from 'lucide-react'
import { formatDate } from '../../../utils/formatDate'
import { getInitials } from '../../../utils/getInitials'
import { filterByQuery } from '../../../utils/filters'
import mockUsers from '../../../mock/users'
import { useGetAllUsersQuery } from '../userApi'

export default function TeamMembers() {
  const [users, setUsers] = useState(mockUsers)
  const [query, setQuery] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [loadServerUsers, setLoadServerUsers] = useState(false)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'employee',
  })

  const {
    data: serverUsersData,
    isLoading: isUsersLoading,
    error: usersError,
  } = useGetAllUsersQuery(undefined, { skip: !loadServerUsers })

  const serverUsers = serverUsersData?.data || []
  const showingServer = loadServerUsers
  const filtered = filterByQuery(users, query, ['name', 'email'])

  const handleAddUser = (e) => {
    e.preventDefault()

    const added = {
      _id: `u${Date.now()}`,
      ...newUser,
      joined: new Date().toISOString().slice(0, 10),
    }

    setUsers([...users, added])
    setNewUser({ name: '', email: '', role: 'employee' })
    setShowAddForm(false)
  }

  const toggleSource = () => setLoadServerUsers(!loadServerUsers)

  return (
    <section className="users-section">
      <div className="section-head">
        <div>
          <h2>Team Members</h2>
          <p>
            {showingServer
              ? `${serverUsers.length} users on the server`
              : `${users.length} users in the workspace`}
          </p>
        </div>

        <div className="section-actions">
          <button type="button" className="ghost-btn" onClick={toggleSource}>
            {showingServer ? <Users size={18} /> : <Database size={18} />}
            {showingServer ? 'Show Mock Data' : 'Show All Users'}
          </button>

          {!showingServer && (
            <button
              type="button"
              className="add-user-btn"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? <X size={18} /> : <UserPlus size={18} />}
              {showAddForm ? 'Cancel' : 'Add User'}
            </button>
          )}
        </div>
      </div>

      {showingServer && isUsersLoading && (
        <div className="users-empty">Loading users...</div>
      )}

      {showingServer && usersError && (
        <div className="users-empty users-error">
          {usersError?.data?.message || usersError?.message || 'Failed to load users'}
        </div>
      )}

      {showingServer && !isUsersLoading && !usersError && (
        <div className="users-list">
          {serverUsers.length > 0 ? (
            serverUsers.map((user) => (
              <UserRow key={user._id} name={user.name} email={user.email} role={user.role} joined={user.createdAt} />
            ))
          ) : (
            <div className="users-empty">No users found on the server</div>
          )}
        </div>
      )}

      {!showingServer && (
        <>
          {showAddForm && (
            <form className="add-user-form" onSubmit={handleAddUser}>
              <div className="form-group">
                <label htmlFor="user-name">Full name</label>
                <input
                  id="user-name"
                  type="text"
                  placeholder="e.g. Omar Khaled"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="user-email">Email</label>
                <input
                  id="user-email"
                  type="email"
                  placeholder="e.g. omar@example.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="user-role">Role</label>
                <select
                  id="user-role"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  <UserPlus size={16} />
                  Add Member
                </button>
              </div>
            </form>
          )}

          <div className="users-toolbar">
            <input
              type="text"
              placeholder="Search users..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="users-list">
            {filtered.length > 0 ? (
              filtered.map((user) => (
                <UserRow key={user._id} name={user.name} email={user.email} role={user.role} joined={user.joined} />
              ))
            ) : (
              <div className="users-empty">No users match your search</div>
            )}
          </div>
        </>
      )}
    </section>
  )
}

function UserRow({ name, email, role, joined }) {
  return (
    <div className="user-card">
      <div className={`user-avatar avatar-${role}`}>{getInitials(name)}</div>

      <div className="user-info">
        <div className="user-name">
          <strong>{name}</strong>
          <span className={`role-badge role-${role}`}>
            {role === 'admin' ? <ShieldCheck size={12} /> : <User size={12} />}
            {role}
          </span>
        </div>
        <span className="user-email">
          <Mail size={13} />
          {email}
        </span>
      </div>

      <span className="user-joined">
        Joined {formatDate(joined)}
      </span>
    </div>
  )
}