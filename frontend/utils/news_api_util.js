const apiKey = "01744a7dce089caef33e66c6975cb640"

export const fetchNewsByTickerName = (tickerName) => {
    let newsData = sessionStorage.getItem(`${tickerName}`)
    if (newsData !== null) {
        return new Promise((resolve, reject) => resolve($.parseJSON(newsData)))
    } else {
        return $.ajax({
            url: `https://gnews.io/api/v4/search?q=${tickerName}&max=5&lang=en&country=us&sortby=publishedAt&to&token=${apiKey}`,
            method: "GET",
            success: function(data) {
                sessionStorage.setItem(`${tickerName}`, JSON.stringify(data.articles))
            }
        })
    }
}

export const fetchTopNews = () => {
    let newsData = sessionStorage.getItem('portfolio-news')
    if (newsData !== null) {
        return new Promise((resolve, reject) => resolve($.parseJSON(newsData)))
    } else {
        return $.ajax({
            url: `https://gnews.io/api/v4/top-headlines?topic=business&country=us&token=${apiKey}`,
            method: "GET",
            success: function(data) {
                sessionStorage.setItem('portfolio-news', JSON.stringify(data.articles))
            }
        })
    }
}
