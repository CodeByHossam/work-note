import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/mainLayout.css'

export default function MainLayout() {
  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="main-container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  )
}