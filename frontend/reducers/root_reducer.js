import {combineReducers} from 'redux'
import userSessionReducer from './users_session_reducer'
import entities from './entities_reducer'
import errors from './errors_reducer'
import uiReducer from './modal_reducer'

const rootReducer = combineReducers({
    session: userSessionReducer,
    entities,
    errors,
    ui: uiReducer
})

export default rootReducer

