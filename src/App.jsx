import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Jobs = lazy(() => import('./pages/Jobs'));
const NSS = lazy(() => import('./pages/nss'));
const Contact = lazy(() => import('./pages/Contact'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/jobs" element={<Jobs/>} />
            <Route path="/nss" element={<NSS/>} />
            <Route path="/contact" element={<Contact/>} />
            {/* Catch-all route for errors */}
            <Route path="*" element={<ErrorPage/>} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
