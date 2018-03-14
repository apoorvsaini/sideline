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
