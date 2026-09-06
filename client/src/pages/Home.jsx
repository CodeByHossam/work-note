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
} from 'lucide-react'

import '../styles/home.css'
import mockRecentTasks from '../mock/recentTasks'
import TeamMembers from '../features/users/components/TeamMembers'
import { STATE_LABELS, STATE_CLASSES } from '../utils/noteState'

export default function Home() {
  const { name, role, token } = useSelector((state) => state.auth)
  const isLoggedIn = Boolean(token)
  const isAdmin = role === 'admin'

  const stats = [
    { label: 'Total Tasks', value: 42, icon: ClipboardList, tone: 'blue' },
    { label: 'Completed', value: 18, icon: CheckCircle2, tone: 'green' },
    { label: 'In Progress', value: 15, icon: Loader, tone: 'amber' },
    { label: 'Team Members', value: 8, icon: Users, tone: 'purple' },
  ]

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

      {/* Admin only: users management */}
      {isAdmin && <TeamMembers />}

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
          {mockRecentTasks.map((task) => (
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