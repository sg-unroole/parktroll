class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.text :address
      t.float :lng
      t.float :lat
      t.integer :distance
      t.timestamps null: false
    end
  end
end
