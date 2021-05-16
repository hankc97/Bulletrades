import {
    fetchSingleTickerQuote, 
    fetchSingleTickerKeyStat, 
    fetchSingleTickerCompany, 
    fetchAllQuotes,
    fetchHistoricalTickerQuote
} from '../utils/api_util'


export const RECEIVE_SINGLE_TICKER_QUOTE = "RECEIVE_SINGLE_TICKER_QUOTE"
export const RECEIVE_SINGLE_TICKER_KEYSTAT = 'RECEIVE_SINGLE_TICKER_KEYSTAT'
export const RECEIVE_SINGLE_TICKER_COMPANY = "RECEIVE_SINGLE_TICKER_COMPANY"
export const RECEIVE_MULTI_TICKER_QUOTE = 'RECEIVE_MULTI_TICKER_QUOTE'
export const RECEIVE_SINGLE_TICKER_HISTORICAL_QUOTE = 'RECEIVE_SINGLE_TICKER_HISTORICAL_QUOTE'
export const CLEAR_QUOTES = "CLEAR_QUOTES"

const receiveSingleTickerQuote = (quote) => ({
    type: RECEIVE_SINGLE_TICKER_QUOTE,
    quote
})

const receiveMultiTickerQuote = (quotes) => ({
    type: RECEIVE_MULTI_TICKER_QUOTE,
    quotes
})

const receiveSingleTickerKeyStat = payload => ({
    type: RECEIVE_SINGLE_TICKER_KEYSTAT,
    payload
})

const receiveSingleTickerCompany = company => ({
    type: RECEIVE_SINGLE_TICKER_COMPANY,
    company
})

const receiveSingleTickerHistoricalQuote = quote => ({
    type: RECEIVE_SINGLE_TICKER_HISTORICAL_QUOTE,
    quote
})

export const requestSingleTickerQuote = (ticker) => (dispatch) => (
    fetchSingleTickerQuote(ticker).then((quote) => dispatch(receiveSingleTickerQuote(quote)))
)

export const requestMultiTickerQuote = (arrTickers) => dispatch => (
    fetchAllQuotes(arrTickers).then((quotes) => dispatch(receiveMultiTickerQuote(quotes)))
)

export const requestSingleTickerKeyStat = ticker => dispatch => (
    fetchSingleTickerKeyStat(ticker).then((keyStat) => {
        const payload = {tickerName: ticker, keyStat: keyStat}
        dispatch(receiveSingleTickerKeyStat(payload))})
)

export const requestSingleTickerCompany = ticker => dispatch => (
    fetchSingleTickerCompany(ticker).then((company) => dispatch(receiveSingleTickerCompany(company)))
)

export const requestSingleTickerHistoricalQuote = (ticker, date) => dispatch => (
    fetchHistoricalTickerQuote(ticker, date).then((quote) => dispatch(receiveSingleTickerHistoricalQuote(quote)))
)




