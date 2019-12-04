Rails.application.routes.draw do
  # get 'twilio/sms'
  devise_for :users
  root 'appointments#index'

  get '/myclinicmanager' => 'appointments#landing'
  get '/appointments' => 'appointments#index'
  get '/showall' => 'appointments#allAppts'
  get '/allpatients' => 'appointments#patients'
  post '/appts' => 'appointments#create'
  # resources :appts
  put '/appts/:id' => 'appointments#update'
  delete '/appts/:id' => 'appointments#destroy'
  # post '/twilio/sms'
  get '/alltests' => 'appointments#tests'
  resources :patients  
  

# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
