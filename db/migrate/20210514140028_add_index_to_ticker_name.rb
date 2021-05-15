class AddIndexToTickerName < ActiveRecord::Migration[5.2]
  def change
    add_index :tickers, :ticker, unique: true
  end
end
