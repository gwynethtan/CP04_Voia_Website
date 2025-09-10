import { motion } from "framer-motion";

// Details of VOIA's features
const featureCards=[
  {
    title:"Boost communication",
    icon: "/hand.svg", 
    description:"Converts spoken words into text for deaf users and converts sign language into speech for hearing individuals "
  },
  {
    title:"Interactive Learning",
    icon: "/learning.svg", 
    description:"Boasts a 3D storybook learning with a spelling quiz to learn and apply sign language, whether static or with movements"
  },  
  {
    title:"Tracks Learning",
    icon: "/trophy.svg", 
    description:"Has a progress tracking system. As users complete 3D storybooks and spelling quizzes, they unlock badges to celebrate their growth"
  },
]    

// Displays VOIA's features  
const FeatureCard=()=> {
  return (
    <section name="services" className="grid grid-cols-1 lg:grid-cols-3 gap-12 px-10 md:px-36 lg:px-16">
      {
        featureCards.map((serviceCard,index)=>(
          <article key={index}>
            <motion.div
            initial={{opacity:0, x:-20}}
            whileInView={{opacity:1, x:0}}
            viewport={{once:false}}
            transition={{duration:2}}
            >
              <div className="rounded-2xl border-2 border-turqoise bg-card flex flex-col items-center justify-center p-4 space-y-8">
                <h2 className="block font-semibold text-lg text-white">{serviceCard.title}</h2>
                <div className="filter drop-shadow-[0_0_24px_rgba(1,1,1,1)]">
                <img src={serviceCard.icon} alt="Service Icon" className="w-14 h-14 "/>
                </div>
                <p className="block text-gray text-sm font-medium text-justify break-words">{serviceCard.description}</p>
              </div>
            </motion.div>
        </article>
        ))
      }
    </section>
  );
}

export default FeatureCard