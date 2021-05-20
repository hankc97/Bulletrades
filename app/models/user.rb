# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  buying_power    :decimal(25, 5)   default(25000.0), not null
#  lifetime_trades :text             default([["\"25000.00\"", "\"2021-05-08 13:51:03.716037\""]]), is an Array
#
class User < ApplicationRecord
    attr_reader :password

    validates :password_digest, :session_token, :email, presence: true
    validates :email, uniqueness: true
    validates :password, length: {minimum: 6}, allow_nil: true
    validates :email, format: {with: URI::MailTo::EMAIL_REGEXP}
    validates :buying_power, :numericality => { :greater_than_or_equal_to => 0 }

    before_validation :ensure_session_token
    after_create :ensure_watchlist
    after_create :ensure_lifetime_trades

    has_many :ticker_orders,
        foreign_key: :user_id,
        class_name: :UserOrder

    has_many :tickers,
        through: :ticker_orders,
        source: :ticker

    has_many :watchlists,
        foreign_key: :user_id,
        class_name: :Watchlist

    def self.find_by_credentials(email, password)
        @user = User.find_by(email: email)
        return nil unless @user
        @user.is_password?(password) ? @user : nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        generate_unique_session_token
        self.save!
        self.session_token
    end

    def ensure_session_token
        generate_unique_session_token unless self.session_token
    end

    def new_session_token
        SecureRandom.urlsafe_base64(32)
    end

    def generate_unique_session_token
        self.session_token = new_session_token
        while User.find_by(session_token: self.session_token)
          self.session_token = new_session_token
        end
        self.session_token
    end

    def ensure_watchlist
        Ticker.find_by(ticker: 'AAPL').watchlists << Watchlist.create({name: 'Demo Watchlists', user_id: self.id})
    end

    def ensure_lifetime_trades
        self.lifetime_trades << [25000.00, DateTime.now]
    end

    def get_updated_buying_power(buying_power, quantity, avg_ticker_price, sale_type)
        if sale_type == "Buy" 
            new_buying_power = buying_power - ( avg_ticker_price * quantity )
            return new_buying_power
        end
    end

    def get_updated_deleted_buying_power(mark_price, buying_power, total_order_length)
        return buying_power += (mark_price * total_order_length)
    end

    def format_lifetime_trades(format_date, lifetime_trades)
        if format_date == "1D"
            return lifetime_trades.last(70)
        end

        if format_date == "1W"
            return lifetime_trades.last(140)
        end

        if format_date == "1M"
            return lifetime_trades.last(240)
        end

        if format_date == "3M"
            return lifetime_trades.last(400)
        end

        if format_date == "1Y"
            return lifetime_trades.last(600)
        end

        if format_date == "5Y"
            return lifetime_trades.last(1000)
        end
    end
end
