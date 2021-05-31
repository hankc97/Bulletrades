import React from 'react'
import { closeModal } from '../../actions/modal'
import { connect } from 'react-redux'
import DepositForm from './deposit_form'
import AddWatchlistForm from './add_watchlist_form'


function Modal({modal, closeModal}) {
    if (!modal) return null;
    let component;
    switch (modal) {
        case "deposit":
            component = <DepositForm />
            break;
        case "addWatchlist":
            component = <AddWatchlistForm/>
            break
        default:
            return null;
    }

    return (
        <div className={`modal-background-div ${modal}`} onClick={closeModal}>
            <div className={`modal-form-div ${modal}`} onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    )
}

const mSTP = state => {
    return {
        modal: state.ui,
    }
}

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal())
})

export default connect(mSTP, mDTP)(Modal);