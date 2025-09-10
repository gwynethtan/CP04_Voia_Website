import { NavLink } from "react-router-dom"; 
import { Link as ScrollLink } from 'react-scroll';

// Button that navigates to various pages or sections of the page
const NavLinkButton = ({ link, text }) => { 
    if (link[0] != "/" ){
        return (
        <ScrollLink
            to={link}
            smooth={true}
            duration={500}
            offset={-40}
        >
            <button className=" bg-purple rounded-xl text-white font-semibold text-xl md:text-2xl lg:text-xl px-5 py-3 md:px-8 md:py-5 lg:px-5 lg:py-3"> 
                {text}
            </button>                
        </ScrollLink>        
        );
    }
    else {
        return(
        <NavLink 
            to={link}
        >
            <button className="bg-purple rounded-xl text-white font-semibold text-xl md:text-2xl lg:text-xl px-5 py-3 md:px-8 md:py-5 lg:px-5 lg:py-3"> 
                {text}
            </button>
        </NavLink>    
        );
    }
}

export default NavLinkButton;