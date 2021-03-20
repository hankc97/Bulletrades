import {updateUser} from '../utils/user_transaction_util'
import {receiveCurrentUser} from './user_session'

export const RECEIVE_USER_UPDATE_ERRORS = 'RECEIVE_USER_UPDATE_ERRORS'
export const CLEAR_USER_UPDATE_ERRORS = "CLEAR_USER_UPDATE_ERRORS" 

const receiveUserUpdateErrors = errors => ({
    type: RECEIVE_USER_UPDATE_ERRORS,
    errors
})

export const clearUserUpdateErrors = () => ({
    type: CLEAR_USER_UPDATE_ERRORS
})


export const updateUserForm = formUser => dispatch => (
    updateUser(formUser).then(currentUser => dispatch(receiveCurrentUser(currentUser)),
        err => (
            dispatch(receiveUserUpdateErrors(err.responseJSON))
        )
    )
)