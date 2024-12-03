

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
    <div className="bg-gray-900 w-full  flex flex-col items-center mb-10">

      <nav className="text-gray-400 py-6 w-full">
        <ul className="flex justify-around w-full  ">
          <div className="flex gap-8">
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </div>
          {user && (
            <li onClick={handleLogout} className="cursor-pointer">
              Logout
            </li>
          )}
        </ul>
      </nav>

      <span className=" w-full text-gray-500 font-bold text-xl">
        <hr className="border-gray-600" />
        <div className="flex gap-14 py-4 px-5">
          <div >
            <Link to="/" >
              Dashboard
            </Link>
          </div>
          <div >
            <Link to="/questions">
              My Questions
            </Link>
          </div>
        </div>
      </span>

    </div>
  )
}
