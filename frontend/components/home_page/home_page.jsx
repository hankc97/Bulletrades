import React from 'react'
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

export const HomePageComponent = () => (
    <>
        <div className = "home-page-main-div-1">
            <div className = "home-page-top-about">
                <h2 className = "top-about1" >
                                            Investing for 
                                            <br/>
                                            Everyone</h2>
                <p className = "top-about2">Commission-free investing, plus the tools you need to put
                    your money in motion. Sign up and get your first stock for
                    free. Certain limitations apply.
                </p>
                <NavLink className = "home-page-signup-button" to = '/signup' >Sign Up</NavLink>
            </div>
            <div className = 'home-page-background' >
                <video controlsList="nodownload nofullscreen noremoteplayback"
                        autoPlay 
                        loop 
                        muted
                        playsInline
                        preload="auto" 
                        className="home-page-video">
                    <source 
                        src="https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/3x__327bf4cc768a323497d5aaa7416319c2.mp4" 
                        type="video/mp4"/>
                    <img 
                        className="css-1eazbjj" 
                        draggable="false" 
                        role="presentation" 
                        src="https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png"
                        srcSet="https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png, https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/2x__c7dcadbbb72fc298e85e94844f68342c.png 2x, https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/3x__7c5da6ba049983f3558423906f16f0af.png 3x"
                        />
                </video>
                <div className = "">
                    <img 
                        className="static-image-home-page" 
                        draggable="false" 
                        role="presentation" 
                        src="https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/1x__284c8d0c799d3c9649ca021c00228275.png" 
                        srcSet="https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/1x__284c8d0c799d3c9649ca021c00228275.png, https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/2x__ff9c36e27d7018cf707b95d8675793a3.png 2x, https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/3x__45f00d7b296cb52968f1bca4ef766fc1.png 3x"
                    />
                </div>
            </div>
        </div>
        <div className = "fee-schedule">
            <span>See our <span className = "fee-underline">fee schedule</span> to learn more about cost</span>
        </div>
        <div className = "home-page-fractional-shares">
            <div className = "fract-left">
                <h1>Introducing Fractional Shares</h1>
                <h4>Invest in thousands of stocks with as little as $1.</h4>
                <div className = "fract-3-middle">
                    <div>
                        <h2>Invest Any Amount</h2>
                        <p>Choose how much you want to invest, and we’ll convert from dollars to parts of a whole share.</p>
                    </div>
                    <div>
                        <h2>Build a Balanced Portfolio</h2>
                        <p>Customize your portfolio with pieces of different companies and funds to help reduce risk.</p>
                    </div>
                    <div>
                        <h2>Trade in Real Time</h2>
                        <p>Trades placed during market hours are executed at that time, so you’ll always know the share price.</p>
                    </div>
                </div>
                <div className = "fract-disclosure">
                    <i className="fa fa-info-circle"></i>
                    <span>Check Out Purchasing and Selling with Partial Shares and Dollar Amounts When You Log In!</span>
                </div>
            </div>
            <div>
                <img
                    className = "fract-right-img"
                    draggable="false" 
                    role="presentation" 
                    srcSet = "https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/3x__e61985cb13c119a29374ade4e7a49a47.png">
                </img>
            </div>
        </div>
        <div className = "home-page-footer">
            <div className = "footer-icons">
                <a href = "https://www.linkedin.com/in/hank-chen-software-developer/" target = "_blank"><FontAwesomeIcon icon = {faGithubSquare} className = "footer-icon"/></a>
                <a href = "https://github.com/hankc97" target = "_blank"><FontAwesomeIcon icon = {faLinkedin} className = "footer-icon"/></a>
            </div>
            <span>Hank Chen</span>
            <span>hankchen1997@yahoo.com</span>
            <span>7187536588</span>
            <a href = "https://hankc97.github.io/portfolio/" target = "_blank" >Personal Website</a>
            <a href = "https://docs.google.com/document/d/1nfSzrwMyI5m_-IIx8WJtwkf1oUiiEguD-CqQZaYD4Bc/edit?usp=sharing" target = "_blank">Resume</a>
            <div className = "back-to-top-wrapper">
                <a 
                    href = "#top"
                    className = "back-to-top-link"
                    aria-label = "Scroll to Top"
                    >
                    Click to Scroll Back to Top
                </a>
            </div>
        </div>
    </>
)