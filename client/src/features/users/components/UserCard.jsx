import { Pencil, Trash2, Mail, Shield, CalendarDays } from 'lucide-react'
import { formatDate } from '../../../utils/formatDate'
import { getInitials } from '../../../utils/getInitials'
import '../../../styles/users/UserCard.css'

const ROLE_LABELS = {
  admin: 'Admin',
  employee: 'Employee',
}

const ROLE_CLASSES = {
  admin: 'role-admin',
  employee: 'role-employee',
}

export default function UserCard({ user, onEdit, onDelete }) {
  const role = user.role || 'employee'
  const roleLabel = ROLE_LABELS[role] || role
  const formattedDate = formatDate(user.createdAt)

  return (
    <article className="user-card">

      <div className="user-card-header">
        <div className="user-card-title">
          <span className={`user-avatar ${ROLE_CLASSES[role]}`}>
            {getInitials(user.name)}
          </span>

          <div>
            <h3>{user.name}</h3>
            <span className={`user-role ${ROLE_CLASSES[role]}`}>
              {roleLabel}
            </span>
          </div>
        </div>

        <div className="user-actions">
          <button
            className="edit-btn"
            onClick={() => onEdit(user)}
            aria-label="Edit user"
            title="Edit"
          >
            <Pencil size={17} />
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(user)}
            aria-label="Delete user"
            title="Delete"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      <p className="user-email">
        <Mail size={15} />
        {user.email}
      </p>

      <div className="user-info">
        <div className="info-item">
          <Shield size={16} />
          <div>
            <span>Role</span>
            <strong>{roleLabel}</strong>
          </div>
        </div>

        <div className="info-item">
          <CalendarDays size={16} />
          <div>
            <span>Joined</span>
            <strong>{formattedDate}</strong>
          </div>
        </div>
      </div>

      <div className="user-footer">
        <span className="user-status-label">
          {role === 'admin' ? 'System administrator' : 'Team member'}
        </span>
      </div>

    </article>
  )
}