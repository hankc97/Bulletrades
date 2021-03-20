class AddDefaultValueToQuantityandAverageTickerPriceInUserOrders < ActiveRecord::Migration[5.2]
  def change
    change_column :user_orders, :avg_ticker_price, :float, :default => 0.00
    change_column :user_orders, :quantity, :float, :default => 0.00
  end
end
