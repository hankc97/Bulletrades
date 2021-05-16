import {
    fetchUpdatedTickerWatchlistRelation,
    fetchShowTickerWatchlistRelation
} from '../utils/ticker_util'

export const RECEIVE_SHOW_TICKER_WATCHLIST_RELATION = 'RECEIVE_SHOW_TICKER_WATCHLIST_RELATION'
export const RECEIVE_UPDATED_TICKER_WATCHLIST_RELATION = 'RECEIVE_UPDATED_TICKER_WATCHLIST_RELATION'

const receiveShowTickerWatchlistRelation = payload => ({
    type: RECEIVE_SHOW_TICKER_WATCHLIST_RELATION,
    payload
})

const receiveUpdatedTickersWatchlistRelation = () => ({
    type: RECEIVE_UPDATED_TICKER_WATCHLIST_RELATION
})

export const requestShowTickerWatchlistRelation = ticker_name => dispatch => (
    fetchShowTickerWatchlistRelation(ticker_name).then(payload => dispatch(receiveShowTickerWatchlistRelation(payload)))
)

export const requestUpdatedTickerWatchlistRelation = (_watchlist_id, ticker_name) => dispatch => (
    fetchUpdatedTickerWatchlistRelation(_watchlist_id, ticker_name).then(() => dispatch(receiveUpdatedTickersWatchlistRelation()))
)