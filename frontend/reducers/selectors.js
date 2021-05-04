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

