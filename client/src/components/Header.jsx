import { useState } from 'react'
import { Link } from 'react-router-dom'
import { StickyNote, Menu, X, Home, FileText, LogIn, UserPlus } from 'lucide-react'

import '../styles/header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

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