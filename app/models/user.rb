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
#  buying_power    :float            default(25000.0), not null
#
class User < ApplicationRecord

    attr_reader :password

    validates :password_digest, :session_token, :email, presence: true
    validates :email, uniqueness: true
    validates :password, length: {minimum: 6}, allow_nil: true
    validates :email, format: {with: URI::MailTo::EMAIL_REGEXP}
    validates :buying_power, :numericality => { :greater_than_or_equal_to => 0 }

    before_validation :ensure_session_token

    has_many :ticker_orders,
        foreign_key: :user_id,
        class_name: :UserOrder

    has_many :tickers,
        through: :ticker_orders,
        source: :ticker

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

    private

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

    # def self.update_buying_power(buying_power)
    #     self.buying_power = buying_power
    #     self.save!
    # end

end
