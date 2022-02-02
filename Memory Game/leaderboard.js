import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, onValue, ref, child, get, onChildAdded, onChildChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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



const dataRef = ref(database,"users");
onChildAdded(dataRef,(data) => {
    //console.log(data.val());
    scoreArray.push(data.val());
    updateList(data.val().username, data.val().score);
})


console.log(scoreArray);

// onChildChanged(dataRef,(data) => {
//     console.log(data.val());
//     //updateList(data.val().username, data.val().score);
// })

// Array.prototype.slice.call(scoreboard.children)
//   .map(function (x) { return scoreboard.removeChild(x); })
//   .sort(function (x, y) { return /*logic */; })
//   .forEach(function (x) { scoreboard.appendChild(x); });

//---------------
//---------------
const updateList = (username,score) => {
    const li = document.createElement("li");
    li.innerHTML = `${username}: <span>${score}</span>`;
    if(username===currUser){
        li.classList.add("user-score");
    }
    scoreboard.appendChild(li);
};
