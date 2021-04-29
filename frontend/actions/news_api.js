import {
    fetchNewsByTickerName,
} from "../utils/news_api_util"

export const RECEIVE_SINGLE_TICKER_NEWS = "RECEIVE_SINGLE_TICKER_NEWS"

const receiveSingleTickerNews = (news) => ({
    type: RECEIVE_SINGLE_TICKER_NEWS,
    news
})

export const requestSingleTickerNews = tickerName => dispatch => {
    return fetchNewsByTickerName(tickerName).then(news => dispatch(receiveSingleTickerNews(news)))
}

