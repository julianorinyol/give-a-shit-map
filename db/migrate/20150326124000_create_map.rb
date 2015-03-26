require_relative '../../config'

class CreateHistory < ActiveRecord::Migration
  
  def up
    create_table :states do |t|
      t.string :name
      t.string :capital
      t.integer :area
      t.integer :population
      t.timestamps
    end
  end

  def down
    drop_table :states
  end
  
end