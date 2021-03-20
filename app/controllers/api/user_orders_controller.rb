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
        @user_order = UserOrder.create(user_order_params)
        
        if @user_order.save
            render 'api/user_orders/show'
        else
            render json: @user_order.full_messages, status: 401
        end
    end

    def destroy
        @user_order = UserOrder.find_by(id: params[:id])

        if @user_order
            @user_order.destroy
        else
            render json: holdings.full_messages, status: 404
        end
    end

    private
    def user_order_params
        params.require(:user_orders).transform_keys(&:underscore).permit(:user_id, :ticker_id, :quantity, :avg_ticker_price)
    end
end