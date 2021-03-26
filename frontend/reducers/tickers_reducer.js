import {RECEIVE_SINGLE_TICKER_QUOTE, RECEIVE_SINGLE_TICKER_KEYSTAT, RECEIVE_SINGLE_TICKER_COMPANY, CLEAR_QUOTES, RECEIVE_MULTI_TICKER_QUOTE} from '../actions/ticker_api'

// function nextIdGenerator(quote) {
//     if (quote.id === null) return 0
//     const maxId = quote.reduce((maxId, quote) => Math.max(quote.id, maxId), -1)
//     return maxId + 1
// }

const _nullQuote = Object.freeze({
    
})

const tickersReducer = (state = _nullQuote, action) => {
    Object.freeze(state)
    let newState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_SINGLE_TICKER_QUOTE: 
            return newState[action.quote.quote.symbol] = {
                markPrice: action.quote.quote.latestPrice,
                changePercentage: (action.quote.quote.changePercent*2),
                companyName: action.quote.quote.companyName,
                intradayPrices: action.quote["intraday-prices"]
            }
        case RECEIVE_MULTI_TICKER_QUOTE: 
            return action.quotes
        case RECEIVE_SINGLE_TICKER_KEYSTAT:
            const data = {
                marketcap: action.keyStat.marketCap,
                employees: action.keyStat.employees,
                nextEarningDate: action.keyStat.nextEarningDate,
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
        case CLEAR_QUOTES:
            return _nullQuote
        default:
            return state
    }
}

export default tickersReducer