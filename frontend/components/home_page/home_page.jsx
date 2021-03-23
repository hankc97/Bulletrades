import React from 'react'

export const HomePageComponent = () => (
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
)