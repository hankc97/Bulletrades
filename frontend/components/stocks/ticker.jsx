import React from 'react'

class Ticker extends React.Component {

    render() {
        return (
            <h1 className = "ticker_page">You are on {this.props.props.location.search.slice(1)} stock page</h1>
        )
    }
}

export default Ticker