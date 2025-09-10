import NavigationBar from "./components/NavigationBar.jsx"
import {Outlet} from "react-router-dom"

// List of pages that all users can access
const publicNav = [
  { linkName: "Home", link: "/" },
  { linkName: "Our Services", link: "services" },
  { linkName: "About", link: "about" },
  { linkName: "Spell with us", link: "spelling" },
  { linkName: "Sign Up", link: "/Auth" }
];

// List of pages that logged in users can access
const loggedInNav = [
  { linkName: "Home", link: "/" },
  { linkName: "Spelling", link: "/Spelling" },
  { linkName: "Boxes", link: "/Boxes" },
  { linkName: "Gallery", link: "/Gallery" },
];

// Formats the entire website for all web pagees
const Layout=({isLoggedIn})=>{
  let navDetails;

  // Checks if user is logged in and shows the respective navigation bar 
  if (isLoggedIn) {
  navDetails = loggedInNav;
  } else {
  navDetails = publicNav;
  }

  return(
      <>
          <NavigationBar navDetails={navDetails}/>
          <main className="px-4 md:px-7 lg:px-12">
              <Outlet/>
          </main>
      </>
  )
}

export default Layout;