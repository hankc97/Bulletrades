BulleTrades
======
[Live Website](http://robins-app.herokuapp.com/#/)

Table of Contents
------
* [Features](###Features)
* [Background](###Background)
* [Technologies](###Technologies)

### Features
------
* Authentication Using Bcrypt Hash to personalize each of our users
* Users can manage each trade with real-time data to track and prevent false transactions
* Users can purchase and sell tickers with partial shares and dollar amount (backend algorithm)
* Users can create, read, update, and delete watchlists with an ergonomic UI design
* Modern searchbar and query feature that color coordinates two sets of results to allow users to find their desired result (prevents "tip of the tongue", lethologica)

### Background
------
BulleTrades is a full stack web application inspired by Robinhood. BulleTrades allows 
users to personalize their account by having them create an account and protect them with
a session token and password that is never saved or displayed to other users. As a customer,
you have the ability to search for any ticker and make real time buy and sell orders
that will impact your overall buying power. Users also have the ability to view real-time information 
about a ticker before placing a trade giving them the power to analyze a stocks worth. 
Visually, the site incorporates a live chart that users can hover over and check their progress 
for each stock and their respective portfolio.
--This project was built in 2 weeks

### Technologies
------
Frontend
* Javascript
* React / Redux

Server / Router / Controller
* Ruby on Rails

Backend
* Ruby on Rails Assoications
* PostgreQL relational database
