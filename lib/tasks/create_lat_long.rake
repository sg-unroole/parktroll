namespace :data_population do

  task :lat_lng =>[:environment] do
    Location.find_each do |loc|
      geoll = Geokit::Geocoders::MultiGeocoder.geocode loc.address
      loc.update_columns(lat: geoll.lat, lng: geoll.lng )
    end
  end
end