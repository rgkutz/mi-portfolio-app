import { useState } from 'react'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Para simplificar, usamos credenciales básicas
    // En un proyecto real, esto se conectaría a un backend
    if (username && password) {
      const userData = {
        username,
        name: username,
        bio: 'Esta es mi biografía. Puedo editarla en el dashboard.',
        skills: ['HTML', 'CSS', 'JavaScript'],
        projects: [
          { name: 'Mi primer proyecto', description: 'Una descripción breve del proyecto' }
        ]
      }
      onLogin(userData)
    } else {
      alert('Por favor, completa todos los campos')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <p>Para este ejemplo, usa cualquier usuario y contraseña</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  )
}

export default Login