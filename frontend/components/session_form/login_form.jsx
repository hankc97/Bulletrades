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
                <div className = "login-page-img">
                    <img aria-hidden="true" 
                        data-test-id="default-image" 
                        sizes="(min-width: 768px) 1440px, 720px" 
                        src="https://cdn.robinhood.com/assets/generated_assets/1e23d6b90f0d905b425ea289de345ab1.jpg" 
                        srcSet="https://cdn.robinhood.com/assets/generated_assets/1e23d6b90f0d905b425ea289de345ab1.jpg 720w, https://cdn.robinhood.com/assets/generated_assets/632fcb3e7ed928b2a960f3e003d10b44.jpg 1440w" 
                    />
                </div>
                
                <div className = "login-form-container">
                    <form className = "form-input" onSubmit = {this.handleSubmit}>
                        <h1 className = "h1-login">Welcome to Bulletrades</h1>
                        <p className = "emailoruser-login login-p">Email or Username</p>
                        <input 
                            type = "email"
                            placeholder = "Email"
                            value = {this.state.email}
                            onChange = {this.handleTextChange("email")}
                            className = "EPinput"
                        />
                        <p className = "password-login login-p">Password</p>
                        <input 
                            type = "password"
                            placeholder = "Password"
                            value = {this.state.password}
                            onChange = {this.handleTextChange("password")}
                            className = "EPinput"
                        />
                        <button className = "login-sign-button">Sign In</button>
                        {this.renderErrors()}
                    </form>
                </div>
            </div>
        )
    }



}

export default LoginFormUser