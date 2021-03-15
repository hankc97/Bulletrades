import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root'
import configureStore from './store/store'
// import {signup} from './utils/user_session_util'

document.addEventListener('DOMContentLoaded', () => {
    let store;
    if (window.currentUser) {
        let preloadedState = {
            session: { id : window.currentUser.id },
            entities : {
                users: { [window.currentUser.id]: window.currentUser}
            }
        }

        store = configureStore(preloadedState)
        delete window.currentUser
    } else {
        store = configureStore()
    }

    ReactDOM.render(<Root store = {store}/>, document.getElementById("root"))
    
})