import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const configureStore = () => (
    createStore(applyMiddleware(thunk,logger))
)

export default configureStore