import ScrollToTop from './components/ScrollToTop';
import Layout from "./Layout"
import Home from './pages/Home'
import Auth from './pages/Auth'
import Spelling from './pages/Spelling'
import Boxes from './pages/Boxes.jsx'
import Gallery from './pages/Gallery'
import { useEffect, useState } from "react";
import {HashRouter as Router,Routes,Route} from 'react-router-dom'
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {auth} from "../firebase.js"
import {AuthProvider} from "../AuthContext.jsx"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Checks if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe(); // Stop checking if auth state has changed
  }, []);

  // Pages that the website can navigate to
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout isLoggedIn={isLoggedIn}/>}>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>}/>
            <Route path="/Auth" element={<Auth/>}/>
            <Route path="/Spelling" element={<Spelling/>}/>
            <Route path="/Boxes" element={<Boxes/>}/>
            <Route path="/Gallery" element={<Gallery/>}/>
          </Route>
        </Routes>
      </Router>      
    </AuthProvider>
  );
}