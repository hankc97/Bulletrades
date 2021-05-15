import {
    createWatchlist,
    destroyWatchlist,
    updateWatchlist,
    getAllWatchlist
} from '../utils/watchlist_util'

import {fetchAllQuotes} from '../utils/api_util'

export const RECEIVE_ALL_WATCHLISTS = 'RECEIVE_ALL_WATCHLISTS'
export const RECEIVE_SINGLE_WATCHLIST = "RECEIVE_SINGLE_WATCHLIST"
export const REMOVE_SINGLE_WATCHLIST = 'REMOVE_SINGLE_WATCHLIST'
export const RECEIVE_ALL_WATCHLIST_API = 'RECEIVE_ALL_WATCHLIST_API'

const receiveSingleWatchlist = watchlist => ({
    type: RECEIVE_SINGLE_WATCHLIST,
    watchlist
})

const removeSingleWatchlist = id => ({
    type: REMOVE_SINGLE_WATCHLIST,
    id
})

const receiveAllWatchlist = watchlist => ({
    type: RECEIVE_ALL_WATCHLISTS,
    watchlist
})

const receiveAllWatchlistAPI = payload => ({
    type: RECEIVE_ALL_WATCHLIST_API,
    payload
})

export const requestCreateWatchlist = watchlist => dispatch => (
    createWatchlist(watchlist).then((watchlist) => dispatch(receiveSingleWatchlist(watchlist)))
)

export const requestUpdateWatchlist = (id, name) => dispatch => (
    updateWatchlist(id, name).then((watchlist) => dispatch(receiveSingleWatchlist(watchlist)))
)

export const requestDestroyWatchlist = id => dispatch => (
    destroyWatchlist(id).then(() => dispatch(removeSingleWatchlist(id)))
)

export const requestAllWatchlist = () => dispatch => (
    getAllWatchlist().then(payload => dispatch(receiveAllWatchlist(payload.watchlist)))
)

export const requestAllWatchlistAPI = (tickersArr) => dispatch => (
    fetchAllQuotes(tickersArr).then(payload => dispatch(receiveAllWatchlistAPI(payload)))
)
