import './App.css'
import Form from './Component/Form'
import { BrowserRouter } from 'react-router-dom'
import Home from './Component/Router/Home'
import About from './Component/Router/About'
import Contact from './Component/Router/Contact'
import Test from './Component/Router/MainLayout'
import { Routes, Route } from 'react-router-dom';
import MainLayout from './Component/Router/MainLayout'
function App() {

  return (
    <>
      <Routes>
      {/* Route chính có layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} /> {/* Mặc định là Home */}
        <Route path='/home' element={<Home />} /> {/* Mặc định là Home */}
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
