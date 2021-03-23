import {RECEIVE_SINGLE_TICKER_QUOTE, CLEAR_QUOTES} from '../actions/ticker_api'

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
            // newState = {}
            return newState[action.quote.quote.symbol] = {
                markPrice: action.quote.quote.latestPrice,
                changePercentage: (action.quote.quote.changePercent*2),
                intradayPrices: action.quote["intraday-prices"]
            }
            // return newState
        case CLEAR_QUOTES:
            return _nullQuote
        default:
            return state
    }

}

export default tickersReducer