class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(
            params[:user][:email],
            params[:user][:password]
        )

        if @user
            render "api/users/show"
        else
            render json: ["Invalid email/password combination"], status: 401
        end
    end

    def destroy
        if current_user
            logout!
            render "api/users/show"
        else
            render json: ["Unpermitted Sign Out Request"], status: 404
        end
    end

end