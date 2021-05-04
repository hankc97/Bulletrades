import React from 'react'
import Shares from './share_dollar_container.jsx/share'

class SideBarContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            saleType: "Buy",
            selectedShareOrDollar: "Shares",
        }

        this.buyButton = React.createRef()
        this.sellButton = React.createRef()

        this.handleSelectChange = this.handleSelectChange.bind(this)
    }

    componentDidMount() {
        this.saleType()
    }

    componentDidUpdate(prevProps) {
        this.saleType()
        if ( prevProps !== this.props) {
            if (this.props.currentUserOrder){
                this.setState({hasTicker: true})
                this.sellButton.current.classList.remove('hide')
            } else {
                this.setState({hasTicker: false})
                this.sellButton.current.classList.add('hide')
            }
        }
        // loading end
    }

    saleType() {
        let buyButton = this.buyButton.current
        let sellButton = this.sellButton.current

        if (this.state.saleType === "Buy") {
            buyButton.classList.add('greenHighlight')
            sellButton.classList.remove('greenHighlight')
        }

        if (this.state.saleType === "Sell") {
            sellButton.classList.add('greenHighlight')
            buyButton.classList.remove('greenHighlight')
        }

    }

    handleSelectChange(e) {
        e.preventDefault()
        
        if (e.target.value === "Shares") {
            this.setState({selectedShareOrDollar: "Shares"})
        } else {
            this.setState({selectedShareOrDollar: "Dollars"})
        }

    }

    render() {
        let ShareOrDollarContainer;
        if (this.state.selectedShareOrDollar === "Shares") {
            ShareOrDollarContainer = <Shares 
                                        markPrice = {this.props.markPrice} 
                                        saleType = {this.state.saleType}
                                        userOrders = {this.props.userOrders} 
                                        currentUser = {this.props.currentUser}
                                        currentUserOrder = {this.props.currentUserOrder}
                                        createOrder = {this.props.createOrder}
                                        hasTicker = {this.state.hasTicker}
                                        tickerName = {this.props.tickerName}
                                        updateOrder = {this.props.updateOrder}
                                        />
        }
        if (this.state.selectedShareOrDollar === "Dollars") {
            ShareOrDollarContainer = ""
        }

        return(
            <div className = "sidebar-ticker-container">
                <div className = "order-execution-container">
                    <div className = "outer-top-div-container">   
                        <div className = "buy-sell-buttons">
                            <button ref = {this.buyButton} 
                                    onClick = {() => this.setState({saleType: "Buy"})}
                                    >Buy {this.props.tickerName}</button>
                            <button 
                                    ref = {this.sellButton} 
                                    className = "hide"
                                    onClick = {() => this.setState({saleType: "Sell"})}
                                    >Sell {this.props.tickerName}</button>
                        </div>
                        <div className = "share-dollar-select">
                            <label>Invest In</label>
                            <select onChange = {this.handleSelectChange} value = {this.state.selectedShareOrDollar}>
                                <option className = "options" value = "Shares">Shares</option>
                                <option className = "options" value = "Dollars">Dollars</option>
                            </select>
                        </div>
                    </div>
                    {ShareOrDollarContainer}
                    <div className = "buying-power-text-container">
                        <span>${this.props.currentUser.buyingPower} Buying Power Available</span>
                    </div>
                </div>
            </div>
        )
    }
}




export default SideBarContainer