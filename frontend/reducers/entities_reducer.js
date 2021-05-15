import {combineReducers} from 'redux'
import userReducer from './user_reducer'
import tickersReducer from './tickers_reducer'
import userOrdersReducer from './user_orders_reducer'
import watchlistReducer from './watchlist_reducer'

const entities = combineReducers({
    currentUser: userReducer,
    currentTickerPageQuote: tickersReducer,
    currentUserOrders: userOrdersReducer,
    watchlist: watchlistReducer,
})


export default entities