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
        User.update_buying_power(buying_power_params[:user][:buying_power])
    end

    private
    def user_params
        params.require(:user).transform_keys(&:underscore).permit(:first_name, :last_name, :email, :password, :buying_power)
    end

    def buying_power_params
        params.require(:user).transform_keys(&:underscore).permit(:buying_power)
    end

end