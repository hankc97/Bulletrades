class CreateUserOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :user_orders do |t|
        t.integer :user_id, null:false
        t.integer :ticker_id, null:false
        t.float :quantity, null:false
        t.integer :stocks_owned_array, default: []
        t.timestamps
    end
    add_index :user_orders, :user_id
    add_index :user_orders, :ticker_id
  end
end
