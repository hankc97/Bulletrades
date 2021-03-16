import React from 'react'

class LoginFormUser extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleTextChange(type) {
        return e => this.setState({
            [type] : e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const user = Object.assign({}, this.state)
        this.props.loginUser(user)
    }

    renderErrors() {
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        )
    }

    render() {
        return(
            <div className = "login-page">
                <div className = "login-form-container">
                    <form onSubmit = {this.handleSubmit}>
                        <input 
                            type = "email"
                            placeholder = "Email"
                            value = {this.state.email}
                            onChange = {this.handleTextChange("email")}
                        />
                        <input 
                            type = "password"
                            placeholder = "Password"
                            value = {this.state.password}
                            onChange = {this.handleTextChange("password")}
                        />
                        <button>Sign In</button>
                    </form>
                </div>
                {this.renderErrors()}
            </div>
        )
    }



}

export default LoginFormUser