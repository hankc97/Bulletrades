class Api::WatchlistsController < ApplicationController
    def index 
        @all_watchlists = Watchlist.all
        
        if @all_watchlists
            render 'api/watchlists/index'
        else
            render json: ["No watchlists available"], status: 404
        end
    end

    def create
        @watchlist = Watchlist.new(name: params[:name][:name], user_id: current_user.id)
        if @watchlist.save
            render 'api/watchlists/create'
        else
            render json: ['Invalid Watchlist Name'], status: 401
        end
    end

    def destroy
        @watchlist = Watchlist.find_by(id: params[:id])
        if @watchlist.destroy
        else
            render json: ["Unable to destroy selected Watchlist"], status: 404
        end
    end

    def update
        @watchlist = Watchlist.find_by(id: params[:id])
        if @watchlist.update_attribute(:name, watchlist_params[:_name])
            render 'api/watchlists/update'
        else
            render json: ['Duplicate Watchlist Name'], status: 409
        end
    end
    private
    def watchlist_params
        params.require(:_name).transform_keys(&:underscore).permit(:_name)
    end
end