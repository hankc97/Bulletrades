BulleTrades
======
[Live Website](http://robins-app.herokuapp.com/#/)

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
* PostgreSQL relational database

### Website Features
------

## Dynamic SearchBar
Bulletrades incorporates a dynamic search bar that gives users a color-coordinated search result to pinpoint their desired result.
All results are non duplicate to prevent additional queries


![](https://i.imgur.com/Z55Ix0g.gif)

## Purchasing and Selling both Partial Shares and Dollar Amounts 
Bulletrades not only keeps track of each user purchases to prevent invalidated transactions, but we also implemented a binary search algorithm that finds the closest value to the user input price.
Then it proceeds to delete objects starting from the index with two pointers with an O(n) time complexity. 
```
def self.use_binary_search_to_find_closest_index(array_of_objects, avg_ticker_price)
        if array_of_objects.length() < 3
            return [low = 0, high = 1]
        end
        if (avg_ticker_price < array_of_objects[0].avg_ticker_price)
            return [low = 0, high = 1]
        end
        if (avg_ticker_price > array_of_objects[array_of_objects.length() - 1].avg_ticker_price)
            return [low = array_of_objects.length() - 2, high = array_of_objects.length() - 1]
        end

        low = 0
        high = array_of_objects.length() - 1
        while (low <= high) 
            midpoint = (high + low) / 2
            if (avg_ticker_price < array_of_objects[midpoint].avg_ticker_price)
                high = midpoint - 1
            elsif (avg_ticker_price > array_of_objects[midpoint].avg_ticker_price)
                low = midpoint + 1
            else    
                low = high - 1
                return [low , high]
            end
        end
        return [low, high]
    end
```
![](https://i.imgur.com/A5p5HZF.gif)

## Create, Read, Update, Delete Watchlists with Modern UI and Fast Backend Query 
Watchlists and Tickers are a many to many relationship, I used a joins to table to reference and update each other accordingly. 

![](https://i.imgur.com/EwxkIXF.gif)


