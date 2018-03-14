//help in maintaining the PubNub connections
var onlineUsers = {};
pubnub = new PubNub({
    publishKey : 'pub-c-4c8b4681-1768-4bd1-b251-964e22884f07',
    subscribeKey : 'sub-c-d487f296-2515-11e8-9bf4-060db84035e6'
})

var available = "yes";
var versus = "";
var requestFrom = "";
var versusName = "";
var requestCame = false;
var requestSent = false;
var match_channel = "";
var willHost = false;
if (inGame == true) {available = "no";}



function publishAvailableMessage() {
    $(".sk-folding-cube").show();
    
    var publishConfig = {
        channel : "all",
        message : {"available":available,"id":store.get('team_id'),"name":store.get('name')}
    }
    pubnub.publish(publishConfig, function(status, response) {
        console.log(status, response);
    })
}

function publishSingleAvailableMessage(id) {
    var publishConfig = {
        channel : id,
        message : {"arrange":false,"available":available,"id":store.get('team_id'),"name":store.get('name')}
    }
    pubnub.publish(publishConfig, function(status, response) {
        console.log(status, response);
    })
}

function arrangeMatch(id,channel) {
    var publishConfig = {
        channel : channel,
        message : {"arrange":true,"available":available,"id":store.get('team_id'),"name":store.get('name'),"channel":channel}
    }
    pubnub.publish(publishConfig, function(status, response) {
        console.log(status, response);
    })
}

function sendMatchUpdate(comment,time) {
    var publishConfig = {
        channel : match_channel,
        message : {"available":available,"id":store.get('team_id'),"name":store.get('name'),"channel":match_channel,"msg":comment,"time":time,"goal":""}
    }
    
    pubnub.publish(publishConfig, function(status, response) {
        console.log(status, response);
    })
}

function sendScoreUpdate(team) {
    console.log("sending goal!");
    var publishConfig = {
        channel : match_channel,
        message : {"available":available,"id":store.get('team_id'),"name":store.get('name'),"channel":match_channel,"msg":"","goal":team}
    }
    
    pubnub.publish(publishConfig, function(status, response) {
        console.log(status, response);
    })
}


function sendChat(msg) {
    var publishConfig = {
        channel : "chat",
        message : {"available":available,"sender":store.get('team_id'),"name":store.get('name'),"chat":msg,"msg":""}
    }
    
    pubnub.publish(publishConfig, function(status, response) {
        console.log(status, response);
    })
}


    
pubnub.addListener({
    status: function(statusEvent) {
        if (statusEvent.category === "PNConnectedCategory") {
            publishAvailableMessage();
        }
    },
    message: function(message) {
        if (message.channel == "all" && message.message.id != store.get('team_id')) {
            onlineUsers[message.message.id] = {};
            onlineUsers[message.message.id]['available'] = message.message.available;
            onlineUsers[message.message.id]['name'] = message.message.name;

            //update UI
            var userDom = "";
            if(onlineUsers.length > 0) {
                $(".sk-folding-cube").hide();
            }
            for (var k in onlineUsers) {
                if (onlineUsers[k]['available'] == "yes") {
                    userDom += '<div> '+onlineUsers[k]["name"]+' <button class="join_btn" id="'+k+'" onClick=\'connectToUser(\"'+k+'\",\"'+onlineUsers[k]["name"]+'\")\' >PLAY</button></div><br><br>';
                }
            }
            $("#user_list").html(userDom);
            publishSingleAvailableMessage(message.message.id);
        }

        if (match_channel != "" && "msg" in message.message && message.channel != "chat") {
            //score updates
            if (currMatch.get('self_venue') == 'away') {
                if (message.message.goal != "") {
                    console.log("New Message!!", message);
                    updateScore(message.message.goal);
                }
                else {
                    updateMatchFromHost(message.message.msg,message.message.time);
                }
            }
        }

        if (message.channel == "chat") {
            //chat
            var chatMsg = message.message.chat;
            var sender = message.message.sender;
            var senderName = message.message.name;
            //append to chat area
            $("#chat_area").append("<div><span class='sender_tag'>"+senderName+"</span>"+chatMsg+"</div><br>");
            var objDiv = document.getElementById("chat_area");
            objDiv.scrollTop = objDiv.scrollHeight;
        }

        if (message.channel == store.get('team_id')) {
            //check if the request is to arrange a match
            if (message.message.arrange == true && versus == message.message.id) {
                //got the request from same user that we chose
                requestCame = true;
                requestFrom = message.message.id;
                console.log("GOT MESSAGE BACK");
                startMatchSetup(message.message.id,message.message.name);
            }
            else if (message.message.arrange == true && versus == "") {
                requestCame = true;
                requestFrom = message.message.id;
                match_channel = message.message.channel;
            }
            else {
                onlineUsers[message.message.id] = {};
                onlineUsers[message.message.id]['available'] = message.message.available;
                onlineUsers[message.message.id]['name'] = message.message.name;

                //update UI
                var userDom = "";
                if(onlineUsers.length > 0) {
                    $(".sk-folding-cube").hide();
                }
                for (var k in onlineUsers) {
                    if (onlineUsers[k]['available'] == "yes") {
                        userDom += '<div> '+onlineUsers[k]["name"]+' <button class="join_btn" id="'+k+'"  onClick=\'connectToUser(\"'+k+'\",\"'+onlineUsers[k]["name"]+'\")\' >Play</button></div><br><br>';
                    }
                }
                $("#user_list").html(userDom);
            }
        }

    },
    presence: function(p) {
        // handle presence
        var uuid = p.uuid;
        console.log(uuid);
    }
})  
console.log("Subscribing..");
pubnub.subscribe({
    channels: ['all','chat',store.get('team_id')] 
});



function connectToUser(id,name) {
    $("#user_list").hide();
    $(".sk-folding-cube").show();

    if(requestSent == false) {
        //create a channel to join for match
        versus = id;
        requestSent = true;
        match_channel = id;
        
        if (requestCame == false && requestFrom != id) {
            arrangeMatch(id,match_channel);
        }
        else if (requestCame == true && requestFrom == id) {
            //start the match
            arrangeMatch(id,match_channel);
            startMatchSetup(match_channel,name);
        }
        
    }
}

function startMatchSetup(mc,name) {
    //send a msg to tell you are unavailable to others
    publishAvailableMessage();
    $(".sk-folding-cube").show();
    /*
    pubnub.subscribe({
        channels: [mc] 
    });
    */

    pubnub.unsubscribe({
        channels: ['all'] 
    });

    //check who us the host?
    if(mc.split("-")[0] > store.get('team_id').split("-")[0]) {
        //we are home
        currMatch.set('self_venue',"home");
    }
    else if (mc.split("-")[0] == store.get('team_id').split("-")[0]) {
        if (mc.split("-")[0]+mc.split("-")[1] > store.get('team_id').split("-")[0]+store.get('team_id').split("-")[1] ) {
            currMatch.set('self_venue',"home");
        }
    }
    else {
        //we are away
        currMatch.set('self_venue',"away");
    }
    currMatch.set('opp_name',name);

    //change the UI
    $("#find_users").hide();
    
    startMatch();
    available = "no"; //turn it back to yes after match ends
}


function endMatchConnection() {
    //clear the defaults
    $("#user_list").show();
    $(".sk-folding-cube").hide();
    requestCame = false;
    available = "yes";
    versus = "";
    requestFrom = "";
    versusName = "";
    requestCame = false;
    requestSent = false;
    match_channel = "";
    willHost = false;
    inGame = false;
    available = "yes";
}