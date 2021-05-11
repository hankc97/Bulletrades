import React from 'react'
import Chart from './sidebar-chart'

class PortfolioSideBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className = "portfolio-sidebar-container">
               <Stocks 
                   requestMultiTickerQuote = {this.props.requestMultiTickerQuote}
                   fetchAllUserTickerAndQuantity = {this.props.fetchAllUserTickerAndQuantity}
                   allCurrentUserTickerAndQuantity = {this.props.allCurrentUserTickerAndQuantity}
                   quotes = {this.props.quotes}
               />
               {/* <Lists /> */}
            </div>
        )
    }
}

class Stocks extends React.Component {
    constructor(props){
        super(props)

    }

    componentDidMount() {
        this.props.fetchAllUserTickerAndQuantity().then((currentUserOrders) => {
            if (currentUserOrders.payload && Object.keys(currentUserOrders.payload).length === 0 && currentUserOrders.payload.constructor === Object) {
                return
            }
            this.props.requestMultiTickerQuote(currentUserOrders.payload.map(order => order[0]))
        })
    }

 
    render() {
        const allCurrentUserTickerAndQuantity = this.props.allCurrentUserTickerAndQuantity 
        return(
            <div className = "portfolio-sidebar-stocks-container">
                <span  className = "stocks-header" >Stocks</span>
                <ul>
                    {
                        allCurrentUserTickerAndQuantity.map(order => (
                            <Chart 
                                key = {order}
                                singleOrder = {order}
                                singleQuote = {this.props.quotes[order[0]]}
                            />
                        ))
                    }
                </ul>
            </div>
        )
    }
}

class Lists extends React.Component {
    constructor() {

    }

    render() {
        return(<></>)
    }

}

export default PortfolioSideBar