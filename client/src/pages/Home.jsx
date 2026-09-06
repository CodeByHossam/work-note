import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  ClipboardList,
  CheckCircle2,
  Loader,
  Users,
  Plus,
  ArrowRight,
  StickyNote,
  CalendarDays,
  User,
  UserPlus,
  ShieldCheck,
  Mail,
  X,
  Database,
} from 'lucide-react'

import '../styles/home.css'
import { useGetAllUsersQuery } from '../features/users/userApi'

const mockUsers = [
  {
    _id: 'u1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    joined: '2024-01-15',
  },
  {
    _id: 'u2',
    name: 'Ahmed Ali',
    email: 'ahmed@example.com',
    role: 'employee',
    joined: '2024-02-10',
  },
  {
    _id: 'u3',
    name: 'Mohamed Hassan',
    email: 'mohamed@example.com',
    role: 'employee',
    joined: '2024-03-05',
  },
  {
    _id: 'u4',
    name: 'Sara Ahmed',
    email: 'sara@example.com',
    role: 'employee',
    joined: '2024-04-20',
  },
]

const recentTasks = [
  {
    _id: 'mock-1',
    title: 'Prepare monthly report',
    description: 'Compile the sales data and summarize the progress.',
    state: 'started',
    assignedTo: { name: 'Ahmed Ali' },
  },
  {
    _id: 'mock-2',
    title: 'Review technical drawings',
    description: 'Check the latest drawings and submit feedback.',
    state: 'pending',
    assignedTo: { name: 'Sara Ahmed' },
  },
  {
    _id: 'mock-3',
    title: 'Update project documentation',
    description: 'Keep docs in sync with the latest changes.',
    state: 'completed',
    assignedTo: { name: 'Mohamed Hassan' },
  },
  {
    _id: 'mock-4',
    title: 'Client follow-up call',
    description: 'Schedule the follow-up meeting with the client.',
    state: 'started',
    assignedTo: { name: 'Ahmed Ali' },
  },
]

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

function getInitials(name = '') {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?'
}

export default function Home() {
  const { name, role, token } = useSelector((state) => state.auth)
  const isLoggedIn = Boolean(token)
  const isAdmin = role === 'admin'

  const [users, setUsers] = useState(mockUsers)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'employee',
  })
  const [loadServerUsers, setLoadServerUsers] = useState(false)

  const {
    data: serverUsersData,
    isLoading: isUsersLoading,
    error: usersError,
  } = useGetAllUsersQuery(undefined, { skip: !loadServerUsers })

  const serverUsers = serverUsersData?.data || []
  const showingServer = loadServerUsers

  const stats = [
    { label: 'Total Tasks', value: 42, icon: ClipboardList, tone: 'blue' },
    { label: 'Completed', value: 18, icon: CheckCircle2, tone: 'green' },
    { label: 'In Progress', value: 15, icon: Loader, tone: 'amber' },
    {
      label: 'Team Members',
      value: isAdmin ? (showingServer ? serverUsers.length : users.length) : 8,
      icon: Users,
      tone: 'purple',
    },
  ]

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

  return (
    <div className="home-page">

      {/* Hero */}
      <section className="home-hero">
        <div className="hero-text">
          <span className="hero-badge">
            <StickyNote size={15} />
            StickyNotes Workspace
          </span>

          <h1>Hello{isLoggedIn && name ? `, ${name}` : ''} 👋</h1>

          <p>
            Keep your tasks and notes organized in one place. Create, assign,
            and track everything your team is working on — all from a simple
            dashboard.
          </p>

          <div className="hero-actions">
            <Link to="/notes" className="hero-btn btn-primary">
              <ClipboardList size={18} />
              View My Notes
            </Link>

            <Link to="/notes/new" className="hero-btn btn-ghost">
              <Plus size={18} />
              Create a Task
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-icon">
            <ClipboardList size={28} />
          </div>
          <h3>Stay on top of your work</h3>
          <p>
            Everything the team assigns or creates lands right here, ready to
            be tracked.
          </p>
          <Link to="/notes" className="hero-card-link">
            Open dashboard
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-row">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <div className={`stat-card stat-${tone}`} key={label}>
            <div className="stat-icon">
              <Icon size={20} />
            </div>
            <div>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Admin only: users management (mock data) */}
      {isAdmin && (
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
              {!showingServer && (
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={() => setLoadServerUsers(true)}
                >
                  <Database size={18} />
                  Show All Users
                </button>
              )}

              {showingServer && (
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={() => setLoadServerUsers(false)}
                >
                  <Users size={18} />
                  Show Mock Data
                </button>
              )}

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
              {usersError?.data?.message ||
                usersError?.message ||
                'Failed to load users'}
            </div>
          )}

          {showingServer && !isUsersLoading && !usersError && (
            <div className="users-list">
              {serverUsers.length > 0 ? (
                serverUsers.map((user) => (
                  <div className="user-card" key={user._id}>
                    <div className={`user-avatar avatar-${user.role}`}>
                      {getInitials(user.name)}
                    </div>

                    <div className="user-info">
                      <div className="user-name">
                        <strong>{user.name}</strong>
                        <span className={`role-badge role-${user.role}`}>
                          {user.role === 'admin' ? (
                            <ShieldCheck size={12} />
                          ) : (
                            <User size={12} />
                          )}
                          {user.role}
                        </span>
                      </div>
                      <span className="user-email">
                        <Mail size={13} />
                        {user.email}
                      </span>
                    </div>

                    <span className="user-joined">
                      Joined{' '}
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : '-'}
                    </span>
                  </div>
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
                      onChange={(e) =>
                        setNewUser({ ...newUser, name: e.target.value })
                      }
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
                      onChange={(e) =>
                        setNewUser({ ...newUser, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="user-role">Role</label>
                    <select
                      id="user-role"
                      value={newUser.role}
                      onChange={(e) =>
                        setNewUser({ ...newUser, role: e.target.value })
                      }
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

              <div className="users-list">
                {users.map((user) => (
                  <div className="user-card" key={user._id}>
                    <div className={`user-avatar avatar-${user.role}`}>
                      {getInitials(user.name)}
                    </div>

                    <div className="user-info">
                      <div className="user-name">
                        <strong>{user.name}</strong>
                        <span className={`role-badge role-${user.role}`}>
                          {user.role === 'admin' ? (
                            <ShieldCheck size={12} />
                          ) : (
                            <User size={12} />
                          )}
                          {user.role}
                        </span>
                      </div>
                      <span className="user-email">
                        <Mail size={13} />
                        {user.email}
                      </span>
                    </div>

                    <span className="user-joined">
                      Joined {new Date(user.joined).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {/* Recent tasks (mock data) */}
      <section className="recent-section">
        <div className="section-head">
          <h2>Recent Tasks</h2>
          <Link to="/notes">
            View all
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="recent-list">
          {recentTasks.map((task) => (
            <div className="recent-item" key={task._id}>
              <div className="recent-body">
                <div className="recent-title">
                  <h3>{task.title}</h3>
                  <span className={`note-status ${STATE_CLASSES[task.state]}`}>
                    {STATE_LABELS[task.state]}
                  </span>
                </div>
                <p>{task.description}</p>
              </div>

              <div className="recent-meta">
                <span>
                  <User size={14} />
                  {task.assignedTo.name}
                </span>
                <span>
                  <CalendarDays size={14} />
                  Recently updated
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}