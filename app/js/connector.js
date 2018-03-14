//help in maintaining the PubNub connections
var onlineUsers = {};
pubnub = new PubNub({
    publishKey : 'pub-c-4c8b4681-1768-4bd1-b251-964e22884f07',
    subscribeKey : 'sub-c-d487f296-2515-11e8-9bf4-060db84035e6'
})

var available = "yes";
var versus = "";
var requestFrom = "";
var requestCame = false;
var requestSent = false;
var match_channel = "";
if (inGame == true) {available = "no";}

function publishAvailableMessage() {
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
        channel : id,
        message : {"arrange":true,"available":available,"id":store.get('team_id'),"name":store.get('name'),"channel":channel}
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
        console.log("New Message!!", message);
        if (message.channel == "all" && message.message.id != store.get('team_id')) {
            onlineUsers[message.message.id] = {};
            onlineUsers[message.message.id]['available'] = message.message.available;
            onlineUsers[message.message.id]['name'] = message.message.name;

            //update UI
            var userDom = "";
            for (var k in onlineUsers) {
                if (onlineUsers[k]['available'] == "yes") {
                    userDom += '<div> '+onlineUsers[k]["name"]+' <button onClick=\'connectToUser(\"'+k+'\")\' >Play</button></div>';
                }
            }
            $("#user_list").html(userDom);
            publishSingleAvailableMessage(message.message.id);
        }

        if (message.channel == store.get('team_id')) {
            //check if the request is to arrange a match
            if (message.message.arrange == true && versus == message.message.id) {
                //got the request from same user that we chose
                requestCame = true;
                requestFrom = message.message.id;
                startMatchSetup(message.message.channel);
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
                for (var k in onlineUsers) {
                    if (onlineUsers[k]['available'] == "yes") {
                        userDom += '<div> '+onlineUsers[k]["name"]+' <button onClick=\'connectToUser(\"'+k+'\")\' >Play</button></div>';
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
    channels: ['all',store.get('team_id')] 
});

function connectToUser(id) {
    if(requestSent == false) {
        //create a channel to join for match
        versus = id;
        requestSent = true;

        //send a message to id to join as visitor
        if (requestCame == false && requestFrom != id) {
            match_channel = store.get('team_id')+"_"+id;
            arrangeMatch(id,match_channel);
        }
        else if (requestCame == true && requestFrom == id) {
            //start the match
            startMatchSetup(match_channel);
        }
    }
}

function startMatchSetup(mc) {
    //start the match
    requestCame = false;
    available = "no";
    versus = "";
    requestFrom = "";
    requestCame = false;
    requestSent = false;
    match_channel = "";

    //send a msg to tell you are unavailable to others
    alert(mc);

    pubnub.unsubscribe({
        channels: ['all'] 
    });
}