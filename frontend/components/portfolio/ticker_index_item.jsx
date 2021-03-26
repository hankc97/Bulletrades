import React from 'react'
import TickerIndex from './ticker_index'
import {Link} from 'react-router-dom'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceArea} from 'recharts';

class TickerIndexItem extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return(
            <Link to = {`/stocks?${this.props.ticker}`} className = "link-ticker-item">
                <div>
                    <h3>{this.props.ticker}</h3>
                </div>
                
                <LineChart width={75} height={30} data={(this.props.data)}
                    className = "smaller-chart"
                    margin={{top: 5, right: 5, bottom: 5, left: 5}} >
                    <XAxis hide={true} dataKey = "time"/>
                    <YAxis hide={true} type='number' domain={['auto', 'auto']}/>
                    <Line type="linear" dataKey="price" stroke='#32cd32' dot={false}
                        strokeWidth={1}
                    />
                    <Tooltip />
                </LineChart>
                <div className = "ticker-info">
                    <span>${this.props.tickerPrice.toFixed(2)}</span>
                    <span>{this.props.quantity} of Shares</span>
                </div>
            </Link>
        )
    }
}

export default TickerIndexItem