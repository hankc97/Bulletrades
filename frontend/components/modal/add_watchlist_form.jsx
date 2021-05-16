import React from 'react'
import { Redirect } from 'react-router'
import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes } from '@fortawesome/free-solid-svg-icons'
import {closeModal} from '../../actions/modal'
import {setInitAllWatchlistsProp, setInitCheckedWatchlistsProp} from '../../reducers/selectors'
import {requestUpdatedTickerWatchlistRelation} from "../../actions/ticker"

class AddWatchlistForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }

        this.checked = this.props.checkedWatchlistsProp ? this.props.checkedWatchlistsProp : []
        this.handleWatchlistSubmit = this.handleWatchlistSubmit.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleWatchlistSubmit(e) {
        e.preventDefault()

        const _watchlist_id = {_watchlist_id: this.checked}
        const ticker_name = this.props.tickerName

        this.props.requestUpdatedTickerWatchlistRelation(_watchlist_id, ticker_name)
            .then(() => this.setState({redirect: true}))
            .then(() => this.props.closeModal())
    }

    handleClick(e) {
        if (e.currentTarget.checked) {
            this.checked.push(parseInt(e.currentTarget.value))
        }

        if (!e.currentTarget.checked) {
            const index = this.checked.indexOf(parseInt(e.currentTarget.value))
            if (index > -1) {
                this.checked.splice(index, 1)
            }
        }
    }   

    render() {
        const {redirect} = this.state
        if (redirect) {
            return <Redirect to='/portfolio'/>;
        }

        const tickerName = this.props.tickerName
        return(
            <div className = "watchlist-modal-container">
                <div className = "add-to-lists-header">
                    <span>Add {tickerName} to Your Lists</span>
                    <FontAwesomeIcon icon = {faTimes} className = "x-watchlist-icon" onClick={() => this.props.closeModal()}/>
                </div>
                <form className = "checkbox-watchlists" onSubmit = {this.handleWatchlistSubmit}>
                    {
                        this.props.allWatchlistsProps.map((list) => (
                            <label className = "container" key = {list.id} >
                                <div className = "watchlist-description-checkbox">
                                    <p>{list.name}</p>
                                    <span>{list.numberOfItemsInList} items</span>
                                </div>
                                <input 
                                    type = "checkbox" 
                                    value = {list.id}
                                    defaultChecked = {(this.checked.includes(list.id)) ? true : false}
                                    onClick = {this.handleClick}
                                    />
                                <span  className ="checkmark"></span>
                            </label>
                        ))
                    }
                    <input className = "watchlist-form-submit-button" type = "submit" value = "Save Changes"/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    allWatchlistsProps: setInitAllWatchlistsProp(state.entities.watchlist),
    checkedWatchlistsProp: setInitCheckedWatchlistsProp(state.entities.watchlist),
    tickerName: state.entities.currentTickerPageQuote.tickerName,
})

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    requestUpdatedTickerWatchlistRelation: (_watchlist_id, ticker_name) => dispatch(requestUpdatedTickerWatchlistRelation(_watchlist_id, ticker_name))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddWatchlistForm)
