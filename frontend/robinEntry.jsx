import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root'
import configureStore from './store/store'
import {fetchUpdatedTickerWatchlistRelation, fetchShowTickerWatchlistRelation} from './utils/ticker_util'
import {getAllWatchlist} from './utils/watchlist_util'
import {createUserOrder} from './utils/user_transaction_util'
import {login, fetchUser,updateUserBuyingPower} from './utils/user_session_util'
import {fetchAllCurrentUserTickers} from './utils/user_order_util'
import {fetchNewsByTickerName, fetchTopNews} from "./utils/news_api_util"
import {fetchSingleTickerKeyStat, fetchSingleTickerCompany, fetchAllQuotes} from './utils/api_util'

document.addEventListener('DOMContentLoaded', () => {
    let store;
    if (window.currentUser) {
        let preloadedState = {
            session: { id : window.currentUser.id },
            entities : {
                currentUser: { [window.currentUser.id]: window.currentUser}
            }
        }

        store = configureStore(preloadedState)
        delete window.currentUser
    } else {
        store = configureStore()
    }

    ReactDOM.render(<Root store = {store}/>, document.getElementById("root"))

    window.getState = store.getState
    window.dispatch = store.dispatch
    // window.getAllWatchlist = getAllWatchlist
    // window.fetchShowTickerWatchlistRelation = fetchShowTickerWatchlistRelation
    // window.fetchUpdatedTickerWatchlistRelation = fetchUpdatedTickerWatchlistRelation
    window.fetchTopNews = fetchTopNews
})