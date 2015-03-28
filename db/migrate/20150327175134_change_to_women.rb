class ChangeToWomen < ActiveRecord::Migration
  def change 
    drop_table :states
    create_table :states do |t|
      t.string :name
      t.string :health_insurance
      t.string :teen_birth
      t.string :doctor
      t.string :poor_health
      t.string :obesity
      t.string :state_code
    end
  end
end


# ['name', 'health_insurance', 'teen_birth', 'doctor', 'poor_health', 'obese']
