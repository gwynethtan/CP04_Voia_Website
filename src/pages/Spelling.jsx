import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { generate } from "random-words";
import AlphabetButton from '../components/AlphabetButton';
import {addSpellingScore} from '/Voia/CP04_Voia_Website/CP04_Voia_Website/firebase'
import { useAuth } from "../../AuthContext.jsx";

export default function App() {
  // Get user data
  const { userData } = useAuth();

  // Get user for uid 
  const {user}=useAuth();

  // Stores the alphabet letters that will be displayed as clickable options 
  const [alphabetButtonsShown, setAlphabetButtonsShown] = useState([]);

  // Represents the current "answer slots" that the user is filling in.
  const [spellingSlots, setSpellingSlots] = useState([]);
  
  // Tracks the word that the user is currently forming, based on the slots filled.
  const [userSpelling, setUserSpelling] = useState();

  // Tracks the index of the slot the user is currently filling in. 
  const [currentIndex, setCurrentIndex] = useState(0);

  // The correct word for the current round (randomly generated).
  const [correctWord, setCorrectWord] = useState("");

  // Resets the round
  const startNewRound = () => {
    const newWord = generate({ minLength: 5, maxLength: 5 }); // generates a new random word
    setCorrectWord(newWord);
    defineSlots(newWord);
    randomizeAlphabet(newWord);
  };

  // Run only once on mount
  useEffect(() => {
    startNewRound();
  }, []);

  // Defines the number of alphabets the user can put in for the answer
  const defineSlots = (word) => {
    const slots = Array(word.length).fill("");
    setSpellingSlots(slots);
    setUserSpelling(slots); 
    setCurrentIndex(0);     // reset index
  };

  // Defines the alphabets that will be shown as options. It will then be converted into sign language pose images later on
  const randomizeAlphabet = (word) => {
    let alphabetList = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const uniqueCorrectLetters = [...new Set(word.toLowerCase().split(""))];
    const remainingLetterCount = 7 - uniqueCorrectLetters.length;

    // Remove correct letters from pool
    alphabetList = alphabetList.filter(letter => !uniqueCorrectLetters.includes(letter));

    // Random extra letters
    const extraLetters = [];
    for (let i = 0; i < remainingLetterCount; i++) {
      const randomIndex = Math.floor(Math.random() * alphabetList.length);
      extraLetters.push(alphabetList.splice(randomIndex, 1)[0]);
    }

    const allButtons = [...uniqueCorrectLetters, ...extraLetters].sort(() => Math.random() - 0.5);
    setAlphabetButtonsShown(allButtons);
  };

  // Add new letter
  const addAlphabet = (letter) => {
    if (currentIndex >= correctWord.length) return;

    const updatedSlots = [...spellingSlots];
    updatedSlots[currentIndex] = letter;
    setSpellingSlots(updatedSlots);
    setCurrentIndex(currentIndex + 1);
  };

  // Remove last letter
  const deleteLastAlphabet = () => {
    if (currentIndex === 0) return;

    const updatedSlots = [...spellingSlots];
    updatedSlots[currentIndex - 1] = "";
    setSpellingSlots(updatedSlots);
    setCurrentIndex(currentIndex - 1);
  };

  // Checks if word spelt is correct
  const checkIsCorrect = () => {
    const typedWord = spellingSlots.join("").toLowerCase();
    if (typedWord === correctWord.toLowerCase()) {
      alert("Correct!");
      console.log(userData?.points +1 );
      if (user!=null){ // Adds spelling score when user is logged into the VOIA website
        addSpellingScore(user.uid, 1);
      }
      startNewRound();
    } else {
      alert("Try again!");
    }
  };

  return (
    <motion.section 
    initial={{opacity:0, x:-70}}
    whileInView={{opacity:1, x:0}}
    viewport={{once:false}}
    transition={{duration:1}} 
    name="spelling"
    className="flex flex-col items-center justify-center min-h-screen pt-10 sm:pt-14">
      <h1 className="text-white font-bold text-5xl text-center flex flex-wrap justify-center">Spell with sign language</h1>
      <span className="text-white bg-orange rounded-xl px-4 pb-4 pt-3 font-extrabold text-5xl mt-14 mb-14 text-center">{correctWord}</span>

      <div className="grid grid-flow-col gap-3 sm:gap-7 place-content-center sm:mb-12 mb-10">
        {spellingSlots.map((char, index) => (
          <span key={index} className="bg-card rounded-xl font-bold p-8 sm:p-12 text-white text-2xl text-center relative">
            {char ? <img src={`https://kpilsdibrzlotjpnhvyk.supabase.co/storage/v1/object/public/media/signAlphabetImages/${char.toUpperCase()}.png`} alt={char} className="absolute w-20 h-20 lg:w-28 lg:h-28 top-1/2 -translate-y-2/4 left-1/2 -translate-x-2/4" /> : ""}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-x-8 gap-y-6">
        {alphabetButtonsShown.map((alphabet, index) => (
          <AlphabetButton
            key={index}
            alphabet={alphabet}
            onClick={() => addAlphabet(alphabet)}
          />
        ))}
      </div>

      <div className="flex mt-10">
        <button onClick={checkIsCorrect} className="text-white bg-green-500 rounded-xl px-8 py-2 font-bold text-xl">
          Confirm
        </button>
        <button onClick={deleteLastAlphabet} className="bg-red-500 rounded-xl ml-5 px-4 py-2">
          <img src="/backspace.svg" className="w-10 h-10" alt="Delete" />
        </button>
      </div>
    </motion.section>
  );
}
