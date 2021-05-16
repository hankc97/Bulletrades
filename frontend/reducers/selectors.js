
export const formatOneDayTickerData = (intradayPricesArray) => {
    if (intradayPricesArray) {
        return intradayPricesArray.map(price => (
            {time: price.minute, price: price.average}
        ))
    }
}

export const getTotalQuantityWithTotalAvgPrice = singleOrderArray => {
    if (singleOrderArray && Object.keys(singleOrderArray).length === 0 && singleOrderArray.constructor === Object) return
    singleOrderArray = Object.values(singleOrderArray)
    let totalQuantity = parseFloat(singleOrderArray[0][1])
    let totalAvgPrice = parseFloat(singleOrderArray[0][0])

    for (let i = 1; i < singleOrderArray.length; i++){
        const quantity = parseFloat(singleOrderArray[i][1])
        const avgPrice = parseFloat(singleOrderArray[i][0])
        totalAvgPrice = ((totalQuantity / (totalQuantity + quantity) * totalAvgPrice) + (quantity / (quantity + totalQuantity)) * avgPrice)
        totalQuantity += quantity
    }

    return [totalAvgPrice, totalQuantity]
}

export const formatToDisplayData = formattedTrades => {
    if (formattedTrades) {
        return formattedTrades.map(trade => {
            return {time: trade[1], price: trade[0]}
        })
    }
}

export const getMinAndMaxValueFromFormattedData = formattedTrades => {
    if (formattedTrades) {
        let max = 0
        let min = formattedTrades[0][0]
        for (let i = 0; i < formattedTrades.length; i++) {
            if ( max < parseFloat(formattedTrades[i][0]) ) {
                max = parseFloat(formattedTrades[i][0])
            }
            if ( min > parseFloat(formattedTrades[i][0])) {
                min = parseFloat(formattedTrades[i][0])
            }
        }
        return [min, max]
    }
}

export const getRecentTotalUserHoldings = formattedTrades => {
    if (formattedTrades) {
        return parseFloat(formattedTrades[formattedTrades.length - 1][0])
    }
}

export const getFormattedStartingAmount = formattedTrades => {
    if (formattedTrades) {
        return parseFloat(formattedTrades[0][0])
    }
}

export const setInitialEntityState = order => {
    if (order && Object.keys(order).length === 0 && order.constructor === Object) {
        return []
    }

    return Object.values(order)
}

export const setInitialEntityCurrentUser = user => {
    if (user && Object.keys(user).length === 0 && user.constructor === Object) {
        return {buyingPower: 0}
    }

    return user
}

export const setInitialEntityWatchlist = watchlist => {
    if (watchlist && Object.keys(watchlist).length === 0 && watchlist.constructor === Object) {
        return []
    }

    return watchlist
}

export const setInitAllWatchlistsProp = allWatchlists => {
    if (allWatchlists && Object.keys(allWatchlists).length === 0 && allWatchlists.constructor === Object) {
        return []
    }
    if (!allWatchlists) return []
    return allWatchlists.allWatchlistsProp
}

export const setInitCheckedWatchlistsProp = checkedWatchlists => {
    if (checkedWatchlists && Object.keys(checkedWatchlists).length === 0 && checkedWatchlists.constructor === Object) {
        return []
    }
    if (!checkedWatchlists) return []
    return checkedWatchlists.checkedWatchlistsProp
}