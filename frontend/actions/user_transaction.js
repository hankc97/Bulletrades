import {updateUser} from '../utils/user_transaction_util'
import {receiveCurrentUser} from './user_session'
import {createUserOrder, updateUserOrder, deleteUserOrder} from '../utils/user_transaction_util'
import {fetchSingleCurrentUserTicker, fetchAllCurrentUserTickers} from '../utils/user_order_util'

export const RECEIVE_ALL_CURRENT_USER_ORDERS = "RECEIVE_ALL_CURRENT_USER_ORDERS" 
export const RECEIVE_SINGLE_CURRENT_USER_ORDER = "RECEIVE_SINGLE_CURRENT_USER_ORDER"
export const RECEIVE_USER_UPDATE_ERRORS = 'RECEIVE_USER_UPDATE_ERRORS'
export const RECEIVE_NEW_USER_ORDER = "RECEIVE_NEW_USER_ORDER"
export const RECEIVE_UPDATED_USER_ORDER = "RECEIVE_UPDATED_USER_ORDER"
export const DELETE_USER_ORDER = "DELETE_USER_ORDER"
export const CLEAR_USER_UPDATE_ERRORS = "CLEAR_USER_UPDATE_ERRORS" 

const receiveUserUpdateErrors = errors => ({
    type: RECEIVE_USER_UPDATE_ERRORS,
    errors
})

const receiveSingleUserOrder = singleOrderArray => ({
    type: RECEIVE_SINGLE_CURRENT_USER_ORDER,
    singleOrderArray
})

const receiveAllUserOrders = userOrders => ({
    type: RECEIVE_ALL_CURRENT_USER_ORDERS,
    userOrders
})

const receiveNewUserOrder = payload => ({
    type: RECEIVE_NEW_USER_ORDER,
    payload
})

const receiveUpdatedUserOrder = payload => ({
    type: RECEIVE_UPDATED_USER_ORDER,
    payload
})

const receiveDeleteUserOrder = (payload) => ({
    type: DELETE_USER_ORDER,
    payload
})

export const clearUserUpdateErrors = () => ({
    type: CLEAR_USER_UPDATE_ERRORS
})


export const receiveSingleCurrentUserOrders = ticker => dispatch => (
    fetchSingleCurrentUserTicker(ticker).then(singleOrderArray => dispatch(receiveSingleUserOrder(singleOrderArray)),
        err => (
            dispatch(receiveUserUpdateErrors(err.responseJSON))
        )
    )
)

export const receiveAllCurrentUserOrders = () => dispatch => (
    fetchCurrentUserOrders().then(userOrders => dispatch(receiveAllUserOrders(userOrders)),
        err => (
            dispatch(receiveUserUpdateErrors(err.responseJSON))
        )
    )
)

export const updateUserForm = formUser => dispatch => (
    updateUser(formUser).then(currentUser => dispatch(receiveCurrentUser(currentUser)),
        err => (
            dispatch(receiveUserUpdateErrors(err.responseJSON))
        )
    )
)

export const createNewOrderForm = (newUserOrderForm, user_buying_power) => dispatch => (
    createUserOrder(newUserOrderForm, user_buying_power).then(payload => dispatch(receiveNewUserOrder(payload)),
        err => (
            dispatch(receiveUserUpdateErrors(err.responseJSON))
        )
    )
)

export const updateUserOrderForm = (updatedUserOrderForm, user_buying_power) => dispatch => (
    updateUserOrder(updatedUserOrderForm, user_buying_power).then(payload => dispatch(receiveUpdatedUserOrder(payload)),
        err => (
            dispatch(receiveUserUpdateErrors(err.responseJSON))
        )
    )
)

export const deleteUserOrderForm = (ticker, markPrice) => dispatch => (
    deleteUserOrder(ticker, markPrice).then((payload) => dispatch(receiveDeleteUserOrder(payload)),
        err => (
            dispatch(receiveUserUpdateErrors(err.responseJSON))
        )
    )
)