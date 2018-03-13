var matchDetails = {homeScore: 0, awayScore: 0, time: 0, awayTeam:"Chelsea FC", homeTeam:"Barcelona FC"};

var loginDom = '<button id="login_btn" onClick="test()">Login via Google</button>';
var scoreCardDom = '<div id="score_card"> <span class="team_name left_right_margin">'+matchDetails.awayTeam+'</span> '+matchDetails.homeScore+' : '+matchDetails.awayScore+' <span class="team_name left_right_margin">'+matchDetails.homeTeam+'</span></div>';

export const greet = () => {
  return "Hello World!";
};

export const sidebar = () => {
  return '<div id="sidebar"><div id="header"><img src="../src/assets/img/sideline.png" height="70"/></div><div id="logo">SIDELINE \'18</div>'+loginDom+'</div><div id="playground"></div>';
};

export const playground = () => {
  return scoreCardDom;
};

export const bye = () => {
  return "See ya!";
};
  

  