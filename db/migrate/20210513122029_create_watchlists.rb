class CreateWatchlists < ActiveRecord::Migration[5.2]
  def change
    create_table :watchlists do |t|
        t.string :name, null:false
        t.json :tickers, default: {}
        t.integer :user_id, null:false
        t.timestamps
    end
    add_index :watchlists, :user_id
  end
end
