// The logic for randomized algo and generating commentary
var players = [1,2,3,4,5,6,7,8,9,10,11];
var ballHolder = "self"; // opponent for other player
var selfMorale = 10;
var opponentMorale = 10;
var selfEnergy = 100;
var opponentEnergy = 100;

var basicStrings = ["MATCH STARTS","HALF TIME","MATCH ENDED"];
var events = ["foul","goal","miss","yellow","pass","cross","tackle","shoot","throwin"];
var goalEmotions = ["IT IS IN!","GOALLLL!!!","WHAT A STRIKE!","AMAZING GOAL!","OFF THE FAR POST AND IN TO THE NET!","FOUND THE BACK OF THE NET"];
var matchEvents = ["PENALTY AWARDED!","CORNER KICK AWARDED","FREE KICK","A chance for"];
var goalDescriptions = ["chips over the goalkeeper","shoots from 30 yards out","tucks in beautifully","dribbles past the defenders and shoots","had a one on one with GK"];
var goalMiss = ["Oooo! The ball goes wide","What a save by the goal-keeper","Defender comes in between and blocks the shot","Blocked by the goalie","Offside"];
var fillers = ["keeps the possession","are playing a attacking game","are trying to create a chance","wins the possesion","killer move",""];

function comment() {
    var action = "";

    if (timePassed == 1) {
        action = basicStrings[0];
    }
    else if (timePassed == 45) {
        action = basicStrings[1];
    }
    else if (timePassed >= 90) {
        action = basicStrings[2];
    }


    // add to commentary

    // publish the message
    
}