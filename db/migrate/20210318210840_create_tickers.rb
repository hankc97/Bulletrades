class CreateTickers < ActiveRecord::Migration[5.2]
  def change
    create_table :tickers do |t|
        t.string :ticker, null:false
        t.timestamps
    end
  end
end
