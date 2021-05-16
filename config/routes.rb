Rails.application.routes.draw do
    root "static_pages#root"

    namespace :api, defaults: {format: :json} do
        resources :users, only: [:create, :update, :show] 
        resource :session, only: [:create, :destroy]
        resources :user_orders, only: [:create, :index, :update, :destroy, :show]
        resources :tickers, only: [:index, :show, :update]
        resources :watchlists, only: [:create, :show, :index, :update, :destroy, :edit]
    end

end
