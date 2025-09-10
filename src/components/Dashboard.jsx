import { LineChart } from '@mui/x-charts/LineChart';
import { logOut,checkDailyReset,generateChartList } from "../../firebase.js";
import { useAuth } from "../../AuthContext.jsx";
import {useEffect,useState} from 'react'
import BadgesBox from '../components/BadgesBox.jsx'
import TrackerBox from '../components/TrackerBox.jsx'
const Dashboard=()=>{
  const {userData}=useAuth();
  const {user}=useAuth();
  const [dateData,getDateData]=useState([0]);
  const [pointData,getPointData]=useState([0]);

  // Update database if 24 hours since the last login has passed and whether dashboard should be updated
  async function checkUpdateDashboard(){
    if (user && userData) {
        // Checks if the badge needs to be reset
        checkDailyReset(user, userData)
        // Gets the line chart data 
        async function loadLineChart() {
          const result = await generateChartList(user);
          if (result) {
            getDateData(result.dateData);
            getPointData(result.pointData);
          }
        }
        loadLineChart();
    }
  }

  // Update refs whenever user value change
  useEffect(() => {
    checkUpdateDashboard();
  }, [user, userData]);

  // Check whether it is time to reset every 10 mins 
  useEffect(() => {
    const interval = setInterval(() => {
      checkUpdateDashboard();
    }, 1000 * 60 * 10); 
    return () => clearInterval(interval);
    }, []);

    // Displays dashboard of user's data
    return(
        <section className="">
            <div className="min-h-screen lg:h-screen grid grid-cols-1 lg:grid-cols-7 gap-y-5 lg:gap-x-8 pt-24 md:pt-24 h-full mb-5 md:mb-10 lg:mb-2 sm:px-3 md:px-5 lg:px-1">
                <div className="sm:col-span-4 grid grid-rows-5 sm:grid-rows-7 gap-7">
                    <div className="row-span-3 bg-purple flex items-center rounded-xl py-2 px-6">
                        <div className="w-full">
                            <div className="flex flex-wrap gap-y-2">
                                <h1 className="text-3xl text-white font-black inline mr-2 sm:text-4xl sm:mb-1 text-nowrap">Welcome back,</h1>
                                <span className="text-3xl text-white font-black px-2 pt-1 pb-2 bg-orange rounded-xl word-wrap sm:text-4xl" id="accountUsername">{userData?.userDetails?.username || "No username"}</span>
                            </div>

                            <p className="mt-4 text-xl text-gray font-medium">Lets have a positive mindset when learning</p>
                            <span className="rounded-xl bg-gray h-3 block relative mt-2">
                                <span className="rounded-xl bg-turqoise h-3 block absolute" style={{width: `${(userData?.dailyBadges?.badgesCompleted ?? 0) / 4 * 100}%`}}></span>
                            </span>
                            <button className="text-white text-xl font-semibold rounded-xl bg-yellow p-2 px-4 mt-6 sm:mt-8" onClick={() => logOut(user.uid)}>Logout</button>
                        </div>
                    </div>
                    <div className="grid grid-rows-2 grid-cols-5 gap-5 row-span-4">
                        <div className="bg-yellow col-span-3 row-span-2 rounded-xl flex flex-col justify-center items-center">
                            <div className="rounded-full border-[5px] sm:border-8 border-orange h-40 w-40 sm:h-52 sm:w-52 flex justify-center items-center">
                                <span className="text-purple font-bold text-5xl">{userData?.points || "0"}</span>
                            </div>
                            <span className="text-purple text-2xl font-bold mt-3">points earned</span>
                        </div>
                        <TrackerBox currentScore={userData?.activityDetails?.wordsSpeltCorrectly || "0"} description={"words spelt correctly"}/>
                        <TrackerBox currentScore={userData?.activityDetails?.booksRead || "0"} description={"books read in VR"}/>
                    </div>
                </div>
             <div className="sm:col-span-3 grid grid-rows-4 gap-5">            
                    <div className="grid row-span-2 grid-cols-2 grid-rows-2 gap-4">
                        <BadgesBox badgeImage={"/hand.svg"} title={`Sign ${userData?.dailyBadges?.signTrackerToday?.goal || "0"} words`} currentScore={userData?.dailyBadges?.signTrackerToday?.currentScore || "0"} taskDone={"words signed"}/>
                        <BadgesBox badgeImage={"/spell.svg"} title={`Spell ${userData?.dailyBadges?.wordTrackerToday?.goal || "0"} words`} currentScore={userData?.dailyBadges?.wordTrackerToday?.currentScore || "0"} taskDone={"words spelt"}/>
                        <BadgesBox badgeImage={"/trophy.svg"} title={`Hit ${userData?.dailyBadges?.pointTrackerToday?.goal || "0"} points`} currentScore={userData?.dailyBadges?.pointTrackerToday?.currentScore || "0"} taskDone={"points earned"}/>
                        <BadgesBox badgeImage={"/book.svg"} title={`Read ${userData?.dailyBadges?.bookTrackerToday?.goal || "0"} books`} currentScore={userData?.dailyBadges?.bookTrackerToday?.currentScore || "0"} taskDone={"books read"}/>
                    </div>
                    <div className="row-span-2 bg-purple rounded-xl">
                        <LineChart
                        series={[
                            {
                            data: pointData,
                            label: 'points gained per every logged in date',
                            color: '#0CDFBF',
                            },                            
                        ]}
                        xAxis={[{ scaleType: 'point', data: dateData }]}
                        animation={{
                            duration: 1000,     
                            easing: 'easeOut',  
                        }}
                        sx={{
                            '& .MuiChartsAxis-line': {
                            stroke: '#0CDFBF', // purple axis lines
                            },                            
                            '& .MuiChartsAxis-root .MuiChartsAxis-tickLabel': {
                            fill: '#fff', 
                            },
                            '& .MuiChartsAxis-root .MuiChartsAxis-label': {
                            fill: '#0CDFBF',
                            },
                            '& .MuiChartsLegend-root text': {
                            color: '#0CDFBF', 
                            },
                            '& .MuiChartsTooltip-root': {
                            color: '#DF800C',
                            backgroundColor: '#0CDFBF',
                            },
                        }}                     
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Dashboard