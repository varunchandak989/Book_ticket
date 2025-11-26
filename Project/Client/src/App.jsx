import './App.css'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Admin from './pages/Admin'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import Partner from './pages/Partner'
import SingleMovie from './pages/singleMovie'
import BookShow from './pages/BookShow'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path='/Register' element={<PublicRoute><Register/></PublicRoute>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/partner' element={<Partner/>}/>
        <Route path='/singlemovie/:id/' element={<SingleMovie/>}/>
        <Route path='/bookshow/:id' element={<BookShow/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App