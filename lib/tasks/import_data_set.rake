require 'csv'
require 'rake'

namespace :parktroll do
	desc "imports data set to the database"
		task :import_data => :environment do
			file = "Parking_Tags_Data_2014_1.csv"
			proccessed_files = 0
			CSV.foreach(Rails.root.join("lib/ticket_data_sets/#{file}"), headers: true) do |entry|
					ticket = Ticket.new
					begin
						ticket.serialize_ticket_data(entry)
						ticket.save!
					rescue Exception => e
						puts "This entry cannot be saved #{entry.to_s}"
						next
					end
					proccessed_files = proccessed_files + 1
					puts "Proccessed #{proccessed_files}"
			end
	end
end


