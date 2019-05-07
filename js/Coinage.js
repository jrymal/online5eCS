'use strict';

const COINAGE = deepFreeze({
    PLATINUM : {shortName:"PP", value: 1000},
    GOLD : {shortName:"GP", value: 100},
    ELECTRUM : {shortName: "EP", value: 50},
    SILVER : {shortName:"SP", value: 10},
    COPPER : {shortName:"CP", value: 1}
});

const COIN_BY_VALUE = deepFreeze(["PLATINUM", "GOLD", "ELECTRUM", "SILVER", "COPPER"]);

function getAsCoin(value, coinType = 'GOLD') {
    return +value * COINAGE[coinType].value;
}

function renderCoin(totalValue) {
    let divValue = totalValue;

    let render = "";
    for(let coinIter in COIN_BY_VALUE){
        let coinObj = COINAGE[COIN_BY_VALUE[coinIter]];
        let value = Math.floor(divValue / coinObj.value);
        if (value > 0 ) {
            if (render !== ""){
                render += ", ";
            }
            render += value+" "+coinObj.shortName;
            divValue = divValue % coinObj.value;
        }
    }

    return render;
}
