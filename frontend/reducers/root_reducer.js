import {combineReducers} from 'redux'
import userSessionReducer from './users_session_reducer'
import entities from './entities_reducer'

const rootReducer = combineReducers({
    session: userSessionReducer,
    entities,
})

export default rootReducer

