import '../styles/footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>StickyNotes</h3>
          <p>
            Keep your ideas organized, simple, and accessible.
          </p>
        </div>

        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>

        <p className="footer-copy">
          © 2026 StickyNotes. All rights reserved.
        </p>
      </div>
    </footer>
  )
}