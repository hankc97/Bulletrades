import {
    RECEIVE_SINGLE_WATCHLIST,
    REMOVE_SINGLE_WATCHLIST,
    RECEIVE_ALL_WATCHLISTS,
    RECEIVE_ALL_WATCHLIST_API
} from '../actions/watchlist'

import {
    RECEIVE_SHOW_TICKER_WATCHLIST_RELATION,
    RECEIVE_UPDATED_TICKER_WATCHLIST_RELATION
} from '../actions/ticker'

const _nullQuote = Object.freeze({
    
})

export default (state = _nullQuote, action)=> {
    Object.freeze(state)
    let newState = Object.assign({}, state)

    switch(action.type) {
        case RECEIVE_ALL_WATCHLISTS:
            const watchlistsBackend = {
                watchlistsBackend: action.watchlist
            }
            return Object.assign({}, newState, watchlistsBackend)
        case RECEIVE_ALL_WATCHLIST_API:
            const watchlistsAPI = {
                watchlistsAPI: action.payload
            }
            return Object.assign({}, newState, watchlistsAPI)
        case RECEIVE_SINGLE_WATCHLIST:
            const newWatchlist = 
                {
                    id : action.watchlist.id,
                    name: action.watchlist.name,
                    tickers: []
                }
            newState.watchlistsBackend.push(newWatchlist)
            return Object.assign({}, newState)
        case REMOVE_SINGLE_WATCHLIST:
            newState.watchlistsBackend.forEach((list, index) => {
                if (list.id === action.id) {
                    newState.watchlistsBackend.splice(index, 1)
                }
            })
            return Object.assign({}, newState)
        case RECEIVE_SHOW_TICKER_WATCHLIST_RELATION:
            const checkedWatchlistTickers = {
                allWatchlistsProp: action.payload.allWatchlists,
                checkedWatchlistsProp: action.payload.checkWatchlistsForCurrentTicker
            }
            return Object.assign({}, newState, checkedWatchlistTickers)
        case RECEIVE_UPDATED_TICKER_WATCHLIST_RELATION:
            return newState
        default:
            return state
    }
}


