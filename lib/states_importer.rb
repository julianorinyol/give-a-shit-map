class StatesImporter

  def initialize(filename=File.dirname(__FILE__) + "/../db/data/states.csv")
    @filename = filename
  end

  def import
    field_names = ['name', 'state_code', 'capital', 'area', 'population']

    print "Importing states from #{@filename}: "
    failure_count = 0

    State.transaction do
      File.open(@filename).each do |line|
        data = line.chomp.split(',')
        attribute_hash = Hash[field_names.zip(data)]
        begin
          state = State.create!(attribute_hash)
          print "."; STDOUT.flush
        rescue ActiveRecord::UnknownAttributeError
          print "!"; STDOUT.flush
          failure_count += 1
        end
      end
    end
    failures = "(failed to create #{failure_count} state records)" if failure_count > 0
    puts "\nDONE #{failures}\n\n"
  end

end
