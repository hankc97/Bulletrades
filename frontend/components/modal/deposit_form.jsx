import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import {closeModal} from '../../actions/modal'
import {updateUser} from '../../actions/user_session'
import { Redirect } from 'react-router'

class DepositForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            newBuyingPower: 0,
            redirect: false,
        }

        this.handleAmount = this.handleAmount.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.updateUser(this.props.sessionId, {buying_power: this.state.newBuyingPower})
            .then(() => this.setState({newBuyingPower: 0, redirect: true}))
            .then(() => this.props.closeModal())
    }

    handleAmount(e) {
        e.preventDefault()
        this.setState({newBuyingPower: e.target.value})
    }

    render() {
        const {redirect} = this.state
        if (redirect) {
            return <Redirect to='/portfolio'/>;
        }
        return(
            <>
                <button onClick={() => this.props.closeModal()} className="close-btn">
                    <span className = "fa-times-button"><FontAwesomeIcon icon={faTimes} /></span>
                </button>
                <div className="deposit-form">
                    <header className="modal-title deposit-title">
                        <div>
                            <span>Deposit Funds</span>
                        </div>
                    </header>
                    <form >
                        <label>From
                            <div>
                                <select name="bank" disabled className="deposit-input">
                                    <option value="imgBank">Checking Account</option>
                                </select>
                            </div>
                        </label>
                        <label>Amount
                            <div>
                                <input 
                                    className="deposit-input" 
                                    type="text" 
                                    required autoComplete="off" 
                                    step="1" 
                                    onChange={this.handleAmount} 
                                    value= {this.state.newBuyingPower} 
                                    placeholder= "$0.00"/>
                            </div>
                        </label>
                        <button className = "deposit-form-button" onClick={this.handleSubmit}><span>Submit Funds</span></button>
                    </form>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    sessionId: state.session.id
})

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    updateUser: (id, buying_power) => dispatch(updateUser(id, buying_power))
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositForm)