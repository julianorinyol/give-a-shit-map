# require 'pg'
# require_relative 'secrets'

configure do
  # Log queries to STDOUT in development
  if Sinatra::Application.development?
    ActiveRecord::Base.logger = Logger.new(STDOUT)
  end

  puts "connecting to database..."

if development?
  set :database, {
    adapter: "sqlite3",
    database: "db/db.sqlite3"
  }
else
  set :database, ENV['DATABASE_URL']
end
  # set :database, {
  #   adapter: "postgres",
  #   database: DATABASE
  # }

# ActiveRecord::Base.establish_connection(
#   adapter: 'postgresql',
#   encoding: 'unicode',
#   pool: 5,
#   database: ENV['DATABASE_NAME'],
#   username: ENV['DATABASE_USERNAME'],
#   password: ENV['DATABASE_PASSWORD'],
#   host: ENV['DATABASE_HOST'],
#   port: 5432,
#   min_messages: 'error'
# )

  # puts "connecting to database..."
  # ActiveRecord::Base.establish_connection(
  #   adapter: 'postgresql',
  #   encoding: 'unicode',
  #   pool: 5,
  #   host: ENV['DATABASE_HOST'],
  #   username: ENV['DATABASE_USERNAME'],
  #   password: ENV['DATABASE_PASSWORD'],
  #   database: ENV['DATABASE_NAME'],
  #   port: '5432',
  #   min_messages: 'error'
  # )
                            
  # Load all models from app/models, using autoload instead of require
  # See http://www.rubyinside.com/ruby-techniques-revealed-autoload-1652.html
  Dir[APP_ROOT.join('app', 'models', '*.rb')].each do |model_file|
    filename = File.basename(model_file).gsub('.rb', '')
    autoload ActiveSupport::Inflector.camelize(filename), model_file
  end  
end
