class ChangeDefaultValueForLifetimeTrades < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :lifetime_trades, :text, array: true, default: [["25000.00", "2021-05-08 13:51:03.716037"]]
  end
end
