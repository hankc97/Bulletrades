import React from 'react'

class Portfolio extends React.Component {

    render() {

        return(
            <div className = "portfolio-page-container">
                <PortfolioMainSection currentUser={this.props.currentUser} updateUser={this.props.updateUser} />
            </div>
        )
    }
}

class PortfolioMainSection extends React.Component {
    constructor(props) {
        super(props)

        this.state = this.props.currentUser

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            buyingPower: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.updateUser(this.state)
    }

    render() {
        const {currentUser} = this.props

        return(
            <div className = "portfolio-main-section-container">
                <div className = "portfolio-main-section-buyingpower">
                    <span>Buying Power</span>
                    <form onSubmit = {this.handleSubmit} className = "prop-input-form">
                        <input 
                            type = "text"
                            placeholder = {'Enter Buying Power Here...'}
                            onChange = {this.handleChange}
                        />
                        <button>submit</button>
                    </form>
                    <span>${currentUser.buyingPower}</span>
                </div>
            </div>
        )

    }


}


export default Portfolio