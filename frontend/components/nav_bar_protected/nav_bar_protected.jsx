import React from 'react'
import {NavLink} from 'react-router-dom'
import AsyncSelect, { Async } from 'react-select/async'
import styled from 'styled-components'
import {fetchAllTickers} from '../../utils/ticker_util'


const NavBarProtected = ({logoutUser}) => (
    <div className = "nav-bar-protected-main">
        <div><img className = "nav-bar-protected-logo" src = {window.btLogo}/></div>
        <NavBarSearch />
        <NavBarRight logoutUser = {logoutUser}/>
    </div>
)

class NavBarSearch extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedTickers: []
        }
        this.allTickers = []
        this.loadOptions = this.loadOptions.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetchAllTickers().then(data => this.allTickers = Object.keys(data))
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
            if (this.allTickers[i].startsWith(inputText.toUpperCase())) arr.push(this.allTickers[i]);
        }

        callback(arr.map(i => ({label: i, value: i})))
    }

    handleSubmit(e) {
        debugger
        if (e.key === "Enter") {
            e.preventDefault()
            debugger
            console.log(e)
        }
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
            <Container className = "tickers-input" >
                <form onSubmit = {this.handleSubmit} onKeyPress = {this.handleSubmit}>
                    <AsyncSelect 
                        value = {this.state.selectedTickers}
                        onChange = {this.onChange}
                        placeholder = {'Search Ticker Symbol...'}
                        loadOptions = {this.loadOptions}
                        styles = {styles}
                        
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











export default NavBarProtected