import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import {closeModal} from '../../actions/modal'

class DepositForm extends React.Component {
    constructor(props) {
        super(props)

        this.handleAmount = this.handleAmount.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
    }

    handleAmount(e) {
        e.preventDefault()
    }

    render() {
        return(
            <>
                <button onClick={() => this.props.closeModal()} className="close-btn">
                    <span><FontAwesomeIcon icon={faCoffee} /></span>
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
                                    <option value="imgBank">Imaginary Bank</option>
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
                                    onChange={e => handleAmount(e.target.value)} 
                                    value={this.props.currentUser.buyingPower} 
                                    placeholder="$0.00" />
                            </div>
                        </label>
                        <button onClick={this.handleSubmit}><span>Submit</span></button>
                    </form>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.entities.currentUser
})

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositForm)