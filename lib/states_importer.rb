class StatesImporter

  # def initialize(filename=File.dirname(__FILE__) + "/../db/data/states.csv")
  def initialize(filename=File.dirname(__FILE__) + "/../db/data/US_women.csv")

    @filename = filename
  end

  def import
    # field_names = ['name', 'state_code', 'capital', 'area', 'population']
    field_names = ['name', 'health_insurance', 'teen_birth', 'doctor', 'poor_health', 'obesity','state_code', 'rape', 'population', 'house', 'senate', 'total_seats', 'women_in_poverty', 'wage_gap', 'judges', 'general_poverty_rate', 'high_school_grad', 'bachelors', 'advanced_degree', 'students_per_teacher', 'central_libraries', 'branch_libraries', 'grade_eight_math_score', 'grade_eight_writing_score']

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
