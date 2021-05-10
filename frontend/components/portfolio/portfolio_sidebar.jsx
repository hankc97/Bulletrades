import React from 'react'

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
               />
               {/* <Lists /> */}
            </div>
        )
    }
}

class Stocks extends React.Component {
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.props.fetchAllUserTickerAndQuantity().then((currentUserOrders) => {
            this.props.requestMultiTickerQuote(currentUserOrders.payload.map(order => order[0]))
        })
    }

    componentDidUpdate() {

    }

    handleClick() {
        debugger
    }


    render() {
        return(
            <div className = "portfolio-sidebar-stocks-container">
                <span className = "stocks-header" onClick = {this.handleClick} >Stocks</span>
                {/* <ul>

                </ul> */}
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