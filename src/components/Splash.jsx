import RotatingText from '../components/RotatingText'
import NavLinkButton from '../components/NavLinkButton'
import { motion } from "framer-motion";

// Displays the design when user first visits VOIA website  
const Splash=()=>{
    return(
      <section name="home" className="min-h-screen lg:h-screen pt-12 md:pt-20 lg:pt-12 flex items-center justify-center ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-5 lg:gap-14">
          <motion.div
          initial={{opacity:0, x:-20}}
          whileInView={{opacity:1, x:0}}
          viewport={{once:false}}
          transition={{duration:1}} 
          className="flex flex-col items-center justify-center lg:items-start">
              <div className="text-white font-bold sm:text-6xl text-4xl text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-left">
                  <span className="pr-3 sm:pr-5 text-nowrap">Explore your</span>
                  <RotatingText
                    texts={['Voice', 'Fun', 'Style']}
                    mainClassName="px-2 sm:px-2 md:px-3 bg-orange py-1 sm:py-2 justify-center rounded-xl"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-2.5"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                  />
                </div>
                <span className="pr-5 mt-10">together with</span>
              </div>
              <img src="/voiaLogo.svg" className="my-5 lg:my-10 scale-[0.76] md:scale-[0.7] lg:scale-100"></img>
              <NavLinkButton link="about" text="Know more" />
          </motion.div>
          <motion.div
          initial={{opacity:0, x:20}}
          whileInView={{opacity:1, x:0}}
          viewport={{once:false}}
          transition={{duration:1}}
          className="h-auto filter drop-shadow-[0_0_18px_rgba(0,255,255,0.3)] md:drop-shadow-[0_0_28px_rgba(0,255,255,0.3)] lg:drop-shadow-[0_0_40px_rgba(0,255,255,0.5)] flex justify-center z-20">
              <img src="/voiaItems.svg" alt="Voia Products" className=" inset-0 scale-[0.95] md:scale-[0.85] lg:scale-[0.7]" />
          </motion.div>
        </div>
      </section>
    );
}

export default Splash;