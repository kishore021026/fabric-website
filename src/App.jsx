import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BagProvider } from './context/BagContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BagProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#F7F6F3] text-stone-950 font-sans antialiased selection:bg-[#2E473B] selection:text-white">
          <Navbar />
          
          <div className="flex-grow flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </BagProvider>
  )
}