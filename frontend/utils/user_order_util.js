export const addTicker = (user_orders) => {
    return $.ajax({
        method: 'POST',
        url: 'api/user_orders',
        data: {user_orders}
    })
}

export const removeTicker = (userOrderId) => {
    return $.ajax({
        method: "DELETE",
        url: `api/user_orders/${userOrderId}`,
    })
}

export const fetchSingleCurrentUserTicker = (ticker) => {
    return $.ajax({
        method: "GET",
        url: `api/user_orders/${ticker}`
    })
}

export const fetchAllCurrentUserTickers = () => {
    return $.ajax({
        method: "GET",
        url: 'api/user_orders'
    })
}
