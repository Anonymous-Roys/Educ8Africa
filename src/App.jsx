import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import ErrorPage from './pages/ErrorPage';
import './App.css'
import Nss from './pages/nss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path = "/nss" element ={<Nss/>}/>
        {/* Add more routes for other components */}
        <Route path="*" element={<ErrorPage/>} /> {/* Catch-all route for errors */}
      </Routes>
    </Router>
  );
}

export default App;
