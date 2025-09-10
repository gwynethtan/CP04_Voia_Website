import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';

// Navigation bar that brings users to different sections of the current page or other pages
const NavigationBar = ({navDetails}) => { 
  // Checks if menu is open 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const SwapNavType=({link, linkName})=>{
    if (link[0] != "/" ){
      return (
        <ScrollLink
          to={link}
          smooth={true}
          duration={500}
          offset={-40}
          className="block py-3 px-5 md:pl-10 md:p-0 text-turqoise rounded-sm md:hover:bg-transparent md:border-0 cursor-pointer"
          onClick={closeMenu}
        >
          {linkName}
        </ScrollLink>        
      );
    }
    else {
      return(
        <NavLink 
          to={link}
          onClick={closeMenu}
          className="block py-3 px-5 md:pl-10 md:p-0 text-turqoise rounded-sm md:hover:bg-transparent md:border-0"
        >
          {linkName}
        </NavLink>    
      );
    }
  }

  return (
      <nav className="bg-nav top-0 h-16 z-50 fixed sm:w-screen lg:px-16">
        <div className="w-full flex flex-wrap items-center justify-between pt-4 md:mx-auto md:p-4">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse ml-4">
            <img src="/voiaLogo.svg" className="h-8" alt="VOIA Logo"/>
          </a>

          <button 
            onClick={toggleMenu}
            type="button" 
            className="inline-flex items-center mr-4 p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden" 
            aria-controls="navbar-solid-bg" 
            aria-expanded={isMenuOpen}
          >
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          
          <div 
            className={`${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} transition-all duration-300 overflow-hidden w-screen lg:max-h-none md:opacity-100 lg:block lg:w-auto`}
            id="navbar-solid-bg"
          >
            <ul className="flex flex-col font-medium gap-y-0 md:gap-y-5 lg:gap-y-0 bg-nav rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-transparent">
              {
                navDetails.map((navDetail,index)=>(
                  <li key={index}>
                    <SwapNavType link={navDetail.link} linkName={navDetail.linkName} />          
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </nav>
  );
}

export default NavigationBar;