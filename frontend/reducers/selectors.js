
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