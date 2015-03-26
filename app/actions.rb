# Homepage (Root path)

get '/' do
  File.read(File.join('public', 'index.html'))
end


# get '/' do
#   erb :index
# end
