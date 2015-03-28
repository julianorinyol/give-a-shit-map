# require 'pg'
# require 'pry'
# require 'active_record'

# class State
#   CONN = PG.connect({
#                                 host: 'ec2-184-73-221-47.compute-1.amazonaws.com',
#                                 port: '5432',
#                                 user: 'aqcyzzoolwnlgn',
#                                 password: 'WfCJfguLDZCfVAsAdnxyToS-QY',
#                                 dbname: 'dfl1v5nt89dt50'
#                             })
#   attr_accessor :name, :state_code, :capital, :area, :population
#   attr_reader :id
 
#   def initialize(name, state_code, capital, area, population)
#     @name = name
#     @state_code = state_code
#     @capital = capital
#     @area = area
#     @population = population
#     @id = id
#   end
 
#   def is_new?
#     @id.nil?
#   end

#   def save
#     if is_new?
#       result = CONN.exec_params('INSERT INTO states (name, state_code, capital, area, population) VALUES ($1, $2, $3, $4, $5) returning id', [@name, @state_code, @capital, @area, @population])
#       @id = result[0]['id']
#     else
#       CONN.exec_params('UPDATE states SET name = $1, state_code = $2, capital = $3, area = $4, population = $5, WHERE id = $6', [@name, @state_code, @capital, @area, @population, @id])
#     end
#   end

#   def self.find(id)
#     result = nil
#     CONN.exec_params('SELECT id, name, state_code, capital, area, population FROM contacts WHERE id = $1 LIMIT 1', [id]) do |rows|
#       rows.each do |row|
#         result = Instructor.new(
#             row['first_name'],
#             row['last_name'],
#             row['email'],
#             row['id']
#         )
#       end
#     end
#     result
#   end
# end
#   # def self.find_all_by_last_name(last_name)
#   #   result = []
#   #   CONN.exec_params('SELECT id, first_name, last_name, email FROM contacts WHERE last_name = $1 ', [last_name]) do |rows|
#   #     rows.each do |row|
#   #       result << Contact.new(
#   #           row['first_name'],
#   #           row['last_name'],
#   #           row['email']
#   #       )
#   #     end
#   #   end
#   #   p result
#   # end

#   # def self.find_all_by_first_name(name)
#   # end

#   # def self.find_all_by_email(email)
#   # end
#   # def self.destroy(id)
#   #    CONN.exec_params('DELETE FROM contacts WHERE id = $1', [id])
#   # end

#   # def to_s
#   #   # TODO: return string representation of Contact
#   #   # @string_version = self.to_s
#   # end
 
#   ## Class Methods
#   # class << self

#   #   def create(name, email)
#   #     # TODO: Will initialize a contact as well as add it to the list of contacts
#   #     contact = [name, email]
#   #     ContactDatabase.write_contact(contact)
  
#   #   end
 
#   #   def find(index)
#   #     # TODO: Will find and return contact by index

#   #   end
 
#   #   def all
#   #     # TODO: Return the list of contacts, as is
#   #   end
    
#   #   def show(id)
#   #     # TODO: Show a contact, based on ID
#   #   end
    
#   # end
 
# # jim = Contact.new("first_name", "last_name", "email")
# # roger = Contact.new('roger', 'richards', 'roger@yahoo.ca')
# # roger.save
# # puts jim 
# # p jim 
# # p jim.save
# # p jim.save
# # p Contact.find_all_by_last_name("last_name")
# # Contact.destroy(1)
