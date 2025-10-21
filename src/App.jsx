import { useState, useEffect } from 'react'
import Login from './components/Login'
import Portfolio from './components/Portfolio'
import Dashboard from './components/Dashboard'
import './index.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)
  const [activeView, setActiveView] = useState('portfolio')

  // Verificar si ya hay una sesión activa al cargar
  useEffect(() => {
    const savedUser = localStorage.getItem('portfolioUser')
    if (savedUser) {
      setUserData(JSON.parse(savedUser))
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (user) => {
    setUserData(user)
    setIsLoggedIn(true)
    localStorage.setItem('portfolioUser', JSON.stringify(user))
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserData(null)
    localStorage.removeItem('portfolioUser')
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Mi Portfolio</h1>
        <nav>
          <button 
            className={activeView === 'portfolio' ? 'active' : ''}
            onClick={() => setActiveView('portfolio')}
          >
            Portfolio
          </button>
          <button 
            className={activeView === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveView('dashboard')}
          >
            Dashboard
          </button>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </nav>
      </header>
      
      <main>
        {activeView === 'portfolio' ? (
          <Portfolio userData={userData} />
        ) : (
          <Dashboard userData={userData} setUserData={setUserData} />
        )}
      </main>
    </div>
  )
}

export default App