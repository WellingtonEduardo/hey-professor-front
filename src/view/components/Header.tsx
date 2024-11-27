

import { Link, useNavigate } from "react-router-dom";
import { useSanctum } from "react-sanctum";


type UserProps = {
  created_at: string;
  email: string
  id: number
  name: string
  updated_at: string
}
export function Header() {
  const navigate = useNavigate();
  const { user, signOut } = useSanctum<UserProps>();


  async function handleLogout() {
    await signOut();
    navigate('/login', { replace: true });
  }
  return (
    <div className="bg-gray-900 w-full h-28 flex items-center justify-evenly">
      {user && (
        <div className="text-white flex flex-col">
          <h1>{user.name}</h1>
          <span>{user.email}</span>
          <span>ID {user.id}</span>
        </div>
      )}
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
          {user && (
            <li onClick={handleLogout} className="cursor-pointer">
              Logout
            </li>
          )}
        </ul>
      </nav>

    </div>
  )
}
