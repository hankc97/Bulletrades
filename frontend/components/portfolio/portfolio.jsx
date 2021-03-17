import React from 'react'
 
class Portfolio extends React.Component {

    render() {
        return(
            <div>
                <button onClick = {this.props.logoutUser}>Logout</button>
            </div>
        )
    }
}


export default Portfolio