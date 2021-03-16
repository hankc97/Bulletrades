import {combineReducers} from 'redux'
import userReducer from './user_reducer'

const entities = combineReducers({
    currentUser: userReducer
})


export default entities