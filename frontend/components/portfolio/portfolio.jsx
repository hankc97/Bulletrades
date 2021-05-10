import React from 'react'
import PortfolioMain from './portfolio_main'
import PortfolioSideBar from './portfolio_sidebar'
class Portfolio extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        // this.state = {
        //     totalAccountValue: 0,
        //     data: null,
        //     tickerArray: [],
        // }
        // this.totalValue = this.totalValue.bind(this)
    }

    render() {
        return(
            <div className = "portfolio">
                <PortfolioMain 
                    currentUser = {this.props.currentUser}
                    fetchCurrentUserAndFormattedLifetimeTrades = {this.props.fetchCurrentUserAndFormattedLifetimeTrades}
                    formattedLifetimeTrades = {this.props.formattedLifetimeTrades}
                    currentUserOrderHoldingAmount = {this.props.currentUserOrderHoldingAmount}
                    formattedLifetimeTradesStartingAmount = {this.props.formattedLifetimeTradesStartingAmount}
                    formattedMinAndMaxValueFromDataSet = {this.props.formattedMinAndMaxValueFromDataSet}
                    />
                <PortfolioSideBar 
                    requestMultiTickerQuote = {this.props.requestMultiTickerQuote}
                    fetchAllUserTickerAndQuantity = {this.props.fetchAllUserTickerAndQuantity}
                    quotes = {this.props.quotes}
                    allCurrentUserTickerAndQuantity = {this.props.allCurrentUserTickerAndQuantity}
                />
            </div>
        )
    }

    // componentDidMount() {
    //     const that = this;
    //     this.props.fetchCurrentUser(this.props.currentUser.id)
    //         .then(() => that.fetchQuotes())
    //             .then(() => that.formatOneDayTickerData(that.props.quotes["intradayPrices"]))
    //                 .then(() => that.totalValue())
    // }

    // fetchQuotes() {
    //     const quotesArray = Object.values(this.props.userOrders).map((order) => {
    //         return order.ticker
    //     })
    //     this.props.requestMultiQuotes(quotesArray)
    // }

    // formatOneDayTickerData(intradayPricesArray) {
    //     if (intradayPricesArray) {
    //         const formatPriceArray = []; 
    //         for ( let i = 0; i < intradayPricesArray.length; i += 1) {
    //             formatPriceArray.push({time: intradayPricesArray[i].minute, price: intradayPricesArray[i].average})
    //         }
    //         this.setState({data: formatPriceArray})
    //     }
    // }

    // totalValue() {
    //     let total = 0;
    //     const tickersArr = []
    //     Object.values(this.props.userOrders).forEach(order => {
    //         total += order.avgTickerPrice * order.quantity
    //         tickersArr.push(order.ticker)
    //     })
    //     this.setState({
    //         totalAccountValue: total,
    //         tickerArray: tickersArr
    //     })
    // }

    // render() {

    //     return(
    //         <div className = "port">
    //             <div className = "portfolio-page-container">
    //                 <div className = "portfolio-content"> 
    //                     <div className = "portfolio-main-inner">
    //                         <div className = "portfolio-main-container">
    //                             <h2 className = "account-header">${this.state.totalAccountValue.toFixed(2)}</h2>
    //                             <div className = "portfolio-chart-container">
    //                                 <PortfolioChart 
    //                                     data = {this.state.data}
    //                                 />
    //                             </div>
    //                         </div>
    //                         <PortfolioTickerOrders userOrders = {this.props.userOrders} 
    //                                                 tickerArray = {this.state.tickerArray} 
    //                                                 quotes = {this.props.quotes}
    //                                                 data = {this.state.data}
    //                                                 />
    //                         <PortfolioMainSection currentUser={this.props.currentUser} updateUser={this.props.updateUser} />
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
}

// class PortfolioMainSection extends React.Component {
//     constructor(props) {
//         super(props)

//         // this.state = {
//         //     active: false
//         // }

//         this.state = this.props.currentUser
//         this.handleChange = this.handleChange.bind(this)
//         this.handleSubmit = this.handleSubmit.bind(this)
//         this.handleClick = this.handleClick.bind(this)
//     }

//     handleChange(e) {
//         this.setState({
//             buyingPower: e.target.value
//         })
//     }

//     handleSubmit(e) {
//         e.preventDefault()
//         this.props.updateUser(this.state)
//     }

//     handleClick() {
//         return;
//         const currentState = this.state.active
//         this.setState({active: !currentState})
//     }

//     render() {
//         const {currentUser} = this.props

//         return(
//             <div className = "portfolio-main-section-buyingpower">
//                 <div className = "active-buyingpower">
//                     <span className = 'buying-power-in'>Buying Power</span>
//                     <span className = "">${currentUser.buyingPower.toFixed(2)}</span>  
//                 </div>
//                 <div 
//                     onClick = {this.handleClick}>
//                     <form onSubmit = {this.handleSubmit} className = "prop-input-form-inactive form-toggle-aa" >
//                         <input 
//                             type = "text"
//                             placeholder = {'Add Funds...'}
//                             onChange = {this.handleChange}
//                         />
//                         <button className = "deposit-funds-button">Deposit Funds</button>
//                     </form>
//                 </div>
//             </div>
//         )

//     }


// }


export default Portfolio