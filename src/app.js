import "./stylesheets/milligram.css";
import "./stylesheets/main.css";


import "./helpers/context_menu.js";
import "./helpers/external_links.js";


import electronGoogleOauth from 'electron-google-oauth';
import * as firebase from "firebase";
import { remote } from "electron";
import jetpack from "fs-jetpack";
import { sidebar, playground, field } from "./start/index";
import env from "env";


const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());
const Store = require('./store.js');
const store = new Store({
  configName: 'user-data2',
  defaults: {
    windowBounds: { width: 800, height: 600 },
    loggedin: false,
    name: "Apoorv",
    team_name: "",
    team_id: null,
    condition: 100,
    wins:0,
    losses:0,
    draws: 0
  }
});
const manifest = appDir.read("package.json", "json");

const osMap = {
  win32: "Windows",
  darwin: "macOS",
  linux: "Linux"
};

var config = {
  apiKey: "AIzaSyDt86KTRCTxrNqDnwdr1yQWGVABm2v2Vtk",
  authDomain: "sideline-bef00.firebaseapp.com",
  databaseURL: "https://sideline-bef00.firebaseio.com",
  projectId: "sideline-bef00",
  storageBucket: "",
  messagingSenderId: "102319615722"
};

//------Firebase Auth-------
//firebase.initializeApp(config);
//var provider = new firebase.auth.GoogleAuthProvider();
var loggedin = store.get('loggedin');

document.querySelector("#app").style.display = "block";
document.querySelector("#app").innerHTML = sidebar();
document.querySelector("#playground").innerHTML = playground();
document.querySelector("#field_area").innerHTML = field();


//------Click Listeners & state maintainers-------
store.set('loggedin',false);
document.querySelector("#login_btn").addEventListener("click", function(){
  
});


console.log(loggedin);
if (loggedin == false) {
  $("#login_btn").show();
}
else {
  $("#login_btn").hide();
}