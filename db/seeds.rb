# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'

UserOrder.delete_all
User.delete_all

demo_user = User.create({email: 'demo@yahoo.com', first_name: 'Demo', last_name: 'User', password: 'password'});

Ticker.delete_all
csv_text = File.read(Rails.root.join('lib', 'seeds', 'stock_data.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
    if row['Description'].include?('Common Stock')
        t = Ticker.new
        t.ticker = row['Ticker']
        t.description = row['Description']
        t.save
        puts "#{t.ticker} #{t.description} saved"
    end
end 
