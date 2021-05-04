class ChangeColumnTypeDecimalPrecision < ActiveRecord::Migration[5.2]
  def change
    change_column(:user_orders, :quantity, :decimal, :precision => 25, :scale => 7)
    change_column(:user_orders, :avg_ticker_price, :decimal, :precision => 25, :scale => 7)
    change_column(:users, :buying_power, :decimal, :precision => 25, :scale => 5)
  end
end
