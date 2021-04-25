import React from 'react'
import {NavLink} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import { ThemeConsumer } from 'styled-components'
import {fetchAllTickers} from '../../utils/ticker_util'


// import AsyncSelect, { Async } from 'react-select/async'
// import styled from 'styled-components'
// import ReactDOM from 'react-dom'

const NavBarProtected = withRouter(({logoutUser,  history}) => (
    <div className = "nav-bar-protected-main">
        <NavLink to = "/portfolio" ><img className = "nav-bar-protected-logo" src = {window.btLogoDark}/></NavLink>
        <NavBarSearch  history={history}/>
        <NavBarRight logoutUser = {logoutUser}/>
    </div>
))

class NavBarSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTickers: [],
        }
        this.allTickers = [];
        this.allDescriptions = [];
        // this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidMount() {
        fetchAllTickers().then(data => {
            // pass data up as [ticker, description]
            // this.allTickers = Object.keys(data);
            // this.allDescriptions = Object.values(data);
        })
        // loader finished loading here -->
    }

    onChange(selectedTickers){
        this.setState({
            selectedTickers: selectedTickers || []
        })
    }

    handleInputChange(e) {
        e.preventDefault()
    }

    // loadOptions(inputText, callback) {
    //     const arr = [];
    //     for (let i = 0; i < this.allTickers.length; i++) {
    //         if (arr.length === 7) break;
    //         if (this.allTickers[i].startsWith(inputText.toUpperCase())) arr.push( <li className = "dropdown-menu-li-children" onClick = {(e) => this.handleClick(e)}>{this.allTickers[i]}</li>);
    //     }

    //     callback(arr.map(i => ({label: i,value: i})))
    // }

    handleSubmit(e, dropdownChildValue) {


        // if ( e.key === 'Enter' ) {
        //     e.preventDefault()
        //     const enterInnerHTMLValue = e.currentTarget.textContent.replace('  Use Up and Down to choose options, press Enter to select the currently focused option, press Escape to exit the menu, press Tab to select the option and exit the menu.', '').replace('No options', '')             
        //     this.props.history.push({
        //         pathname: "/stocks",
        //         search: `${enterInnerHTMLValue}`
        //     })
        // }

        // if (dropdownChildValue) {
        //     e.preventDefault();
        //     this.props.history.push({
        //         pathname: "/stocks",
        //         search: `${dropdownChildValue}`
        //     })
        // }
    }

    handleClick(e) {
        e.preventDefault()
        const currentTargetValue = e.currentTarget.innerText 
        this.props.history.push({
            pathname: "/stocks",
            search: `${currentTargetValue}`
        })
    }

    render() {
        // const Container = styled('div')`
        //     width: 30%;
        // `;

        // const styles = {
        //     Container: base => ({
        //         ...base,
        //         flex:1,
        //         justifyContent: spaceBetween,
        //     })
        // }
        
        return (
            <div className = "search-bar-container">
                <i class="fa fa-search"></i>
                <form onSubmit = {this.handleSubmit}>
                    <input 
                        className = "search-bar"
                        type = "text"
                        onChange = {this.handleChange}
                        // value = {}
                        placeholder = "Search"
                    />
                </form>
            </div>

            // <Container className = "tickers-input" ref = {this.myRef}>
            //     <form onKeyPress = {this.handleSubmit} >
            //         <AsyncSelect 
            //             value = {this.state.selectedTickers}
            //             onChange = {this.onChange}
            //             placeholder = {'Search Ticker Symbol...'}
            //             loadOptions = {this.loadOptions}
            //             styles = {styles}
            //             innerProps = {this.handleClick}
            //             isClearable = {true}
            //         />
            //     </form>
            // </Container>
        )
    }
}

class NavBarRight extends React.Component {
    render() {
        const logoutUser = this.props.logoutUser
        return (
            <div className = "nav-bar-protected-right">
                <NavLink to = "" className = "protect-right">Free Stocks</NavLink>
                <NavLink to = "" className = "protect-right">Portfolio</NavLink>
                <NavLink to = "" className = "protect-right">Cash</NavLink>
                <NavLink to = "" className = "protect-right">Messages</NavLink>
                <button className = "portfolio-logout-button protect-right" 
                        onClick = {logoutUser}
                        >Logout
                </button>
            </div>
        )
    }
}


export default (NavBarProtected)