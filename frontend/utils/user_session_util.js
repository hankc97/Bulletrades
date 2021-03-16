export const signup = user => {
    return $.ajax({
        method: 'POST',
        url: '/api/user',
        data: {user}
    })
}

export const login = user => {
    return $.ajax({
        method: 'POST',
        url: '/api/sessions',
        data: {user}
    })
}

export const logout = () => {
    debugger
    return $.ajax({
        method: 'DELETE',
        url: '/api/sessions',
    })
}