# require 'active_support'

class State < ActiveRecord::Base

  def create_libraries_per_capita
    population / (central_libraries + branch_libraries)
  end

end