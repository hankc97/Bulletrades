import {combineReducers} from 'redux'
import userReducer from './user_reducer'
import tickersReducer from './tickers_reducer'
import userOrdersReducer from './user_orders_reducer'

const entities = combineReducers({
    currentUser: userReducer,
    tickerQuotes: tickersReducer,
    userOrders: userOrdersReducer,
})


export default entities