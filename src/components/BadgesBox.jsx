// Displays the badge details on the dashboard
const BadgesBox=({badgeImage,title,currentScore,taskDone})=>{
    return(
        <div className="bg-turqoise gap-x-1 rounded-xl flex flex-col sm:flex-row sm:items-center px-4 md:px-12 lg:px-4 py-2 justify-center sm:justify-between">
            <img src={badgeImage} className="w-10 h-10 md:w-20 md:h-20 lg:w-16 lg:h-16" />
            <div className="md:space-y-1">
                <span className="text-purple font-bold text-xl md:text-4xl lg:text-2xl">
                    {title}
                </span>
                <p className="text-white font-semibold text-lg md:text-2xl lg:text-xl">
                    {currentScore} {taskDone} 
                </p>
            </div>
        </div>
    );
}

export default BadgesBox;