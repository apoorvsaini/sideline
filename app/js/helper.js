var matchDetails = {homeScore: 0, awayScore: 0, time: 0, awayTeam:"Chelsea FC", homeTeam:"Barcelona FC"};
var playerWithBall = "away_1"; //hold the id
var versus = ""; //user_id of opponent
var versus_color = "" //color of opponent

function shoot() {
    var elem = document.getElementById("ball");
   
    var left = 0;//$("#"+playerWithBall).position().left;
    var top = 0;//$("#"+playerWithBall).position().top;
    
    if ($("#"+playerWithBall).attr('class') == "player_away") {
        $("#ball").animate({ top: 150, left: 700},1200);
    }
    else {
        $("#ball").animate({ top: 150, left: -50},1200);
    }
}

function dribble() {
    var ball = document.getElementById("ball");
    var left = $("#"+playerWithBall).position().left;
    var top = $("#"+playerWithBall).position().top; 
    $("#ball").css({
        'left':left,
        'top': top
       });
    console.log(left+" "+top);
    //$("#ball").animate({ top: top, left: left},600);
    //$("#"+playerWithBall).animate({ top: top, left: left},1200);
}