import { Navigate, Outlet } from 'react-router-dom';
import { useSanctum } from 'react-sanctum';


type AuthGuardProps = {
  isPrivate: boolean;
};

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { authenticated } = useSanctum();

  if (authenticated === null) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="text-gray-500 font-bold text-4xl">
          Loading...
        </span>
      </div>
    );
  }
  if (!authenticated && isPrivate) {
    return <Navigate to='/login' replace />;
  }

  if (authenticated && !isPrivate) {
    return <Navigate to='/' replace />;
  }


  return (<Outlet />);
}
