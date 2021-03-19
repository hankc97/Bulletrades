import React from 'react'
import {NavLink} from 'react-router-dom'
import AsyncSelect, { Async } from 'react-select/async'
import styled from 'styled-components';

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
    }

    onChange(selectedTickers){
        // this.setState({
        //     selectedTickers: selectedTickers || []
        // })
    }

    loadOptions(inputText, callback) {
        // const response = await fetch()
        // const json = await response.json()

        // callback(json.map(value => ({
        //     value: value.ticker
        // })))
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
                <AsyncSelect 
                    isMulti
                    value = {this.state.selectedTickers}
                    onChange = {this.onChange}
                    placeholder = {'Search Ticker Symbol...'}
                    loadOptions = {this.loadOptions}
                    styles = {styles}
                />
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