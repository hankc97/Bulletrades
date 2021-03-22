import React from 'react'
import { connect } from 'react-redux'
import Ticker from './ticker'

const mapStateToProps = (state, ownProps) => {
    return {
        tickerName: ownProps.location.search.slice(1)
    }

}

const mapDispatchToProps = dispatch => ({

})


export default connect(
    mapStateToProps,
    null
    // mapDispatchToProps
)(Ticker)