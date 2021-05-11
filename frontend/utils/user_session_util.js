export const signup = user => {
    return $.ajax({
        method: 'POST',
        url: 'api/users',
        data: {user}
    })
}

export const login = user => {
    return $.ajax({
        method: 'POST',
        url: 'api/session',
        data: {user}
    })
}

export const logout = () => {
    return $.ajax({
        method: 'DELETE',
        url: 'api/session',
    })
}

export const fetchCurrentUserLifeTimeFormat = (format) => {
    return $.ajax({
        method: "GET",
        url: `/api/users/${format}`,
    })
}

export const updateUserBuyingPower = (id, buying_power) => {
    return $.ajax({
        method: "PATCH",
        url: `/api/users/${id}`,
        data: {buying_power}
    })
}