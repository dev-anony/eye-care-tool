import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "./NavBar.css"

export default function Navbar() {
  return (
    <nav className="nav">
      <div style={{paddingLeft: '10px'}}>
        <ul>
          <CustomLink to="/diabetic">Diabetic Retinopathy/Glaucoma</CustomLink>
          <CustomLink to="/kerat">Keratoconus</CustomLink>
        </ul>
      </div>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
