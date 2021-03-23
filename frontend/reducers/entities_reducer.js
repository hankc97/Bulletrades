import {combineReducers} from 'redux'
import userReducer from './user_reducer'
import tickersReducer from './tickers_reducer'

const entities = combineReducers({
    currentUser: userReducer,
    tickerQuotes: tickersReducer
})


export default entities