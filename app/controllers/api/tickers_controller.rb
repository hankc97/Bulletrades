class Api::TickersController < ApplicationController
    def index
        @tickers = Ticker.all
        render 'api/tickers/index'
    end


end