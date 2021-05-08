class AddLifetimeTradesArrayColumn < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :lifetime_trades, :text, array: true, default: []
  end
end
