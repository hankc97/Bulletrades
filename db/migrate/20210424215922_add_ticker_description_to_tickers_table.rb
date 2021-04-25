class AddTickerDescriptionToTickersTable < ActiveRecord::Migration[5.2]
  def change
    add_column :tickers, :description, :string
  end
end
