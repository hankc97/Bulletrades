import React from 'react'
import {NavLink} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {fetchAllTickers} from '../../utils/ticker_util'
import SearchBoxResult from './search_dropdown_box.jsx'

const NavBarProtected = withRouter(({logoutUser,  history}) => (
    <div className = "nav-bar-protected-main">
        <NavLink to = "/portfolio" ><img className = "nav-bar-protected-logo" src = {window.btLogoDark}/></NavLink>
        <NavBarSearch  history={history} SearchBoxResult = {SearchBoxResult}/>
        <NavBarRight logoutUser = {logoutUser}/>
    </div>
))

class NavBarSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            allTickers: [],
            queryString: '',
            searchIsActive: false,
        }
        this.queriedResultsByTickerName = []
        this.queriedResultsByDescriptionName = []
        this.handleInputChange = this.handleInputChange.bind(this)
        this.querySearchInput = this.querySearchInput.bind(this)
        this.handleInputFocus = this.handleInputFocus.bind(this)
        this.globalClickListener = this.globalClickListener.bind(this)
    }

    componentDidMount() {
        fetchAllTickers().then(data => this.state.allTickers = data)
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.globalClickListener);
    }
    
    handleInputChange(e) {
        e.preventDefault()
        this.queriedResultsByTickerName = []
        this.queriedResultsByDescriptionName = []
        if (e.target.value === "") {
            return this.setState({searchIsActive: false})
        };
        this.querySearchInput(e.target.value.toLowerCase())
        this.setState({
            queryString: e.target.value,
            searchIsActive: true})
    }

    querySearchInput(queryString) {
        for(let i = 0; i < this.state.allTickers.length; i++) {
            if (this.queriedResultsByTickerName.length >= 4 ) break;
            if (this.state.allTickers[i][0].toLowerCase().startsWith(queryString)) {
                this.queriedResultsByTickerName.push(this.state.allTickers[i])
            }
        }
        const queriedResultsByTickerName = this.queriedResultsByTickerName
        for(let i = 0; i < this.state.allTickers.length; i++) {
            let flag;
            let currentTicker = this.state.allTickers[i][0].toUpperCase()
            if (this.queriedResultsByDescriptionName.length >= 3) break;
            queriedResultsByTickerName.find(results => {if (results[0] === currentTicker) {flag = true}})
            if (flag) continue;
            if (this.state.allTickers[i][1].toLowerCase().startsWith(queryString)) {
                this.queriedResultsByDescriptionName.push(this.state.allTickers[i])
            }
        }
    }

    handleBodyClick(syntheticEvent) {
        syntheticEvent.stopPropagation();
    }

    handleInputFocus(syntheticEvent) {
        syntheticEvent.stopPropagation()
        if (syntheticEvent.target.tagName.toLowerCase() === "a") return;
        this.setState(prevState => ({ searchIsActive: !prevState.searchIsActive }), () => {
            if (this.state.searchIsActive) {
                window.addEventListener('click', this.globalClickListener)
            }
        })
    }

    globalClickListener() {
        this.setState({searchIsActive: false}, () => {
            window.removeEventListener('click', this.globalClickListener)
        })
    }

    render() {
        let SearchBoxResults;
        if ((this.queriedResultsByTickerName.length >= 1) || (this.queriedResultsByDescriptionName.length >= 1)) {
            const SearchBoxResult = this.props.SearchBoxResult
            SearchBoxResults = 
                            <SearchBoxResult
                                queriedResultsByTickerName = {this.queriedResultsByTickerName} 
                                queriedResultsByDescriptionName = {this.queriedResultsByDescriptionName}
                                queryString = {this.state.queryString}
                            />
        }
        return (
            <div
                onFocus = {this.handleInputFocus}
                onClick = {this.handleBodyClick}
                className = "search-bar-container">
                <i className ="fa fa-search"></i>
                <form onSubmit = {this.handleSubmit}>
                    <input
                        className = "search-bar"
                        type = "text"
                        onChange = {this.handleInputChange}
                        placeholder = "Search"
                    />
                </form>
                {(this.state.searchIsActive) ? SearchBoxResults : undefined}
            </div>
        )
    }
}

class NavBarRight extends React.Component {
    render() {
        const logoutUser = this.props.logoutUser
        return (
            <div className = "nav-bar-protected-right">
                <NavLink to = "/portfolio" className = "protect-right">Portfolio</NavLink>
                <a href = "https://github.com/hankc97/Bulletrades" target = "_blank" className = "protect-right">Github</a>
                <a href = "https://www.linkedin.com/in/hank-chen-software-developer/" target = "_blank" className = "protect-right" >Linkedin</a>
                <a href = "https://docs.google.com/document/d/1nfSzrwMyI5m_-IIx8WJtwkf1oUiiEguD-CqQZaYD4Bc/edit?usp=sharing" target = "_blank" className = "protect-right">Resume</a>
                <a href = "https://hankc97.github.io/portfolio/" target = "_blank" className = 'protect-right'>Personal Website</a>
                <button className = "portfolio-logout-button protect-right" 
                        onClick = {logoutUser}
                        >Logout
                </button>
            </div>
        )
    }
}


export default (NavBarProtected)
