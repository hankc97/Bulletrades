# == Schema Information
#
# Table name: user_orders
#
#  id               :bigint           not null, primary key
#  user_id          :integer          not null
#  ticker_id        :integer          not null
#  quantity         :decimal(25, 7)   default(0.0), not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  avg_ticker_price :decimal(25, 7)   default(0.0), not null
#
class UserOrder < ApplicationRecord
    validates :user_id, :ticker_id, :quantity, :avg_ticker_price, presence: true

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User
    
    belongs_to :ticker, 
        foreign_key: :ticker_id,
        class_name: :Ticker

    def self.get_new_total_share_price(id)
        self.where(user_id: id).sum('quantity * avg_ticker_price')
    end

    def self.get_all_current_user_orders(user_id)
        self.where(user_id: user_id).group(:ticker).sum(:quantity)
    end
    
    def self.sell_user_order_by_closest_price(buying_power, quantity, avg_ticker_price, all_orders_for_current_ticker)
        lowidx, highidx = self.use_binary_search_to_find_closest_index(all_orders_for_current_ticker, avg_ticker_price)
        increment_var = (lowidx - 0).abs > (highidx - all_orders_for_current_ticker.length()).abs ? lowidx : highidx
        alt_counter = (increment_var == lowidx) ? highidx : lowidx
        loop_conditional_statement = (increment_var == highidx) ? increment_var...all_orders_for_current_ticker.length() : increment_var.downto(0)
        to_be_deleted_index_array = []

        for main_counter in loop_conditional_statement do 
            if all_orders_for_current_ticker[main_counter].quantity <= quantity
                buying_power += ( avg_ticker_price * all_orders_for_current_ticker[main_counter].quantity )
                quantity -= all_orders_for_current_ticker[main_counter].quantity
                to_be_deleted_index_array << main_counter

            elsif all_orders_for_current_ticker[main_counter].quantity > quantity
                all_orders_for_current_ticker[main_counter].quantity -= quantity
                buying_power += ( avg_ticker_price * quantity )
                quantity = 0
                all_orders_for_current_ticker[main_counter].save
                break
            end

            if ( (alt_counter >= 0) && (alt_counter != all_orders_for_current_ticker.length()) )
                if all_orders_for_current_ticker[alt_counter].quantity <= quantity
                    buying_power += ( avg_ticker_price * all_orders_for_current_ticker[alt_counter].quantity )
                    quantity -= all_orders_for_current_ticker[alt_counter].quantity
                    to_be_deleted_index_array << alt_counter
                    if alt_counter == highidx
                        alt_counter += 1
                    else 
                        alt_counter -= 1
                    end 
                elsif all_orders_for_current_ticker[alt_counter].quantity > quantity
                    all_orders_for_current_ticker[alt_counter].quantity -= quantity
                    buying_power += ( avg_ticker_price * quantity )
                    quantity = 0
                    all_orders_for_current_ticker[alt_counter].save
                    break
                end
            end
        end

        for idx in (to_be_deleted_index_array.length() - 1).downto(0) do
            all_orders_for_current_ticker[idx].delete
        end

        return buying_power
    end

    def self.use_binary_search_to_find_closest_index(array_of_objects, avg_ticker_price)
        if array_of_objects.length() == 1
            return [low = 0, high = 0]
        end
        # change this to 4 later
        if array_of_objects.length() < 100
            return [low = 0, high = 1]
        end
        if (avg_ticker_price < array_of_objects[0].avg_ticker_price)
            return [low = 0, high = 1]
        end
        if (avg_ticker_price > array_of_objects[array_of_objects.length() - 1].avg_ticker_price)
            return [low = array_of_objects.length() - 2, high = array_of_objects.length() - 1]
        end

        low = 0
        high = array_of_objects.length() - 1
        while (low <= high) 
            midpoint = (high + low) / 2
            if (avg_ticker_price < array_of_objects[midpoint].avg_ticker_price)
                high = midpoint - 1
            elsif (avg_ticker_price > array_of_objects[midpoint].avg_ticker_price)
                low = midpoint + 1
            else    
                low = high - 1
                return [low , high]
            end
        end
        return [low, high]
    end

end

# function binarySearch(array, target) {
#     if (array.length === 0) return -1;
    
#     const midpoint = Math.floor(array.length / 2);
#     if (array[midpoint] > target) {
#       return binarySearch(array.slice(0, midpoint), target);
#     } else if (array[midpoint] < target) {
#       const subResult = binarySearch(array.slice(midpoint + 1), target);
#       return subResult === -1 ? -1 : subResult + midpoint + 1;
#     } else {
#       return midpoint;
#     }
#   }
  
