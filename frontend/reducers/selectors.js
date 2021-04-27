export const formatOneDayTickerData = (intradayPricesArray) => {
    if (intradayPricesArray) {
        return intradayPricesArray.map(price => (
            {time: price.minute, price: price.average}
        ))
    }
}