import {updateUser} from '../utils/user_transaction_util'
import {receiveCurrentUser} from './user_session'
import {createUserOrder, updateUserOrder, deleteUserOrder} from '../utils/user_transaction_util'

export const RECEIVE_USER_UPDATE_ERRORS = 'RECEIVE_USER_UPDATE_ERRORS'
export const RECEIVE_NEW_USER_ORDER = "RECEIVE_NEW_USER_ORDER"
export const RECEIVE_UPDATED_USER_ORDER = "RECEIVE_UPDATED_USER_ORDER"
export const DELETE_USER_ORDER = "DELETE_USER_ORDER"
export const CLEAR_USER_UPDATE_ERRORS = "CLEAR_USER_UPDATE_ERRORS" 

const receiveUserUpdateErrors = errors => ({
    type: RECEIVE_USER_UPDATE_ERRORS,
    errors
})

const receiveNewUserOrder = userOrder => ({
    type: RECEIVE_NEW_USER_ORDER,
    userOrder
})

const receiveUpdatedUserOrder = payload => ({
    type: RECEIVE_UPDATED_USER_ORDER,
    payload
})

const receiveDeleteUserOrder = (ticker) => ({
    type: DELETE_USER_ORDER,
    ticker
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

export const receiveNewOrderForm = newUserOrderForm => dispatch => (
    createUserOrder(newUserOrderForm).then(userOrder => dispatch(receiveNewUserOrder(userOrder)),
        err => (
            dispatch(receiveUserUpdateErrors(err.responseJSON))
        )
    )
)

export const updateUserOrderForm = (updatedUserOrderForm, user_buying_power) => dispatch => (
    updateUserOrder(updatedUserOrderForm, user_buying_power).then(payload => dispatch(receiveUpdatedUserOrder(payload))
    ,
        err => (
            dispatch(receiveUserUpdateErrors(err.responseJSON))
        )
    )
)

export const deleteUserOrderForm = (ticker, tickerId) => dispatch => (
    deleteUserOrder(tickerId).then(() => dispatch(receiveDeleteUserOrder(ticker)),
        err => (
            dispatch(receiveUserUpdateErrors(err.responseJSON))
        )
    )
)