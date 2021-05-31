import {RECEIVE_TOP_NEWS, RECEIVE_SINGLE_TICKER_NEWS} from '../actions/news_api'

const _nullQuote = Object.freeze({

})

const newsReducer = (state = _nullQuote, action) => {
    Object.freeze(state)
    let newState = Object.assign({}, state)
    switch(action.type) {
        case RECEIVE_TOP_NEWS:
            if (!action.news.articles) {
                return Object.assign({}, action.news)
            } else {
                return Object.assign({}, action.news.articles)
            }
        case RECEIVE_SINGLE_TICKER_NEWS:
            if (!action.news.articles) {
                return Object.assign({}, action.news)
            } else {
                return Object.assign({}, action.news.articles)
            }
        default:
            return state
    }
}

export default newsReducer