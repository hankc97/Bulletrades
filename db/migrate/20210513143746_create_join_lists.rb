class CreateJoinLists < ActiveRecord::Migration[5.2]
    def change
        create_table :join_lists do |t|
            t.integer :watchlist_id, null:false
            t.integer :ticker_id, null:false
            t.timestamps
        end
        add_index :join_lists, :watchlist_id
        add_index :join_lists, :ticker_id
    end
end
  