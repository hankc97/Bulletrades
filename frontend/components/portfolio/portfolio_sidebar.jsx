import React from 'react'
import Chart from './sidebar-chart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'

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

    handleWatchlistInput(e) {
        e.preventDefault()
        this.setState({listName: e.target.value})
    }

    render() {
        const watchlist = this.props.watchlist ? this.props.watchlist : []
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
                            <li className = "single-watchlist">
                                <div className = "single-watchlist-name">
                                    <span>{watchlist.name}</span>
                                    <button><FontAwesomeIcon icon = {faChevronDown} /></button>
                                </div>
                                {/* <ul className = "single-watchlist-tickers-container">
                                    {  
                                        watchlist.tickers.map(ticker => (
                                            <Chart 
                                                key = {ticker}

                                            />
                                        ))
                                    }
                                </ul> */}
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }

}

export default PortfolioSideBar