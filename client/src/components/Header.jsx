import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  StickyNote,
  Menu,
  X,
  Home,
  FileText,
  LogIn,
  LogOut,
  User,
  UserPlus,
} from 'lucide-react'

import '../styles/header.css'
import { logout } from '../store/authSlice'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { name, token } = useSelector((state) => state.auth)
  const isLoggedIn = Boolean(token)

  const closeMenu = () => setMenuOpen(false)

  const handleLogout = () => {
    dispatch(logout())
    closeMenu()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-container">

        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-icon">
            <StickyNote size={20} />
          </span>

          <span>
            Sticky<span>Notes</span>
          </span>
        </Link>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>

          <Link to="/" onClick={closeMenu}>
            <Home size={18} />
            <span>Home</span>
          </Link>

          <Link to="/notes" onClick={closeMenu}>
            <FileText size={18} />
            <span>My Notes</span>
          </Link>

          {isLoggedIn ? (
            <>
              <span className="user-chip">
                <User size={18} />
                <span>{name}</span>
              </span>

              <button type="button" className="logout-btn" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>
                <LogIn size={18} />
                <span>Login</span>
              </Link>

              <Link
                to="/register"
                className="signup-btn"
                onClick={closeMenu}
              >
                <UserPlus size={18} />
                <span>Get Started</span>
              </Link>
            </>
          )}

        </nav>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

      </div>
    </header>
  )
}