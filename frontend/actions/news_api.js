import {
    fetchNewsByTickerName,
    fetchTopNews
} from "../utils/news_api_util"

export const RECEIVE_SINGLE_TICKER_NEWS = "RECEIVE_SINGLE_TICKER_NEWS"
export const RECEIVE_TOP_NEWS = "RECEIVE_TOP_NEWS"

const receiveSingleTickerNews = (news) => ({
    type: RECEIVE_SINGLE_TICKER_NEWS,
    news
})

const receiveTopNews = news => ({
    type: RECEIVE_TOP_NEWS,
    news
})

export const requestSingleTickerNews = tickerName => dispatch => {
    return fetchNewsByTickerName(tickerName).then(news => dispatch(receiveSingleTickerNews(news)))
}

export const requestTopNews = () => dispatch => {
    return fetchTopNews().then(news => dispatch(receiveTopNews(news)))
}

