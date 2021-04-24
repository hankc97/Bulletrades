import React from 'react'

class LoginFormUser extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            passwordActive: true,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleActiveClick = this.handleActiveClick.bind(this)
    }

    handleTextChange(type) {
        return e => this.setState({
            [type] : e.target.value
        })
    }

    handleSubmit(e, demoUser) {
        e.preventDefault()
        let user;
        if (demoUser) {
            user = demoUser
        } else {
            user = Object.assign({}, this.state)
        }
        this.props.loginUser(user)
    }

    handleActiveClick(e) {
        e.preventDefault()
        if (this.state.passwordActive === true) {
            this.passwordType = ""
            this.setState({passwordActive: false}) 
        } else {
            this.passwordType = "password"
            this.setState({passwordActive: true})
        }
    }

    renderErrors() {
        return (
            <ul className = "login-errors-container">
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`} className = "login-errors">
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
        return(
            <div className = "login-page">
                <div >
                    <img
                        className = "login-page-img" 
                        aria-hidden="true" 
                        data-test-id="default-image" 
                        sizes="(min-width: 768px) 1440px, 720px" 
                        src="https://cdn.robinhood.com/assets/generated_assets/1e23d6b90f0d905b425ea289de345ab1.jpg" 
                        srcSet="https://cdn.robinhood.com/assets/generated_assets/1e23d6b90f0d905b425ea289de345ab1.jpg 720w, https://cdn.robinhood.com/assets/generated_assets/632fcb3e7ed928b2a960f3e003d10b44.jpg 1440w" 
                    />
                </div>
                <div className = "login-form-container">
                    <form className = "form-container" onSubmit = {this.handleSubmit}>
                        <div className = "form-input">
                            <h1 className = "h1-login">Welcome to Bulletrades</h1>
                            <p className = "emailoruser-login login-p">Email or Username</p>
                            <input 
                                type = "email"
                                value = {this.state.email}
                                onChange = {this.handleTextChange("email")}
                                className = "EPinput"
                            />
                            <button 
                                onClick = {this.handleActiveClick}
                                className = "icon-eye-button">
                                {(this.state.passwordActive) ? <i class='fas fa-eye'></i> : <i class='fas fa-eye-slash'></i>}
                            </button>
                            <p className = "password-login login-p">Password</p>
                            <input
                                type = {this.passwordType}
                                value = {this.state.password}
                                onChange = {this.handleTextChange("password")}
                                className = "EPinput"
                            />
                        </div>
                        <button className = "login-sign-button">Sign In</button>
                        <button className = "DEMO-login-button" 
                                onClick = {(e) => this.handleSubmit(e, {email: 'demo@yahoo.com', password : "password"})}
                        >Demo</button>
                    </form>
                    {this.renderErrors()}
                </div>
            </div>
        )
    }
}

export default LoginFormUser