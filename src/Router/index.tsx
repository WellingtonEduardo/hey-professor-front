import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from '../view/page/Home';
import { MyQuestions } from '../view/page/Questions/MyQuestions';
import { Register } from '../view/page/Register';
import { Login } from '../view/page/Login';
import { AuthGuard } from './AuthGuard';
import { Header } from '../view/components/Header';
import { HeaderLayout } from '../view/layouts/HeaderLayout';



export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate />}>
          <Route element={<HeaderLayout />}>
            <Route path="/" element={<Home />} />
            <Route path='/questions' element={<MyQuestions />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

      </Routes>
    </BrowserRouter>

  );
}
