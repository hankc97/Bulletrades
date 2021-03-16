import {combineReducer} from 'redux'
import userSessionReducer from 'user_session_reducer'

export default combineReducer({
    userSession: userSessionReducer
})