class RemoveJsonTickersColumnFromWatchlistsTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :watchlists, :tickers
  end
end
