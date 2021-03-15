class AddTimeStamps < ActiveRecord::Migration[5.2]
  def change
    add_timestamps :users, null:false
  end
end
