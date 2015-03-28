require 'rake'
require "sinatra/activerecord/rake"
require ::File.expand_path('../config/environment', __FILE__)
require './lib/states_importer'

Rake::Task["db:create"].clear
Rake::Task["db:drop"].clear

# desc "create the database"
# task "db:create" do
#   touch 'db/db.sqlite3'
# end

# desc "drop the database"
# task "db:drop" do
#   rm_f 'db/db.sqlite3'
# end

# desc 'Retrieves the current schema version number'
# task "db:version" do
#   puts "Current version: #{ActiveRecord::Migrator.current_version}"
# end

desc "populate the test database with sample data"
task "db:populate" do
  StatesImporter.new.import
end

# desc "migrate the database (options: VERSION=x, VERBOSE=false, SCOPE=blog)."
# task "db:migrate" do
#   ActiveRecord::Migrator.migrations_paths << File.dirname(__FILE__) + 'db/migrate'
#   # ActiveRecord::Migration.verbose = ENV["VERBOSE"] ? ENV["VERBOSE"] == "true" : true
#   ActiveRecord::Migrator.migrate(ActiveRecord::Migrator.migrations_paths, ENV["VERSION"] ? ENV["VERSION"].to_i : nil) do |migration|
#     ENV["SCOPE"].blank? || (ENV["SCOPE"] == migration.scope)
#   end
#   Rake::Task["db:schema:dump"].invoke
# end