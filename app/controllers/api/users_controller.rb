class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render "api/users/create"
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def update
        @user = User.find_by(id: params[:id].to_i)
        @user.buying_power = buying_power_params[:buying_power].to_f
        if @user.save
            render "api/users/show"
        else
            render json: ["Insufficient Funds Checking Account Below Zero"], status: 404
        end
    end

    def show
        format_date = (params[:id] != "undefined") ? params[:id] : "1D"
        @format_lifetime_trades = current_user.format_lifetime_trades(format_date, current_user.lifetime_trades)
        render "api/users/show"
    end

    private
    def buying_power_params
        params.require(:buying_power).transform_keys(&:underscore).permit(:buying_power)
    end

    def user_params
        params.require(:user).transform_keys(&:underscore).permit(:first_name, :last_name, :email, :password)
    end
end