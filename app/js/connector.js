//help in maintaining the PubNub connections
var onlineUsers = {};
pubnub = new PubNub({
    publishKey : 'pub-c-4c8b4681-1768-4bd1-b251-964e22884f07',
    subscribeKey : 'sub-c-d487f296-2515-11e8-9bf4-060db84035e6'
})

var available = "yes";
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
        message : {"available":available,"id":store.get('team_id'),"name":store.get('name')}
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
        console.log(onlineUsers);
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
    //send a message
}