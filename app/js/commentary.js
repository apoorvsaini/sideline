// The logic for randomized algo and generating commentary
var players = [1,2,3,4,5,6,7,8,9,10,11];
var ballHolder = "self"; // opponent for other player
var selfMorale = 100;
var opponentMorale = 100;
var selfEnergy = 100;
var opponentEnergy = 100;
var lastFiller = 0;

var basicStrings = ["MATCH STARTS","HALF TIME","MATCH ENDED"];
var events = ["foul","goal","miss","yellow","pass","cross","tackle","shoot","throwin"];
var goalEmotions = ["IT IS IN!","GOALLLL!!!","WHAT A STRIKE!","AMAZING GOAL!","OFF THE FAR POST AND IN TO THE NET!","FOUND THE BACK OF THE NET"]; //6
var matchEvents = ["PENALTY AWARDED!","CORNER KICK AWARDED","FREE KICK","A chance to score"];
var goalDescriptions = ["Chips over the goalkeeper","Shoots from 30 yards out","Tucks in beautifully","Dribbles past the defenders and shoots","Had a one on one with GK"]; //5
var goalMiss = ["Oooo! The ball goes wide","What a save by the goal-keeper","Defender comes in between and blocks the shot","Blocked by the goalie","Offside"]; //5
var fillers = ["keeps the possession","are playing an attacking game","are trying to create a chance","wins the possesion","\'s attackingkiller move","in defence mode"]; //5

function comment() {
    var action = "";
    var holderName = currMatch.get('opp_name');
    var pos = Math.floor(Math.random() * 10) % 2;
    if (pos == 0) { ballHolder = "self";  holderName = store.get('name');}
    else  {ballHolder = "opponent"; holderName = currMatch.get('opp_name');};


    if (ballHolder == 'self') {
        selfEnergy -= 1;
        opponentMorale -= 1;
    }
    else {
        opponentEnergy -= 1;
        selfMorale -= 1;
    }

    if (timePassed == 1) {
        return basicStrings[0];
    }
    else if (timePassed == 45) {
        return basicStrings[1];
    }
    else if (timePassed >= 90) {
        return basicStrings[2];
    }

    var actionNumber = Math.floor(Math.random() * 9);
    var act = events[actionNumber];
    var playerNumber = Math.floor(Math.random() * 10) + 1;

    switch(actionNumber){
        case 0:
            //foul
            return holderName+"\'s #"+playerNumber+" tries to tackle and it is a foul";
        case 1:
            //attempt to goal
            if (ballHolder == 'self') action = holderName+"\'s #"+playerNumber+" goes for a goal";
            else action = holderName+"\'s #"+playerNumber+" goes for a goal and";
            
            if (ballHolder == 'self') {
                if (selfMorale+selfEnergy >= opponentEnergy+opponentMorale) {
                    //Goal
                    return action += " "+goalEmotions[Math.floor(Math.random() * 5)]+" "+goalDescriptions[Math.floor(Math.random() * 4)];
                } 
                else return action += " "+goalMiss[Math.floor(Math.random() * 4)];
            }
            else {
                if (selfMorale+selfEnergy <= opponentEnergy+opponentMorale) {
                    //Goal
                    return action += " "+goalEmotions[Math.floor(Math.random() * 5)]+". "+goalDescriptions[Math.floor(Math.random() * 4)];
                } 
                else return action += " "+goalMiss[Math.floor(Math.random() * 4)];
            }
        default: return holderName+" "+fillers[Math.floor(Math.random() * 4)];
            
    }


}