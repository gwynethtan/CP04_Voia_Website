import Splash from '../components/Splash'
import FeatureCard from '../components/FeatureCard';
import About from '../components/About'
import Spelling from './Spelling'  
import Footer from '../components/Footer'  
import Dashboard from '../components/Dashboard'

// Decides what kind of page should be shown depending on whether user has logged in or not
const Home=({isLoggedIn})=>{
  if (isLoggedIn){
    return (
      <Dashboard/>
    );
  }
  else{
    return (
      <div className="space-y-6 lg:space-y-20">
        <Splash/>
        <FeatureCard/>
        <About/>
        <Spelling/>
        <Footer/>
      </div>
    );
  }
}

export default Home;


            