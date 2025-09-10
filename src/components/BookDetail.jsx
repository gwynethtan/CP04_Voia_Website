import { setWaitlistDb} from "../../firebase.js";
import {useState,useEffect} from "react";

// Component to display book details 
const BookDetail=({userId, bookId, waitlistedBook, bookName,bookCover,bookDescription})=>{

    // Checks the box current waitlisting state
    const [isWaitlisted, setIsWaitlisted] = useState(waitlistedBook);

    // Detects a change from list of waitlisted books in database 
    useEffect(() => {
        setIsWaitlisted(waitlistedBook);
    }, [waitlistedBook]);

    // Updates waitlist status when user taps on waitlist/unwaitlist button
    const handleWaitlistState = async () => {
        const newWaitlistState = !isWaitlisted;
        setIsWaitlisted(newWaitlistState);
        setWaitlistDb(userId, newWaitlistState, bookId);
    };

    return(
        <article>
            <div className="bg-card rounded-xl p-2 sm:p-4 flex items-center border-2 border-purple">
                <img src={bookCover} className="h-52 sm:h-64 rounded-xl"/>
                <div className="ml-7 my-3 flex flex-col justify-items-center">
                    <span className="text-white font-black text-4xl sm:text-3xl rounded-xl p-1 flex">{bookName}</span>
                    <p className="text-gray font-normal text-sm md:text-xl lg:text-md mt-3 sm:mt-8">
                        {bookDescription}
                    </p>
                    <div className="mt-1 sm:mt-5">
                        {isWaitlisted ? (
                            <button onClick={handleWaitlistState} className="text-white text-xl font-semibold rounded-xl bg-purple p-2 px-4 mt-4 sm:mt-2">
                                Waitlisted
                            </button>
                        ) : (
                            <button onClick={handleWaitlistState} className="text-white text-xl font-semibold rounded-xl bg-orange p-2 px-4 mt-4 sm:mt-2">
                                Join Waitlist
                            </button>
                        )}
                    </div>                    
                </div>
            </div>
        </article>
    );
}

export default BookDetail;