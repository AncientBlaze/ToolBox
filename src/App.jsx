import Weather from './components/Weather'
import NavBar from './components/NavBar';
import { useMode } from './assets/globalState';
import { Routes, Route } from 'react-router';
import ErrorPage from './components/ErrorPage';
import Quiz from './components/Quiz';
import Calculator from './components/Calculator';
import Footer from './components/Footer';
import ToDo from './components/To-do.jsx';
import Clock from './components/Clock.jsx';


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
        <Route path="/todo" element={<ToDo passedmode={mode} />} />
        <Route path="/clock" element={<Clock passedmode={mode} />} />
      </Routes>
      <Footer passedmode={mode}/>
    </div>
  )
}

export default App

