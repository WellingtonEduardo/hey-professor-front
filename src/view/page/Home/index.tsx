import { Link } from "react-router-dom";




export function Home() {
  return (
    <div className="bg-gray-900 w-full h-28 flex items-center">
      <nav className="text-gray-400 px-3">
        <ul className="flex gap-8">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>)
}
