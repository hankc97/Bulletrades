import {fetchSingleTickerQuote, fetchSingleTickerKeyStat, fetchSingleTickerCompany, fetchTickerQuotes} from '../utils/api_util'

export const RECEIVE_SINGLE_TICKER_QUOTE = "RECEIVE_SINGLE_TICKER_QUOTE"
export const RECEIVE_SINGLE_TICKER_KEYSTAT = 'RECEIVE_SINGLE_TICKER_KEYSTAT'
export const RECEIVE_SINGLE_TICKER_COMPANY = "RECEIVE_SINGLE_TICKER_COMPANY"
export const RECEIVE_MULTI_TICKER_QUOTE = 'RECEIVE_MULTI_TICKER_QUOTE'
export const CLEAR_QUOTES = "CLEAR_QUOTES"

const receiveSingleTickerQuote = (quote) => ({
    type: RECEIVE_SINGLE_TICKER_QUOTE,
    quote
})

const receiveMultiTickerQuote = (quotes) => ({
    type: RECEIVE_MULTI_TICKER_QUOTE,
    quotes
})

const receiveSingleTickerKeyStat = keyStat => ({
    type: RECEIVE_SINGLE_TICKER_KEYSTAT,
    keyStat
})

const receiveSingleTickerCompany = company => ({
    type: RECEIVE_SINGLE_TICKER_COMPANY,
    company
})

export const requestSingleTickerQuote = (ticker) => (dispatch) => (
    fetchSingleTickerQuote(ticker).then((quote) => dispatch(receiveSingleTickerQuote(quote)))
)

export const requestMultiTickerQuote = (arrTickers) => dispatch => (
    fetchTickerQuotes(arrTickers).then((quotes) => dispatch(receiveMultiTickerQuote(quotes)))
)

export const requestSingleTickerKeyStat = ticker => dispatch => (
    fetchSingleTickerKeyStat(ticker).then((keyStat) => dispatch(receiveSingleTickerKeyStat(keyStat)))
)

export const requestSingleTickerCompany = ticker => dispatch => (
    fetchSingleTickerCompany(ticker).then((company) => dispatch(receiveSingleTickerCompany(company)))
)




