import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, onValue, ref, child, get  } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyB2l5uVoPrlYEsl2TK6Qg41jL_BqBok108",
    authDomain: "memory-game-2b89b.firebaseapp.com",
    databaseURL: "https://memory-game-2b89b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "memory-game-2b89b",
    storageBucket: "memory-game-2b89b.appspot.com",
    messagingSenderId: "677436643113",
    appId: "1:677436643113:web:9e9dce37835ddb04bbc938"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const lstorage = window.localStorage;
const currUser = lstorage.getItem("user");
//   console.log(currUser);

const scoreboard = document.getElementById("scoreboard"); 

//----get scores----
const db = getDatabase();
const scoreArray = [];
const getUIDS = () => {
    const uidRef = ref(db, 'users/');
    onValue(uidRef, (snapshot) => {
    const data = snapshot.val();
    for (var key in data) {
        getscores(key);
    }
    });
  }

  //-----TODO-FIX MULTIPLICATION AND FORMAT DATA

const getscores = (uid) => {
    const uidRef = ref(db, 'users/' + uid);
    onValue(uidRef, (snapshot) => {
    const data = snapshot.val().score;
    const name = snapshot.val().username;
    scoreArray.push({name,data});
    scoreArray.sort(function(a, b) { return a.data - b.data })
    scoreArray.forEach((el)=>{
        updateList(el.name,el.data);
    })
    console.log(scoreArray);
    });
}
getUIDS();
console.log(scoreArray);
//---------------
console.log(scoreArray.length)
//add sorting of scores
//---------------
const updateList = (username,score) => {
    const li = document.createElement("li");
    li.innerHTML = `${username}: <span>${score}</span>`;
    if(username===currUser){
        li.classList.add("user-score");
    }
    scoreboard.appendChild(li);
    //<li>lorem: <span>0min 2sec</span></li>
};

