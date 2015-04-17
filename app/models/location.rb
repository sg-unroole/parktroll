class Location < ActiveRecord::Base
  acts_as_mappable :default_units => :kms,
                   :default_formula => :sphere,
                   :distance_field_name => :distance,
                   :lat_column_name => :lat,
                   :lng_column_name => :lng


	def self.serlialize_ticket_location_data(row_data)
		_address = serialize_address(row_data)
		location_exists = Location.where(:address => _address).first
		#if location exists return existing location
		# if location is new save address
		 unless location_exists
			 object = Location.new(:address => _address)
			 object.save
		 else
			 object = location_exists
		 end

		object.id
	end

	private

	def self.serialize_address(location_row)
		address = "#{location_row['location1'].to_s} #{location_row['location2'].to_s} #{location_row['location3'].to_s} #{location_row['location4'].to_s}"
		return address + ", Toronto"  + ", #{location_row['province'].to_s}"
	end
end
