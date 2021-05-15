export const createWatchlist = watchlist => (
    $.ajax({
        url: "api/watchlists",
        method: "POST",
        data: {watchlist}
    })
)

export const destroyWatchlist = id => (
    $.ajax({
        url: `api/watchlists/${id}`,
        method: "DELETE",
    })
)

export const updateWatchlist = (id, _name) => (
    $.ajax({
        url: `/api/watchlists/${id}`,
        method: "PATCH",
        data: {_name}
    })
)

export const getAllWatchlist = () => (
    $.ajax({
        url: 'api/watchlists',
        method: "GET"
    })
)