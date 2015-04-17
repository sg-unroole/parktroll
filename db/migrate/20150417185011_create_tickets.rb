class CreateTickets < ActiveRecord::Migration
  def change
    create_table :tickets do |t|
      t.references :location
      t.date :date_of_infraction
      t.time :time_of_infraction
      t.integer :set_fine_amount
      t.string :infraction_description

      t.timestamps null: false
    end
  end
end
