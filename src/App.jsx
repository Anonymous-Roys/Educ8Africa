import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home'
import ErrorPage from './pages/ErrorPage';
import Nss from './pages/nss';
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/nss" element={<Nss/>}/>
            {/* Add more routes for other components */}
            <Route path="*" element={<ErrorPage/>} /> {/* Catch-all route for errors */}
          </Routes>
        </Router>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
