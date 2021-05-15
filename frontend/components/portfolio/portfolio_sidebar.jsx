import React from 'react'
import Chart from './sidebar-chart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons'

class PortfolioSideBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className = "portfolio-sidebar-container">
                <div className = 'portfolio-sidebar-stocks-lists'> 
                    <Stocks 
                        requestMultiTickerQuote = {this.props.requestMultiTickerQuote}
                        fetchAllUserTickerAndQuantity = {this.props.fetchAllUserTickerAndQuantity}
                        allCurrentUserTickerAndQuantity = {this.props.allCurrentUserTickerAndQuantity}
                        quotes = {this.props.quotes}
                    />
                    <Lists 
                        requestAllWatchlist = {this.props.requestAllWatchlist}
                        watchlist = {this.props.watchlist}
                        requestAllWatchlistAPI = {this.props.requestAllWatchlistAPI}
                        watchlistAPI = {this.props.watchlistAPI}
                    />
                </div>
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
            <div className = "portfolio-sidebar-stocks-container" >
                <span  className = "stocks-header" >Stocks</span>
                <ul>
                    {
                        allCurrentUserTickerAndQuantity.map(order => (
                            <Chart 
                                key = {order}
                                singleOrder = {order}
                                singleQuote = {this.props.quotes[order[0]]}
                                chartType = "ownedTickers"
                            />
                        ))
                    }
                </ul>
            </div>
        )
    }
}

class Lists extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isCreateListToggled: false,
            listName: '',
        }

        this.createWatchlistDOMRef = React.createRef()

        this.toggleLists = this.toggleLists.bind(this)
        this.toggleWatchlist = this.toggleWatchlist.bind(this)
        this.handleWatchlistInput = this.handleWatchlistInput.bind(this)
    }

    componentDidMount() {
        this.props.requestAllWatchlist().then((res) => {
            const ticker_api_call_array = []
            res.watchlist.forEach(ticker_list => {
                ticker_list.tickers.forEach(ticker => {
                    if (!ticker_api_call_array.includes(ticker)) {
                        ticker_api_call_array.push(ticker)
                    }
                })
            })
            this.props.requestAllWatchlistAPI(ticker_api_call_array)
        })
    }

    toggleLists(e) {
        e.preventDefault()

        if (this.state.isCreateListToggled) {
            this.createWatchlistDOMRef.current.classList.add('hidden-create-list-container')
            this.createWatchlistDOMRef.current.classList.remove('reveal-create-list-container')
        } else {
            this.createWatchlistDOMRef.current.classList.remove('hidden-create-list-container')
            this.createWatchlistDOMRef.current.classList.add('reveal-create-list-container')
        }

        this.setState({isCreateListToggled: !this.state.isCreateListToggled})
    }

    toggleWatchlist(e, id) {
        e.preventDefault()
        let DOMRef = this.watchlistCollectionDOMRef[id] 

        if (DOMRef.classList.contains('hidden')) {
            DOMRef.classList.add('single-watchlist-tickers-container')
            DOMRef.classList.remove('hidden')
        } else {
            DOMRef.classList.remove('single-watchlist-tickers-container')
            DOMRef.classList.add('hidden')
        }
    }

    handleWatchlistInput(e) {
        e.preventDefault()
        this.setState({listName: e.target.value})
    }

    render() {
        const watchlist = this.props.watchlist && this.props.watchlistAPI ? this.props.watchlist : []
        this.watchlistCollectionDOMRef = {}
        return(
            <div className = "portfolio-sidebar-watchlists-container">
                <div className = "watchlists-header">
                    <span>Lists</span>
                    <button onClick = {this.toggleLists}>+</button>
                </div>
                <div ref = {this.createWatchlistDOMRef} className = "hidden-create-list-container">
                    <input 
                        type = "text"
                        placeholder = 'List Name'
                        value = {this.state.listName}
                        onChange = {this.handleWatchlistInput}
                        className = 'watchlist-create-input'
                    />
                    <div className = "watchlist-create-buttons">
                        <button className = "cancel-button-watchlist" onClick = {this.toggleLists}>Cancel</button>
                        <button className = "create-button-watchlist">Create List</button>
                    </div>
                </div>
                <ul className = "watchlist-lists-container">
                    {
                        watchlist.map(watchlist => (
                            <li className = "single-watchlist" key = {watchlist.name}>
                                <div className = "single-watchlist-name">
                                    <span>{watchlist.name}</span>
                                    <button onClick = {(e) => this.toggleWatchlist(e, watchlist.name)}><FontAwesomeIcon icon = {faChevronUp} /></button>
                                </div>
                                <ul ref = {(instance) => {this.watchlistCollectionDOMRef[watchlist.name] = instance}} className = "hidden">
                                    {  
                                        watchlist.tickers.map(ticker => (
                                            <Chart 
                                                key = {ticker}
                                                tickerName = {ticker}
                                                singleQuote = {this.props.watchlistAPI[ticker]}
                                                chartType = "watchlist"
                                            />
                                        ))
                                    }
                                </ul>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }

}

export default PortfolioSideBar