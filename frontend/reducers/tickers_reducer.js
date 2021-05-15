import {
    RECEIVE_SINGLE_TICKER_QUOTE, 
    RECEIVE_SINGLE_TICKER_KEYSTAT, 
    RECEIVE_SINGLE_TICKER_COMPANY, 
    CLEAR_QUOTES, 
    RECEIVE_MULTI_TICKER_QUOTE, 
    RECEIVE_SINGLE_TICKER_HISTORICAL_QUOTE,
    } from '../actions/ticker_api'

import {RECEIVE_SINGLE_CURRENT_USER_ORDER, RECEIVE_NEW_USER_ORDER, RECEIVE_UPDATED_USER_ORDER, DELETE_USER_ORDER} from '../actions/user_transaction'

import {
    RECEIVE_SINGLE_TICKER_NEWS
} from '../actions/news_api'


const _nullQuote = Object.freeze({
    
})

const tickersReducer = (state = _nullQuote, action) => {
    Object.freeze(state)
    let newState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_SINGLE_TICKER_QUOTE: 
            const singleTickerQuote = {
                markPrice: action.quote.quote.latestPrice,
                changePercentage: (action.quote.quote.changePercent*2),
                companyName: action.quote.quote.companyName,
                intradayPrices: action.quote["intraday-prices"]
            }
            return Object.assign({}, newState, singleTickerQuote)
        case RECEIVE_SINGLE_TICKER_HISTORICAL_QUOTE: 
            const singleHistoricalQuote = {
                singleHistoricalQuote: action.quote
            }
            return Object.assign({}, newState, singleHistoricalQuote)
        case RECEIVE_MULTI_TICKER_QUOTE: 
            return action.quotes
        case RECEIVE_SINGLE_TICKER_KEYSTAT:
            const data = {
                marketcap: action.keyStat.marketcap,
                employees: action.keyStat.employees,
                peRatio: action.keyStat.peRatio,
                monthlyVolume: action.keyStat.avg30Volume,
                sharesOutstanding: action.keyStat.sharesOutstanding,
            }
            return Object.assign({}, newState, data)
        case RECEIVE_SINGLE_TICKER_COMPANY:
            const companyData = {
                exchange: action.company.exchange,
                zip: action.company.zip,
                phone: action.company.phone,
            }
            return Object.assign({}, newState, companyData)
        case RECEIVE_SINGLE_TICKER_NEWS:
            const news = {
                news: action.news.articles
            }
            return Object.assign({}, newState, news)
        case RECEIVE_SINGLE_CURRENT_USER_ORDER:
            const portfolioPercentage = {
                portfolioPercentage: action.payload.portfolioPercentage
            }
            return Object.assign({}, newState, portfolioPercentage)
        case RECEIVE_NEW_USER_ORDER:
            const portfolioPercentages = {
                portfolioPercentage: action.payload.portfolioPercentage
            }
            return Object.assign({}, newState, portfolioPercentages)
        case RECEIVE_UPDATED_USER_ORDER:
            const portfolioPercentagess = {
                portfolioPercentage: action.payload.portfolioPercentage
            }
            return Object.assign({}, newState, portfolioPercentagess)
        case DELETE_USER_ORDER:
            const portfolioPercentagesss = {
                portfolioPercentage: action.payload.portfolioPercentage
            }
            return Object.assign({}, newState, portfolioPercentagesss)
        case CLEAR_QUOTES:
            return _nullQuote
        default:
            return state
    }
}

export default tickersReducer