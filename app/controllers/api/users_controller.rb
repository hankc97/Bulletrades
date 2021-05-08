class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render "api/users/show"
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def update
        @user = User.find_by(id: current_user.id)
        if @user.update(user_params)
            render "api/users/show"
        else
            render json: ["Insufficient Funds"], status: 404
        end
    end

    def show
        format_date = "1D" || format_params[:format]
        @format_lifetime_trades = current_user.format_lifetime_trades(format_date, current_user.lifetime_trades)
        render "api/users/show"
    end

    private
    def user_params
        params.require(:user).transform_keys(&:underscore).permit(:first_name, :last_name, :email, :password, :buying_power)
    end

    def format_params
        params.require(:format).transform_keys(&:underscore).permit(:format)
    end

end