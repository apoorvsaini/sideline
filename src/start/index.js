var matchDetails = {home: 0, away: 0, time: 0};

var loginDom = '<button id="login_btn" onClick="test()">Login via Google</button>';
var scoreCardDom = '<div id="score_card">'+matchDetails.home+' : '+matchDetails.away+'</div>';

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
  

  