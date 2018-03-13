import "./stylesheets/milligram.css";
import "./stylesheets/main.css";


import "./helpers/context_menu.js";
import "./helpers/external_links.js";
import "./helpers/user_details.js";
import "./helpers/match_details.js";

import electronGoogleOauth from 'electron-google-oauth';
import * as firebase from "firebase";
import { remote } from "electron";
import jetpack from "fs-jetpack";
import { sidebar,playground } from "./start/index";
import env from "env";

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());

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
firebase.initializeApp(config);
var provider = new firebase.auth.GoogleAuthProvider();


document.querySelector("#app").style.display = "block";
document.querySelector("#app").innerHTML = sidebar();
document.querySelector("#playground").innerHTML = playground();


//------Click Listeners-------
document.querySelector("#login_btn").addEventListener("click", function(){

});
