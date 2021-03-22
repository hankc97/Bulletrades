import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root'
import configureStore from './store/store'
import {logoutUser} from './actions/user_session'
import {updateUserForm} from './actions/user_transaction'
import {addTicker, removeTicker, fetchAllCurrentUserTickers} from './utils/user_order_util'
import {fetchAllTickers} from './utils/ticker_util'
import {fetchSingleTickerQuote} from './utils/api_util'

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
    // window.fetchAllTickers = fetchAllTickers
    window.fetchSingleTickerQuote = fetchSingleTickerQuote
    // window.logoutUser = logoutUser
    // window.addTicker = addTicker
    // window.removeTicker = removeTicker
    // window.fetchAllCurrentUserTickers = fetchAllTickers
    // window.updateUserForm = updateUserForm
})