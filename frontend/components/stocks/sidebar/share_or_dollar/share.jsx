import React from 'react'

class BuySharesFormInner extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            estimatedTotalCost: 0,
            shareNumber: 0,
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit() {

    }

    handleChange(e) {
        e.preventDefault()
        this.setState({
            shareNumber: parseFloat(e.currentTarget.value),
            estimatedTotalCost: parseFloat(this.state.shareNumber * this.props.markPrice),
        })
    }

    render() {
        return(
            <div>
                <form onSubmit = {this.handleSubmit} className = "shares-form-inner-buy">
                    <div className = "share-label-input-buy">
                        <label>Shares</label>
                        <input
                            className = "shares-buy-input-box"
                            type = "number"
                            placeholder = '0'
                            onChange = {this.handleChange}
                            value = {this.shareNumber}
                        />
                    </div>
                    <div className = "share-market-price-buy">
                        <span>Market Price</span>
                        <span>{this.props.markPrice}</span>
                    </div>
                    <div className = "share-estimated-cost-buy">
                        <span>Estimated Cost</span>
                        <span>${(this.state.shareNumber * this.props.markPrice).toFixed(2)}</span>
                    </div>
                </form>
            </div>
        )
    }
}

export default BuySharesFormInner