import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './view/page/Home';
import { Login } from './view/page/Login';
import { Register } from './view/page/Register';
import { Questions } from './view/page/Questions';


export function Router() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path='/questions' element={<Questions />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />


      </Routes>
    </BrowserRouter>

  );
}
