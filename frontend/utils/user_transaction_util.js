export const updateUser = user => {
    return $.ajax({
        url: `/api/users/${user.id}`,
        method: "PATCH",
        data: {user}
    })
} 

export const createUserOrder = (user_orders, user_buying_power) => {
    return $.ajax({
        url: `/api/user_orders`,
        method: "POST",
        data: {user_orders, user_buying_power}
    })
}

export const updateUserOrder = (user_orders, user_buying_power) => {
    return $.ajax({
        url: `api/user_orders/${user_orders.user_id}`,
        method: "PATCH",
        data: {user_orders, user_buying_power}
    })
}

export const deleteUserOrder = (ticker, mark_price) => {
    return $.ajax({
        url: `api/user_orders/${ticker}`,
        method: "DELETE",
        data: {mark_price}
    })
}