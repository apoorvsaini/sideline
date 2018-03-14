var loginDom = '<button id="login_btn" >Login via Google</button>';

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
  

  