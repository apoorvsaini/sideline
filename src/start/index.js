const Store = require('../store.js');
const store = new Store({
  configName: 'user-data',
  defaults: {
    windowBounds: { width: 800, height: 600 },
    loggedin: false,
    name: "",
    team_name: "",
    team_id: null,
    condition: 100,
    wins:0,
    losses:0,
    draws: 0
  }
});

const currMatch = new Store({
  configName: 'match-data',
  defaults: {
    opp_name: "Opponent",
    self_venue: "home",
    self_score: 0,
    opp_score: 0
  }
});

var name = store.get('name');
var opp_name = currMatch.get('opp_name');
var venue = currMatch.get('self_venue');
console.log(store);

var loginDom = '<div id="profile_area"><input id="name_input" placeholder="Your Team\'s Name"/><button id="login_btn" onClick="saveName()">Save Profile</button></div>';

var userScore = '<div id="profile_saved_area"> W: '+store.get('wins')+' L: '+store.get('losses')+' D: '+store.get('draws')+' </div><button id="startMatch" style="display:none" onCLick="startMatch()">start</button>';

if (name != '') loginDom = '<div id="profile_saved_area"> Welcome '+name+'!</div>';

var scoreCardDom = '<div id="score_card"> <span class="team_name left_right_margin">'+name+'</span> '+currMatch.get('self_score')+' : '+currMatch.get('opp_score')+' <span class="team_name left_right_margin">'+currMatch.get('opp_name')+'</span></div> <div id="field_area"></div>';

if(venue == 'away') {
  scoreCardDom = '<div id="score_card"> <span class="team_name left_right_margin">'+matchDetails.awayTeam+'</span> '+matchDetails.homeScore+' : '+matchDetails.awayScore+' <span class="team_name left_right_margin">'+matchDetails.homeTeam+'</span></div> <div id="field_area"></div>';
}



export const sidebar = () => {
  return '<div id="sidebar"><div id="header"><img src="../src/assets/img/sideline.png" height="70"/></div><div id="logo">SIDELINE \'18</div>'+loginDom+userScore+'</div><div id="playground"></div>';
};

export const playground = () => {
  return scoreCardDom;
};

export const field = () => {
  return '<div id="field"><div id="ball"></div></div><div id="time_area">0\'</div><div id="commentry_area"><div id="commentary_box"></div></div>';
};

export const bye = () => {
  return "See ya!";
};
  

  