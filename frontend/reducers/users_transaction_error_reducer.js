import {RECEIVE_USER_UPDATE_ERRORS, CLEAR_USER_UPDATE_ERRORS} from "../actions/user_transaction"

export default (state = [], action) => {
    Object.freeze(state)
    switch(action.type) {
        case RECEIVE_USER_UPDATE_ERRORS:
            if (action.errors) return action.errors
            if (!action.errors) return null
        case CLEAR_USER_UPDATE_ERRORS:
            return [];
        default:
            return state
    }
}