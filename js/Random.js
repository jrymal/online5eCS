'use strict';

const DICE = deepFreeze({
    d4 : {
        min: 1,
        max: 4
    },
    d6 : {
        min: 1,
        max: 6
    },
    d8 : {
        min: 1,
        max: 8
    },
    d10 : {
        min: 1,
        max: 10
    },
    d12 : {
        min: 1,
        max: 12
    },
    d20 : {
        min: 1,
        max: 20
    }
});

const FRONT_HEAVY=deepFreeze({
    choose:function(value1, value2) {
        return value1;
    }          
})

const BELL=deepFreeze({
    choose:function(value1, value2) {
        return value1;
    }          
})

function getMax(die, count = 1) {
    return count * die.max;
}

function rollDie(die, count = 1) {
    let result = [];
    for(let i = 0; i < count; i++) {
        result.push(randomNumber(die.min, die.max));
    }
    return result;
}

function randomNumber(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function chooseFromList(list){
    return list && list.length > 0 ? list[randomNumber(0,list.length-1)] : null;
}

function chooseWeightedRange(distributionType, value1, value2){
    return distributionType.choose(value1, value2);
}
