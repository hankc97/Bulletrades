import React from 'react'
import { closeModal } from '../../actions/modal'
import { connect } from 'react-redux'
import DepositForm from './deposit_form'
// import AddToListsForm from '../auth/watchlist/watchlist_modal/add_to_lists_form';
// import AboutMe from '../splash/about_me';
// import EditForm from '../auth/dashboard/watchlist_index/watchlist_forms/edit_form';
// import DeleteForm from '../auth/dashboard/watchlist_index/watchlist_forms/delete_form';

function Modal({modal, closeModal}) {
    if (!modal) return null;
    let component;
    switch (modal) {
        // case "aboutMe":
        //     component = <AboutMe />;
        //     break;
        case "deposit":
            component = <DepositForm />
            break;
        // case (modal.match(/edit-list/) || {}).input:
        //     component = <EditForm id={modal.match(/[0-9]+/)[0]}/>;
        //     break;
        // case (modal.match(/delete-list/) || {}).input:
        //     component = <DeleteForm id={modal.match(/[0-9]+/)[0]}/>
        //     break;
        case (modal.match(/add-to-list/) || {}).input:
            component = <AddToListsForm tickerSymbol={modal.match(/add-to-list-(.*)/)[1]} />
            break;
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
    // watchlists: state.entities.watchlists
}

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal())
})

export default connect(mSTP, mDTP)(Modal);