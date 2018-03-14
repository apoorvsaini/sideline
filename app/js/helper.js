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
        name: "",
        team_name: "",
        team_id: null,
        condition: 100,
        wins:0,
        losses:0,
        draws: 0
    }
});

// Check if logging in for the first time
var id = store.get('team_id');
if (id == null || id.length == 0) {
    id = Math.floor(Math.random() * 1000)+"-"+Math.floor(Math.random() * 2000)+"-"+Math.floor(Math.random() * 100)+"-"+Math.floor(Math.random() * 1000)+"-"+Math.floor(Math.random() * 2000);
    store.set('team_id',id);
    store.set('loggedin',true);
    console.log(store);
}

//reset match
currMatch.set('opp_name',"Opponent");
currMatch.set('self_venue',"home");
currMatch.set('opp_score',0);
currMatch.set('self_score',0);


var inGame = false;
var playerWithBall = "away_1"; //hold the id
var versus = ""; //user_id of opponent
var versus_color = "" //color of opponent


function saveName() {
    var teamName = $("#name_input").val();
    if ((teamName.trim()).length > 0) {
        store.set('name',teamName);
        $("#profile_area").hide();
        $("#profile_saved_area").hide();
        $("#profile_score_area").hide();
        var userScore = '<div id="profile_score_area"> W: '+store.get('wins')+' L: '+store.get('losses')+' D: '+store.get('draws')+' </div><button id="startMatch" style="display:none" onCLick="startMatch()">start</button>'
        $("#sidebar").append("<div id='profile_saved_area'>Welcome "+teamName+"!</div>"+userScore);
        trySubscribe();
    }
}

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
   
    var scoreCardDom = '<span class="team_name left_right_margin">'+store.get('name')+'</span> '+0+' : '+0+' <span class="team_name left_right_margin">'+currMatch.get('opp_name')+'</span></div>';

    if (currMatch.get('self_venue') == "away") {
        scoreCardDom = '<span class="team_name left_right_margin">'+currMatch.get('opp_name')+'</span> '+0+' : '+0+' <span class="team_name left_right_margin">'+store.get('name')+'</span></div>';
        document.querySelector("#score_card").innerHTML = "";
        document.querySelector("#score_card").innerHTML = scoreCardDom;
        if (inGame == false) {
            inGame = true;
            matchTimer = setInterval(awayTimeUpdate, 2000);

            //animate ball
            var top = $("#ball").position().top;
            var left = $("#ball").position().left;
            console.log(left);
            ballIncrement = 700/90;
            $("#ball").animate({ top: top, left: 680},180000);
        }
    }
    else {
        //update scorecard
        document.querySelector("#score_card").innerHTML = "";
        document.querySelector("#score_card").innerHTML = scoreCardDom;

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
}

function awayTimeUpdate() {
    timePassed += 1;
    if(timePassed >= 90) {
        updateMatchFromHost("MATCH ENDED",90);
        stopMatch();
    }
    $("#time_area").html(timePassed+"\'");
}

function updateMatchFromHost(msg,time) {
    //timePassed = time;
    var item = $("<div id='"+timePassed+"'>"+msg+"</div>").hide().fadeIn(1000);
    $("#commentary_box").append(item);
    var objDiv = document.getElementById("commentary_box");
    objDiv.scrollTop = objDiv.scrollHeight;
}

function updateMatch() {
    timePassed += 1;
    if(timePassed >= 90) {
        stopMatch();
    }

    $("#time_area").html(timePassed+"\'");
    
    //generate commentary
    var com = comment(); 

    // add to commentary and send update
    sendMatchUpdate(com,timePassed);
    var item = $("<div id='"+timePassed+"'>"+com+"</div>").hide().fadeIn(1000);
    $("#commentary_box").append(item);
    var objDiv = document.getElementById("commentary_box");
    objDiv.scrollTop = objDiv.scrollHeight;
}

function stopMatch(){
    clearInterval(matchTimer);
    inGame = false;
    var w = store.get('wins');
    var l = store.get('losses');
    var d = store.get('draws');
    //save stats
    if (currMatch.get('opp_score') < currMatch.get('self_score')) {
        store.set('wins', w+1);
    }
    else if (currMatch.get('opp_score') > currMatch.get('self_score')) {
        store.set('losses', l+1);
    }
    else if (currMatch.get('opp_score') == currMatch.get('self_score')) {
        store.set('draws', d+1);
    }

    //update score card
    var scoreUpdater = 'W: '+store.get('wins')+' L: '+store.get('losses')+' D: '+store.get('draws');
    $("#profile_score_area").html(scoreUpdater);

    //reset match
    currMatch.set('opp_name',"Opponent");
    currMatch.set('self_venue',"home");
    currMatch.set('opp_score',0);
    currMatch.set('self_score',0);
    endMatchConnection();
    inGame = false;
    $("#exit_btn").show();
    timePassed = 0;
}

function updateScore(team) {
    var selfScore = currMatch.get('self_score');
    var oppScore = currMatch.get('opp_score');
    var ven = currMatch.get('self_venue');

    var scoreCardDom = '<span class="team_name left_right_margin">'+store.get('name')+'</span> '+0+' : '+0+' <span class="team_name left_right_margin">'+currMatch.get('opp_name')+'</span></div>';
    if (team == 'self') {
        var confettiSettings = { target: 'confetti', max:10 };
        var confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

        setTimeout(stopConfetti, 5000);
        function stopConfetti() {
            confetti.clear();
        }

        currMatch.set('self_score',selfScore+1);
        if (ven == 'home') 
            scoreCardDom = '<span class="team_name left_right_margin">'+store.get('name')+'</span> '+(selfScore+1)+' : '+oppScore+' <span class="team_name left_right_margin">'+currMatch.get('opp_name')+'</span></div>';
        else 
            scoreCardDom = '<span class="team_name left_right_margin">'+currMatch.get('opp_name')+'</span> '+oppScore+' : '+(selfScore+1)+' <span class="team_name left_right_margin">'+store.get('name')+'</span></div>';
    }
    else {
        currMatch.set('opp_score',oppScore+1);
        if (ven == 'home') 
            scoreCardDom = '<span class="team_name left_right_margin">'+store.get('name')+'</span> '+selfScore+' : '+(oppScore+1)+' <span class="team_name left_right_margin">'+currMatch.get('opp_name')+'</span></div>';
        else 
            scoreCardDom = '<span class="team_name left_right_margin">'+currMatch.get('opp_name')+'</span> '+(oppScore+1)+' : '+selfScore+' <span class="team_name left_right_margin">'+store.get('name')+'</span></div>';
    }
    document.querySelector("#score_card").innerHTML = "";
    document.querySelector("#score_card").innerHTML = scoreCardDom;
}


function resetConnection() {
    $("#find_users").show();
    $("#exit_btn").hide();
    timePassed = 0;
    $("#commentary_box").html("");
    var top = $("#ball").position().top;
    var left = $("#ball").position().left;
    $("#ball").animate({ top: top, left: 0},1);
    pubnub.subscribe({
        channels: ['all',store.get('team_id')] 
    });
}