//help in maintaining the PubNub connections
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