import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Function to scroll page to top when user navigates to a different page
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top on route change
  }, [pathname]);
  return null;
}