class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.text :address
      t.integer :lng
      t.integer :lat

      t.timestamps null: false
    end
  end
end
