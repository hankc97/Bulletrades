import React from 'react'
import {NavLink} from 'react-router-dom'
import AsyncSelect, { Async } from 'react-select/async'
import styled from 'styled-components'
import {fetchAllTickers} from '../../utils/ticker_util'
import ReactDOM from 'react-dom'
import {withRouter} from 'react-router-dom'

const NavBarProtected = withRouter(({logoutUser, history}) => (
    <div className = "nav-bar-protected-main">
        <div><img className = "nav-bar-protected-logo" src = {window.btLogo}/></div>
        <NavBarSearch history={history}/>
        <NavBarRight logoutUser = {logoutUser}/>
    </div>
))

class NavBarSearch extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedTickers: [],
            ticker: ''
        }
        this.allTickers = []
        this.loadOptions = this.loadOptions.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.node;
        this.myRef = React.createRef()
        this.handleClick = this.handleClick.bind(this)
    }

    registerListener() {

        // debugger
        let that = this;
        // let domNode = ReactDOM.findDOMNode(this.node)
        let domNode = this.myRef.current
        
        domNode.addEventListener('click', function(e) {
            if (domNode) {
                if ((e.target.parentElement.className.match('MenuList') !== null) && e.target.parentElement.className.match('MenuList')[0] === 'MenuList'){
                    // console.log(domNode)
                    // console.log(that.myRef.current)
                    // debugger
                    that.handleSubmit(e, e.target.innerText)
                }
            }
        })
    }

    componentDidMount() {
        fetchAllTickers().then(data => this.allTickers = Object.keys(data))
        this.registerListener()
    }

    onChange(selectedTickers){
        this.setState({
            selectedTickers: selectedTickers || []
        })
    }

    loadOptions(inputText, callback) {
        const arr = [];
        for (let i = 0; i < this.allTickers.length; i++) {
            if (arr.length === 7) break;
            if (this.allTickers[i].startsWith(inputText.toUpperCase())) arr.push( <li className = "dropdown-menu-li-children" onClick = {(e) => this.handleClick(e)}>{this.allTickers[i]}</li>);
        }

        callback(arr.map(i => ({label: i,value: i})))
    }

    handleSubmit(e, dropdownChildValue) {
        // console.log(dropdownChildValue)

        if ( e.key === 'Enter' ) {
            e.preventDefault()
            const enterInnerHTMLValue = e.currentTarget.textContent.replace('  Use Up and Down to choose options, press Enter to select the currently focused option, press Escape to exit the menu, press Tab to select the option and exit the menu.', '').replace('No options', '')             
            this.props.history.push({
                pathname: "/stocks",
                search: `${enterInnerHTMLValue}`
            })
        }

        if (dropdownChildValue) {
            e.preventDefault();
            // console.log(dropdownChildValue)
            this.props.history.push({
                pathname: "/stocks",
                search: `${dropdownChildValue}`
            })
        }
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
        const Container = styled('div')`
            width: 30%;
        `;

        const styles = {
            Container: base => ({
                ...base,
                flex:1,
                justifyContent: spaceBetween,
            })
        }
        
        return (
            <Container className = "tickers-input" ref = {this.myRef}>
                <form onKeyPress = {this.handleSubmit} >
                    <AsyncSelect 
                        value = {this.state.selectedTickers}
                        onChange = {this.onChange}
                        placeholder = {'Search Ticker Symbol...'}
                        loadOptions = {this.loadOptions}
                        styles = {styles}
                        innerProps = {this.handleClick}
                    />
                </form>
            </Container>
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