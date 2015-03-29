# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150327175134) do

  create_table "states", force: true do |t|
    t.string  "name"
    t.float   "health_insurance"
    t.integer "teen_birth"
    t.float   "doctor"
    t.float   "poor_health"
    t.float   "obesity"
    t.string  "state_code"
    t.float   "rape"
    t.float   "population"
    t.float   "house"
    t.float   "senate"
    t.float   "total_seats"
    t.float   "women_in_poverty"
    t.float   "wage_gap"
    t.float   "judges"
    t.float   "general_poverty_rate"
    t.float   "high_school_grad"
    t.float   "bachelors"
    t.float   "advanced_degree"
    t.float   "students_per_teacher"
    t.integer "central_libraries"
    t.integer "branch_libraries"
    t.integer "grade_eight_math_score"
    t.integer "grade_eight_writing_score"
  end

end
