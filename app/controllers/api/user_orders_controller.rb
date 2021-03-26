class Api::UserOrdersController < ApplicationController 
    def index
        @user_orders = UserOrder.where(user_id: current_user.id).includes(:ticker)

        if @user_orders
            render 'api/user_orders/index'
        else
            render json: @user_orders.errors.full_messages, status: 404
        end
    end

    def create
        tickerId = Ticker.find_by(ticker: user_order_params[:ticker]).id
        current_user.buying_power = buying_power_params[:buying_power]

        @user_order = UserOrder.create(
            user_id: user_order_params[:user_id],
            ticker_id: tickerId,
            quantity: user_order_params[:quantity],
            avg_ticker_price: user_order_params[:avg_ticker_price]) 
        if @user_order.save && current_user.save
            render 'api/user_orders/show'
        else
            render json: @user_order.full_messages, status: 401
        end
    end

    def update
        tickerId = Ticker.find_by(ticker: user_order_params[:ticker]).id
        @user_order = current_user.ticker_orders.find_by(ticker_id: tickerId)
        current_user.buying_power = buying_power_params[:buying_power]

        if @user_order.update_attributes(
            user_id: user_order_params[:user_id],
            ticker_id: tickerId,
            quantity: user_order_params[:quantity],
            avg_ticker_price: user_order_params[:avg_ticker_price]) && current_user.save
            if Integer(user_order_params[:quantity]) == 0
                @delete_user_order = current_user.ticker_orders.where(ticker_id: tickerId)
                if @delete_user_order
                    @delete_user_order.destroy_all
                end
            end
            render 'api/user_orders/update'
        else
            render json: @user_order.full_messages, status: 401
        end
    end

    def destroy
        tickerId = Ticker.find_by(ticker: user_order_params[:ticker]).id
        @user_order = current_user.ticker_orders.where(ticker_id: tickerId)
        if @user_order
            @user_order.destroy_all
        else
            render json: holdings.full_messages, status: 404
        end
    end

    private
    def user_order_params
        params.require(:user_orders).transform_keys(&:underscore).permit(:user_id, :ticker, :quantity, :avg_ticker_price)
    end

    def buying_power_params
        params.require(:user_buying_power).permit(:buying_power)
    end

    def delete_ticker_order_params
        params.require(:user_orders).transform_keys(&:underscore).permit(:ticker)
    end
end