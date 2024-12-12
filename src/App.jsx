import { Link, Outlet } from 'react-router'
import Weather from './components/Weather'
import NavBar from './components/NavBar';
import { useMode } from './assets/globalState';
import { Routes, Route } from 'react-router';
import ErrorPage from './components/ErrorPage';
import Quiz from './components/Quiz';
import Calculator from './components/Calculator';
import Footer from './components/Footer';

function App() {
  const [mode] = useMode(false);
  return (
    <div>
      <NavBar passedmode={mode} />
      <Routes>
        <Route path='*' element={<ErrorPage passedmode={mode} />} />
        <Route path="/" element={<Weather passedmode={mode} />} />
        <Route path="/quiz" element={<Quiz passedmode={mode} />} />
        <Route path="/calculator" element={<Calculator passedmode={mode} />} />
      </Routes>
      <Footer passedmode={mode}/>
    </div>
  )
}

export default App

