const apiKey = "c28a79a750d449f7bc9b79d5d81c85f4"

export const fetchNewsByTickerName = (tickerName) => {
    return $.ajax({
        method: "GET",
        url: `https://newsapi.org/v2/everything?q=${tickerName}&pageSize=2&page=1&sortBy=publishedAt&apiKey=${apiKey}`
    })
}