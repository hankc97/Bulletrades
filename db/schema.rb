# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_05_14_140028) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "join_lists", force: :cascade do |t|
    t.integer "watchlist_id", null: false
    t.integer "ticker_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ticker_id"], name: "index_join_lists_on_ticker_id"
    t.index ["watchlist_id"], name: "index_join_lists_on_watchlist_id"
  end

  create_table "tickers", force: :cascade do |t|
    t.string "ticker", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "description"
    t.index ["ticker"], name: "index_tickers_on_ticker", unique: true
  end

  create_table "user_orders", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "ticker_id", null: false
    t.decimal "quantity", precision: 25, scale: 7, default: "0.0", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "avg_ticker_price", precision: 25, scale: 7, default: "0.0", null: false
    t.index ["ticker_id"], name: "index_user_orders_on_ticker_id"
    t.index ["user_id"], name: "index_user_orders_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "buying_power", precision: 25, scale: 5, default: "25000.0", null: false
    t.text "lifetime_trades", default: [["25000.00", "2021-05-08 13:51:03.716037"]], array: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  create_table "watchlists", force: :cascade do |t|
    t.string "name", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_watchlists_on_user_id"
  end

end
