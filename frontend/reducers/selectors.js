export const formatOneDayTickerData = (intradayPricesArray) => {
    debugger
    if (intradayPricesArray) {
        return intradayPricesArray.map(price => (
            {time: price.minute, price: price.average}
        ))
    }
}