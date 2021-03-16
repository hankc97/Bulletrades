import React from 'react'

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
            <ul>
                error
                {/* {this.props.er} */}
            </ul>
        )
    }

    render() {
        return (
            <div className = "signup-page">
                <div className = "login-form-container">
                    <form onSubmit = {this.handleSubmit} >
                        <div>
                            <input 
                                type="text"
                                placeholder = "First Name"
                                value = {this.state.first_name}
                                onChange = {this.handleTextChange("first_name")}
                            />
                            <input 
                                type="text"
                                placeholder = "Last Name"
                                value = {this.state.last_name}
                                onChange = {this.handleTextChange("last_name")}
                            />
                            <input 
                                type = "email"
                                placeholder = "Email"
                                value = {this.state.email}
                                onChange= {this.handleTextChange("email")}
                            />
                            <input
                                type = "password"
                                placeholder = "Password"
                                value = {this.state.password}
                                onChange = {this.handleTextChange("password")}
                            />

                            <button>Continue</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }   

}

export default SignupFormContainer