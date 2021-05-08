import {RECEIVE_CURRENT_USER_AND_FORMATTED_LIFETIME_TRADES} from '../actions/user_session'
import {RECEIVE_UPDATED_USER_ORDER, RECEIVE_NEW_USER_ORDER, DELETE_USER_ORDER} from '../actions/user_transaction'

const userReducer = (oldState = {}, action) => {
    Object.freeze(oldState)
    switch(action.type){
        case RECEIVE_CURRENT_USER_AND_FORMATTED_LIFETIME_TRADES:
            return Object.assign({}, oldState, { 
                [action.payload.currentUser.id]: action.payload.currentUser, 
                formattedLifetimeTrades: action.payload.formattedLifetimeTrades
            })
        case RECEIVE_UPDATED_USER_ORDER:
            return Object.assign({}, oldState, { [action.payload.currentUser.id]: action.payload.currentUser})
        case RECEIVE_NEW_USER_ORDER:
            return Object.assign({}, oldState, { [action.payload.currentUser.id]: action.payload.currentUser})
        case DELETE_USER_ORDER:
            return Object.assign({}, oldState, { [action.payload.currentUser.id]: action.payload.currentUser})
        default: 
            return oldState
    }
}

export default userReducer