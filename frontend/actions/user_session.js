import {signup, login, logout, fetchCurrentUserLifeTimeFormat, updateUserBuyingPower} from '../utils/user_session_util'

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER"
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER"
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'
export const CLEAR_ERRORS = "CLEAR_ERRORS" 
export const RECEIVE_CURRENT_USER_AND_FORMATTED_LIFETIME_TRADES = "RECEIVE_CURRENT_USER_AND_FORMATTED_LIFETIME_TRADES"
export const RECEIVE_UPDATED_USER = 'RECEIVE_UPDATED_USER' 

export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
})

export const receiveCurrentUserAndFormmatedLifetimeTrades = payload => ({
    type: RECEIVE_CURRENT_USER_AND_FORMATTED_LIFETIME_TRADES,
    payload
})

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
})

const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
})

const receiveUpdatedUser = payload => ({
    type: RECEIVE_UPDATED_USER,
    payload
})

export const clearErrors = () => ({
    type: CLEAR_ERRORS
})

export const fetchCurrentUserAndFormattedLifetimeTrades = (format) => dispatch => (
    fetchCurrentUserLifeTimeFormat(format).then(payload => dispatch(receiveCurrentUserAndFormmatedLifetimeTrades(payload)))
)

export const signupUser = formUser => dispatch => (
    signup(formUser).then(user => dispatch(receiveCurrentUser(user)), 
        err => (
            dispatch(receiveErrors(err.responseJSON))
        )
    )
)

export const loginUser = formUser => dispatch => (
    login(formUser).then(user => dispatch(receiveCurrentUser(user)),
        err => (
            dispatch(receiveErrors(err.responseJSON))
        )
    )
)

export const logoutUser = () => dispatch => (
    logout().then(() => dispatch(logoutCurrentUser()))
)

export const updateUser = (id, buying_power) => dispatch => {
    return(
        updateUserBuyingPower(id, buying_power).then((payload) => dispatch(receiveUpdatedUser(payload)))
    )
}