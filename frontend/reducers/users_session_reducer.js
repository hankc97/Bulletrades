import {RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER} from '../actions/user_session'

const _nullUser = Object.freeze({
    id: null
})

export default (oldState = _nullUser, action) => {
    Object.freeze(oldState)
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return { id: action.currentUser.id}
        case LOGOUT_CURRENT_USER:
            return _nullUser
        default: 
            return oldState
    }
}
