Rails.application.routes.draw do
  devise_for :users
  
  get '/appointments' => 'appointments#index'
  get '/showall' => 'appointments#allAppts'
  get '/allpatients' => 'appointments#patients'
  post '/appts' => 'appointments#create'
  patch '/appts/:id' => 'appointments#update'

  resources :patients  
  resources :appts

# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
