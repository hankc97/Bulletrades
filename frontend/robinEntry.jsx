import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root'
import configureStore from './store/store'
import {signupUser, logoutUser} from './actions/user_session'

document.addEventListener('DOMContentLoaded', () => {
    let store;
    if (window.currentUser) {
        let preloadedState = {
            session: { id : window.currentUser.id },
            entities : {
                currentUser: { [window.currentUser.id]: window.currentUser}
            }
        }

        store = configureStore(preloadedState)
        delete window.currentUser
    } else {
        store = configureStore()
    }

    ReactDOM.render(<Root store = {store}/>, document.getElementById("root"))

    window.getState = store.getState
    window.dispatch = store.dispatch
    window.signupUser = signupUser
    window.logoutUser = logoutUser
})