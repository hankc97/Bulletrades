import {RECEIVE_CURRENT_USER} from '../actions/user_session'

const userReducer = (oldState = {}, action) => {
    Object.freeze(oldState)
    switch(action.type){
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, oldState, { [action.currentUser.id]: action.currentUser })
        default: 
            return oldState
    }
}

export default userReducer