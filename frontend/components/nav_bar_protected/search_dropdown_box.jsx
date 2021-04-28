import React from 'react'
import {Link} from 'react-router-dom'

class SearchBoxResult extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const queryString = this.props.queryString
        return(
            <div className = "search-bar-tickers-container">
                <h3>Stocks</h3>
                <ul className = "search-bar-ticker-name-list-container">
                    {this.props.queriedResultsByTickerName.map((result) => {
                        return (
                            <TickerName key = {result} result = {result} queryString = {queryString}/>
                        )
                    })}
                </ul>
                <ul className = "search-bar-ticker-description-list-container">
                    {this.props.queriedResultsByDescriptionName.map((result) => {
                        return (
                            <TickerDescription key = {result} result = {result} queryString = {queryString}/>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

const TickerName = ({result, queryString}) => (
    <Link to = {`/stocks/${result[0].toUpperCase()}`} className = "ticker-name-result">
        <div className = "name-result0">
            <span className = "colored-name-result0">{result[0].slice(0, queryString.length)}</span>
            <span className = "noncolored-name-result0">{result[0].slice(queryString.length)}</span>
        </div>
        <div className = "name-result1">
            {result[1]}
        </div>
    </Link>
)

const TickerDescription = ({result, queryString}) => (
    <Link className = "ticker-description-result" to = {`/stocks/${result[0].toUpperCase()}`}>
         <div className = "description-result0">
            {result[0]}
        </div>
        <div className = "description-result1">
            <span className = "colored-name-result1">{result[1].slice(0, queryString.length)}</span>
            <span className = "noncolored-name-result1">{result[1].slice(queryString.length)}</span>
        </div>
    </Link>
)



export default SearchBoxResult