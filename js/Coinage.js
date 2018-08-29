'use strict';

const COINAGE = deepFreeze({
    COPPER : 1,
    SILVER : 10,
    ELECTRUM : 50,
    GOLD : 100,
    PLATINUM : 1000
});

function getAsCoin(value, coinType = 'GOLD') {
    return value * COINAGE[coinType];
}
