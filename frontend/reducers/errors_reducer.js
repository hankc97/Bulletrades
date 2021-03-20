import {combineReducers} from 'redux'
import session from './users_session_error_reducer'
import userTransaction from './users_transaction_error_reducer'

export default combineReducers({
    session,
    userTransaction
})

