import {fetchSingleTickerQuote} from '../utils/api_util'

export const RECEIVE_SINGLE_TICKER_QUOTE = "RECEIVE_SINGLE_TICKER_QUOTE"
export const CLEAR_QUOTES = "CLEAR_QUOTES"

const receiveSingleTickerQuote = (quote) => ({
    type: RECEIVE_SINGLE_TICKER_QUOTE,
    quote
})

export const requestSingleTickerQuote = (ticker) => (dispatch) => (
    fetchSingleTickerQuote(ticker).then((quote) => dispatch(receiveSingleTickerQuote(quote)))
)

