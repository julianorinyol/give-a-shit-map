class ChangeToWomen < ActiveRecord::Migration
  def change 
    drop_table :states
    create_table :states do |t|
      t.string :name #a
      t.float :health_insurance #b
      t.float :teen_birth #c
      t.float :doctor #d
      t.float :poor_health #e
      t.float :obesity #f
      t.string :state_code #g
      t.float :rape #h
      t.float :population #i
      t.float :house #j
      t.float :senate #k
      t.float :total_seats #l
      t.float :women_in_poverty #m
      t.float :wage_gap #n
      t.float :judges #o
      t.float :general_poverty_rate #p
      t.float :high_school_grad #q
      t.float :bachelors #r
      t.float :advanced_degree #s
      t.float :students_per_teacher
      t.integer :central_libraries
      t.integer :branch_libraries
      t.integer :grade_eight_math_score
      t.integer :grade_eight_writing_score
    end
  end
end


# ['name', 'health_insurance', 'teen_birth', 'doctor', 'poor_health', 'obese']
