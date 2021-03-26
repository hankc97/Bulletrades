import {RECEIVE_UPDATED_USER_ORDER, DELETE_USER_ORDER, RECEIVE_NEW_USER_ORDER, RECEIVE_ALL_CURRENT_USER_ORDERS} from '../actions/user_transaction' 

const userOrderReducer = (state = {}, action) => {
    Object.freeze(state)
    switch(action.type) {
        case RECEIVE_ALL_CURRENT_USER_ORDERS:
            return Object.assign({}, action.userOrders)
        case RECEIVE_NEW_USER_ORDER:
            return Object.assign({}, state, { [action.payload.userOrder.ticker.charAt(0).toLowerCase() + action.payload.userOrder.ticker.slice(1)] : action.payload.userOrder})
        case RECEIVE_UPDATED_USER_ORDER:
            if (action.payload.userOrder.quantity === 0) {
                const newState = Object.assign({}, state)
                delete newState[action.payload.userOrder.ticker.charAt(0).toLowerCase() + action.payload.userOrder.ticker.slice(1)]
                return newState
            }
            return Object.assign({}, state, { [action.payload.userOrder.ticker.charAt(0).toLowerCase() + action.payload.userOrder.ticker.slice(1)]: action.payload.userOrder})
        case DELETE_USER_ORDER:
            const newState = Object.assign({}, state)
            delete newState[action.ticker]
            return newState
        default: 
            return state
    }


}

export default userOrderReducer