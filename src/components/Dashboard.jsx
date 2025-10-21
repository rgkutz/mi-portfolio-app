import { useState } from 'react'

const Dashboard = ({ userData, setUserData }) => {
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    name: userData.name,
    bio: userData.bio,
    skills: userData.skills.join(', '),
    projects: userData.projects
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    const updatedUserData = {
      ...userData,
      name: formData.name,
      bio: formData.bio,
      skills: formData.skills.split(',').map(skill => skill.trim()),
      projects: formData.projects
    }
    
    setUserData(updatedUserData)
    localStorage.setItem('portfolioUser', JSON.stringify(updatedUserData))
    setEditMode(false)
    alert('Cambios guardados correctamente')
  }

  const addProject = () => {
    const newProject = { name: 'Nuevo proyecto', description: 'Descripción del proyecto' }
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }))
  }

  const updateProject = (index, field, value) => {
    const updatedProjects = [...formData.projects]
    updatedProjects[index][field] = value
    setFormData(prev => ({
      ...prev,
      projects: updatedProjects
    }))
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        {!editMode ? (
          <button onClick={() => setEditMode(true)}>Editar Portfolio</button>
        ) : (
          <button onClick={handleSave}>Guardar Cambios</button>
        )}
      </div>

      {editMode ? (
        <div className="edit-form">
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Biografía:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Habilidades (separadas por comas):</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
            />
          </div>

          <div className="projects-edit">
            <h3>Proyectos</h3>
            <button onClick={addProject}>Agregar Proyecto</button>
            
            {formData.projects.map((project, index) => (
              <div key={index} className="project-edit">
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProject(index, 'name', e.target.value)}
                  placeholder="Nombre del proyecto"
                />
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                  placeholder="Descripción del proyecto"
                  rows="2"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="dashboard-preview">
          <h3>Vista Previa del Portfolio</h3>
          <Portfolio userData={userData} />
        </div>
      )}
    </div>
  )
}

export default Dashboard