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
        @user = User.find_by(id: params[:id])
        render "api/users/show"
    end

    private
    def user_params
        params.require(:user).transform_keys(&:underscore).permit(:first_name, :last_name, :email, :password, :buying_power)
    end

    # def buying_power_params
    #     params.require(:user).transform_keys(&:underscore).permit(:buying_power)
    # end

end