class AddBuyingPowerToUsersTable < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :buying_power, :float, default: 25000.0, null:false
  end
end
