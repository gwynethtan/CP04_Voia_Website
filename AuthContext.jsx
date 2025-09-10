import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { auth,db } from "./firebase"
import { onValue,ref} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const AuthContext = createContext();

// Allows all pages to access current auth details easily
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch profile data from database when user changes
  useEffect(() => {
    if (user) {
      const userDetailsRef = ref(db, "users/" + user.uid);
      onValue(userDetailsRef, (snapshot) => {
        const newUserData = snapshot.val();
        setUserData(newUserData);
      });
      } else {
        // If logged out, clear any stored user data
        setUserData(null);
      }
  }, [user]);

  // Provide the user and userData to all child components that use this context
  return (
    <AuthContext.Provider value={{ user, userData }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use authentication context in other components
export function useAuth() {
  return useContext(AuthContext);
}

