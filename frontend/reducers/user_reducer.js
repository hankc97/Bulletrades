import {RECEIVE_CURRENT_USER} from '../actions/user_session'
import {RECEIVE_UPDATED_USER_ORDER} from '../actions/user_transaction'
import {RECEIVE_NEW_USER_ORDER} from '../actions/user_transaction'

const userReducer = (oldState = {}, action) => {
    Object.freeze(oldState)
    switch(action.type){
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, oldState, { [action.currentUser.id]: action.currentUser })
        case RECEIVE_UPDATED_USER_ORDER:
            return Object.assign({}, oldState, { [action.payload.currentUser.id]: action.payload.currentUser})
        case RECEIVE_NEW_USER_ORDER:
            return Object.assign({}, oldState, { [action.payload.currentUser.id]: action.payload.currentUser})
        default: 
            return oldState
    }
}

export default userReducer