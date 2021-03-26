import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceArea} from 'recharts';

class PortfolioChart extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <LineChart width={700} height={300} data={(this.props.data)}
                className = "chart-port"
                margin={{top: 5, right: 5, bottom: 5, left: 5}} className='line-chart'>
                <XAxis hide={true} dataKey = "time"/>
                <YAxis hide={true} type='number' domain={['auto', 'auto']}/>
                <Line type="linear" dataKey="price" stroke='#32cd32' dot={false}
                    strokeWidth={1}
                /> 
                <Tooltip />
            </LineChart>
        )
    }
}

export default PortfolioChart