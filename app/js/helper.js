const currMatch = new Store({
    configName: 'match-data',
    defaults: {
      opp_name: "Opponent",
      self_venue: "home",
      self_score: 0,
      opp_score: 0
    }
  });

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

var inGame = false;

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

var matchTimer = null;
var timePassed = 0;
var totalWidth = 0;
var ballIncrement = 0;
function startMatch() {
    //update timer
    if (inGame == false) {
        inGame = true;
        matchTimer = setInterval(updateMatch, 2000);

        //animate ball
        var top = $("#ball").position().top;
        var left = $("#ball").position().left;
        console.log(left);
        ballIncrement = 700/90;
        $("#ball").animate({ top: top, left: 680},180000);
    }
}

function updateMatch() {
    timePassed += 1;
    if(timePassed >= 90) {
        stopMatch();
    }

    $("#time_area").html(timePassed+"\'");
    
    //generate commentary
    var com = comment(); 
    // add to commentary
    $("#commentary_box").append("<div>"+com+"</div>");
    var objDiv = document.getElementById("commentary_box");
    objDiv.scrollTop = objDiv.scrollHeight;
}

function stopMatch(){
    clearInterval(matchTimer);
    inGame = false;
}

function updateScore() {
    console.log("yo");
    var scoreCardDom = '<span class="team_name left_right_margin">'+store.get('name')+' FC</span> '+1+' : '+2+' <span class="team_name left_right_margin">'+currMatch.get('opp_name')+' FC</span></div>';
    document.querySelector("#score_card").innerHTML = "";
    document.querySelector("#score_card").innerHTML = scoreCardDom;
}

  
pubnub = new PubNub({
    publishKey : 'pub-c-4c8b4681-1768-4bd1-b251-964e22884f07',
    subscribeKey : 'sub-c-d487f296-2515-11e8-9bf4-060db84035e6'
})
    
function publishSampleMessage() {
    var publishConfig = {
        channel : "hello_world",
        message : "Hello from PubNub Docs!"
    }
    pubnub.publish(publishConfig, function(status, response) {
        console.log(status, response);
    })
}
    
pubnub.addListener({
    status: function(statusEvent) {
        if (statusEvent.category === "PNConnectedCategory") {
            publishSampleMessage();
        }
    },
    message: function(message) {
        console.log("New Message!!", message);
    },
    presence: function(presenceEvent) {
        // handle presence
    }
})      
console.log("Subscribing..");
pubnub.subscribe({
    channels: ['all'] 
});
