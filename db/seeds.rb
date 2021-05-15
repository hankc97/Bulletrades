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
Ticker.delete_all

demo_user = User.create({email: 'demo@yahoo.com', first_name: 'Demo', last_name: 'User', password: 'password', 
    lifetime_trades: [[25000.00, DateTime.now],[25100.30, DateTime.now], [25300.30, DateTime.now], [25330.12, DateTime.now], [25140.31, DateTime.now], [25003.98, DateTime.now], [24990.10, DateTime.now], [24930.56, DateTime.now], [24900.03, DateTime.now], [24620.80, DateTime.now], [24310.67, DateTime.now], [24305.31, DateTime.now], [24050.78, DateTime.now], [23999.45, DateTime.now], [24100.89, DateTime.now], [24142.46, DateTime.now], [24198.30, DateTime.now], [24089.87, DateTime.now], [24121.91, DateTime.now], [24132.39, DateTime.now], [24141.81, DateTime.now], [24191.30, DateTime.now], [24210.30, DateTime.now], [24190.30, DateTime.now], [24200.30, DateTime.now], [24531.83, DateTime.now], [24610.30, DateTime.now], [24670.20, DateTime.now], [24780.10, DateTime.now], [24699.30, DateTime.now], [24710.30, DateTime.now], [24510.30, DateTime.now], [24490.30, DateTime.now], [24560.30, DateTime.now], [24691.91, DateTime.now], [24713.30, DateTime.now], [24895.30, DateTime.now], [25010.71, DateTime.now], [25102.61, DateTime.now], [25432.98, DateTime.now], [25201.30, DateTime.now], [25093.78, DateTime.now], [25130.13, DateTime.now], [25190.67, DateTime.now], [25323.90, DateTime.now], [25410.80, DateTime.now], [25509.78, DateTime.now], [25510.91, DateTime.now], [25693.55, DateTime.now], [25713.45, DateTime.now], [25821.71, DateTime.now], [25911.33, DateTime.now], [26019.01, DateTime.now], [26121.30, DateTime.now], [26012.90, DateTime.now], [25921.30, DateTime.now], [25892.30, DateTime.now], [25861.30, DateTime.now], [25812.30, DateTime.now], [25792.30, DateTime.now], [25912.30, DateTime.now], [26093.16, DateTime.now], [26121.16, DateTime.now], [26131.16, DateTime.now], [25999.16, DateTime.now], [25981.16, DateTime.now], [26012.16, DateTime.now], [26093.16, DateTime.now], [26133.42, DateTime.now], [26393.16, DateTime.now], [26190.31, DateTime.now], [26081.89, DateTime.now], [25921.98, DateTime.now], [26012.76, DateTime.now], [26087.42, DateTime.now], [26121.91, DateTime.now], [26152.65, DateTime.now], [26192.91, DateTime.now], [26131.12, DateTime.now], [26100.87, DateTime.now], [26215.31, DateTime.now], [26345.11, DateTime.now], [26131.16, DateTime.now], [25999.36, DateTime.now], [25830.16, DateTime.now], [25793.98, DateTime.now], [25693.98, DateTime.now], [25733.98, DateTime.now], [25723.98, DateTime.now], [25313.48, DateTime.now], [25623.18, DateTime.now], [25393.13, DateTime.now], [25410.51, DateTime.now], [25415.51, DateTime.now], [25480.51, DateTime.now], [25490.51, DateTime.now], [25510.51, DateTime.now], [25610.51, DateTime.now], [25533.51, DateTime.now], [25621.67, DateTime.now], [25633.67, DateTime.now], [25655.17, DateTime.now], [25671.67, DateTime.now], [25691.67, DateTime.now], [25711.67, DateTime.now], [25699.67, DateTime.now], [25782.67, DateTime.now], [25831.67, DateTime.now], [25710.67, DateTime.now], [25918.67, DateTime.now], [26100.67, DateTime.now]]});

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
