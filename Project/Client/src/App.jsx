import './App.css'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path='/Register' element={<PublicRoute><Register/></PublicRoute>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App