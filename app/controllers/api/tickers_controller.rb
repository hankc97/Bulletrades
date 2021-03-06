class Api::TickersController < ApplicationController
    def index
        @tickers = Ticker.all
        render 'api/tickers/index'
    end

    def show
        @all_watchlists = Watchlist.all.where(user_id: current_user.id)
        @checked_watchlists = Ticker.find_by(ticker: params[:id]).watchlists
        render 'api/tickers/show'
    end

    def update
        watchlist_ids_array = watchlist_params[:_watchlist_id]
        Ticker.update_ticker_watchlist_association(watchlist_ids_array, params[:id])
       
        # render 'api/tickers/update'
    end

    private
    def watchlist_params
        if params.has_key?(:_watchlist_id)
            params.require(:_watchlist_id).transform_keys(&:underscore).permit(:_watchlist_id => [])
        else
            params[:_watchlist_id] ||= [] 
            params.permit(:_watchlist_id => [])
        end
    end
end