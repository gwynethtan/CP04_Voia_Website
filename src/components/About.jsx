import { motion } from "framer-motion";
import NavLinkButton from '../components/NavLinkButton'

// About section 
const About=()=>{
    return(
        <section name="about" className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-screen items-center">
            <motion.div
                initial={{opacity:0, x:-20}}
                whileInView={{opacity:1, x:0}}
                viewport={{once:false}}
                transition={{duration:1}}
                className="flex flex-col items-center lg:items-start justify-items-center"
                >
                <div className="flex flex-wrap justify-center text-5xl font-bold text-white mb-6 gap-y-2">
                    <p className="text-center lg:text-left mr-4">What is</p>
                    <span className="bg-orange px-2 pb-3 pt-1 rounded-xl">VOIA</span>
                </div>
                <p className="text-base md:text-xl lg:text-xl font-medium text-gray mb-8 text-center lg:text-justify">Voia is more than just a tool. It’s a step toward a more inclusive world. We would promote Voia as a way to bridge the communication gap between deaf and hearing communities, not just through technology, but through shared understanding and empathy.</p>
                <NavLinkButton link="/Auth" text="Sign up with us" />
            </motion.div>
            <motion.div
                initial={{opacity:0, x:20}}
                whileInView={{opacity:1, x:0}}
                viewport={{once:false}}
                transition={{duration:1}}
                className="flex justify-center"
                >
                <div className="filter drop-shadow-[0_0_18px_rgba(0,255,255,0.3)] md:drop-shadow-[0_0_28px_rgba(0,255,255,0.3)] lg:drop-shadow-[0_0_40px_rgba(0,255,255,0.5)] flex justify-center z-20 ">
                    <img src="/voiaBox.svg" alt="Book" className="scale-[2] md:scale-[2.8] lg:scale-[1.7] h-52 sm:h-64" />
                </div>
            </motion.div>
        </section>
    );
}
export default About