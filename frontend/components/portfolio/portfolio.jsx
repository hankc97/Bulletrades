import React from 'react'
import PortfolioMain from './portfolio_main'
import PortfolioSideBar from './portfolio_sidebar'
class Portfolio extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className = 'port-page'>
                <div className = "portfolio">
                    <PortfolioMain 
                        currentUser = {this.props.currentUser}
                        fetchCurrentUserAndFormattedLifetimeTrades = {this.props.fetchCurrentUserAndFormattedLifetimeTrades}
                        formattedLifetimeTrades = {this.props.formattedLifetimeTrades}
                        currentUserOrderHoldingAmount = {this.props.currentUserOrderHoldingAmount}
                        formattedLifetimeTradesStartingAmount = {this.props.formattedLifetimeTradesStartingAmount}
                        formattedMinAndMaxValueFromDataSet = {this.props.formattedMinAndMaxValueFromDataSet}
                        openModal = {this.props.openModal}
                        closeModal = {this.props.closeModal}
                        />
                    <PortfolioSideBar 
                        requestMultiTickerQuote = {this.props.requestMultiTickerQuote}
                        fetchAllUserTickerAndQuantity = {this.props.fetchAllUserTickerAndQuantity}
                        quotes = {this.props.quotes}
                        allCurrentUserTickerAndQuantity = {this.props.allCurrentUserTickerAndQuantity}
                        requestAllWatchlist = {this.props.requestAllWatchlist}
                        requestCreateWatchlist = {this.props.requestCreateWatchlist}
                        requestDestroyWatchlist = {this.props.requestDestroyWatchlist}
                        watchlist = {this.props.watchlist}
                        requestAllWatchlistAPI= {this.props.requestAllWatchlistAPI}
                        watchlistAPI = {this.props.watchlistAPI}
                    />
                </div>
            </div>
        )
    }
}
export default Portfolio