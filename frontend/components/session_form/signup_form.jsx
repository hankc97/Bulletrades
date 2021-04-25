import React from 'react'
import {Link} from 'react-router-dom'

class SignupFormContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleTextChange(type){
        return e => this.setState({
            [type] : e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const user = Object.assign({}, this.state)
        this.props.signupUser(user)
    }

    renderErrors() {
        return (
            <ul className = "signup-errors-container">
                {this.props.errors.map((error, i) => (
                    <li className = "signup-errors" key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        )
    }

    componentDidMount() {
        this.props.clearErrors()
    }

    render() {
        return (
            <div className = "signup-page">
                <div className = "signup-form-container">
                    <div className = "signup-page-header">
                        <h2>BulleTrades</h2><img className = "signup-page-logo" src = {window.btLogo}/>
                    </div>
                    <div className = "signup-page-mid-nav">
                        <h2 className = "signup-page-h2">Make Your Money Move</h2>
                        <h3 className = "signup-page-h3">Robinhood lets you invest in companies you love, commision-free</h3>
                    </div>
                    <h4 className = "signup-page-h4">Please enter your full legal name. Your legal name should match any form of government ID.</h4>
                    <form onSubmit = {this.handleSubmit} className = "form-div-signup">
                        <div className = "full-name-input">
                            <input 
                                type="text"
                                placeholder = "First Name"
                                value = {this.state.first_name}
                                onChange = {this.handleTextChange("first_name")}
                                className = "input-box-signup first-name-input"
                            />
                            <input 
                                type="text"
                                placeholder = "Last Name"
                                value = {this.state.last_name}
                                onChange = {this.handleTextChange("last_name")}
                                className = "input-box-signup last-name-input"
                            />
                        </div>
                        <div className = "email-password-button-signup">
                            <input 
                                type = "email"
                                placeholder = "Email"
                                value = {this.state.email}
                                onChange= {this.handleTextChange("email")}
                                className = "input-box-signup bottom-inputEP"
                            />
                            <input
                                type = "password"
                                placeholder = "Password (min. 10 characters)"
                                value = {this.state.password}
                                onChange = {this.handleTextChange("password")}
                                className = "input-box-signup bottom-inputEP"
                            />
                            <div className = "continue-login-buttons">
                                <button className = "continue-button">Continue</button>
                                <div className = "sign-up-login-link">
                                    <span className = "already-started">Already started?</span>
                                    <Link to = "/login" className = "login-button-signup" >Log in to complete your application</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                    {this.renderErrors()}
                </div>
                <div >
                    <img 
                        src = {window.signup_img}
                        className = "signup-page-img"
                    />
                </div>
            </div>
        )
    }   

}

export default SignupFormContainer