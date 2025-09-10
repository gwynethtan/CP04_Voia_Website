import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase,update,onValue,remove, ref, get, set} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut ,sendPasswordResetEmail,deleteUser } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase config 
const firebaseConfig = {
    apiKey: "AIzaSyCs-XI8IgAxkOZ-FvcJIjxyi_YFzedJCC0",
    authDomain: "voia-fcf74.firebaseapp.com",
    databaseURL: "https://voia-fcf74-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "voia-fcf74",
    storageBucket: "voia-fcf74.firebasestorage.app",
    messagingSenderId: "29720863711",
    appId: "1:29720863711:web:285f3aaa031e0bccf85a6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
var currentUserId="";
export { currentUserId,auth,db };

// Creates new account when user signs up
export async function signUp() {
    event.preventDefault(); // Prevent the default form submission
    var username = document.getElementById("signUpUsername").value;
    var email = document.getElementById("signUpEmail").value;
    var password = document.getElementById("signUpPassword").value;

    if (username == "") {
        alert("Please enter a username");
        return;
    }

    if (email == "") {
        alert("Please enter an email");
        return;
    }

    if (password == "") {
        alert("Please enter a 6-character password");
        return;
    }

    createUserWithEmailAndPassword(auth,email, password)
        .then((userCredential) => {
            // User successfully created
            var user = userCredential.user;
            // Save additional user details in Realtime Database
            var newUserRef = ref(db, 'users/' + user.uid); // Use UID as a unique identifier
            
            return set(newUserRef,{
                points: 0,
                userDetails: {
                    username: username,
                    email: email,
                    dateCreated: Math.floor(Date.now() / 1000),
                    userOnline: true,                        
                },
                activityDetails: {
                    wordsSpeltCorrectly: 0,
                    booksRead:0,
                    totalSignedWords:0,
                },
                dailyBadges: {
                    lastReset: Math.floor(Date.now() / 1000),
                    badgesCompleted:0,
                    signTrackerToday:
                    {
                        goal:Math.floor(Math.random() * 5)+1, // Randomize badge requirements
                        currentScore:0
                    },
                    wordTrackerToday:
                    {
                        goal:Math.floor(Math.random() * 10)+1, // Randomize badge requirements
                        currentScore:0
                    },                            
                    pointTrackerToday:
                    {
                        goal:Math.floor(Math.random() * 50)+1, // Randomize badge requirements
                        currentScore:0
                    },                        
                    bookTrackerToday:
                    {
                        goal:Math.floor(Math.random() * 10)+1, // Randomize badge requirements
                        currentScore:0
                    },                        
                }
            });
        })
        .then(() => {
            alert("Signup successfully!");
        })
        .catch((error) => {
            console.error("Error during sign-up or database operation:", error);
            alert("Failed to sign up : " + error.message);
        });

};

// Formats unix timestamp to DD/MM/YY
function dateConvert(unixTimestamp){
    var date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    var formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    });
    return formattedDate;
}

// Log in 
export async function logIn(){
    event.preventDefault(); 
    var email = document.getElementById("logInEmail").value;
    var password = document.getElementById("logInPassword").value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user; // Firebase Auth user object
        alert("Login successful");

        // Update userOnline in Realtime Database
        const userRef = ref(db, 'users/' + user.uid + '/userDetails');
        update(userRef, { userOnline: true })
        .then(() => console.log("userOnline updated"))
        .catch(err => console.error("Error updating userOnline:", err));        
    })
    .catch((error) => {
        const errorMessage = error.message;
        alert("Login failed: " + errorMessage);
    });
};

// Reset password
export async function changePassword(){  
    var email = document.getElementById("forgotPasswordEmail").value; // Get email from input field
    sendPasswordResetEmail(auth, email)
    .then(() => {
        alert("Password reset email sent. Check your inbox to reset your password.");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error sending password reset email:", errorCode, errorMessage);
        alert("Error sending password reset email: " + errorMessage); // Display error to user
        if (errorCode === 'auth/user-not-found') {
            alert("Email does not exist");
        } else if (errorCode === 'auth/invalid-email') {
            alert("Email is invalid.Check your email formatting");
        }
    });
}


// Function to handle logout
export async function logOut(userId) {
    console.log(userId);
    const userRef = ref(db, 'users/' + userId + '/userDetails');
    await update(userRef, { userOnline: false });
    signOut(auth).then(() => {
        alert("Logout successful");
    });
}

// Loads the date and point data for the line chart
export async function generateChartList(user){
    if (user){
        var dateData=[];
        var pointData=[];
        const pointDetailsRef = ref(db, 'users/' + user.uid + '/pointDetails');           
        const snapshot = await get(pointDetailsRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            Object.entries(data).forEach(([timestamp, value]) => {
                const date = dateConvert(timestamp); 
                dateData.push(date);                        
                pointData.push(value.dayPoints || 0);  
            });
        }
        console.log(dateData);
        console.log(pointData);
        return { dateData, pointData };
    }
}

