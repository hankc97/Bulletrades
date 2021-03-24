import {RECEIVE_UPDATED_USER_ORDER, DELETE_USER_ORDER, RECEIVE_NEW_USER_ORDER} from '../actions/user_transaction' 

const userOrderReducer = (state = {}, action) => {
    Object.freeze(state)
    switch(action.type) {
        case RECEIVE_NEW_USER_ORDER:
            return Object.assign({}, state, action.userOrder)
        case RECEIVE_UPDATED_USER_ORDER:
            return Object.assign({}, state, action.payload.userOrder)
        case DELETE_USER_ORDER:
            const newState = Object.assign({}, state)
            delete newState[action.userOrder.ticker]
            return newState
        default: 
            return state
    }


}

export default userOrderReducer