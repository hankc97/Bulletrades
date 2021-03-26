import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root'
import configureStore from './store/store'
import {requestMultiTickerQuote} from './actions/ticker_api'

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
    // window.requestMultiTickerQuote = requestMultiTickerQuote
    // window.receiveNewOrderForm = receiveNewOrderForm
    // window.updateUserOrderForm = updateUserOrderForm
    // window.createUserOrder = createUserOrder
    // window.updateUserOrder = updateUserOrder
    // window.deleteUserOrder = deleteUserOrder
    // window.fetchSingleTickerKeyStat = fetchSingleTickerKeyStat
    // window.requestSingleTickerQuote = requestSingleTickerQuote
    // window.fetchAllTickers = fetchAllTickers
    // window.fetchSingleTickerQuote = fetchSingleTickerQuote
    // window.logoutUser = logoutUser
    // window.addTicker = addTicker
    // window.removeTicker = removeTicker
    // window.fetchAllCurrentUserTickers = fetchAllTickers
    // window.updateUserForm = updateUserForm
    
})