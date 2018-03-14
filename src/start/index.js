const Store = require('../store.js');
const store = new Store({
  configName: 'user-data',
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
var name = store.get('name');
console.log(store);

var loginDom = '<div id="profile_area"><input id="name_input" placeholder="Your Name"/><button id="login_btn" >Save Profile</button></div>';

if (name != '') loginDom = '<div id="profile_saved_area"> Welcome '+name+'!</div>';

var scoreCardDom = '<div id="score_card"> <span class="team_name left_right_margin">'+matchDetails.awayTeam+'</span> '+matchDetails.homeScore+' : '+matchDetails.awayScore+' <span class="team_name left_right_margin">'+matchDetails.homeTeam+'</span></div> <div id="field_area"></div>';


export const sidebar = () => {
  return '<div id="sidebar"><div id="header"><img src="../src/assets/img/sideline.png" height="70"/></div><div id="logo">SIDELINE \'18</div>'+loginDom+'</div><div id="playground"></div>';
};

export const playground = () => {
  return scoreCardDom;
};

export const field = () => {
  return '<div id="field"><div id="ball"></div></span></div><div id="commentry_area">LIVE COMMENTARY</div>';
};

export const bye = () => {
  return "See ya!";
};
  

  