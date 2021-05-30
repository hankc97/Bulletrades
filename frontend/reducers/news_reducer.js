import {RECEIVE_TOP_NEWS} from '../actions/news_api'

const _nullQuote = Object.freeze({

})

const newsReducer = (state = _nullQuote, action) => {
    Object.freeze(state)
    let newState = Object.assign({}, state)
    switch(action.type) {
        case RECEIVE_TOP_NEWS:
            return Object.assign({}, action.news)
        default:
            return state
    }
}

export default newsReducer