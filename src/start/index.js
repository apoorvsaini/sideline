var loginDom = '<button id="login_btn" onClick="test()">Login via Google</button>';

var scoreCardDom = '<div id="score_card"> <span class="team_name left_right_margin">'+matchDetails.awayTeam+'</span> '+matchDetails.homeScore+' : '+matchDetails.awayScore+' <span class="team_name left_right_margin">'+matchDetails.homeTeam+'</span></div> <div id="field_area"></div>';


export const sidebar = () => {
  return '<div id="sidebar"><div id="header"><img src="../src/assets/img/sideline.png" height="70"/></div><div id="logo">SIDELINE \'18</div>'+loginDom+'</div><div id="playground"></div>';
};

export const playground = () => {
  return scoreCardDom;
};

export const field = () => {
  return '<div id="field"><span id="away_1" class="player_away"><span id="ball"></span></span></div>';
};

export const bye = () => {
  return "See ya!";
};
  

  