// Loads list of images taken by user in the VOIA app
export async function loadUserGallery(user){
        console.log(user);
    if (user){
        var userGallery=[];
        const imagesTakenRef = ref(db, 'users/' + user.uid + '/imagesTaken');           
        const snapshot = await get(imagesTakenRef);
        if (snapshot.exists()) {
            console.log("d");
            const data = snapshot.val();
            Object.entries(data).forEach(([imageId,imageLink]) => {
                userGallery.push(imageLink);                        
            });
        }
        console.log(userGallery);
        return userGallery;
    }
}

// Loads list of books that users waitlisted for 
export function loadWaitlistedBoxes(user, setWaitlistedBoxes) {
    const waitlistRef = ref(db, `/users/${user.uid}/boxesWaitlisted`);
    const unsubscribe = onValue(waitlistRef, (snapshot) => {
        const keys = [];
        snapshot.forEach(childSnapshot => {
            keys.push(childSnapshot.key);
        });
        setWaitlistedBoxes(keys);
    });
    return unsubscribe;  // so caller can clean up listener
}

// Removes and adds book into waitlisted node when users waitlist or unwaitlists boxes 
export async function setWaitlistDb(userId,isWaitlisted,boxId){
    console.log(isWaitlisted);
    if (isWaitlisted){
        await set(ref(db, `/users/${userId}/boxesWaitlisted/${boxId}`), true);
    }
    else{
        await remove(ref(db, `/users/${userId}/boxesWaitlisted/${boxId}`));
    }
}

// Resets badges data daily 
export function checkDailyReset(user,userData) {
    console.log(user);
    if (user) {
        const now = Math.floor(Date.now() / 1000);
        const lastReset = userData.dailyBadges?.lastReset || 0;
        const secondsInADay = 86400;
        console.log(now - lastReset >= secondsInADay);

        if (now - lastReset >= secondsInADay) {
            // Reset daily trackers
            const pointDetailsRef = ref(db, 'users/' + user.uid + '/pointDetails/'+ now);
            set(pointDetailsRef, {
            dayPoints: userData.dailyBadges?.pointTrackerToday?.currentScore || 0
            });
            const badgesRef = ref(db, 'users/' + user.uid + '/dailyBadges');
            update(badgesRef, {
                    lastReset: now,
                    badgesCompleted:0,
                    signTrackerToday:
                    {
                        goal:Math.floor(Math.random() * 5)+1,
                        currentScore:0
                    },
                    wordTrackerToday:
                    {
                        goal:Math.floor(Math.random() * 10)+1,
                        currentScore:0
                    },                            
                    pointTrackerToday:
                    {
                        goal:Math.floor(Math.random() * 50)+1,
                        currentScore:0
                    },                        
                    bookTrackerToday:
                    {
                        goal:Math.floor(Math.random() * 10)+1,
                        currentScore:0
                    },  
            });
            console.log("Daily badges reset.");
            return true;
        } else {
            console.log("No need to reset badges yet.");
            return false;
        }
    }
};

// Handles logic when user spells a word correctly
export async function addSpellingScore(userId, addedScore) {
const userRef = ref(db, 'users/' + userId);
try {
    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
    console.error("User data not found.");
    return;
    }
    const currentData = snapshot.val();

    const currentPoints = currentData.points ?? 0;
    const wordsSpeltCorrectly = currentData.activityDetails?.wordsSpeltCorrectly ?? 0;

    const pointCurrentScore = currentData.dailyBadges?.pointTrackerToday?.currentScore ?? 0;
    const pointGoal = currentData.dailyBadges?.pointTrackerToday?.goal ?? 1;

    const wordCurrentScore = currentData.dailyBadges?.wordTrackerToday?.currentScore ?? 0;
    const wordGoal = currentData.dailyBadges?.wordTrackerToday?.goal ?? 1;

    const badgesCompleted = currentData.dailyBadges?.badgesCompleted ?? 0;

    console.log(badgesCompleted);
    let addedBadgesScore = 0;
    if (pointGoal==(pointCurrentScore+addedScore)){
        addedBadgesScore+=1;
    }
    if (wordGoal==(wordCurrentScore+addedScore)){
        addedBadgesScore+=1;
        
    }
    console.log(addedBadgesScore);

    const updates = {
    [`points`]: currentPoints + addedScore,
    [`activityDetails/wordsSpeltCorrectly`]: wordsSpeltCorrectly + addedScore,
    [`dailyBadges/pointTrackerToday/currentScore`]: pointCurrentScore + addedScore,
    [`dailyBadges/wordTrackerToday/currentScore`]: wordCurrentScore + addedScore,
    [`dailyBadges/badgesCompleted`]: badgesCompleted + addedBadgesScore
    };

    await update(userRef, updates);
    console.log("Data updated successfully!");

    } catch (error) {
        console.error("Error updating data:", error);
    }
}