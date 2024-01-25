
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AddUser from './components/Register';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import About from './components/About';
import NotFound from './components/NotFound';

function App() {
  return (    
    <BrowserRouter>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/about" element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes> 
      
      <footer className="mt-auto">
        <Footer />
      </footer>
      </div>   
    </BrowserRouter>
  );
}

export default App;
