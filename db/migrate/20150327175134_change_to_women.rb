class ChangeToWomen < ActiveRecord::Migration
  def change 
    drop_table :states
    create_table :states do |t|
      t.string :name #a
      t.integer :health_insurance #b
      t.integer :teen_birth #c
      t.integer :doctor #d
      t.integer :poor_health #e
      t.integer :obesity #f
      t.string :state_code #g
      t.integer :rape #h
      t.integer :population #i
      t.integer :house #j
      t.integer :senate #k
      t.integer :total_seats #l
      t.integer :women_in_poverty #m
      t.integer :wage_gap #n
      t.integer :judges #o
      t.integer :general_poverty_rate #p
      t.integer :high_school_grad #q
      t.integer :bachelors #r
      t.integer :advanced_degree #s
    end
  end
end


# ['name', 'health_insurance', 'teen_birth', 'doctor', 'poor_health', 'obese']
