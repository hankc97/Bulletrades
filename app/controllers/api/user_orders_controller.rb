class Api::UserOrdersController < ApplicationController 
    def index
        @current_user_orders = UserOrder.where(user_id: current_user.id).includes(:ticker)
        if @current_user_orders
            render 'api/user_orders/index'
        else
            render json: @user_orders.errors.full_messages, status: 404
        end
    end

    def show
        tickerId = Ticker.find_by(ticker: params[:id]).id
        @current_user_single_order = current_user.ticker_orders.where(ticker_id: tickerId)
        @portfolio_percentage_val = (BigDecimal(@current_user_single_order.count) / BigDecimal(UserOrder.count)).to_f

        if @current_user_single_order
            render 'api/user_orders/single_show'
        end
    end

    def create
        convert_params_to_bigdecimal_from_string
        tickerId = Ticker.find_by(ticker: user_order_params[:ticker]).id
        new_buying_power = current_user.get_updated_buying_power(
            @buying_power, 
            @quantity, 
            @avg_ticker_price,
            user_order_params[:sale_type]
        )
        @user_order = UserOrder.create(
            user_id: user_order_params[:user_id],
            ticker_id: tickerId,
            quantity: @quantity,
            avg_ticker_price: @avg_ticker_price
        ) 
        current_user.buying_power = new_buying_power
        new_total_lifetime_price = UserOrder.get_new_total_share_price(current_user.id)
        current_user.lifetime_trades << [new_total_lifetime_price, DateTime.now] 

        if current_user.save
            @current_user_single_order = current_user.ticker_orders.where(ticker_id: tickerId)
            @portfolio_percentage_val = (BigDecimal(@current_user_single_order.count) / BigDecimal(UserOrder.count)).to_f
            render 'api/user_orders/show'
        else
            render json: ["Not Enough Buying Power"], status: 401
        end
    end

    def update
        convert_params_to_bigdecimal_from_string
        tickerId = Ticker.find_by(ticker: user_order_params[:ticker]).id
        @all_orders_for_current_ticker = current_user.ticker_orders.where(ticker_id: tickerId).order(:avg_ticker_price)
        updated_buying_power = UserOrder.sell_user_order_by_closest_price(@buying_power, @quantity, @avg_ticker_price, @all_orders_for_current_ticker)
        current_user.buying_power = updated_buying_power

        new_total_lifetime_price = UserOrder.get_new_total_share_price(current_user.id)
        current_user.lifetime_trades << [new_total_lifetime_price, DateTime.now] 

        if current_user.save
            @current_user_single_order = current_user.ticker_orders.where(ticker_id: tickerId)
            @portfolio_percentage_val = (BigDecimal(@current_user_single_order.count) / BigDecimal(UserOrder.count)).to_f
            render 'api/user_orders/show'
        else
            render json: ["Not Enough Buying Power"], status: 401
        end
    end

    def destroy
        tickerId = Ticker.find_by(ticker: params[:id]).id
        @user_order = current_user.ticker_orders.where(ticker_id: tickerId)
        total_user_quantity = UserOrder.where(user_id: current_user.id).sum('quantity')
        mark_price = BigDecimal(mark_price_params[:mark_price])
        updated_deleted_buying_power = current_user.get_updated_deleted_buying_power(mark_price, current_user.buying_power, total_user_quantity)
        @user_order.destroy_all 

        new_total_lifetime_price = UserOrder.get_new_total_share_price(current_user.id)
        current_user.buying_power = updated_deleted_buying_power
        current_user.lifetime_trades << [new_total_lifetime_price, DateTime.now] 

        if current_user.save
            @current_user_single_order = current_user.ticker_orders.where(ticker_id: tickerId)
            @portfolio_percentage_val = (BigDecimal(@current_user_single_order.count) / BigDecimal(UserOrder.count)).to_f
            render 'api/user_orders/show'
        else
            render json: holdings.full_messages, status: 404
        end
    end

    private
    def user_order_params
        params.require(:user_orders).transform_keys(&:underscore).permit(:user_id, :ticker, :quantity, :avg_ticker_price, :sale_type)
    end

    def buying_power_params
        params.require(:user_buying_power).transform_keys(&:underscore).permit(:buying_power)
    end

    def mark_price_params
        params.require(:mark_price).transform_keys(&:underscore).permit(:mark_price)
    end

    def convert_params_to_bigdecimal_from_string
        @buying_power = BigDecimal(buying_power_params[:buying_power])
        @quantity = BigDecimal(user_order_params[:quantity])
        @avg_ticker_price = BigDecimal(user_order_params[:avg_ticker_price])
    end
end