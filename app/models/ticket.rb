class Ticket < ActiveRecord::Base
	has_one :location, :class => Location

	validates :time_of_infraction, :presence => true
	#TODO: need validations


	def serialize_ticket_data(data_row)
			self.date_of_infraction = DateTime.parse(data_row['date_of_infraction'])
			self.infraction_description = data_row['infraction_description']
			self.time_of_infraction= format_time(data_row['time_of_infraction'])
			self.set_fine_amount = data_row['set_fine_amount']
			self.location_id = Location.serlialize_ticket_location_data(data_row)
	end


	private

	# Gets time in format 0000
	# puts ':' between it and parses it using Rails::Time
	def format_time(time_entry)
			time = time_entry.to_s.insert(2,":")
			return Time.parse(time)
	end
end
