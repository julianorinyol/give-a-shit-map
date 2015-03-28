# Homepage (Root path)
helpers do
  @states = State.all
end

get '/' do
  erb :index
end

get '/states' do
  @states = State.all
  @states.to_json
end

get '/states/:state_code' do
  @state = State.find_by(state_code: params[:state_code])
  @state.to_json
end

