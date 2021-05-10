import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root'
import configureStore from './store/store'
import {createUserOrder} from './utils/user_transaction_util'
import {login, fetchUser} from './utils/user_session_util'
import {fetchAllCurrentUserTickers} from './utils/user_order_util'
// import {fetchNewsByTickerName} from "./utils/news_api_util"
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
    // window.fetchAllCurrentUserTickers = fetchAllCurrentUserTickers
    // window.fetchAllQuotes = fetchAllQuotes
    // window.fetchUser = fetchUser
    // window.createUserOrder = createUserOrder
    // window.login = login
    // window.fetchSingleCurrentUserTicker = fetchSingleCurrentUserTicker
    // window.fetchNewsByTickerName = fetchNewsByTickerName
    // window.fetchSingleTickerKeyStat = fetchSingleTickerKeyStat
    // window.fetchSingleTickerCompany = fetchSingleTickerCompany
    // window.fetchHistoricalTickerQuote = fetchHistoricalTickerQuote
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