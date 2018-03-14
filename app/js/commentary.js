// The logic for randomized algo and generating commentary
var players = [2,3,4,5,6,7,8,9,10,11];
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
var goalDescriptions = ["Chips over the goalkeeper","Shoots from 30 yards out","Collects the ball and tucks in beautifully","Dribbles past the defenders and shoots","Had a one on one with GK"]; //5
var goalMiss = ["Oooo! The ball goes wide","What a save by the goal-keeper","Defender comes in between and blocks the shot","Blocked by the goalie","Offside"]; //5
var fillers = ["keeps the possession","are playing an attacking game","are trying to create a chance","wins the possesion","\'s attackingkiller move","in defence mode"]; //5
var foulPlay = ["Foul play by","Dirty tackle by","Looks like a foul by","Ooo! Bad tackle by"] //4

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
        opponentEnergy += 30;
        opponentMorale += 20;
        selfEnergy += 30;
        selfMorale += 20;
        return basicStrings[1];
    }
    else if (timePassed >= 90) {
        return basicStrings[2];
    }

    var actionNumber = Math.floor(Math.random() * 9);
    var act = events[actionNumber];
    var playerNumber = Math.floor(Math.random() * 10) + 1;

    if (actionNumber == lastFiller) actionNumber += 1;
    lastFiller = actionNumber;

    switch(actionNumber){
        case 0:
            //foul
            return timePassed+"\' :"+holderName+"\'s #"+playerNumber+" tries to tackle and it is a foul";
        case 1:
            //attempt to goal
            if (ballHolder == 'self') action = timePassed+"\' :"+holderName+"\'s #"+playerNumber+" goes for a goal";
            else action = timePassed+"\' :"+holderName+"\'s #"+playerNumber+" goes for a goal and";
            
            if (ballHolder == 'self') {
                if (selfMorale+selfEnergy >= opponentEnergy+opponentMorale && selfEnergy >= 50) {
                    //Goal
                    selfMorale += 1; 
                    selfEnergy += 1;
                    opponentMorale -= 2; 
                    opponentEnergy -= 2;
                    updateScore('self');
                    return action += " "+goalEmotions[Math.floor(Math.random() * 6)]+" "+goalDescriptions[Math.floor(Math.random() * 4)];
                } 

                else return action += " "+goalMiss[Math.floor(Math.random() * 5)];
            }
            else {
                if (selfMorale+selfEnergy <= opponentEnergy+opponentMorale && opponentEnergy >= 50) {
                    //Goal
                    selfMorale -= 1; 
                    selfEnergy -= 1;
                    opponentMorale += 1; 
                    opponentEnergy += 1;
                    updateScore('opponent');
                    return action += " "+goalEmotions[Math.floor(Math.random() * 6)]+" "+goalDescriptions[Math.floor(Math.random() * 4)];
                } 
                else return action += " "+goalMiss[Math.floor(Math.random() * 5)];
            }
        case 2:
            //goal miss
            action = holderName+"\'s #"+playerNumber+" tries";
            return action += " "+goalMiss[Math.floor(Math.random() * 5)];
        case 3:
            //yellow 
            action = foulPlay[Math.floor(Math.random() * 4)]+" "+holderName+"\'s #"+playerNumber+". Its a YELLOW CARD";
            if (ballHolder == 'self') { selfMorale -= 1 }
            else { opponentMorale -= 1 }
            return action;
        case 4:
            //pass 
            action = "Nice pass by "+holderName+"\'s #"+playerNumber;
            return action;
        case 5:
            //cross 
            action = "Nice cross by "+holderName+"\'s #"+playerNumber;
            return action;
        case 6:
            //tackle 
            action = "Clean tackle "+holderName+"\'s #"+playerNumber;
            return action;
        case 7:
            //shoot 
            action = holderName+"\'s #"+playerNumber+" shoots! A great shot!";
            return action;
        case 8:
            //throw-in 
            action = holderName+" takes a throw-in";
            return action;
        default: return holderName+" "+fillers[Math.floor(Math.random() * 4)];
            
    }


}