// Tracks users progress in various areas
const TrackerBox=({currentScore,description})=>{
    return(
        <div className="bg-orange rounded-xl col-span-2 p-3 sm:p-5 flex flex-col justify-center">
            <span className="text-purple font-bold text-4xl sm:text-5xl block">{currentScore}</span>
            <span className="text-white mt-1 sm:mt-2 font-semibold text-md sm:text-xl">{description}</span>
        </div>
    );
}

export default TrackerBox;