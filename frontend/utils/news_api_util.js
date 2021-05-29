const apiKey = "01744a7dce089caef33e66c6975cb640"


export const fetchNewsByTickerName = (tickerName) => {
    return $.ajax({
        method: "GET",
        url: `https://newsapi.org/v2/everything?q=${tickerName}&pageSize=2&page=1&sortBy=publishedAt&apiKey=${apiKey}`
    })
}

export const fetchTopNews = () => {
    let newsData = sessionStorage.getItem('news')
    if (newsData !== null) {
        return new Promise((resolve, reject) => resolve($.parseJSON(newsData)))
    } else {
        return $.ajax({
            url: `https://gnews.io/api/v4/top-headlines?token=${apiKey}`,
            method: "GET",
            success: handleData
        })
    }
}

const handleData = (data) => {
    sessionStorage.setItem("news", JSON.stringify(data.articles))
}