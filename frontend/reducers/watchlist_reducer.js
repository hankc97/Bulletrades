import {
    RECEIVE_SINGLE_WATCHLIST,
    REMOVE_SINGLE_WATCHLIST,
    RECEIVE_ALL_WATCHLISTS,
    RECEIVE_ALL_WATCHLIST_API
} from '../actions/watchlist'

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
        default:
            return state
    }
}


