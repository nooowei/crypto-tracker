export const loadCoin = coins => ({
    type: 'LOAD_COIN',
    coins
})

export const loadUser = user => ({
    type: 'LOAD_USER',
    user
})

export const changeCurrency = currency => ({
    type: 'CHANGE_CURRENCY',
    currency
})

export const loadPriceHistory = hisData => ({
    type: 'LOAD_HISDATA',
    hisData
})

export const chgTimeFrame = timeFrame => ({
    type: 'CHG_TIMEFRAME',
    timeFrame
})

export const loadGraphData = graphData => ({
    type: 'LOAD_GRAPHDATA',
    graphData
})