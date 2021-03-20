class RemoveStocksOwnedColumnAndAddAvgPrice < ActiveRecord::Migration[5.2]
  def change
    remove_column :user_orders, :stocks_owned_array
    add_column :user_orders, :avg_ticker_price, :float, null:false
  end
end
