const Portfolio = ({ userData }) => {
  if (!userData) return <div>Cargando...</div>

  return (
    <div className="portfolio">
      <section className="hero">
        <h2>Hola, soy {userData.name}</h2>
        <p className="bio">{userData.bio}</p>
      </section>

      <section className="skills">
        <h3>Mis Habilidades</h3>
        <div className="skills-list">
          {userData.skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </section>

      <section className="projects">
        <h3>Mis Proyectos</h3>
        <div className="projects-grid">
          {userData.projects.map((project, index) => (
            <div key={index} className="project-card">
              <h4>{project.name}</h4>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Portfolio